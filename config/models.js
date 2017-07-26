var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;
 
var userSchema = mongoose.Schema({
        "person_credentials" :
        {
            "dob":String,
            "jeeRollNumber":String,
            "status" : String,
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
                ],
                "Visual" :
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
                "Audio" :
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

mongoose.connect('mongodb://mzf:1Direction@ds129422.mlab.com:29422/muzaffarnagar');
//mongoose.connect('mongodb://localhost/test');
module.exports = mongoose.model('users', userSchema);