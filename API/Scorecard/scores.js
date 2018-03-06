var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var users = require('../../Models/userModel');
var scores = require('../../Models/scoresModel');
var Globals = require('../../Globals/variables');
var utils = require('../../Globals/utils');

exports.check_for_leaderboard_position = function (_id, entry, callback) {
    scores.findOne({}).exec(function (err, scorers) {
        if (utils.check_if_null_or_undefined(scorers.top_scorers)) {
            var suitable_position = 0 // returns 1000+ if not suitable
            scorers.top_scorers = [];
            scorers.top_scorers[suitable_position] = {};
            scorers.top_scorers[suitable_position]["user_id"] = _id;
            scorers.top_scorers[suitable_position]["rank"] = suitable_position + 1;
            scorers.top_scorers[suitable_position]["score"] = entry.game_score;
            scorers.save(function (err, model) {
                if (!utils.check_if_null_or_undefined(model)) {
                    if (Globals.debug) {
                        console.log("\nSuccessfully updated to new position of rank:\t" + (suitable_position + 1));
                    }
                    callback({
                        'response': "Successfully updated to new position of rank " + (suitable_position + 1),
                        'rank': (suitable_position + 1),
                        'success': true
                    });
                } else {
                    if (Globals.debug) {
                        console.log("\nSome error occured while adding to position :\t1");
                    }
                    callback({
                        'response': "Some error occured while adding to position : 1",
                        'success': false
                    });
                }
            });
        } else {
            var suitable_position = suitable_position_leaderboard(entry, scorers.top_scorers); // returns 1000+ if not suitable
            if (suitable_position <= scorers.top_scorers.length) {
                scorers.top_scorers[suitable_position] = {};
                scorers.top_scorers[suitable_position]["user_id"] = _id;
                scorers.top_scorers[suitable_position]["rank"] = suitable_position + 1;
                scorers.top_scorers[suitable_position]["score"] = entry.game_score;
                scorers.save(function (err, model) {
                    if (!utils.check_if_null_or_undefined(model)) {
                        if (Globals.debug) {
                            console.log("\nSuccessfully updated to new position of rank:\t" + (suitable_position + 1));
                        }
                        callback({
                            'response': "Successfully updated to new position of rank " + (suitable_position + 1),
                            'rank': (suitable_position + 1),
                            'success': true
                        });
                    } else {
                        if (Globals.debug) {
                            console.log("\nSome error occured while adding to position :\t" + (suitable_position + 1));
                        }
                        callback({
                            'response': "Some error occured while adding to position :" + (suitable_position + 1),
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
    scores.find({}, function (err, instance) {
        if (utils.check_if_null_or_undefined(instance)) {} else {
            if (utils.check_if_null_or_undefined(instance.users_scores)) {
                instance.users_scores = [];
            }
            instance = instance.users_scores;
            if (utils.check_if_null_or_undefined(instance)) { // not found any user, create a new
                var score = new scores({
                    user_id: {
                        type: scores_api_object._id,
                        ref: "userModel"
                    },
                    scores: [{
                        session_token: scores_api_object.session_token,
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
    scores.find({}, function (err, instance) {
        if (!utils.check_if_null_or_undefined(instance)) {
            instance.users_scores.push(entry);
            instance.save(function (err, instance) {
                if (err) {
                    callback({
                        success: false,
                        response: "Error in updation"
                    });
                    if (Globals.debug)
                        console.log("\nError found");
                } else {
                    callback({
                        success: true
                    });
                    if (Globals.debug)
                        console.log("\nSuccess");
                }
            });
        } else {

        }
    });
};

//Functions for scores.js

function suitable_position_leaderboard(entry, scorers) {
    entry.rank = scorers.length + 1000; // set to max 
    position_to_be_updated = entry.rank;
    scorers.forEach(function (scorer) {
        if (entry.score > scorer.score && entry.rank > scorer.rank) { // to find the best position for new entry
            entry.rank = scorer.rank;
            position_to_be_updated = scorer.rank;
        }
    });
    return (position_to_be_updated - 1);
}
