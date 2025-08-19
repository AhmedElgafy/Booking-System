import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/nav/header";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import Cookies from "js-cookie";
import { useEffect } from "react";

function AuthLayout() {
  const user = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();
  console.log(Cookies.get("token"), user);
  useEffect(() => {
    if (Cookies.get("token")) {
      navigator({ pathname: "/" }, { replace: true });
    }
  }, []);
  return (
    <>
      <Header />
      <div className="h-screen mt-10">
        <Outlet />
      </div>
    </>
  );
}

export default AuthLayout;
