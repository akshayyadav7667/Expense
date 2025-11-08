import express from "express";
import { login, register, userProfile } from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",login)
router.get("/profile",auth,userProfile)

export default router;
