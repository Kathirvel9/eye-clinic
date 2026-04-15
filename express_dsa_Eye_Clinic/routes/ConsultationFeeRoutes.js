const express = require("express");
const router = express.Router();
const ConsultationFeeController = require("../controller/ConsultationFeeController");

router.post("/create", ConsultationFeeController.create);
router.get("/getall", ConsultationFeeController.getAll);
router.get("/getby-patientid/:patientId", ConsultationFeeController.getByPatientId);
router.get("/getby-uhid/:uhid", ConsultationFeeController.getByUHId);
router.put("/update/:id", ConsultationFeeController.update);
router.delete("/delete/:id", ConsultationFeeController.remove);

module.exports = router;
