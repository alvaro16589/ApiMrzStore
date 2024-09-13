import { Router } from "express";
import actionViewsController from "../controllers/views.controller.js";


const router = Router();
const roat = {
    def : "/viewprod",
    defID : "/viewprod/:id"
}

router.get(roat.def,actionViewsController.getAllProductsCatStatus);


export default router