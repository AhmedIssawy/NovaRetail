const express = require("express");
const router = express.Router();
const productcontroller = require("../controllers/ProductController");


router.get("/", productcontroller.GetAllProducts)
router.post("/", productcontroller.AddProduct);
router.get("/:id", productcontroller.EditProduct);
router.put("/:id", productcontroller.EditProduct);

module.exports = router;