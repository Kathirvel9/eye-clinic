const express = require("express");
const router = express.Router();
const DiagnosisMasterController = require("../controller/DiagnosisMasterController");

router.post("/create", DiagnosisMasterController.create);
router.get("/getall", DiagnosisMasterController.getAll);
router.get("/getby/:id", DiagnosisMasterController.getById);
router.put("/update/:id", DiagnosisMasterController.update);
router.delete("/delete/:id", DiagnosisMasterController.remove);

module.exports = router;
