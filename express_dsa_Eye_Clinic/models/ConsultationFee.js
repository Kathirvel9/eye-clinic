const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ConsultationFee = sequelize.define(
  "ConsultationFee",
  {
    ConsultationFeeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "ConsultationFeeId",
    },
    PatientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "PatientId",
    },
    UHId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UHId",
    },
    DoctorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "DoctorId",
    },
    DoctorName: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: "DoctorName",
    },
    ConsultationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "ConsultationId",
    },
    ConsultationCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "ConsultationCode",
    },
    ConsultFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "ConsultFee",
    },
    Designation: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: "Designation",
    },
    Concession: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      field: "Concession",
    },
    Total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "Total",
    },
    PatientType: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "PatientType",
    },
    BillNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "BillNo",
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("GETDATE()"),
      field: "CreatedAt",
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("GETDATE()"),
      field: "UpdatedAt",
    },
  },
  {
    tableName: "ConsultationFee",
    timestamps: false,
  }
);

module.exports = ConsultationFee;
