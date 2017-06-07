var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;
 
var userSchema = mongoose.Schema({
        "person_credentials" :
        {
            "institute" : String,
            "test_rank" : Number,
            "gender" : String,
            "age" : Number,
            "grade_10" : Number,
            "sleep_hours" : Number,
            "temp_str" : String,
            "salt"  : String,
            "token" : String,
            "name"  : String,
            "email" : String,
            "phone" : Number,
            "hashed_password" : String
        },
        "comprehensive_events":
        {
            "trials":
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
                                "lives_till_used" : Number,
                                "set_number": Number ,
                                "string_answer" : String,
                                "string_question" : String,
                                "time_of_start" : String,
                                "time_of_end" : String,
                                "level" : Number,
                                "success" : String,
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
                                "lives_till_used" : Number,
                                "set_number": Number ,
                                "string_answer" : String,
                                "string_question" : String,
                                "time_of_start" : String,
                                "time_of_end" : String,
                                "level" : Number,
                                "success" : String,
                                "time_of_submission" : String
                            }
                        ]
                    }
                ]
            },
            "gaming" :
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
                                "set_number": Number,
                                "string_answer" : String,
                                "string_question" : String,
                                "lives_till_used" : Number,
                                "time_of_start" : String,
                                "time_of_end" : String,
                                "level ": Number,
                                "success" : String,
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
                                "set_number": Number,
                                "string_answer" : String,
                                "string_question" : String,
                                "lives_till_used" : Number,
                                "time_of_start" : String,
                                "time_of_end" : String,
                                "level ": Number,
                                "success" : String,
                                "time_of_submission" : String
                            }
                        ]
                    }
                ]
            }
        }
    });

//mongoose.connect('mongodb://knkbga:1Direction@ds129050.mlab.com:29050/survey');
mongoose.connect('mongodb://localhost/test');
module.exports = mongoose.model('users', userSchema);