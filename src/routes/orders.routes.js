import { Router } from "express";
import actionOrdersController from "../controllers/orders.controller.js";


const router = Router();
const roat = {
    def : "/orders",
    defID : "/orders/:id"
}

router.get(roat.def,actionOrdersController.getOrders);
router.get(roat.defID,actionOrdersController.getOneOrders);
router.post(roat.def,actionOrdersController.createOrders);
router.patch(roat.defID,actionOrdersController.updateOrders);
router.delete(roat.defID,actionOrdersController.deleteOrders);

export default router