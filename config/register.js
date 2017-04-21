var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var user = require('../config/models');
 
 
 
exports.register = function(email,password,name,phone,callback)
{
    var x = email;
    if(!(x.indexOf("@")==x.length))
    {        
        if (password.length > 4)
        {
            var temp =rand(160, 36);
            var newpass = temp + password;
            var token = crypto.createHash('sha512').update(email +rand).digest("hex");
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

            var newuser = new user(  
                {
                    "person_credentials" :
                    {
                        "salt"  : temp,
                        "token" : token,
                        "name"  : name,
                        "email" : email,
                        "phone" : phone,
                        "hashed_password" : hashed_password
                    },
                    /*"comprehensive_events":
                    {
                        "WO_Distraction" :
                        [
                            {
                                "start_session": null,
                                "end_session":null,
                                "point_end":null,
                                "different_events":
                                [
                                    {
                                        "string_answer" : null,
                                        "string_question" : null,
                                        "time_of_start" : null,
                                        "time_of_end" : null,
                                        "level" : null,
                                        "success" : null,
                                        "time_of_submission" : null
                                    }
                                ]
                            }
                        ],
                        "W_Distraction" :
                        [
                            {
                                "start_session" : null,
                                "end_session" : null,
                                "point_end" : null,
                                "different_events":
                                [
                                    {
                                        "string_answer" : null,
                                        "string_question" : null,
                                        "time_of_start" : null,
                                        "time_of_end" : null,
                                        "level" : null,
                                        "success" : null,
                                        "time_of_submission" : null
                                    }
                                ]
                            }
                        ],
                        "Gaming" :
                        {
                            "WO_Distraction" : 
                            [
                                {
                                    "start_session" : null,
                                    "end_session" : null,
                                    "point_end" : null,
                                    "different_events":
                                    [
                                        {
                                            "string_answer" : null,
                                            "string_question" : null,
                                            "lives_till_used" : null,
                                            "time_of_start" : null,
                                            "time_of_end" : null,
                                            "level ": null,
                                            "success" : null,
                                            "time_of_submission" : null
                                        }
                                    ]
                                }
                            ],
                            "W_Distraction" :
                            [
                                {
                                    "start_session" : null,
                                    "end_session" : null,
                                    "point_end" : null,
                                    "different_events":
                                    [
                                        {
                                            "string_answer" : null,
                                            "string_question" : null,
                                            "lives_till_used" : null,
                                            "time_of_start" : null,
                                            "time_of_end" : null,
                                            "level" : null,
                                            "success" : null,
                                            "time_of_submission" : null
                                        }
                                    ]
                                }
                            ]
                        }
                    }*/
                }
            );

            user.find({'person_credentials.email': email},function(err,users){
                var len = users.length;
                if(len == 0)
                {
                    newuser.save(function (err){
                        callback({'response':"Sucessfully Registered",success:true});
                    });
                }
                else
                {
                    callback({'response':"Email already Registered",success:false});
                }
            });
        }
        else 
        {
            callback({'response':"Password Weak",success:false});
        }
    }
    else
    {
        callback({'response':"Email Not Valid",success:false});
    }
}