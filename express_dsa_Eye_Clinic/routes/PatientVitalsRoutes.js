const express = require("express");
const router = express.Router();
const PatientVitalsController = require("../controller/PatientVitalsController");

router.post("/create", PatientVitalsController.create);
router.get("/getall", PatientVitalsController.getAll);
router.get("/getby-uhid/:uhid", PatientVitalsController.getByUHId);
router.put("/update/:id", PatientVitalsController.update);
router.delete("/delete/:id", PatientVitalsController.remove);

module.exports = router;
