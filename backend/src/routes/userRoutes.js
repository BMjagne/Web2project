import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import getAllUsers from "../controllers/userController.js";
const router =  Router();


router.get("/admin", verifyToken, authorizeRoles("admin"), getAllUsers);

export default router;

