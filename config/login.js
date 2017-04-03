var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var gravatar = require('gravatar');
var user = require('../config/models');

exports.login = function(email,password,callback) {

    user.find({'person_credentials.email': email},function(err,users)
    {
        if(users.length != 0)
        {
            var unique_id = users[0].person_credentials.token;
            var temp = users[0].person_credentials.salt;
            var hash_db = users[0].person_credentials.hashed_password;
            var name = users[0].person_credentials.name;
            var id = users[0]._id;
            var newpass = temp + password;
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");
            var grav_url = gravatar.url(email, {s: '200', r: 'pg', d: '404'});
            
            if(hash_db == hashed_password)
            {
                callback({'response':"Login Sucess",'token':unique_id,'success':true,'_id':id,'grav':grav_url,'name':name});
            }
            else
            {
                callback({'response':"Invalid Password",'success':false});
            }
        }
        else 
        {
            callback({'response':"User not exist",'success':false});
        }
    });
}