import { Router } from "express";
import actionStatusController from "../controllers/status.controller.js";


const router = Router();
const roat = {
    def : "/status",
    defID : "/status/:id"
}

router.get(roat.def,actionStatusController.getStatus);
router.get(roat.defID,actionStatusController.getOneStatus);
router.post(roat.def,actionStatusController.createStatus);
router.patch(roat.defID,actionStatusController.updateStatus);
router.delete(roat.defID,actionStatusController.deleteStatus);

export default router