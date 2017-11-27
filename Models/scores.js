var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');

var scoresSchema = mongoose.Schema({
    top_scorers: [
        {
            user_id: ObjectId,
            rank: Number,
            score: Number,
        }
    ],
    users_scores: [
        {
            user_id: ObjectId,
            score: Number,
        }
    ]
});

module.exports = mongoose.model('scores', scoresSchema, "scores_data");
