var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;
var event_json=
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
    };

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
                    event_json
                ],
                "W_Distraction" :
                [
                    event_json
                ],
                "Visual" :
                [
                    event_json
                ],
                "Audio" :
                [
                    event_json
                ]
            }
        }
    });

mongoose.connect('mongodb://iit:1Direction@ds129003.mlab.com:29003/iit_delhi');
//mongoose.connect('mongodb://localhost/test');
module.exports = mongoose.model('users', userSchema);