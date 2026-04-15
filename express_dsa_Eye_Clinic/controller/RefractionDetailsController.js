const sequelize = require("../config/sequelize");
const RefractionModel = require("../models/RefractionDetails");
const NewOpReg = require("../models/NewOpReg");

const RefractionDetails = RefractionModel(
  sequelize,
  require("sequelize").DataTypes
);

// ✅ CORRECT EXPORT
module.exports = {

  create: async (req, res) => {
    try {
      const result = await RefractionDetails.create(req.body);
      if (req.body?.OPRefNo) {
        await NewOpReg.update(
          { ToBeSeen: "N" },
          { where: { OPRefNo: req.body.OPRefNo } }
        );
      }

      res.status(201).json({
        message: "Inserted successfully",
        data: result,
      });
    } catch (error) {
      console.error("CREATE ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await RefractionDetails.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await RefractionDetails.findByPk(req.params.id);

      if (!data) {
        return res.status(404).json({ message: "Not found" });
      }

      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const data = await RefractionDetails.findByPk(req.params.id);

      if (!data) {
        return res.status(404).json({ message: "Not found" });
      }

      await data.update(req.body);
      if (data.OPRefNo) {
        await NewOpReg.update(
          { ToBeSeen: "N" },
          { where: { OPRefNo: data.OPRefNo } }
        );
      }

      res.json({ message: "Updated", data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      const data = await RefractionDetails.findByPk(req.params.id);

      if (!data) {
        return res.status(404).json({ message: "Not found" });
      }

      await data.destroy();

      res.json({ message: "Deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getHistoryByOPRefNo: async (req, res) => {
    try {
      const { opRefNo } = req.params;
      const history = await RefractionDetails.findAll({
        where: { OPRefNo: opRefNo },
        order: [['CreatedAt', 'DESC']]
      });
      res.status(200).json(history);
    } catch (error) {
      console.error("GET HISTORY ERROR:", error);
      res.status(500).json({ error: "Fetch history failed" });
    }
  }


};
