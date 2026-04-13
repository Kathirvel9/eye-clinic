const express = require("express");
const router = express.Router();
const CityMasterController = require("../controller/CityMasterController");

router.post("/create", CityMasterController.create);
router.get("/getall", CityMasterController.getAll);
router.get("/getby/:id", CityMasterController.getById);
router.put("/update/:id", CityMasterController.update);
router.delete("/delete/:id", CityMasterController.remove);

module.exports = router;
