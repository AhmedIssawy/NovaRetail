import { Router } from "express";
import { login, register } from "../controllers/Auth.Controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
export default router;
