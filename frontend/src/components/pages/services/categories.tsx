import React, { useEffect, useState } from "react";
import type { Category } from "../../../types/models";
import CategoryApi from "../../../apis/categoryApi";
import { useSearchParams } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const getCategories = async () => {
    try {
      const res = await CategoryApi.getAllCategory();
      setCategories(res);
    } catch (e) {}
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <section
      style={{ scrollbarWidth: "none" }}
      className="w-full overflow-x-scroll flex my-5 gap-5"
    >
      {categories.map((category) => {
        return (
          <div
            key={category.id}
            onClick={() => {
              const current = searchParams.get("categoryId");
              const newParams = new URLSearchParams(searchParams); // clone first
              if (current === category.id) {
                newParams.delete("categoryId");
              } else {
                newParams.set("categoryId", category.id || ""); // use the clicked category
              }
              setSearchParams(newParams);
            }}
            style={{
              background:
                searchParams.get("categoryId") == category.id ? "#99a1af" : "",
            }}
            className="bg-gray-200 p-[3px_10px] rounded-md cursor-pointer hover:bg-gray-400"
          >
            <p>{category.name}</p>
          </div>
        );
      })}
    </section>
  );
}

export default Categories;
