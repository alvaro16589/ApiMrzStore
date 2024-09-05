import { Router } from "express";
import actionUsersController from "../controllers/users.controller.js";


const router = Router();
const roat = {
    def : "/users",
    defID : "/users/:id"
}

router.get(roat.def,actionUsersController.getUsers);
router.get(roat.defID,actionUsersController.getOneUsers);
router.post(roat.def,actionUsersController.createUsers);
router.patch(roat.defID,actionUsersController.updateUsers);
router.delete(roat.defID,actionUsersController.deleteUsers);

export default router