import api from "../config/axiosInstance";
import type { User } from "../types/User";
import Cookies from "js-cookie";

const signUp = async (data: User) => {
  try {
    const res = await api.post<{ token: string; user: User }>(
      "/auth/signup",
      data
    );
    Cookies.set("token", res.data.token);
    Object.keys(res.data.user).map((key) => {
      Cookies.set(key, res.data.user[key as keyof User] || "", { expires: 1 });
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};
const login = async (data: User) => {
  try {
    const res = await api.post<{ token: string; user: User }>(
      "/auth/login",
      data
    );
    Cookies.set("token", res.data.token);

    Object.keys(res.data.user).map((key) => {
      Cookies.set(key, res.data.user[key as keyof User] || "", { expires: 1 });
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};
const AuthApi = {
  signUp,
  login,
};
export default AuthApi;
