var mongoose = require('mongoose');
var Async = require('async');
var ObjectId = require('mongodb').ObjectID;
var users = require('../../Models/userModel');
var score = require('../../Models/scoresModel');
var Globals = require('../../Globals/variables');
var utils = require('../../Globals/utils');
var scores_api = require('../../API/Scorecard/scores');

exports.session = function (w_wo, _id, entry, callback) {
    if (Globals.debug) {
        console.log("\n" + "entry :\t" + JSON.stringify(entry));
        console.log("\ngame_score:\t\t" + entry.game_score);
    }

    var set = "set_" + entry.set;
    if (w_wo == 3) //Without Distraction
    {
        users.findOne({
            _id: ObjectId(_id)
        }).exec(
            function (err, instance) {

                instance.comprehensive_events.id(entry.session_token).set({
                    "end_session": entry.json_entry[entry.json_entry.length - 1].time_of_submission
                });

                instance.comprehensive_events.id(entry.session_token)[set].scores.WO_Distraction = entry.game_score;

                //enter the score for current user to Scores Model
                var scores_api_object = {
                    _id: _id,
                    name: entry.name,
                    session_token: entry.session_token,
                    end_session: entry.end_session,
                    game_score: entry.game_score
                }
                scores_api.push_entry_for_users_scores(scores_api_object);

                for (var i = 0; i < entry.json_entry.length; i++) {
                    instance.comprehensive_events.id(entry.session_token)[set].WO_Distraction.push(entry.json_entry[i]);
                }
                instance.save(function (err, model) {
                    if (err) {
                        callback({
                            res: false,
                            response: "Error in updation"
                        });
                        if (Globals.debug)
                            console.log(callback);
                    } else {
                        callback({
                            res: true,
                            w_id: model._id
                        });
                        if (Globals.debug)
                            console.log(callback);
                    }
                });
            }
        );
    } else if (w_wo == 0) //Audio Only
    {
        users.findOne({
            _id: ObjectId(_id)
        }).exec(
            function (err, instance) {

                instance.comprehensive_events.id(entry.session_token).set({
                    "end_session": entry.json_entry[entry.json_entry.length - 1].time_of_submission
                });

                instance.comprehensive_events.id(entry.session_token)[set].scores.Audio = entry.game_score;

                //enter the score for current user to Scores Model
                var scores_api_object = {
                    _id: _id,
                    name: entry.name,
                    session_token: entry.session_token,
                    end_session: entry.end_session,
                    game_score: entry.game_score
                }
                scores_api.push_entry_for_users_scores(scores_api_object);

                for (var i = 0; i < entry.json_entry.length; i++) {
                    instance.comprehensive_events.id(entry.session_token)[set].Audio.push(entry.json_entry[i]);
                }
                instance.save(function (err, model) {
                    if (err) {
                        callback({
                            res: false,
                            response: "Error in updation"
                        });
                        if (Globals.debug)
                            console.log(callback);
                    } else {
                        callback({
                            res: true,
                            w_id: model._id
                        });
                        if (Globals.debug)
                            console.log(callback);
                    }
                });
            }
        );
    } else if (w_wo == 1) //Visual Only
    {
        users.findOne({
            _id: ObjectId(_id)
        }).exec(
            function (err, instance) {

                instance.comprehensive_events.id(entry.session_token).set({
                    "end_session": entry.json_entry[entry.json_entry.length - 1].time_of_submission
                });

                instance.comprehensive_events.id(entry.session_token)[set].scores.Visual = entry.game_score;

                //enter the score for current user to Scores Model
                var scores_api_object = {
                    _id: _id,
                    name: entry.name,
                    session_token: entry.session_token,
                    end_session: entry.end_session,
                    game_score: entry.game_score
                }
                scores_api.push_entry_for_users_scores(scores_api_object);

                for (var i = 0; i < entry.json_entry.length; i++) {
                    instance.comprehensive_events.id(entry.session_token)[set].Visual.push(entry.json_entry[i]);
                }
                instance.save(function (err, model) {
                    if (err) {
                        callback({
                            res: false,
                            response: "Error in updation"
                        });
                        if (Globals.debug)
                            console.log(callback);
                    } else {
                        callback({
                            res: true,
                            w_id: model._id
                        });
                        if (Globals.debug)
                            console.log(callback);
                    }
                });
            }
        );
    } else if (w_wo == 2) //With Distraction And Gaming
    {
        users.findOne({
            _id: ObjectId(_id)
        }).exec(
            function (err, instance) {

                instance.comprehensive_events.id(entry.session_token).set({
                    "end_session": entry.json_entry[entry.json_entry.length - 1].time_of_submission
                });

                instance.comprehensive_events.id(entry.session_token)[set].scores.W_Distraction = entry.game_score;

                //enter the score for current user to Scores Model
                var scores_api_object = {
                    _id: _id,
                    name: entry.name,
                    session_token: entry.session_token,
                    end_session: entry.end_session,
                    game_score: entry.game_score
                }
                scores_api.push_entry_for_users_scores(scores_api_object);

                for (var i = 0; i < entry.json_entry.length; i++) {
                    instance.comprehensive_events.id(entry.session_token)[set].W_Distraction.push(entry.json_entry[i]);
                }
                instance.save(function (err, model) {
                    if (err) {
                        callback({
                            res: false,
                            response: "Error in updation"
                        });
                        if (Globals.debug)
                            console.log(callback);
                    } else {
                        callback({
                            res: true,
                            w_id: model._id
                        });
                        if (Globals.debug)
                            console.log(callback);
                    }
                });
            }
        );
    }
}
exports.new_session = function (_id, entry, session_token, callback) {
    users.findByIdAndUpdate(_id, {
            $push: {
                "comprehensive_events": entry
            }
        }, {
            safe: true,
            upsert: true,
            new: true
        },
        function (err, model) {
            if (err) {
                callback({
                    success: false,
                    response: "Some error occured."
                });
                if (Globals.debug)
                    console.log("\nSome error ocurred");
            } else {
                callback({
                    success: true,
                    session_token: session_token
                });
                if (Globals.debug)
                    console.log("\nSuccesfully updated");
            }
        });
}
