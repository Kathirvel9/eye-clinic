const express = require("express");
const router = express.Router();
const EyeClinicDataController = require("../controller/EyeClinicDataController");

router.post("/create", EyeClinicDataController.createEyeClinicData);
router.get("/getall", EyeClinicDataController.getAllEyeClinicData);
router.get("/getby/:id", EyeClinicDataController.getEyeClinicDataById);
router.get("/history/:opRefNo", EyeClinicDataController.getHistoryByOPRefNo);
router.put("/update/:id", EyeClinicDataController.updateEyeClinicData);
router.delete("/delete/:id", EyeClinicDataController.deleteEyeClinicData);

module.exports = router;
