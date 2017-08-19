var mongoose = require('mongoose');
 
var json_entry = 
    {
        "_id":String,
        "time_of_start" : String,
        "string_question" : String,
        "level ": Number,
        "time_of_submission" : String,
        "string_answer" : String,
        "lives_till_used" : Number,
        "success" : String
    };

var WO_Distraction_schema = new mongoose.Schema(
    json_entry
);

var W_Distraction_schema = new mongoose.Schema(
    json_entry
);

var Visual_schema = new mongoose.Schema(
    json_entry
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
        "set_end" : Number,
        "set_1":
        {
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
        "comprehensive_events":
        [
            comprehensive_events_schema   
        ]
});

//mongoose.connect('mongodb://mzf:1Direction@ds129422.mlab.com:29422/muzaffarnagar');
mongoose.connect('mongodb://localhost/test');
module.exports = mongoose.model('users', userSchema);