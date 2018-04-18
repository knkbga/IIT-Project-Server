var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var users = require('../../Models/userModel');
var scores = require('../../Models/scoresModel');
var Globals = require('../../Globals/variables');
var utils = require('../../Globals/utils');

exports.get_top_scorers = function (callback) {
    scores.findOne({}, function (err, scorers) {
        console.log(utils.check_if_null_or_undefined(scorers));
        if (!utils.check_if_null_or_undefined(scorers)) {
            if (Globals.debug) {
                console.log("\nSuccessfully got the list of top scorers:\t" + JSON.stringify(scorers.top_scorers));
            }
            callback({
                'response': "Successfully got the list.",
                'top_scorers': scorers.top_scorers,
                'success': true
            });
        } else {
            if (Globals.debug) {
                console.log("\nSuccessfully got the list of top scorers:\t" + JSON.stringify(scorers.top_scorers));
            }
            callback({
                'response': "Couldn't find the list. Setting the list as empty.",
                'top_scorers': [],
                'success': false
            });
        }
    });
};

// Function to update top_scorers list
exports.check_for_leaderboard_position = function (_id, entry, callback) {
    scores.findOne({}).exec(function (err, scorers) {
        // if no user is found user is eligible for top_scorers list
        if (utils.check_if_null_or_undefined(scorers.top_scorers)) {
            scorers.top_scorers = [];
            var new_top_scorer = {
                user_id: _id,
                score: entry.game_score
            };
            scorers.top_scorers.push(new_top_scorer);
            scorers.save(function (err, model) {
                if (!utils.check_if_null_or_undefined(model)) {
                    if (Globals.debug) {
                        console.log("\nSuccessfully added the user to top_scorers list");
                    }
                    callback({
                        'response': "Successfully added the user to top_scorers list",
                        'success': true
                    });
                } else {
                    if (Globals.debug) {
                        console.log("\nSome error occured while adding the user");
                    }
                    callback({
                        'response': "Some error occured while adding the user",
                        'success': false
                    });
                }
            });
        } else { // if the top_scorers list is not empty
            // if the suitable position is available
            if (is_eligible(entry, scorers.top_scorers)) {
                //check if the user is already in the list
                //find the index of the user with same user_id
                var removeIndex = scorers.top_scorers.map(function(item) { return item.user_id; }).indexOf(_id);
                // remove the user to avoid inconsistency
                scorers.top_scorers = scorers.top_scorers.splice(removeIndex, 1);

                var new_top_scorer = {
                    user_id: _id,
                    score: entry.game_score
                };
                scorers.top_scorers.push(new_top_scorer);
                scorers.save(function (err, model) {
                    if (!utils.check_if_null_or_undefined(model)) {
                        if (Globals.debug) {
                            console.log("\nSuccessfully added the user to top_scorers list");
                        }
                        callback({
                            'response': "Successfully added the user to top_scorers list",
                            'success': true
                        });
                    } else {
                        if (Globals.debug) {
                            console.log("\nSome error occured while adding the user");
                        }
                        callback({
                            'response': "Some error occured while adding the user",
                            'success': false
                        });
                    }
                });
            } else {
                if (Globals.debug) {
                    console.log("\nNo suitable position found in leaderboard");
                }
                callback({
                    'response': "No suitable position found in leaderboard",
                    'success': false
                });
            }
        }
    });
};

exports.push_entry_for_users_scores = function (scores_api_object, callback) {
    scores.find({_id:scores_api_object._id}, function (err, instance) {
        if (utils.check_if_null_or_undefined(instance)) {} else {
            if (utils.check_if_null_or_undefined(instance.users_scores)) {
                instance.users_scores = [];
            }
            if (utils.check_if_null_or_undefined(instance)) { // not found any user, create a new
                instance = instance.users_scores;
                var score = new scores({
                    user_id: {
                        type: scores_api_object._id,
                        ref: "userModel"
                    },
                    scores: [{
                        session_token: scores_api_object.session_token,
                        name: scores_api_object.name,
                        end_session: scores_api_object.end_session,
                        score: scores_api_object.game_score
                    }]
                });
                score.save(function (err, new_instance) {
                    if (utils.check_if_null_or_undefined(new_instance)) { // instance couldn't be saved
                        // TODO: Decide what to be done when the instance is not saved.
                        if (Globals.debug)
                            console.log("\nCouldn't add new entry to users_score");
                        callback({
                            'response': "Some error occured while creating new",
                            success: false
                        });
                    } else {
                        // TODO: Decide what to be done when the instance is saved.
                        if (Globals.debug)
                            console.log("\nSuccessfully added new entry to users_score");
                        callback({
                            'response': "Sucessfully Added",
                            success: true
                        });
                    }
                });
            } else { // found an existing user
                var score = {
                    session_token: scores_api_object.session_token,
                    name: scores_api_object.name,
                    end_session: scores_api_object.end_session,
                    score: scores_api_object.game_score
                };
                instance.users_scores.push(score);
                instance.save(function (err, new_instance) {
                    if (utils.check_if_null_or_undefined(new_instance)) {
                        if (Globals.debug)
                            console.log("\nCouldn't add entry to users_score to existing user");
                        callback({
                            'response': "Some error occured while pushing the scores in existing user",
                            success: false
                        });
                    } else {
                        if (Globals.debug)
                            console.log("\nSuccessfully added entry to users_score to existing user");
                        callback({
                            'response': "Successfully added the entry to existing user",
                            success: true
                        });
                    }
                });
            }
        }
    });
};

//Functions for scores.js

function is_eligible(entry, scorers) {
    var valid = false;
    if(scorers.length == 0) {
        valid = true;
    } else {
        scorers.forEach(function (scorer) {
            if (entry.game_score > scorer.score) { // condition for updation
                vaild = true;
            }
        });
    }
    return valid;
}
