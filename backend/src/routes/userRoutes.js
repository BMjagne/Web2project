import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {getAllUsers, deleteUser} from "../controllers/userController.js";
const router =  Router();


router.get("/", verifyToken, authorizeRoles("admin"), getAllUsers);
router.delete("/:id",verifyToken, authorizeRoles("admin"), deleteUser);


export default router;

