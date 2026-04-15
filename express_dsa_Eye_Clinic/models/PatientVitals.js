const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const PatientVitals = sequelize.define(
  "PatientVitals",
  {
    VitalId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "VitalId",
    },
    UHId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UHId",
    },
    PatientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "PatientId",
    },
    BP: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "BP",
    },
    Sugar: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "Sugar",
    },
    Pulse: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "Pulse",
    },
    Temp: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "Temp",
    },
    Height: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "Height",
    },
    SpOp: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "SpOp",
    },
    Weight: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "Weight",
    },
  },
  {
    tableName: "PatientVitals",
    timestamps: false,
  }
);

module.exports = PatientVitals;
