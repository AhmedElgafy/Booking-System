import { useFormik } from "formik";
import UserSchema from "../../validation/user";
import React, { useEffect, useState } from "react";
import Roles from "../../types/Roles";
import AuthApi from "../../apis/authApi";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/UIs/customInput";
import SignUpInputs from "../../components/pages/signup/data";
import type { User } from "../../types/User";
import InitialUserValues from "../../types/User";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

function Signup() {
  const navigator = useNavigate();
  const [unExpectedError, setUnExpectedError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const formik = useFormik<User>({
    initialValues: InitialUserValues.singUp,
    validationSchema: UserSchema.userSignupSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const data = await AuthApi.signUp(values);
        formik.resetForm();
        dispatch(setUser(data.user));
        navigator("/", { replace: true });
      } catch (e) {
        console.log(e);
        if (e instanceof AxiosError) {
          if (e.status == 400 || e.status == 409) {
            formik.setErrors(e.response?.data);
          }
        }
        setUnExpectedError("There is something wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (unExpectedError) {
      setUnExpectedError("");
    }
  }, [formik.values]);

  return (
    <section className="max-w-[480px] mx-auto h-[500px] my-auto">
      <h1 className="text-center text-4xl font-bold mb-[5rem]">Sign up</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.submitForm();
        }}
        className="space-y-5"
      >
        {SignUpInputs.map((input, index) => {
          return (
            <React.Fragment key={index}>
              <CustomInput
                error={formik.errors[input.key as keyof User] || ""}
                type={input.type}
                key={input.key}
                label={input.label}
                onChange={(e) => formik.setFieldValue(input.key, e)}
                value={formik.values[input.key as keyof User] || ""}
              />
            </React.Fragment>
          );
        })}
        <div className="flex justify-between px-6">
          {Roles.map((role, index) => {
            return (
              <React.Fragment key={index}>
                <div className="flex gap-3">
                  <label
                    className="cursor-pointer font-semibold "
                    htmlFor={role}
                  >
                    {role}
                  </label>
                  <input
                    type="checkbox"
                    id={role}
                    name={role}
                    checked={formik.values.role == role}
                    onChange={() => formik.setFieldValue("role", role)}
                    value="optionValue"
                  ></input>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-[40px] cursor-pointer disabled:opacity-50 hover:bg-blue-700 rounded-[8px] w-full bg-blue-500 text-white font-semibold"
        >
          {loading ? "loading . . . . ." : "Sign Up"}
        </button>
        {unExpectedError && (
          <span className="text-red-600 block w-fit mx-auto">
            {unExpectedError}
          </span>
        )}
      </form>
    </section>
  );
}

export default Signup;
