const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const DesignationMaster = sequelize.define(
  "DesignationMaster",
  {
    DesignationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "DesignationId",
    },
    DesignationName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "DesignationName",
    },
  },
  {
    tableName: "DesignationMaster",
    timestamps: false,
  }
);

module.exports = DesignationMaster;
