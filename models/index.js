"use strict";
require("dotenv").config({
  path: "./.env",
});
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);


const db = {};
const environment = process.env.use_env_variable

const sequelize = new Sequelize(process.env[`${environment}_DB_NAME`], process.env[`${environment}_DB_USER_NAME`],process.env[`${environment}_DB_PASSWORD`], {
  host: process.env[`${environment}_DB_HOST`],
  dialect:process.env[`${environment}_DB_DIALECT`],
  port:process.env[`${environment}_DB_PORT`],
});


fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
