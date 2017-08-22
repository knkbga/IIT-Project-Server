var userSchema = mongoose.Schema({
        "person_credentials" :
        {
            "dob":String,
            "jeeRollNumber":String,
            "jeeTotalScore":String,
            "jeePhysicsScore":String,
            "jeeMathsScore":String,
            "jeeChemistryScore":String,
            "status" : String,
            "institute" : String,
            "gender" : String,
            "grade_10" : Number,
            "temp_str" : String,
            "salt"  : String,
            "name"  : String,
            "email" : String,
            "phone" : Number,
            "hashed_password" : String
        },
        "comprehensive_events":
        [
            {
                "_id":String,
                "session_score":Number,
                "start_session":String,
                "end_session" : String,
                "set_1":
                {
                    "WO_Distraction" :
                    [
                        {
                            "_id":String,
                            "time_of_start" : String,
                            "string_question" : String,
                            "level ": Number,
                            "time_of_submission" : String,
                            "string_answer" : String,
                            "lives_till_used" : Number,
                            "total_volume":String,
                            "success" : String
                        }
                    ],
                    "W_Distraction" :
                    [
                        {
                            "_id":String,
                            "time_of_start" : String,
                            "string_question" : String,
                            "level ": Number,
                            "time_of_submission" : String,
                            "string_answer" : String,
                            "lives_till_used" : Number,
                            "total_volume":String,
                            "success" : String
                        }
                    ],
                    "Visual" :
                    [
                        {
                            "_id":String,
                            "time_of_start" : String,
                            "string_question" : String,
                            "level ": Number,
                            "time_of_submission" : String,
                            "string_answer" : String,
                            "lives_till_used" : Number,
                            "success" : String
                        }
                    ],
                    "Audio" :
                    [
                        {
                            "_id":String,
                            "time_of_start" : String,
                            "string_question" : String,
                            "level ": Number,
                            "time_of_submission" : String,
                            "string_answer" : String,
                            "lives_till_used" : Number,
                            "total_volume":String,
                            "success" : String
                        }
                    ]             
                },
                "set_2":
                {
                    "WO_Distraction" :
                    [
                        {
                            "_id":String,
                            "time_of_start" : String,
                            "string_question" : String,
                            "level ": Number,
                            "time_of_submission" : String,
                            "string_answer" : String,
                            "lives_till_used" : Number,
                            "total_volume":String,
                            "success" : String
                        }
                    ],
                    "W_Distraction" :
                    [
                        {
                            "_id":String,
                            "time_of_start" : String,
                            "string_question" : String,
                            "level ": Number,
                            "time_of_submission" : String,
                            "string_answer" : String,
                            "lives_till_used" : Number,
                            "total_volume":String,
                            "success" : String
                        }
                    ],
                    "Visual" :
                    [
                        {
                            "_id":String,
                            "time_of_start" : String,
                            "string_question" : String,
                            "level ": Number,
                            "time_of_submission" : String,
                            "string_answer" : String,
                            "lives_till_used" : Number,
                            "success" : String
                        }
                    ],
                    "Audio" :
                    [
                        {
                            "_id":String,
                            "time_of_start" : String,
                            "string_question" : String,
                            "level ": Number,
                            "time_of_submission" : String,
                            "string_answer" : String,
                            "lives_till_used" : Number,
                            "total_volume":String,
                            "success" : String
                        }
                    ] 
                },
                "set_3":
                {
                    "WO_Distraction" :
                    [
                        {
                            "_id":String,
                            "time_of_start" : String,
                            "string_question" : String,
                            "level ": Number,
                            "time_of_submission" : String,
                            "string_answer" : String,
                            "lives_till_used" : Number,
                            "total_volume":String,
                            "success" : String
                        }
                    ],
                    "W_Distraction" :
                    [
                        {
                            "_id":String,
                            "time_of_start" : String,
                            "string_question" : String,
                            "level ": Number,
                            "time_of_submission" : String,
                            "string_answer" : String,
                            "lives_till_used" : Number,
                            "total_volume":String,
                            "success" : String
                        }
                    ],
                    "Visual" :
                    [
                        {
                            "_id":String,
                            "time_of_start" : String,
                            "string_question" : String,
                            "level ": Number,
                            "time_of_submission" : String,
                            "string_answer" : String,
                            "lives_till_used" : Number,
                            "success" : String
                        }
                    ],
                    "Audio" :
                    [
                        {
                            "_id":String,
                            "time_of_start" : String,
                            "string_question" : String,
                            "level ": Number,
                            "time_of_submission" : String,
                            "string_answer" : String,
                            "lives_till_used" : Number,
                            "total_volume":String,
                            "success" : String
                        }
                    ]                   
                }
            }   
        ]
});