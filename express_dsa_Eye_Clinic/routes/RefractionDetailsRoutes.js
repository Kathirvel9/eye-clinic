const express = require("express");
const router = express.Router();
const { DataTypes } = require("sequelize");


const controller = require("../controller/RefractionDetailsController");

// ✅ ROUTES
router.post("/create", controller.create);
router.get("/getall", controller.getAll);
router.get("/getby/:id", controller.getById);
router.get("/history/:opRefNo", controller.getHistoryByOPRefNo);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.remove);

module.exports = router;