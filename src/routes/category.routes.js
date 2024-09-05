import { Router } from "express";
import actionCategoryController from "../controllers/category.controller.js";


const router = Router();
const roat = {
    def : "/category",
    defID : "/category/:id"
}

router.get(roat.def,actionCategoryController.getCategory);
router.get(roat.defID,actionCategoryController.getOneCategory);
router.post(roat.def,actionCategoryController.createCategory);
router.patch(roat.defID,actionCategoryController.updateCategory);
router.delete(roat.defID,actionCategoryController.deleteCategory);

export default router