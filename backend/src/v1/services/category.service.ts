import { Category } from "../../generated/prisma";
import prisma from "../config/db";
import Schemas from "../schemas/shemas";

const getAllCategories = async () => {
  return await prisma.category.findMany();
};
const getCategoryById = async (id: string) => {
  return await prisma.category.findUnique({ where: { id: id } });
};
const createCategory = async (id: string, data: Category) => {
  const validCategory = Schemas.CategorySchema.parse(data);
  return await prisma.category.create({
    data: validCategory,
  });
};
const updateCategory = async (id: string, data: Category) => {
  const validCategory = Schemas.CategorySchema.partial().parse(data);
  return await prisma.category.update({
    where: { id: id },
    data: validCategory,
  });
};
const deleteCategory = async (id: string) => {
  return await prisma.category.delete({ where: { id: id } });
};
const CategoryService = {
  deleteCategory,
  updateCategory,
  createCategory,
  getCategoryById,
  getAllCategories,
};
export default CategoryService;
