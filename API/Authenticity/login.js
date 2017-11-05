var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var user = require('../../Models/userModel');
var Globals = require('../../Globals/variables');

exports.login = function(email,password,app_code,callback) {

    if (Globals.debug)
        console.log("\nIn login.js");
    if(app_code == "iit")
    {
        user.find({'person_credentials.email': email},function(err,users)
        {
            if (Globals.debug)
                console.log("\nEmail id found.");
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
                    if (Global.debug)
                        console.log('Login Success');
                    callback({'response':"Login Sucess",'token':unique_id,'success':true,'_id':id});
                }
                else
                {
                    if (Global.debug)
                        console.log('Invalid Password');
                    callback({'response':"Invalid Password",'success':false});
                }
            }
            else 
            {
                if (Global.debug)
                    console.log('Email id not valid');
                callback({'response':"Email id not valid",'success':false});
            }
        });
    }
    else 
    {
        if (Global.debug)
            console.log('You are not allowed to login yet');
        callback({'response':"You are not allowed to login yet",'success':false});
    }
}