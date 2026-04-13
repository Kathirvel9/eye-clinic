const express = require("express");
const router = express.Router();
const Group = require("../models/AccGroup");

router.get("/", async (req, res) => {
  try {
    const groups = await Group.findAll({
      attributes: ["GroupCode", "GroupName"],
      order: [["GroupName", "ASC"]],
    });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: "Unable to load groups" });
  }
});

module.exports = router;