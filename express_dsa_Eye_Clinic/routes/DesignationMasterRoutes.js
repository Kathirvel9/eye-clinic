const express = require("express");
const router = express.Router();
const DesignationMasterController = require("../controller/DesignationMasterController");

router.post("/create", DesignationMasterController.create);
router.get("/getall", DesignationMasterController.getAll);
router.get("/getby/:id", DesignationMasterController.getById);
router.put("/update/:id", DesignationMasterController.update);
router.delete("/delete/:id", DesignationMasterController.remove);

module.exports = router;
