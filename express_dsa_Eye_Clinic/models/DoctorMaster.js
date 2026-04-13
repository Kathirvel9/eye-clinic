const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const DoctorMaster = sequelize.define(
  "DoctorMaster",
  {
    DoctorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "DoctorId",
    },
    DoctorName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "DoctorName",
    },
    Address: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "Address",
    },
    MobileNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "MobileNo",
    },
    Age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "Age",
    },
    Sex: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: "Sex",
    },
    RegNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "RegNo",
    },
    Qualification: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "Qualification",
    },
    Designation: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "Designation",
    },
    WorkFrom: {
      type: DataTypes.TIME,
      allowNull: true,
      field: "WorkFrom",
    },
    WorkTo: {
      type: DataTypes.TIME,
      allowNull: true,
      field: "WorkTo",
    },
    Category: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "Category",
    },
    ActualFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "ActualFee",
    },
    IsWorking: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: "IsWorking",
    },
    VisitCompany: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "VisitCompany",
    },
    VisitFee1: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "VisitFee1",
    },
    VisitMode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "VisitMode",
    },
    VisitFee2: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "VisitFee2",
    },
    VisitFreeDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "VisitFreeDays",
    },
  },
  {
    tableName: "DoctorMaster",
    timestamps: false,
  }
);

module.exports = DoctorMaster;
