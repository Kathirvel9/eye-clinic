const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ClinicalPrescriptionDetails = sequelize.define(
  "ClinicalPrescriptionDetails",
  {
    PrescriptionRowId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "PrescriptionRowId",
    },
    Exam_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Exam_Id",
    },
    OPRefNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPRefNo",
    },
    Eye: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Eye",
    },
    Medicine: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Medicine",
    },
    Form: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Form",
    },
    FromDate: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "FromDate",
    },
    ToDate: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "ToDate",
    },
    Frequency: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Frequency",
    },
    Duration: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Duration",
    },
    Remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "Remarks",
    },
    CreatedAt: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "CreatedAt",
      defaultValue: () => new Date().toISOString().slice(0, 19).replace("T", " "),
    },
  },
  {
    tableName: "ClinicalPrescriptionDetails",
    timestamps: false,
  }
);

module.exports = ClinicalPrescriptionDetails;
