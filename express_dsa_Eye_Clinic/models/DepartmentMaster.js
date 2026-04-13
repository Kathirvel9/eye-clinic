const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const DepartmentMaster = sequelize.define(
  "DepartmentMaster",
  {
    DepartmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "DepartmentId",
    },
    DepartmentName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "DepartmentName",
    },
  },
  {
    tableName: "DepartmentMaster",
    timestamps: false,
  }
);

module.exports = DepartmentMaster;
