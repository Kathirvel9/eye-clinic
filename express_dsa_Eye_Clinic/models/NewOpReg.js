const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const NewOpReg = sequelize.define(
  "NewOpReg",
  {
    OPRefNo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "OPRefNo",
    },
    UHId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UHId",
    },
    PatientName: {
      type: DataTypes.STRING(250),
      allowNull: false,
      field: "PatientName",
    },
    PatMobileNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "PatMobileNo",
    },
    RegDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "RegDate",
    },
    ToBeSeen: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: "ToBeSeen",
    },
  },
  {
    tableName: "newOpReg",
    timestamps: false,
  }
);

module.exports = NewOpReg;
