const express = require("express");
const router = express.Router();
const controller = require("../controller/NewOpRegController");

router.post("/create", controller.create);
router.get("/getall", controller.getAll);
router.get("/search", controller.searchPatients);
router.get("/doctor-queue", controller.getDoctorQueue);
router.get("/getby-oprefno/:opRefNo", controller.getPatientByOPRefNo);
router.get("/getby-uhid/:uhid", controller.getByUHId);
router.put("/update-seen-status/:opRefNo", controller.updateSeenStatus);
router.put("/update/:opRefNo", controller.update);
router.delete("/delete/:opRefNo", controller.remove);
router.get("/:opRefNo", controller.getPatientByOPRefNo);

module.exports = router;
