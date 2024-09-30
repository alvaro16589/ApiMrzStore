import { Router } from "express";
import actionUsersController from "../controllers/users.controller.js";


const router = Router();
const roat = {
    def : "/users",
    defID : "/users/:id",
    defp1 : "/users/u"
    
}

router.get(roat.def,actionUsersController.getUsers);
router.post(roat.defp1,actionUsersController.getOneUsers);
router.post(roat.def,actionUsersController.createUsers);
router.patch(roat.defID,actionUsersController.updateUsers);
router.delete(roat.defID,actionUsersController.deleteUsers);

export default router