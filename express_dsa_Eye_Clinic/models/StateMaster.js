const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const StateMaster = sequelize.define(
  "StateMaster",
  {
    StateId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "StateId",
    },
    StateName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "StateName",
    },
  },
  {
    tableName: "StateMaster",
    timestamps: false,
  }
);

module.exports = StateMaster;
