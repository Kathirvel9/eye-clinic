const express = require("express");
const router = express.Router();
const DoctorMasterController = require("../controller/DoctorMasterController");

router.post("/create", DoctorMasterController.create);
router.get("/getall", DoctorMasterController.getAll);
router.get("/getby/:id", DoctorMasterController.getById);
router.put("/update/:id", DoctorMasterController.update);
router.delete("/delete/:id", DoctorMasterController.remove);

module.exports = router;
