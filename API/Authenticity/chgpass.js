var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var user = require('../../Models/userModel');
var Globals = require('../../Globals/variables');
 
var smtpTransport = nodemailer.createTransport("SMTP",{
    port: 587,
    secure: false,
    host: 'smtp.gmail.com',
    auth: {
        user: "bagga.kanak1@gmail.com",
        pass: "1Direction"
        }
});
 
 
exports.respass_init = function(email,callback) {

    if (Globals.debug)
        console.log("\nIn exports.respass_init");
    var temp =rand(24, 24);
    user.find({'person_credentials.email': email},function(err,users)
    {
        if(users.length != 0)
        {
            user.findOne({ 'person_credentials.email': email }, function (err, doc)
            {
                doc.person_credentials.temp_str= temp;
                doc.save();
                if (Globals.debug)
                    console.log("\nDB Changed.");
                
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
                        if (Globals.debug)
                            console.log("\nError while sending email");
                        callback({'response':"Cuurently service is down. Try Again later !",'success':false});
                    }
                    else
                    {
                        if (Globals.debug)
                            console.log("\nCheck your Email and enter the verification code to reset your Password");
                        callback({'response':"Check your Email and enter the verification code to reset your Password",'success':true});
                    }
                });
            });
        }
        else
        {
            if (Globals.debug)
                console.log("\nEmail Do not Exist");
            callback({'response':"Email Do not Exist",'success':false});
        }
    });
}
 
exports.respass_chg = function(email,code,npass,callback) 
{
    if (Globals.debug)
        console.log("\nIn resetpass_chg");
    user.find({'person_credentials.email': email},function(err,users)
    {
        if(users.length != 0)
        {
            if (Globals.debug)
                console.log("\nUser found");
            var temp = users[0].person_credentials.temp_str;
            var temp1 =rand(160, 36);
            var newpass1 = temp1 + npass;
            var hashed_password = crypto.createHash('sha512').update(newpass1).digest("hex");

            if(temp == code)
            {
                if (Globals.debug)
                    console.log("\nCode matches");
                if (npass.length > 4) 
                {
                    user.findOne({ 'person_credentials.email': email }, function (err, doc)
                    {
                        doc.person_credentials.hashed_password= hashed_password;
                        doc.person_credentials.salt = temp1;
                        doc.person_credentials.temp_str = "";
                        doc.save();

                        if (Globals.debug)
                            console.log("\nPassword Sucessfully Changed");
                        callback({'response':"Password Sucessfully Changed",'success':true});
                    });
                }
                else
                {
                    if (Globals.debug)
                        console.log("\nNew Password is Weak. Try a Strong Password");
                    callback({'response':"New Password is Weak. Try a Strong Password !",'success':false});
                }
            }
            else
            {
                if (Globals.debug)
                    console.log("\nCode does not match. Try Again !");                
                callback({'response':"Code does not match. Try Again !",'success':false});
            }
        }
        else
        {
            if (Globals.debug)
                console.log("\nUser not found");
            callback({'response':"Error",'success':false});
        }
    });
}