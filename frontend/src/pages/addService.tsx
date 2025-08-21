import React from "react";
import { type Service } from "../types/models";
import CustomInput from "../components/UIs/customInput";
import useData from "../components/pages/addService/useData";
import CategoriesDD from "../components/pages/addService/categoriesDD";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

function AddService() {
  const { formik, loading, serviceInputs, deleteService, id } = useData();
  const user = useSelector((state: RootState) => state.user);

  console.log(formik.values);
  console.error(formik.errors);
  return (
    <section>
      {user.user?.id == formik.values.providerId && id != "add" && (
        <img
          onClick={(e) => {
            e.stopPropagation();
            deleteService(formik.values.id);
          }}
          className="fill-amber-700 block ml-auto hover:opacity-50 cursor-pointer"
          src="/delete.svg"
          alt="delete"
        />
      )}
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
                  formik.setFieldValue(
                    input.key,
                    input.type == "number" ? +e : e
                  );
                }}
                type={input.type}
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
        <CategoriesDD
          value={formik.values.categoryId}
          onChange={(e) => formik.setFieldValue("categoryId", e)}
        />
        {formik.errors.categoryId && (
          <span className="text-sm text-red-600">
            {formik.errors.categoryId}
          </span>
        )}

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
