import api from "../config/axiosInstance";
import type { Category } from "../types/models";

const getAllCategory = async () => {
  try {
    const res = await api.get<Category[]>("/categories");
    return res.data;
  } catch (e) {
    throw e;
  }
};
const deleteCategory = async (id: string) => {
  try {
    await api.delete("/categories/" + id);
  } catch (e) {
    throw e;
  }
};
const updateCategory = async (id: string, data: Category) => {
  try {
    await api.patch("/categories/" + id, data);
  } catch (e) {
    throw e;
  }
};
const createCategory = async (data: Category) => {
  try {
    await api.post("/categories", data);
  } catch (e) {
    throw e;
  }
};
const CategoryApi = {
  getAllCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
export default CategoryApi;
