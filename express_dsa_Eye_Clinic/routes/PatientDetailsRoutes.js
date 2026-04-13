const express = require("express");
const router = express.Router();
const PatientDetailsController = require("../controller/PatientDetailsController");

router.post("/create", PatientDetailsController.create);
router.get("/getall", PatientDetailsController.getAll);
router.get("/getby-uhid/:uhid", PatientDetailsController.getByUHId);
router.get("/getby/:id", PatientDetailsController.getById);
router.put("/update/:id", PatientDetailsController.update);
router.delete("/delete/:id", PatientDetailsController.remove);

module.exports = router;
