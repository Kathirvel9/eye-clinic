const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const CityMaster = sequelize.define(
  "CityMaster",
  {
    CityId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "CityId",
    },
    CityName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "CityName",
    },
  },
  {
    tableName: "CityMaster",
    timestamps: false,
  }
);

module.exports = CityMaster;
