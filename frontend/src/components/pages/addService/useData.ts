import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ServiceAPI from "../../../apis/servicesApi";
import type { InputI } from "../../../types/inputI";
import { type Service, initialService } from "../../../types/models";
import { serviceSchema } from "../../../validation/modelsSchema";
import type { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const useData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [unExpectedError, setUnExpectedError] = useState<string>("");
  const user = useSelector((state: RootState) => state.user);

  const { id } = useParams<{ id: string }>();
  const navigator = useNavigate();
  const formik = useFormik<Service>({
    initialValues: {
      ...initialService,
      providerId: user.user?.id || "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (id == "add") {
          await ServiceAPI.addService(values, "multipart/form-data");
        } else {
          await ServiceAPI.updateService(
            values.id,
            values,
            "multipart/form-data"
          );
        }
        navigator("/services");
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.status == 400) {
            formik.setErrors(e.response?.data);
          }
        }
        setUnExpectedError("some thing wrong");
      } finally {
        setLoading(false);
      }
    },
    validationSchema: serviceSchema,
  });
  const serviceInputs: InputI[] = [
    { key: "title", label: "Name", type: "text" },
    { key: "description", label: "Description", type: "text" },
    { key: "price", label: "price", type: "number" },
  ];
  const getServiceById = async (id: string) => {
    try {
      const res = await ServiceAPI.getServiceById(id);
      formik.setValues(res);
    } catch {}
  };
  const deleteService = async (id: string) => {
    try {
      await ServiceAPI.deleteService(id);
      navigator("/services", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (unExpectedError) {
      setUnExpectedError("");
    }
  }, [formik.values]);
  useEffect(() => {
    if (id != "add") {
      getServiceById(id || "");
    }
  }, []);
  return {
    loading,
    unExpectedError,
    formik,
    serviceInputs,
    deleteService,
    id,
  };
};
export default useData;
