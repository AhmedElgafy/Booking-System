import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Outlet } from "react-router-dom";

function PrivatePages() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      {user.user?.role == "PROVIDER" ? (
        <Outlet/>
      ) : (
        <div className="h-[70vh] w-full flex justify-center items-center">
          <p className="text-5xl">403 - This route for providers only</p>
        </div>
      )}
    </div>
  );
}

export default PrivatePages;
