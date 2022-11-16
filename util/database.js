const Sequelize = require("sequelize");

const sequelize = new Sequelize("booking", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
