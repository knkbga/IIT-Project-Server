var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var user = require('../config/models');
 
 
 
exports.register = function(email,password,name,phone,gender,age,grade_10,sleep_hours,test_rank,institute,callback)
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
                        "institute" : institute,
                        "test_rank" : test_rank,
                        "gender" : gender,
                        "age" : age,
                        "grade_10" : grade_10,
                        "sleep_hours" : sleep_hours,
                        "temp_str" : "",
                        "salt"  : temp,
                        "token" : token,
                        "name"  : name,
                        "email" : email,
                        "phone" : phone,
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