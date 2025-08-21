import React, { useEffect, useState } from "react";
import CustomInput from "../components/UIs/customInput";
import type { Category } from "../types/models";
import CategoryApi from "../apis/categoryApi";
import { AxiosError } from "axios";

function Categories() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [clickedCategory, setClickedCategory] = useState<Category>({
    name: "",
  });
  const getCategories = async () => {
    try {
      const res = await CategoryApi.getAllCategory();
      setCategories(res);
    } catch (e) {}
  };
  useEffect(() => {
    getCategories();
  }, []);
  const onDelete = async (id: string) => {
    try {
      await CategoryApi.deleteCategory(id);
      await getCategories();
    } catch (e) {}
  };
  return (
    <section>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Categories</h1>
        <h1
          onClick={() => {
            setOpenDialog(true);
            setClickedCategory({ name: "", id: "" });
          }}
          className=" border-[.5px]  w-fit p-[5px_12px] rounded-md hover:bg-gray-300 cursor-pointer"
        >
          Add
        </h1>
      </div>
      <div className="border-[.5px] border-gray-300 rounded-2xl [&_.divider]:border-b-[.5px]  [&_.divider]:border-gray-300">
        <div className="capitalize font-semibold flex justify-between p-5  ">
          <h1>title</h1>
          <h1>actions</h1>
        </div>
        <div className="divider"></div>
        {categories.map((category, index) => {
          return (
            <React.Fragment>
              <div
                className="p-5 flex items-center justify-between"
                key={category.id}
              >
                <h1>{category.name}</h1>
                <div className="flex gap-2.5 items-center [&_h1]:cursor-pointer [&_h1]:hover:opacity-50 ">
                  <h1
                    onClick={() => {
                      setOpenDialog(true);
                      setClickedCategory(category);
                    }}
                    className="text-green-500 font-semibold"
                  >
                    Edit
                  </h1>
                  <p>|</p>
                  <h1
                    onClick={() => onDelete(category.id || "")}
                    className="text-red-500 font-semibold"
                  >
                    Delete
                  </h1>
                </div>
              </div>
              {index != categories.length - 1 && (
                <div className="divider"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {openDialog && (
        <CategoryDialog
          key={"category"}
          updateCategories={getCategories}
          setOpen={setOpenDialog}
          category={clickedCategory}
          setCategory={setClickedCategory}
        />
      )}
    </section>
  );
}

export default Categories;
const CategoryDialog = ({
  setOpen,
  category,
  setCategory,
  updateCategories,
}: {
  category: Category;
  setCategory: (e: Category) => void;
  setOpen: (e: boolean) => void;
  updateCategories: () => void;
}) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const saveCategory = async () => {
    try {
      setLoading(true);
      if (category.id) {
        await CategoryApi.updateCategory(category.id || "", category);
      } else {
        await CategoryApi.createCategory(category);
      }
      updateCategories();
      setOpen(false);
      setCategory({ name: "", id: "" });
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.status == 400 || e.status == 409) {
          setError(e.response?.data.name);
        } else {
          setError("there is some thing wrong");
        }
      } else setError("there is some thing wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [category]);
  return (
    <div className="bg-white p-5 flex items-center border-[.5px] rounded-2xl fixed h-[40%] w-[50%] top-0 left-0 translate-x-[50%] translate-y-[50%]">
      {loading ? (
        <div className="w-full">
          <img
            src="loading.svg"
            className="animate-spin block mx-auto w-fit"
            alt=""
          />
        </div>
      ) : (
        <>
          <div className="flex items-end gap-3 w-full">
            <div className="w-[90%] relative">
              <label
                htmlFor="category"
                className="absolute translate-y-[-110%]"
              >
                Category Name
              </label>
              <CustomInput
                key={"name"}
                label={""}
                value={category.name}
                type={"text"}
                error={""}
                onChange={(e) =>
                  setCategory({ id: category.id, name: String(e) })
                }
              />
              {error && (
                <span className="text-red-500 absolute bottom-0 translate-y-[110%] text-sm">
                  {error}
                </span>
              )}
            </div>
            <button
              onClick={() => saveCategory()}
              className=" border-[.5px] h-[56px] w-fit p-[5px_12px] rounded-md border-green-600 hover:bg-gray-300 cursor-pointer"
            >
              {category.id ? "Save" : "Create"}
            </button>
            <button
              onClick={() => setOpen(false)}
              className=" border-[.5px] h-[56px] w-fit p-[5px_12px] rounded-md border-red-600 hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};
