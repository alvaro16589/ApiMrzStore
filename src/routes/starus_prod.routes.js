import { Router } from "express";
import actionStatusProdController from "../controllers/starus_prod.controller.js";


const router = Router();
const roat = {
    def : "/statusp",
    defID : "/statusp/:id"
}

router.get(roat.def,actionStatusProdController.getStatusProd);
router.get(roat.defID,actionStatusProdController.getOneStatusProd);
router.post(roat.def,actionStatusProdController.createStatusProd);
router.patch(roat.defID,actionStatusProdController.updateStatusProd);
router.delete(roat.defID,actionStatusProdController.deleteStatusProd);

export default router