import { Link, useSearchParams } from "react-router-dom";
import Services from "../../components/pages/home/services";
import { useEffect, useState } from "react";
import Categories from "../../components/pages/services/categories";

function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    const categoryId = searchParams.get("categoryId") || "";
    const timer = setTimeout(() => {
      setSearchParams({
        q: search,
        ...(categoryId && { categoryId: categoryId }),
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
        <Link
          to={"/services/add"}
          className="w-[20%]  text-center block rounded-md bg-gray-300 p-[5px_16px] cursor-pointer hover:bg-gray-400"
        >
          add service
        </Link>
      </div>
      <Categories />
      <Services />
    </section>
  );
}

export default ServicesPage;
