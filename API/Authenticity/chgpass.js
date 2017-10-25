var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var user = require('../../Models/userModel');
 
var smtpTransport = nodemailer.createTransport("SMTP",{
    port: 587,
    secure: false,
    auth: {
        user: "bagga.kanak1@gmail.com",
        pass: "1Direction"
        }
});
 
 
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
                    from: "<bagga.kanak1@gmail.com>",
                    to: email,
                    subject: "Reset Password ",
                    text: "Hello "+email+".  Code to reset your Password is "+temp+" .",
                }
                
                smtpTransport.sendMail(mailOptions, function(error, response)
                {
                    if(error)
                    {
                        console.log("Email not sent");
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
    console.log("In resetpass_chg");
    user.find({'person_credentials.email': email},function(err,users)
    {
        if(users.length != 0)
        {
            console.log("User found");
            var temp = users[0].person_credentials.temp_str;
            var temp1 =rand(160, 36);
            var newpass1 = temp1 + npass;
            var hashed_password = crypto.createHash('sha512').update(newpass1).digest("hex");

            if(temp == code)
            {
                console.log("Code matches");
                if (npass.length > 4) 
                {
                    user.findOne({ 'person_credentials.email': email }, function (err, doc)
                    {
                        console.log("user again searched");
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