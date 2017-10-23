var mongoose = require('mongoose');
 
var json_entry = 
    {
        "time_of_start" : String,
        "string_question" : String,
        "level": Number,
        "time_of_submission" : String,
        "string_answer" : String,
        "lives_till_used" : Number,
        "total_volume":String,
        "success" : String,
        "individual_event_score":Number
    };

var WO_Distraction_schema = new mongoose.Schema(
    json_entry
);

var W_Distraction_schema = new mongoose.Schema(
    json_entry
);

var Visual_schema = new mongoose.Schema(
    {
        "time_of_start" : String,
        "string_question" : String,
        "level": Number,
        "time_of_submission" : String,
        "string_answer" : String,
        "lives_till_used" : Number,
        "success" : String,
        "individual_event_score":Number
    }
);

var Audio_schema = new mongoose.Schema(
    json_entry
);


var comprehensive_events_schema = new mongoose.Schema(
    {
        "_id":String,
        "session_score":Number,
        "start_session":String,
        "end_session" : String,
        "set_1":
        {
            "scores":
            {
                "WO_Distraction":Number,
                "W_Distraction":Number,
                "Visual":Number,
                "Audio":Number
            },
            "WO_Distraction" :
            [
                WO_Distraction_schema
            ],
            "W_Distraction" :
            [
                W_Distraction_schema
            ],
            "Visual" :
            [
                Visual_schema
            ],
            "Audio" :
            [
                Audio_schema
            ]                   
        },
        "set_2":
        {
            "scores":
            {
                "WO_Distraction":Number,
                "W_Distraction":Number,
                "Visual":Number,
                "Audio":Number
            },
            "WO_Distraction" :
            [
                WO_Distraction_schema
            ],
            "W_Distraction" :
            [
                W_Distraction_schema
            ],
            "Visual" :
            [
                Visual_schema
            ],
            "Audio" :
            [
                Audio_schema
            ]                 
        },
        "set_3":
        {
            "scores":
            {
                "WO_Distraction":Number,
                "W_Distraction":Number,
                "Visual":Number,
                "Audio":Number
            },
            "WO_Distraction" :
            [
                WO_Distraction_schema
            ],
            "W_Distraction" :
            [
                W_Distraction_schema
            ],
            "Visual" :
            [
                Visual_schema
            ],
            "Audio" :
            [
                Audio_schema
            ]                  
        },
    }
);

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
        "hashed_password" : String,
    },
    "current_version":
    {
            "version" : String,
            "date_of_issue" : String,
            "new_features" : [String],
            "beta" : Boolean,
            "release_number" : Number        
    },
    "versions_used":[
        {
            "version" : String,
            "date_of_issue" : String,
            "new_features" : [String],
            "beta" : Boolean,
            "release_number" : Number
        }
    ],
    "comprehensive_events":
    [
        comprehensive_events_schema   
    ]
});

module.exports = mongoose.model('users', userSchema , "users_data");