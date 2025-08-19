import React, { useEffect, useState } from "react";
import type { InputI } from "../types/inputI";
import { useFormik } from "formik";
import { initialService, type Category, type Service } from "../types/models";
import { serviceSchema } from "../validation/modelsSchema";
import CustomInput from "../components/UIs/customInput";
import ServiceAPI from "../apis/servicesApi";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AddService() {
  const [loading, setLoading] = useState<boolean>(false);
  const [unExpectedError, setUnExpectedError] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const navigator = useNavigate();
  const formik = useFormik<Service>({
    initialValues: {
      ...initialService,
      providerId: Cookies.get("id") || "",
      categoryId: "cmehbtfp40000urr8qaq35u8o",
    },
    onSubmit: async (values) => {
      try {
        setLoading(false);
        const res = await ServiceAPI.addService(values);
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
  useEffect(() => {
    if (unExpectedError) {
      setUnExpectedError("");
    }
  }, [formik.values]);
  console.log(formik.values, formik.errors);
  return (
    <section>
      <form
        action=""
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          formik.submitForm();
        }}
      >
        {serviceInputs.map((input, index) => {
          return (
            <React.Fragment key={index}>
              <CustomInput
                error={formik.errors[input.key as keyof Service] || ""}
                key={input.key}
                label={input.label}
                onChange={(e) => {
                  formik.setFieldValue(input.key, e);
                }}
                type="text"
                value={formik.values[input.key as keyof Service] as string}
              ></CustomInput>
            </React.Fragment>
          );
        })}
        <div className="border-1 border-gray-300 w-full text-center rounded-md mt-5">
          <label htmlFor="image" className="cursor-pointer text-center block">
            Image
          </label>
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={(e) => {
              if (e.target.files)
                formik.setFieldValue("image", e.target.files[0]);
            }}
          />
          {formik.values.image && <p>{formik.values.image.name}</p>}
          {formik.errors.image && (
            <span className="text-sm text-red-600">{formik.errors.image}</span>
          )}
        </div>
        <button
          disabled={loading}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:opacity-50 w-full py-2 rounded-sm text-white"
        >
          {loading ? "Loading > >> > > > >" : "Save"}
        </button>
      </form>
    </section>
  );
}

export default AddService;
