import { NextFunction, Request, Response } from "express";
import categoryService from "../services/category.service";

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const category = await categoryService.createCategory(id, data);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const category = await categoryService.updateCategory(id, data);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await categoryService.deleteCategory(id);
    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
};
const categoryController = {
  deleteCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  createCategory,
};
export default categoryController;
