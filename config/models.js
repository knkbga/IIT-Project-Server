var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;
 
var userSchema = mongoose.Schema({
        "person_credentials" :
        {
            "salt"  : String,
            "token" : String,
            "name"  : String,
            "email" : String,
            "phone" : Number,
            "hashed_password" : String
        },
        "comprehensive_events":
        {
            "WO_Distraction" :
            [
                {
                    "start_session": String,
                    "end_session":String,
                    "point_end":Number,
                    "different_events":
                    [
                        {
                            "string_answer" : String,
                            "string_question" : String,
                            "time_of_start" : String,
                            "time_of_end" : String,
                            "level" : Number,
                            "success" : Boolean,
                            "time_of_submission" : String
                        }
                    ]
                }
            ],
            "W_Distraction" :
            [
                {
                    "start_session" : String,
                    "end_session" : String,
                    "point_end" : Number,
                    "different_events":
                    [
                        {
                            "string_answer" : String,
                            "string_question" : String,
                            "time_of_start" : String,
                            "time_of_end" : String,
                            "level" : Number,
                            "success" : Boolean,
                            "time_of_submission" : String
                        }
                    ]
                }
            ],
            "Gaming" :
            {
                "WO_Distraction" : 
                [
                    {
                        "start_session" : String,
                        "end_session" : String,
                        "point_end" : Number,
                        "different_events":
                        [
                            {
                                "string_answer" : String,
                                "string_question" : String,
                                "lives_till_used" : Number,
                                "time_of_start" : String,
                                "time_of_end" : String,
                                "level ": Number,
                                "success" : Boolean,
                                "time_of_submission" : String
                            }
                        ]
                    }
                ],
                "W_Distraction" :
                [
                    {
                        "start_session" : String,
                        "end_session" : String,
                        "point_end" : Number,
                        "different_events":
                        [
                            {
                                "string_answer" : String,
                                "string_question" : String,
                                "lives_till_used" : Number,
                                "time_of_start" : String,
                                "time_of_end" : String,
                                "level ": Number,
                                "success" : Boolean,
                                "time_of_submission" : String
                            }
                        ]
                    }
                ]
            }
        }
    });

mongoose.connect('mongodb://knkbga:1Direction@ds129050.mlab.com:29050/survey');
module.exports = mongoose.model('users', userSchema);