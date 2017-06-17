var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var user = require('../config/models');

exports.login = function(email,password,app_code,callback) {

    console.log("In login.js");
    if(app_code == "mzf")
    {
        user.find({'person_credentials.email': email},function(err,users)
        {
            console.log("Email id found.");
            if(users.length != 0)
            {
                var unique_id = users[0].person_credentials.token;
                var temp = users[0].person_credentials.salt;
                var hash_db = users[0].person_credentials.hashed_password;
                var name = users[0].person_credentials.name;
                var id = users[0]._id;
                var newpass = temp + password;
                var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

                    if(hash_db == hashed_password)
                    {
                        callback({'response':"Login Sucess",'token':unique_id,'success':true,'_id':id});
                    }
                    else
                    {
                        callback({'response':"Invalid Password",'success':false});
                    }
                }

            }
            else 
            {
                callback({'response':"Email id not valid.",'success':false});
            }
        });
    }
    else 
    {
        callback({'response':"Your app is outdated",'success':false});
    }
}