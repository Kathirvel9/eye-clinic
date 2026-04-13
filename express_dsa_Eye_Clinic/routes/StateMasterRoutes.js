const express = require("express");
const router = express.Router();
const StateMasterController = require("../controller/StateMasterController");

router.post("/create", StateMasterController.create);
router.get("/getall", StateMasterController.getAll);
router.get("/getby/:id", StateMasterController.getById);
router.put("/update/:id", StateMasterController.update);
router.delete("/delete/:id", StateMasterController.remove);

module.exports = router;
