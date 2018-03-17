var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var user = require('../../Models/userModel');
var score = require('../../Models/scoresModel');
var Globals = require('../../Globals/variables');
var utils = require('../../Globals/utils');
var ObjectId = require('mongodb').ObjectID;

exports.register = function (entry, callback) {
    if (Globals.debug)
        console.log("\nIn register.js");
    var email = entry.email;
    var app_code = entry.app_code;
    var password = entry.password;

    if (app_code == "iit") {
        if (!(email.indexOf("@") == email.length)) {
            if (password.length > 4) {
                var temp = rand(160, 36);
                var newpass = temp + password;
                var token = crypto.createHash('sha512').update(email + rand).digest("hex");
                var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

                var newuser = new user({
                    "person_credentials": {
                        "token": token,
                        "dob": entry.dob,
                        "jeeRollNumber": entry.jeeRollNumber,
                        "jeeTotalScore": entry.jeeTotalScore,
                        "jeePhysicsScore": entry.jeePhysicsScore,
                        "jeeMathsScore": entry.jeeMathsScore,
                        "jeeChemistryScore": entry.jeeChemistryScore,
                        "status": "active",
                        "institute": entry.institute,
                        "gender": entry.gender,
                        "grade_10": entry.grade_10,
                        "temp_str": "",
                        "salt": temp,
                        "token": entry.token,
                        "name": entry.name,
                        "email": entry.email,
                        "phone": entry.phone,
                        "hashed_password": hashed_password
                    }
                });

                // To check if the collection exists
                mongoose.connection.db.listCollections({
                    name: 'scores_data'
                }).next(function (err, collinfo) {
                    if (collinfo) {
                        // Found
                        if (Globals.debug)
                            console.log("\nScores model collection found");
                    } else {
                        if (Globals.debug)
                            console.log("\nScores model collection not found");
                        scores_data = new score({
                            top_scorers: [
                            ],
                            users_scores: [
                            ],
                        });
                        scores_data.save(function (err, instance) {
                            if (instance.length != 0) {
                                if (Globals.debug)
                                    console.log("\nScores model initiated");
                            }
                            //TODO:  
                        });
                    }
                });

                user.find({
                    'person_credentials.email': email
                }, function (err, users) {
                    var len = users.length;
                    if (len == 0) {
                        newuser.save(function (err, new_user_instance) {
                            if (new_user_instance.length != 0) {
                                if (Globals.debug)
                                    console.log("\nSucessfully Registered");

                                score.findOne({}).exec(function (err, instance_score) {
                                    if (instance_score.length != 0) {
                                        var newscore = {
                                            name: entry.name,
                                            user_id: new_user_instance._id,
                                            scores: [],
                                        };
                                        instance_score.users_scores.push(newscore);
                                        instance_score.save(function (err, model) {
                                            if (err) {
                                                // TODO: Decide what to do.
                                                /*callback({
                                                    res: false,
                                                    response: "Error in updation"
                                                });*/
                                                if (Globals.debug)
                                                    console.log("\nError found");
                                            } else {
                                                // TODO: Decide what to do.
                                                /*callback({
                                                    res: true,
                                                    w_id: model._id
                                                });*/
                                                if (Globals.debug)
                                                    console.log("\nSuccess");
                                            }
                                        });
                                    }
                                });

                                callback({
                                    'response': "Sucessfully Registered",
                                    success: true
                                });
                            } else {
                                //TODO: New user could not be saved
                            }
                        });
                    } else {
                        if (Globals.debug)
                            console.log("\nEmail already Registered");
                        callback({
                            'response': "Email already Registered",
                            success: false
                        });
                    }
                });
            } else {
                if (Globals.debug)
                    console.log("\nPassword Weak");
                callback({
                    'response': "Password Weak",
                    success: false
                });
            }
        } else {
            if (Globals.debug)
                console.log("\nEmail Not Valid");
            callback({
                'response': "Email Not Valid",
                success: false
            });
        }
    } else {
        if (Globals.debug)
            console.log("\nYour app is outdated");
        callback({
            'response': "Your app is outdated",
            success: false
        });
    }
}
