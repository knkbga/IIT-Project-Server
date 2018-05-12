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
check_for_leaderboard_position = function (_id, entry) {
    // _id: id of the user to be entered,
    /*entry= {"set":1,
        "session_token":"f5f2867240d1ce9f3b141f5df5d330e446abfff413d468f87f257b5394b0d43849ef0901e64d3f3e0dd8156cd46ad6a6ec2742923b3d1fa3e4cd97c84c85ae63",
        "start_session":"17-03-2018 at 09:55:55",
        "end_session":"17-03-2018 at 09:56:26",
        "game_score":5,
        "name":"Kanak Bagga",
        "json_entry":[{
            "individual_event_score":0,
            "time_of_start":"17-03-2018 at 09:55:55",
            "string_question":"765359",
            "level":6,
            "time_of_submission":"17-03-2018 at 09:56:05",
            "string_answer":"",
            "lives_till_used":1,
            "total_volume":"5-5-5-5-5-5",
            "success":"false"
        },{...},{...}
        ]}*/
    /*
        if(no user present in toppers list){
            add a new entry
        } else if (any user/users present){
            if(user already present) {
                if(his/her previous score is better ){
                    remove its previous score and add the new
                } else {
                    he is already in the list. HE has to score better than previous
                }
            } else {
                if(his/her score qualifies the minimum requirement of the score) {
                    add the user to the list
                    after adding the user remove the user having lowest score
                } else {
                    you are not eligible
                }
            }
        }
    */
    scores.findOne({},function(err,scores_find_instance) {
        // if ( no user present in toppers list )
        if( scores_find_instance.top_scorers.length == 0 ) {
            push_user_top_scorer(scores_find_instance,_id,entry);
        } else {
            // if(user already present)
            if( scores_find_instance.top_scorers.id(_id) != null ) {
                //remove its previous score and add the new
                update_user_top_scorer(scores_find_instance,_id,entry);
            } else {
                // if(his/her score qualifies the minimum requirement of the score)
                var eligibility_criteria_obj = eligibility_criteria(entry,scores_find_instance.top_scorers);
                var valid = eligibility_criteria_obj.valid;
                var scorer_to_be_removed = eligibility_criteria_obj.scorer_to_be_removed;
                if(valid) {
                    var rank = find_rank(scores_find_instance.top_scorers,entry);
                    push_user_top_scorer(scores_find_instance,_id,entry,rank,scorer_to_be_removed);
                }
            }
        }
    });
};

exports.push_entry_for_users_scores = function (scores_api_object) {
/*
    scores_api_object: {
        "_id":"5adf2c681ed8ac6649f3efb5",
        "name":"Kanak Bagga",
        "session_token":"4d741855f15a1afc462d70370da82dd0c819dd22edf16509ab920edb4328cc7020bd394567a4042a3cbe6cc93bec9fad36a8bd7e5d4c270209fa86dad5ec11b4",
        "end_session":"17-03-2018 at 09:56:26",
        "game_score":12
    }
    push new score to existing record (existing record is a mandatory condition as the it gets created during registration)
*/
    scores.findOne({},function(err,score_find_instance){
        push_user_users_scores(score_find_instance, scores_api_object);
    });
};

//Functions for scores.js

function eligibility_criteria(entry, scorers) {
    var valid = false;
    var scorer_to_be_removed;
    var scorer_to_be_removed_score = 1000;//set to max
    if(scorers.length < 5 ) {
        valid = true;
    } else {
        scorers.forEach(function (scorer) {
            if (entry.game_score > scorer.score) { // condition for updation
                console.log("encountered scorer with less score")
                valid = true;
                if(scorer.score < scorer_to_be_removed_score) {
                   scorer_to_be_removed = scorer.used_id;
                }
            }
        });
    }
    return {valid:valid,scorer_to_be_removed:scorer_to_be_removed};
}

function find_rank(scorers,entry) {
    /*
    if(top_scorers.length==0) {
        return 1;
    } else {
        itertate and find how many scores are having great score than the score of the user to be added
    }
    */
    if(scorers.length==0) {
        return 1;
    } else {
        var max_rank;
        if(scorers.length < 5)
            max_rank = scorers.length+1;
        else
            max_rank = scorers.length;
        console.log("max rank set to "+max_rank);
        scorers.forEach(function (scorer) {
            if (entry.game_score > scorer.score) {
                max_rank = max_rank - 1;
                console.log("encountered scorer with less score")
            }
        });
        console.log("rank set to "+max_rank);
        return max_rank;
    }
};

function push_user_users_scores(score_find_instance,scores_api_object) {
    var add_score = {
        session_token: scores_api_object.session_token,
        end_session: scores_api_object.end_session,
        score: scores_api_object.game_score
    };
    score_find_instance.users_scores.id(scores_api_object._id).scores.push(add_score);
    score_find_instance.save(function(err,score_add_instance){
        if(err) {
            if (Globals.debug)
                console.log("\nSome error occurred while adding users score to users_scores");
        } else {
            if (Globals.debug)
                console.log("\nNo user was present so user added to users_scores");
            check_for_leaderboard_position(scores_api_object._id,scores_api_object);
        }
    });
}

function push_user_top_scorer (scores_find_instance,_id,entry,rank,scorer_to_be_removed) {
    var new_top_scorer = {
        user_id: _id,
        _id: _id,
        user_name: entry.name,
        score: entry.game_score,
        rank: rank
    };
    // rank of other users increased
    if(scores_find_instance.top_scorers.length == 5) {
        scores_find_instance.top_scorers.pull(scorer_to_be_removed);
    }
    scores_find_instance.top_scorers.push(new_top_scorer);
    scores_find_instance.save(function(err,new_top_scorer_save_instance) {
        if(err) {
            if (Globals.debug)
                console.log("\nSome error occurred while adding new user to top_scorers, no user was present");
        } else {
            if (Globals.debug)
                console.log("\nNo user was present so user added to top_scorers");
        }
    });
}

function update_user_top_scorer (scores_find_instance,_id,entry) {
    if(scores_find_instance.top_scorers.id(_id).score < entry.game_score) {
        scores_find_instance.top_scorers.id(_id).score = entry.game_score;
        scores_find_instance.save(function(err,score_change_instance) {
            if(err) {
                if (Globals.debug)
                    console.log("\nSome error occurred while updating the score");
            } else {
                if (Globals.debug)
                    console.log("\nScore of existing user updated");
            }
        });
    // he is already in the list. HE has to score better than previous
    } else {
        if(err) {
            if (Globals.debug)
                console.log("\nScored bad than previous score");
        } else {
            if (Globals.debug)
                console.log("\nScored bad than previous score, no change made");
        }
    }
}
