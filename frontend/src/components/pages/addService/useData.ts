import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ServiceAPI from "../../../apis/servicesApi";
import type { InputI } from "../../../types/inputI";
import { type Service, initialService } from "../../../types/models";
import { serviceSchema } from "../../../validation/modelsSchema";
import Cookies from "js-cookie";

const useData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [unExpectedError, setUnExpectedError] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const navigator = useNavigate();
  const formik = useFormik<Service>({
    initialValues: {
      ...initialService,
      providerId: Cookies.get("id") || "",
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
  ];
  const getServiceById = async (id: string) => {
    try {
      const res = await ServiceAPI.getServiceById(id);
      formik.setValues(res);
    } catch {}
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
  };
};
export default useData;
