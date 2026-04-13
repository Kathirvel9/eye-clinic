const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ConsultationCodeMaster = sequelize.define(
  "ConsultationCodeMaster",
  {
    ConsultationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "ConsultationId",
    },
    DoctorName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "DoctorName",
    },
    ConsultationCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "ConsultationCode",
    },
    VisitFee1: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "VisitFee1",
    },
    VisitFee2: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "VisitFee2",
    },
  },
  {
    tableName: "ConsultationCodeMaster",
    timestamps: false,
  }
);

module.exports = ConsultationCodeMaster;
