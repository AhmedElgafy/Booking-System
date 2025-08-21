import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import AuthApi from "../../apis/authApi";
import { clearUser, setUser } from "../../redux/slices/userSlice";
import type { Role } from "../../types/models";
import type { RootState } from "../../redux/store";
function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const navItems: { to: string; label: string; role: Role }[] = [
    { label: "Home", to: "/", role: "USER" },
    { label: "Services", to: "/services", role: "USER" },
    { label: "Booking", to: "/booking", role: "USER" },
    { label: "Categories", to: "/categories", role: "PROVIDER" },
  ];
  const token = Cookies.get("token");
  const location = useLocation();
  const getMe = async () => {
    try {
      const user = await AuthApi.getMe();
      if (user) {
        dispatch(setUser(user));
      }
    } catch {}
  };
  useEffect(() => {
    if (token) getMe();
  }, []);
  return (
    <nav className="h-[45px] shadow flex justify-between items-center px-3">
      <Link to={"/"} className="object-fill my-auto">
        <img src="/logo.svg" alt="logo" />
      </Link>
      <div className="space-x-5">
        {navItems
          .filter((ele) => {
            if (
              (user.user?.role || "USER") == "USER" &&
              ele.role == "PROVIDER"
            ) {
              return false;
            } else {
              return true;
            }
          })
          .map((ele, index) => {
            return (
              <Link
                key={index}
                to={ele.to}
                className="my-auto capitalize font-semibold"
              >
                {ele.label}
              </Link>
            );
          })}
        {["/login", "/signup"].includes(location.pathname || "") && (
          <button className="bg-gray-200 rounded-[8px] py-1 px-[16px] font-semibold cursor-pointer hover:bg-gray-400">
            <Link to={location.pathname == "/login" ? "/signup" : "/login"}>
              {location.pathname == "/login" && "Sign up"}
              {location.pathname == "/signup" && "login"}
            </Link>
          </button>
        )}

        {!["/login", "/signup"].includes(location.pathname || "") && token && (
          <Link
            onClick={() => {
              Object.keys(Cookies.get()).forEach((cookieName) => {
                Cookies.remove(cookieName, { path: "/" });
              });
              dispatch(clearUser());
            }}
            className="bg-gray-200 rounded-[8px] py-1 px-[16px] font-semibold cursor-pointer hover:bg-gray-400"
            to={"/login"}
          >
            {"logout"}
          </Link>
        )}
        {!["/login", "/signup"].includes(location.pathname || "") && !token && (
          <Link
            to={"/login"}
            className="bg-gray-200 rounded-[8px] py-1 px-[16px] font-semibold cursor-pointer hover:bg-gray-400"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
