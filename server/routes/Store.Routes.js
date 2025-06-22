import { Router } from "express";
const router = Router();
import { AddStore } from "../controllers/Store.Controller.js";
router.post("/", AddStore);

export default router;
