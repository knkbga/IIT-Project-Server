var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var user = require('../config/models');
 
var smtpTransport = nodemailer.createTransport("SMTP",{
    auth: {
        user: "kanakbagga1@gmail.com",
        pass: "Gian Jyoti"
        }
});
 
 
/*exports.cpass = function(id,opass,npass,callback)
{
    console.log("In exports.cpass");
    var temp1 =rand(160, 36);
    var newpass1 = temp1 + npass;
    var hashed_passwordn = crypto.createHash('sha512').update(newpass1).digest("hex");

    user.findOne({_id:id},function(err,users)
    {
        console.log("found by _id.");
        if(users.length != 0)
        {
            console.log("name ::\t"+users.person_credentials.name);
            var temp = users.salt;
            var hash_db = users.hashed_password;
            var newpass = temp + opass;
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");
            if(hash_db == hashed_password)
            {
                if (npass.length > 4 ) 
                {
                    user.findOne({ _id: id }, function (err, doc)
                    {
                        doc.hashed_password = hashed_passwordn;
                        doc.salt = temp1;
                        doc.save();
                        callback({'response':"Password Sucessfully Changed",'success':true});
                    });
                }
                else
                {
                    callback({'response':"New Password is Weak. Try a Strong Password !",'success':false});
                }
            }
            else
            {
                callback({'response':"Passwords do not match. Try Again !",'success':false});
            }
        }
        else
        {
            callback({'response':"Error while changing password",'success':false});
        }
    });
}*/
 
exports.respass_init = function(email,callback) {

    console.log("In exports.respass_init");
    
    var temp =rand(24, 24);
    user.find({'person_credentials.email': email},function(err,users)
    {
        if(users.length != 0)
        {
            user.findOne({ 'person_credentials.email': email }, function (err, doc)
            {
                doc.person_credentials.temp_str= temp;
                doc.save();
                
                console.log("DB Changed.");
                
                var mailOptions = {
                    from: "<kanakbagga1@gmail.com>",
                    to: email,
                    subject: "Reset Password ",
                    text: "Hello "+email+".  Code to reset your Password is "+temp+" .",
                }
                
                smtpTransport.sendMail(mailOptions, function(error, response)
                {
                    if(error)
                    {
                        console.log("Email sent");
                        callback({'response':"Error While Resetting password. Try Again !",'success':false});
                    }
                    else
                    {
                        callback({'response':"Check your Email and enter the verification code to reset your Password.",'success':true});
                    }
                });
            });
        }
        else
        {
            callback({'response':"Email Do not Exist",'success':false});
        }
    });
}
 
exports.respass_chg = function(email,code,npass,callback) 
{
    user.find({'person_credentials.email': email},function(err,users)
    {
        if(users.length != 0)
        {

            var temp = users[0].person_credentials.temp_str;
            var temp1 =rand(160, 36);
            var newpass1 = temp1 + npass;
            var hashed_password = crypto.createHash('sha512').update(newpass1).digest("hex");

            if(temp == code)
            {
                if (npass.length > 4) 
                {
                    user.findOne({ 'person_credentials.email': email }, function (err, doc)
                    {
                        doc.person_credentials.hashed_password= hashed_password;
                        doc.person_credentials.salt = temp1;
                        doc.person_credentials.temp_str = "";
                        doc.save();

                        callback({'response':"Password Sucessfully Changed",'success':true});
                    });
                }
                else
                {
                    callback({'response':"New Password is Weak. Try a Strong Password !",'success':false});
                }
            }
            else
            {
                callback({'response':"Code does not match. Try Again !",'success':false});
            }
        }
        else
        {
            callback({'response':"Error",'success':false});
        }
    });
}