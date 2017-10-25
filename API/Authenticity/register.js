var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var user = require('../../Models/userModel');
 
exports.register = function(entry,callback)
{
    console.log(JSON.stringify(entry));
    
    var email = entry.email;
    var app_code = entry.app_code;
    var password = entry.password;
    
    if(app_code == "iit") 
    {
        if(!(email.indexOf("@")==email.length))
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
                            "token":token,
                            "dob":entry.dob,
                            "jeeRollNumber":entry.jeeRollNumber,
                            "jeeTotalScore":entry.jeeTotalScore,
                            "jeePhysicsScore":entry.jeePhysicsScore,
                            "jeeMathsScore":entry.jeeMathsScore,
                            "jeeChemistryScore":entry.jeeChemistryScore,
                            "status":"active",
                            "institute" : entry.institute,
                            "gender" : entry.gender,
                            "grade_10" : entry.grade_10,
                            "temp_str" : "",
                            "salt" : temp,
                            "token" : entry.token,
                            "name"  : entry.name,
                            "email" : entry.email,
                            "phone" : entry.phone,
                            "hashed_password" : hashed_password
                        }
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
    else
    {
        callback({'response':"Your app is outdated",success:false});   
    }
}