const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const UserMaster = sequelize.define("UserMasterM", {
  UserId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "UserId",
  },
  UserName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: "Username",
  },
  UserPassword: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: "PasswordHash",
  },
}, {
  tableName: 'UserMasterM',
  freezeTableName: true,
  timestamps: false,
});
console.log("userMasterM ",UserMaster);

module.exports = UserMaster;
