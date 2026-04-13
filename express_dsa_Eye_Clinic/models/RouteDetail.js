const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); 

const RouteDetails = sequelize.define(
  "RouteDetails",
  {
    RouteID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'RouteID'
    },

    RoutePlace: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: 'RoutePlace'
    },
  },
  {
    tableName: "RouteDetails",
    timestamps: false, 
  }
);

module.exports = RouteDetails;