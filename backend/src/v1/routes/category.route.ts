import { Router } from "express";
import categoryController from "../controllers/category.controller";
import VerifyTokenMD from "../middlewares/verifyToken";

const router = Router();

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.use(VerifyTokenMD);
router.post("/", categoryController.createCategory);
router.patch("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);
const CategoryRout = router;
export default CategoryRout;
