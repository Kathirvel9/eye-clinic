const express = require("express");
const authController = require("../controller/authController");
const verifyToken = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/login", authController.userlogin);
router.post("/register", authController.registerNewUser);
router.get("/userdashboard", verifyToken, authController.getDashboard )

module.exports = router;
