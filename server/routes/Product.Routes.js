import express from "express";
const router = express.Router();
import {
  AddProduct,
  DeleteProduct,
  EditProduct,
  GetAllProducts,
  getProductsCatRelated,
} from "../controllers/Product.Controller.js";

router.get("/", GetAllProducts);
router.post("/", AddProduct);
router.get("/:id", EditProduct);
router.put("/:id", EditProduct);

export default router;
