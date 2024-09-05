import { Router } from "express";
import actionOrderItemsController from "../controllers/orderItems.controller.js";


const router = Router();
const roat = {
    def : "/orderitems",
    defID : "/orderitems/:id"
}

router.get(roat.def,actionOrderItemsController.getOrdersItems);
router.get(roat.defID,actionOrderItemsController.getOneOrdersItems);
router.post(roat.def,actionOrderItemsController.createOrdersItems);
router.patch(roat.defID,actionOrderItemsController.updateOrdersItems);
router.delete(roat.defID,actionOrderItemsController.deleteOrdersItems);

export default router