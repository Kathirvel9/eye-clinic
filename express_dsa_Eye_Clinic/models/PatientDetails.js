const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const PatientDetails = sequelize.define(
  "PatientDetails",
  {
    PatientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "PatientId",
    },
    MRIId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "MRIId",
    },
    UHId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "UHId",
    },
    RegDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "RegDate",
    },
    PatientName: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: "PatientName",
    },
    CareOf: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: "CareOf",
    },
    Age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "Age",
    },
    Gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: "Gender",
    },
    PatientType: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "PatientType",
    },
    DOB: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "DOB",
    },
    Address: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "Address",
    },
    AadharCard: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "AadharCard",
    },
    PanCard: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "PanCard",
    },
    StateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "StateId",
    },
    CityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "CityId",
    },
    DiagnosisId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "DiagnosisId",
    },
    Company: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "Company",
    },
    Pincode: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "Pincode",
    },
    Phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "Phone",
    },
    PhotoPath: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
      field: "PhotoPath",
    },
  },
  {
    tableName: "PatientDetails",
    timestamps: false,
  }
);

module.exports = PatientDetails;
