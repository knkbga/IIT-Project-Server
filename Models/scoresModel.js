var mongoose = require('mongoose');
var userModel = require('./userModel');

var ObjectId = mongoose.Schema.Types.ObjectId;


var top_scorers_schema = mongoose.Schema({
    user_name: String,
    user_id: {
        type: ObjectId,
        ref: "userModel"
    },
    score: Number,
});

var users_scores_schema = mongoose.Schema({
    user_name: String,
    user_id: {
        type: ObjectId,
        ref: "userModel"
    },
    scores: [{
        session_token: ObjectId,
        end_session: String,
        score: Number
    }],
});

var scoresSchema = mongoose.Schema({
    top_scorers: [
        top_scorers_schema
    ],
    users_scores: [
        users_scores_schema
    ],
});

module.exports = mongoose.model('score', scoresSchema, "scores_data");
