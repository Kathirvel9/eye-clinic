const DesignationMaster = require("../models/DesignationMaster");

exports.create = async (req, res) => {
  try {
    const data = await DesignationMaster.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Create failed", error: error.message });
  }
};

exports.getAll = async (_req, res) => {
  try {
    const data = await DesignationMaster.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await DesignationMaster.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await DesignationMaster.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not found" });
    await data.update(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await DesignationMaster.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not found" });
    await data.destroy();
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
