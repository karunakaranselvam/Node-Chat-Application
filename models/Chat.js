var Sequelize = require('sequelize');
var db = require("../config");

module.exports = db.sequelize.define(
    'tbl_chat',{
        chat_id_pk: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sender_id: {
            type: Sequelize.INTEGER,
        },
        receiver_id: {
            type: Sequelize.INTEGER,
        },
        msg: {
            type: Sequelize.STRING
        },
        created_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        chater_name: {
            type: Sequelize.STRING,
        },
    },
    {
        timestamps:false,
        freezeTableName: true
    }
);