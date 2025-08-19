import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const navItems: { to: string; label: string }[] = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Providers", to: "/providers" },
  ];
  const location = useLocation();
  return (
    <nav className="h-[45px] shadow flex justify-between items-center px-3">
      <Link to={"/"} className="object-fill my-auto">
        <img src="/logo.svg" alt="logo" />
      </Link>
      <div className="space-x-5">
        {navItems.map((ele, index) => {
          return (
            <Link key={index} to={ele.to} className="my-auto capitalize font-semibold">
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
      </div>
    </nav>
  );
}

export default Header;
