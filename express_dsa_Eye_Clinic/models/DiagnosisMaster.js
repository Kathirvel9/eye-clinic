const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const DiagnosisMaster = sequelize.define(
  "DiagnosisMaster",
  {
    DiagnosisId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "DiagnosisId",
    },
    DiagnosisName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "DiagnosisName",
    },
  },
  {
    tableName: "DiagnosisMaster",
    timestamps: false,
  }
);

module.exports = DiagnosisMaster;
