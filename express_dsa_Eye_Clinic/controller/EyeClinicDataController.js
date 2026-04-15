const sequelize = require("../config/sequelize");
const ClinicalExaminationModel = require("../models/ClinicalExamination");
const NewOpReg = require("../models/NewOpReg");

// Initialize model properly
const ClinicalExamination = ClinicalExaminationModel(sequelize, require("sequelize").DataTypes);

//create
exports.createEyeClinicData = async (req, res) => {
  try {
    const data = req.body;

    // 🔥 FIX DATE HERE (IMPORTANT)
    if (data.IM_ActualTime) {
      data.IM_ActualTime = new Date(data.IM_ActualTime).toISOString().slice(0, 19).replace("T", " ");
    }

    if (data.FollowUpTime) {
      data.FollowUpTime = new Date(data.FollowUpTime).toISOString().slice(0, 19).replace("T", " ");
    }

    const result = await ClinicalExamination.create(data);
    if (data?.OPRefNo) {
      await NewOpReg.update(
        { ToBeSeen: "Y" },
        { where: { OPRefNo: data.OPRefNo } }
      );
    }

    res.status(201).json({
      message: "Data inserted successfully",
      data: result,
    });

  } catch (error) {
    console.error("❌ FULL ERROR:", error);
    res.status(500).json({ error: "Insert failed" });
  }
};


// ✅ GET ALL
exports.getAllEyeClinicData = async (req, res) => {
  try {
    const data = await ClinicalExamination.findAll();

    res.status(200).json(data);
  } catch (error) {
    console.error("GET ALL ERROR:", error);
    res.status(500).json({ error: "Fetch failed" });
  }
};


// ✅ GET BY ID
exports.getEyeClinicDataById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await ClinicalExamination.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("GET BY ID ERROR:", error);
    res.status(500).json({ error: "Fetch failed" });
  }
};


// ✅ UPDATE
exports.updateEyeClinicData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const data = await ClinicalExamination.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    await data.update(updatedData);
    if (data.OPRefNo) {
      await NewOpReg.update(
        { ToBeSeen: "Y" },
        { where: { OPRefNo: data.OPRefNo } }
      );
    }

    res.status(200).json({
      message: "Updated successfully",
      data,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ error: "Update failed" });
  }
};


// ✅ DELETE
exports.deleteEyeClinicData = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await ClinicalExamination.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    await data.destroy();

    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ error: "Delete failed" });
  }
};

// ✅ GET HISTORY BY OPRefNo
exports.getHistoryByOPRefNo = async (req, res) => {
  try {
    const { opRefNo } = req.params;
    const history = await ClinicalExamination.findAll({
      where: { OPRefNo: opRefNo },
      order: [['CreatedAt', 'DESC']]
    });
    res.status(200).json(history);
  } catch (error) {
    console.error("GET HISTORY ERROR:", error);
    res.status(500).json({ error: "Fetch history failed" });
  }
};
