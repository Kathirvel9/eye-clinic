const express = require("express");
const router = express.Router();
const DepartmentMasterController = require("../controller/DepartmentMasterController");

router.post("/create", DepartmentMasterController.create);
router.get("/getall", DepartmentMasterController.getAll);
router.get("/getby/:id", DepartmentMasterController.getById);
router.put("/update/:id", DepartmentMasterController.update);
router.delete("/delete/:id", DepartmentMasterController.remove);

module.exports = router;
