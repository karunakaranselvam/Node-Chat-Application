var Sequelize = require('sequelize');
var db = {};

var sequelize = new Sequelize("dev150129_361dm_imeta_test", "devusr", "PhPssDev", {
  host: "lnxdev1sql.aescorp.in",
  dialect: "mysql",
  operatorsAliases: "false",
  logging: false,
  freezeTableName: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    operatorsAliases: "false",
  }
});

db.sequelize = sequelize;
db.sequelize = sequelize;
module.exports = db;