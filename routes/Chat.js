var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var dateTime = require('node-datetime');

const {
    base64encode,
    base64decode
} = require('nodejs-base64');

var Chat = require("../models/Chat");
var Learner = require("../models/Learner");
var Faculty = require("../models/Faculty");
var Assignpins = require("../models/Faculty_Assign_pins");

var findUser = function (id, rece_id) {
    return Faculty.findOne({
        attributes: ["faculty_id_pk", "firstname", "lastname"],
        where: {
            faculty_id_pk: id
        }
    }).then(function (row) {
        if (row) {
            var faculty = {
                faculty_id: base64encode(id),
                faculty_name: row.firstname + '' + row.lastname,
                learner_faculty : row.firstname + '' + row.lastname,
                status: 'online',
                chater: '1'
            };

            return Assignpins.findAll({
                attributes: ["pin_id_fk", "faculty_id_fk"],
                where: {
                    faculty_id_fk: row.faculty_id_pk
                }
            }).then(function users(row1) {
                if (row1) {
                    var pin_id = [];
                    row1.forEach(function (row2) {
                        pin_id.push(row2.pin_id_fk);
                    });

                   

                            return Chat.findAll({
                                attributes: ["msg",'sender_id','receiver_id',
                                    [Sequelize.fn('date_format', Sequelize.col('created_date'), '%d-%M-%Y'), 'created_date'],'chater_name'
                                ],
                                where: {
                                    receiver_id:0
                                }
                                // $or: [{sender_id: 0}, {receiver_id: 0}] 
                            }).then(function chat(row4) {
                                if (row4) {
                                    var chat = [];
                                    row4.forEach(function (rows) {
                                        if(rows.chater_name == 2){
                                            return Learner.findOne({
                                                attributes: ["learner_id_pk", "firstname", "lastname", "pin_id_fk"],
                                                where: {
                                                    learner_id_pk: rows.sender_id
                                                }
                                            }).then(function (namelearner) {
            
                                                chat.push({
                                                    msg: rows.msg,
                                                    date: rows.created_date,
                                                    name: rows.chater_name,
                                                    reciever_id: rows.receiver_id,
                                                    sender_id: base64encode(rows.sender_id),
                                                    facultyname:namelearner.firstname
                                                });
                                        });
                                        
                                    } else if(rows.chater_name == 1) {
                                        return Faculty.findOne({
                                            attributes: ["faculty_id_pk", "firstname", "lastname"],
                                            where: {
                                                faculty_id_pk: rows.sender_id
                                            }
                                        }).then(function (namelearner) {
            
                                            chat.push({
                                                msg: rows.msg,
                                                date: rows.created_date,
                                                name: rows.chater_name,
                                                reciever_id: rows.receiver_id,
                                                sender_id: base64encode(rows.sender_id),
                                                facultyname:namelearner.firstname
                                            });
                                    });
                                    }
                                   
                                    });

                                    return Learner.findAll({
                                        attributes: ["learner_id_pk", "firstname", "lastname"],
                                        where: {
                                            pin_id_fk: pin_id
                                        }
                                    }).then(function learners(row3) {
                                        if (row3) {
                                            var lrs = [];
                
                                            row3.forEach(function (rows) {
                                                lrs.push({
                                                    lr_id: base64encode(rows.learner_id_pk),
                                                    lr_name: rows.firstname + ' ' + rows.lastname,
                                                    status: 'online',
                                                    chater:'1'
                                                });
                                            });

                                    return {
                                        faculty: faculty,
                                        learner: lrs,
                                        chat: chat
                                    };
                                    
                                }
                            });
                        }
                    });
                }
            });
        } else {
            return Learner.findOne({
                attributes: ["learner_id_pk", "firstname", "lastname", "pin_id_fk"],
                where: {
                    learner_id_pk: id
                }
            }).then(function (row) {
                if (row) {
                    return Assignpins.findOne({
                        attributes: ["pin_id_fk", "faculty_id_fk"],
                        where: {
                            pin_id_fk: row.pin_id_fk
                        }
                    }).then(function (row1) {
                        return Chat.findAll({
                            attributes: ["msg",'sender_id','receiver_id',
                            [Sequelize.fn('date_format', Sequelize.col('created_date'), '%d-%M-%Y'), 'created_date'],'chater_name'
                        ],
                        where: {
                            receiver_id:0
                        }
                        }).then(function (result) {
                            var chat = [];
                            result.forEach(function (rows) {

                                if(rows.chater_name == 2){
                                return Learner.findOne({
                                    attributes: ["learner_id_pk", "firstname", "lastname", "pin_id_fk"],
                                    where: {
                                        learner_id_pk: rows.sender_id
                                    }
                                }).then(function (namelearner) {

                                    chat.push({
                                        msg: rows.msg,
                                        date: rows.created_date,
                                        name: rows.chater_name,
                                        reciever_id: rows.receiver_id,
                                        sender_id: base64encode(rows.sender_id),
                                        facultyname:namelearner.firstname
                                    });
                            });
                        } else if(rows.chater_name == 1) {
                            return Faculty.findOne({
                                attributes: ["faculty_id_pk", "firstname", "lastname"],
                                where: {
                                    faculty_id_pk: rows.sender_id
                                }
                            }).then(function (namelearner) {

                                chat.push({
                                    msg: rows.msg,
                                    date: rows.created_date,
                                    name: rows.chater_name,
                                    reciever_id: rows.receiver_id,
                                    sender_id: base64encode(rows.sender_id),
                                    facultyname:namelearner.firstname
                                });
                        });
                        }
                            });

                            return Faculty.findOne({
                                attributes: ["faculty_id_pk", "firstname", "lastname"],
                                where: {
                                    faculty_id_pk: row1.faculty_id_fk
                                }
                            }).then(function (facu) {

                                 return Learner.findOne({
                                    attributes: ["learner_id_pk", "firstname", "lastname"],
                                    where: {
                                        learner_id_pk: id
                                    }
                                }).then(function (learnerfaculty) {
                                var faculty = {
                                    faculty_id: base64encode(id),
                                    faculty_name: facu.firstname + '' + facu.lastname,
                                    learner_faculty : learnerfaculty.firstname+''+learnerfaculty.lastname,
                                    status: 'online',
                                    chater: '2'
                                };

                                return Learner.findAll({
                                    attributes: ["learner_id_pk", "firstname", "lastname"],
                                    where: {
                                        pin_id_fk: row.pin_id_fk
                                    }
                                }).then(function (pin) {
                                    var lrs = [];
                                    pin.forEach(function (rows) {
                                        lrs.push({
                                            lr_id: base64encode(rows.learner_id_pk),
                                            lr_name: rows.firstname + ' ' + rows.lastname,
                                            status: 'online',
                                        });
                                    });
                                    return {
                                        faculty: faculty,
                                        learner: lrs,
                                        chat: chat
                                    };
                                });
                            });
                        });

                        });
                    });
                }
            });
        }
    });
};

var fetch_msg = function (sender_id, receiver_id) {
    return Chat.findAll({
        attributes: ["sender_id", "receiver_id", "msg", [Sequelize.fn('date_format', Sequelize.col('created_date'), '%d-%M-%Y'), 'created_date'],"chater_name"],
        where: {
            sender_id: [sender_id, receiver_id],
            receiver_id: [receiver_id, sender_id]
        }
    }).then(function msg(result) {
        var template = "";
        template += "<ul class='group-msg'>";
        var li = [];
        result.forEach(function (row) {
            // li.push("<li class='" + (row.sender_id == sender_id ? "replies" : "sent") + "'><p>"+ (row.sender_id == sender_id ? "<span class='replies-span'>You:</span>" : "<span class='replies-span replies-span"+row.chater_name+"'>:</span>") + row.msg + "</p></li>");
            li.push("<li class='" + (row.sender_id == sender_id ? "replies" : "sent") + "'><p>" + row.msg + "</p></li>");
        });
        template += li.join("") + "</ul>";

        return template;
    });
};

router.get('/chat', function (req, res, next) {
    var id = base64decode(req.query.id);
    findUser(id, '0').then(function (result) {
        res.render('home', {
            faculty: result.faculty,
            learner: result.learner,
            chat: result.chat,
            user : req.query.id
        });
    });
});

router.get('/msg', function (req, res) {
    var msg = req.query.msg;
    var sender_id = base64decode(req.query.sender_id);
    var receiver_id = base64decode(req.query.receiver_id);
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    
    Chat.create({
        sender_id: sender_id,
        receiver_id: receiver_id,
        msg: msg,
        created_date: date,
        chater_name: req.query.name
    }).then(function (users) {
        if (users) {
            fetch_msg(sender_id, receiver_id).then(function (result) {
                res.json({
                    message: result
                });
            });
        } else {
            res.status(400).send('Error in insert new record');
        }
    });
});


router.post('/users', function (req, res) {

    var sender_id = base64decode(req.body.sender_id);
    var receiver_id = base64decode(req.body.receiver_id);

    fetch_msg(sender_id, receiver_id).then(function (result) {
        res.json({
            message: result
        });
    });
});



module.exports = router;