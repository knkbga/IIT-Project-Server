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
            var top_scorers_sorted_list = sort_top_list_scorers(scorers.top_scorers);
            callback({
                'response': "Successfully got the list.",
                'top_scorers': top_scorers_sorted_list,
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

// push users new entry to users score, to be performed always
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
        push_user_users_scores(score_find_instance, scores_api_object,function(response){
            if(response.function_success) {
                check_for_leaderboard_position(scores_api_object._id, scores_api_object);
            }
        });
    });
};


/*
------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                 Functions for top_scorers
------------------------------------------------------------------------------------------------------------------------------------------------------------
*/


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
        if(no user present in toppers list or the number of users is less than 5){
            add a new entry
        } else if (any user/users present){
            if(his/her score qualifies the minimum requirement of the score) {
                add the user to the list
                after adding the user remove the user having lowest score
            } else {
                you are not eligible
            }
        }
    */
    scores.findOne({},function(err,scores_find_instance) {
        // if ( no user present in toppers list )
        if( scores_find_instance.top_scorers.length < 5 ) {
            push_user_top_scorer(scores_find_instance,_id,entry,function(response){

            });
        } else {
            // if(his/her score qualifies the minimum requirement of the score)
            var is_eligible_return_obj = is_eligible(scores_find_instance.top_scorers,entry);
            console.log("In ELSE \n\tis_eligible_return_obj:\t"+JSON.stringify(is_eligible_return_obj));
            if (is_eligible_return_obj.valid) {
                //if the users are exceeding 5 members then delete the user_to_be_deleted
                push_user_top_scorer(scores_find_instance,_id,entry,function(response){
                    if(response.function_success) {
                        scores_find_instance.top_scorers.pull({ _id: is_eligible_return_obj.user_to_be_removed_id });
                        scores_find_instance.save(function(err,updated_topser_list_instance){
                            if(err) {
                                if (Globals.debug)
                                    console.log("\nUser to be deleted couldn't be deleted");
                            } else {
                                if (Globals.debug)
                                    console.log("\nUser to be deleted deleted successfully");
                            }
                        });
                    }
                });

            }
        }
    });
};

function is_eligible(scorers,entry) {
    var minimum_user_score = 1000; // to get the user whose score is less than the new_user and has the lowest score among all also
    var user_to_be_removed_id;
    var valid = false; // to indicate validity of user to be added.
    var users_encountered = 0;
    scorers.forEach(function(scorer){
        users_encountered++;
        if (scorer.score <= entry.game_score && scorer.score <= minimum_user_score) {
            valid = true;
            minimum_user_score = scorer.score;
            user_to_be_removed_id = scorer._id;
        }
    });
    return ({
        valid: valid,
        user_to_be_removed_id: user_to_be_removed_id
    });
}

// add new user to top_scorers list
function push_user_top_scorer(scores_find_instance,_id,entry,callback) {
    var new_top_scorer = {
      user_id: _id,
      user_name: entry.name,
      score: entry.game_score,
    };
    scores_find_instance.top_scorers.push(new_top_scorer);
    scores_find_instance.save(function(err,new_top_scorer_save_instance) {
      if(err) {
          if (Globals.debug)
              console.log("\nSome error occurred while adding new user to top_scorers, no user was present");
          callback({
              function_success: false
          })
      } else {
          if (Globals.debug)
              console.log("\nNo user was present so user added to top_scorers");
          callback({
              function_success: true
          })
      }
    });
}

function sort_top_list_scorers(top_scorers) {
    top_scorers.sort(function(a, b){
        return a.score-b.score;
    });
    return top_scorers;
}


/*
------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                Functions for users_scorers
------------------------------------------------------------------------------------------------------------------------------------------------------------
*/


function push_user_users_scores(score_find_instance,scores_api_object,callback) {
    var function_success = false;
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
            callback({
                function_success: false
            })
        } else {
            if (Globals.debug)
                console.log("\nUser added to users_scores successfully");
            callback({
                function_success: true
            })
        }
    });
}
