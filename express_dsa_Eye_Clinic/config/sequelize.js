// Use MSSQL dialect with tedious
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize("EyeClinic", "sa", "lamak", {
  host: "Z14-55N",
  dialect: "mssql",
  logging: false,
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  },
});

module.exports = sequelize;


