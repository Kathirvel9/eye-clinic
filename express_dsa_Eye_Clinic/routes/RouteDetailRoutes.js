const express = require("express");
const router = express.Router();
const RouteDetailsController = require("../controller/RouteDetailController");

// ── CRUD ROUTES ─────────────────────────────────────────────────────────────
router.post("/create", RouteDetailsController.createRouteDetail);
router.get("/getall", RouteDetailsController.getRouteDetails);
router.get("/getby/:id", RouteDetailsController.getRouteById);
router.put("/update/:id", RouteDetailsController.updateRouteDetail);
router.delete("/delete/:id", RouteDetailsController.deleteRouteDetail);

module.exports = router;