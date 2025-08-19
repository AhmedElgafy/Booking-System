import { useFormik } from "formik";
import UserSchema from "../../validation/user";
import React, { useEffect, useReducer, useState } from "react";
import AuthApi from "../../apis/authApi";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/UIs/customInput";
import type { User } from "../../types/User";
import InitialUserValues from "../../types/User";
import LoginInputs from "../../components/pages/login.tsx/data";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

function Login() {
  const navigator = useNavigate();
  const [unExpectedError, setUnExpectedError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const formik = useFormik<User>({
    initialValues: InitialUserValues.login,
    validationSchema: UserSchema.userLoginSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const data = await AuthApi.login(values);
        console.log(data);
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
    <section className="max-w-[480px] mx-auto h-[50vh] my-auto">
      <h1 className="text-center text-4xl font-bold mb-[5rem]">Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.submitForm();
        }}
        className="space-y-5"
      >
        {LoginInputs.map((input, index) => {
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
        <button
          type="submit"
          disabled={loading}
          className="h-[40px] cursor-pointer disabled:opacity-50 hover:bg-blue-700 rounded-[8px] w-full bg-blue-500 text-white font-semibold"
        >
          {loading ? "loading . . . . ." : "Login"}
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

export default Login;
