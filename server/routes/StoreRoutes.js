const express = require('express');
const Store = require("../models/Store");
const router = express.Router();
const storeController = require("../controllers/StoreController");
router.post('/',storeController.AddStore)

module.exports = router;