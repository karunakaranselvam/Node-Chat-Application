var Sequelize = require('sequelize');
var db = require("../config");

module.exports = db.sequelize.define(
    'tbl_learner',{
        learner_id_pk: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        pin_id_fk: {
            type: Sequelize.BIGINT,
        },
        pinno: {
            type: Sequelize.BIGINT,
        },
        employee_id: {
            type: Sequelize.STRING,
        },
        firstname: {
            type: Sequelize.STRING,
        },
        lastname: {
            type: Sequelize.STRING,
        },
        designation: {
            type: Sequelize.STRING,
        },
        primaryemail: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        dob: {
            type: Sequelize.DATE,
        },
        gender: {
            type: Sequelize.TINYINT,
        },
        country_code: {
            type: Sequelize.STRING,
        },
        mobile: {
            type: Sequelize.STRING,
        },
        occupation: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        studying: {
            type: Sequelize.STRING,
        },
        yearofstudy: {
            type: Sequelize.CHAR,
        },
        college: {
            type: Sequelize.STRING,
        },
        education: {
            type: Sequelize.STRING,
        },
        location: {
            type: Sequelize.STRING,
        },
        citytown: {
            type: Sequelize.STRING,
        },
        regionstate: {
            type: Sequelize.STRING,
        },
        country: {
            type: Sequelize.BIGINT,
        },
        aboutyourself: {
            type: Sequelize.TEXT,
        },
        others: {
            type: Sequelize.STRING,
        },
        corporatename: {
            type: Sequelize.BIGINT,
        },
        product: {
            type: Sequelize.BIGINT,
        },
        experience: {
            type: Sequelize.STRING,
        },
        mpword: {
            type: Sequelize.STRING,
        },
        pword: {
            type: Sequelize.STRING,
        },
        photo: {
            type: Sequelize.STRING,
        },
        file_name: {
            type: Sequelize.STRING,
        },
        mentor_photo: {
            type: Sequelize.STRING,
        },
        intro_mail_subject: {
            type: Sequelize.TEXT,
        },
        intro_mail_message: {
            type: Sequelize.TEXT,
        },
        user_intro_mail: {
            type: Sequelize.CHAR,
        },
        learner_status: {
            type: Sequelize.STRING,
        },
        created_date: {
            type: Sequelize.DATE,
        },
        reg_date: {
            type: Sequelize.DATE,
        },
        visit: {
            type: Sequelize.BIGINT,
        },
        visited_date: {
            type: Sequelize.DATE,
        },
        registered: {
            type: Sequelize.TINYINT,
        },
        tele_induction: {
            type: Sequelize.TINYINT,
        },
        system_recap: {
            type: Sequelize.TINYINT,
        },
        state: {
            type: Sequelize.TINYINT,
        },
        role: {
            type: Sequelize.CHAR,
        },
        completed_status: {
            type: Sequelize.TINYINT,
        },
        completed_on: {
            type: Sequelize.DATE,
        },
        send_certificate: {
            type: Sequelize.TINYINT,
        },
        certificates_approved: {
            type: Sequelize.TINYINT,
        },
        aprroved_on: {
            type: Sequelize.DATE,
        },
        send_certificate_id: {
            type: Sequelize.INTEGER,
        },
        user_key: {
            type: Sequelize.CHAR,
        },
        learner_uploaded_by: {
            type: Sequelize.STRING,
        },
        region: {
            type: Sequelize.STRING,
        },
        special_expiry_date: {
            type: Sequelize.DATE,
        },
        CL_videocount: {
            type: Sequelize.INTEGER,
        },
        unique_app_code: {
            type: Sequelize.STRING,
        },
        mail_subscribe: {
            type: Sequelize.INTEGER,
        },
        mail_subscribe_date: {
            type: Sequelize.DATE,
        },
        mobile_device_id: {
            type: Sequelize.STRING,
        },
        auth_key: {
            type: Sequelize.TEXT,
        },
        ca_trail: {
            type: Sequelize.INTEGER,
        },
        deactivated_date: {
            type: Sequelize.DATE,
        },
    },
    {
        timestamps:false,
        freezeTableName: true
    }
);