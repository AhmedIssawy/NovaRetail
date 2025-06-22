import express from "express";
const router = express.Router();
import {
  AddCategory,
  DeleteCategory,
  EditCategory,
  GetCategories,
} from "../controllers/Category.Controller.js";

router.get("/", GetCategories);
router.post("/", AddCategory);
router.delete("/:id", DeleteCategory);
router.put("/:id", EditCategory);

export default router;
