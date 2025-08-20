import { Link, useSearchParams } from "react-router-dom";
import Services from "../../components/pages/home/services";
import { useEffect, useState } from "react";
import Categories from "../../components/pages/services/categories";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const categoryId = searchParams.get("categoryId") || "";
    const status = searchParams.get("status") || "";
    const timer = setTimeout(() => {
      setSearchParams({
        q: search,
        ...(categoryId && { categoryId: categoryId }),
        ...(status && { status: status }),
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [search, setSearchParams]);

  return (
    <section>
      <div className="flex gap-5  justify-between grow-0 shrink-0 items-center">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          id="search"
          placeholder="Search"
          className="border-[.5px] px-3 py-1 h-full w-[80%] border-gray-300 rounded-sm  "
          type="text"
        />
        {user.user?.role == "PROVIDER" && (
          <Link
            to={"/services/add"}
            className="w-[20%]  text-center block rounded-md bg-gray-300 p-[5px_16px] cursor-pointer hover:bg-gray-400"
          >
            add service
          </Link>
        )}
      </div>
      <Categories />
      <Services />
    </section>
  );
}

export default ServicesPage;
