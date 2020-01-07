var Sequelize = require('sequelize');
var db = require("../config");

module.exports = db.sequelize.define(
    'tbl_faculty_assign_pins',{
        assigned_pin_id_pk: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        pin_id_fk: {
            type: Sequelize.BIGINT,
        },
        corporate_id_fk: {
            type: Sequelize.BIGINT,
        },
        faculty_id_fk: {
            type: Sequelize.BIGINT,
        },
        starting_pin_number: {
            type: Sequelize.BIGINT
        },
        ending_pin_number: {
            type: Sequelize.BIGINT
        },
        created_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        modified_date: {
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