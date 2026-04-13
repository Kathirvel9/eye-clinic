const express = require("express");
const router = express.Router();
const ConsultationCodeMasterController = require("../controller/ConsultationCodeMasterController");

router.post("/create", ConsultationCodeMasterController.create);
router.get("/getall", ConsultationCodeMasterController.getAll);
router.get("/getby/:id", ConsultationCodeMasterController.getById);
router.put("/update/:id", ConsultationCodeMasterController.update);
router.delete("/delete/:id", ConsultationCodeMasterController.remove);

module.exports = router;
