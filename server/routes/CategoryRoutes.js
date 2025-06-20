const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");



router.get("/",categoryController.GetCategories )
router.post("/",categoryController.AddCategory)
router.delete("/:id",categoryController.DeleteCategory)
router.put("/:id",categoryController.EditCategory)

module.exports = router;