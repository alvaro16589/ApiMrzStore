import { Router } from "express";
import actionUsersController from "../controllers/users.controller.js";


const router = Router();
const roat = {
    def : "/users",
    defID : "/users/:id",
    defp1 : "/users/u",
    defOut: "/users/logout",
    defWatch: "/users/logwatcher",
    defEmail: '/users/findemail'
    
}

router.get(roat.def,actionUsersController.getUsers);
router.post(roat.defWatch,actionUsersController.logWatcher);
router.post(roat.defp1,actionUsersController.getOneUsers);
router.post(roat.defEmail,actionUsersController.findEmail);
router.get(roat.defOut,actionUsersController.logout);
router.post(roat.def,actionUsersController.createUsers);
router.patch(roat.defID,actionUsersController.updateUsers);
router.delete(roat.defID,actionUsersController.deleteUsers);

export default router