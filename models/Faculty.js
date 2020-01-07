var Sequelize = require('sequelize');
var db = require("../config");

module.exports = db.sequelize.define(
    'tbl_faculty',{
        faculty_id_pk: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        firstname: {
            type: Sequelize.STRING,
        },
        lastname: {
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        gender: {
            type: Sequelize.TINYINT
        },
        qualification: {
            type: Sequelize.STRING
        },
        areaofinterest: {
            type: Sequelize.TEXT
        },
        mobile: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.CHAR
        },
        created_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        last_visited_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        state: {
            type: Sequelize.TINYINT,
        },
    },
    {
        timestamps:false,
        freezeTableName: true
    }
);