import { Router } from "express";
import actionProductsController from "../controllers/products.controller.js";


const router = Router();
const roat = {
    def : "/products",
    defID : "/products/:id"
}

router.get(roat.def,actionProductsController.getProducts);
router.get(roat.defID,actionProductsController.getOneProducts);
router.post(roat.def,actionProductsController.createProducts);
router.patch(roat.defID,actionProductsController.updateProducts);
router.delete(roat.defID,actionProductsController.deleteProducts);

export default router