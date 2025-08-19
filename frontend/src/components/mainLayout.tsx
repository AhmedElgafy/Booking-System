import { Outlet } from "react-router-dom";
import Header from "./nav/header";

function MainLayout() {
  return (
    <>
      <Header />
      <div className="px-[160px]">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
