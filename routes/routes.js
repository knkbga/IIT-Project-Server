/*
---------------------------------------------- 
    Node Modules 
----------------------------------------------
*/
var path         = require('path');
var mime         = require('mime');
var fs           = require('fs');
var rand         = require('csprng');

/*
---------------------------------------------- 
    Glboals | Utils
---------------------------------------------- 
*/
var Globals      = require("../Globals/variables");
var utils      = require("../Globals/utils");

/*
---------------------------------------------- 
    Models 
---------------------------------------------- 
*/
var users        = require('../Models/userModel');
var versions      = require('../Models/versionModel');

/*
---------------------------------------------- 
    API redirects 
----------------------------------------------
*/
var chgpass     = require('../API/Authenticity/chgpass');
var register    = require('../API/Authenticity/register');
var login       = require('../API/Authenticity/login');
var sessions    = require('../API/Sessions/sessions');

/*
---------------------------------------------- 
    Generic Variables
----------------------------------------------
*/
var ObjectId = require('mongodb').ObjectID;

/*
Route functions
*/
module.exports = function(app) {
    
    // Simple get html
    app.get('/' ,  function(req ,  res) {
        if (Globals.debug)
            console.log("\nIn URL :: \t"+req.url);
        res.end("Node-Android-Project(IIT)");
    });
    
    // API to dowload APK
    app.get('/download' , function(req,res){
        if (Globals.debug)
            console.log("\nIn URL :: \t"+req.url);
       
        console.log("Download requested");
        var file = __dirname + '/../APK/Digit-span.apk';

        var filename = path.basename(file);
        var mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);

        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
        
    });
    
    // API to confirm a logged in user
    app.get('/confirm_user' , function(req,res){
        if (Globals.debug)
            console.log("\nIn URL :: \t"+req.url);
        
        var req_id;
        if (typeof(req.query.id) != 'undefined')
        {
            req_id = req.query.id;
            users.findById( ObjectId(req_id) ,function(err,instance){
                if(!err)
                {
                    if((instance.person_credentials.status).trim().toLowerCase() == 'active')
                    {
                        res.json({"success":true , response:"User is valid"});
                    }
                    else
                    {
                        res.json({"success":false , response:"User not active anymore"});
                    }
                }
                else
                {
                    res.json({"success":false , response:"Couldn't find the registered user"});
                }
            });
        }
        else
        {
            res.json({"success":false , response:"Id was not found"});
        }
        
    });
        
    // API to login
    app.post('/login' , function(req , res){
        if (Globals.debug)
            console.log("\nIn URL :: \t"+req.url);
        var parsed_object = utils.json_parse.login(req.body);
        
        login.login(parsed_object.email , parsed_object.password , parsed_object.app_code , function (found) {
            res.json(found);
        });
    });

    // API to Register
    app.post('/register' , function(req , res){
        if (Globals.debug)
            console.log("\nIn URL :: \t"+req.url);
        var parsed_object = utils.json_parse.register(req.body);
        
        if(utils.check_if_null_or_undefined(parsed_object.entry)){
            register.register(parsed_object.entry, function (found) {
                res.json(found);
            });
        }
        else{
            res.json({"success":false , response : "Data of the user to be registered not found"});
        }
        
    });
    
    // API to start a new session
    app.post('/start_session' , function(req,res){
        if (Globals.debug)
            console.log("\nIn URL :: \t"+req.url);
        var parsed_object = utils.json_parse.new_session(req.body);
        sessions.new_session(parsed_object._id,parsed_object.entry,parsed_object.session_token,function(found){
            res.json(found);
        });
    });    
    
    //API to collect data for audio game
    app.post('/comprehensive/gaming/audio' , function(req , res){
        if (Globals.debug)
            console.log("\nIn URL :: \t"+req.url);
        var parsed_object = utils.json_parse.session(req.body);
        if (Globals.debug)
            console.log("\nParsed Object :: \t"+JSON.stringify(parsed_object));
        if(req.body.different_events[0].time_of_start != null)
        {
            sessions.session(0 , parsed_object._id , parsed_object.entry , function(found)
            {
                res.json(found);
            });
        }
    });
    
    //API to collect data for visual game
    app.post('/comprehensive/gaming/visual' , function(req , res){
        if (Globals.debug)
            console.log("\nIn URL :: \t"+req.url);
        var parsed_object = utils.json_parse.session(req.body);
        if(req.body.different_events[0].time_of_start != null)
        {
            sessions.session(1 , parsed_object._id, parsed_object.entry , function(found)
            {
                res.json(found);
            });
        }
    });
    
    //API to collect data for audio & visual game
    app.post('/comprehensive/gaming/with' , function(req , res){
        if (Globals.debug)
            console.log("\nIn URL :: \t"+req.url);
        var parsed_object = utils.json_parse.session(req.body);
        if(req.body.different_events[0].time_of_start != null)
        {
            sessions.session(2 , parsed_object._id, parsed_object.entry , function(found)
            {
                res.json(found);
            });
        }
    });
    
    //API to collect data for audio & visual-distraction game
    app.post('/comprehensive/gaming/without' , function(req , res){
        if (Globals.debug)
            console.log("\nIn URL :: \t"+req.url);
        var parsed_object = utils.json_parse.session(req.body);
        if(req.body.different_events[0].time_of_start != null)
        {
            sessions.session(3 , parsed_object._id, parsed_object.entry , function(found)
            {
                res.json(found);
            });
        }
    });
    
     
    //API to initialize reset password request
    app.post('/api/resetpass' ,  function(req ,  res) {
        if (Globals.debug)
            console.log("\nIn URL :: \t"+req.url);
 
        var parsed_object = utils.json_parse.email(req.body);
 
        chgpass.respass_init(parsed_object.email , function(found){
                res.json(found);
        });
    });
 
    //API to confirm the change of password
    app.post('/api/resetpass/chg' ,  function(req ,  res) {
        if (Globals.debug)
            console.log("\nIn URL :: \t"+req.url);
 
        var email = req.body.email;
        var code = req.body.code;
        var npass = req.body.newpass;
 
        chgpass.respass_chg(email , code , npass , function(found){
                res.json(found);
        });
    });
 
 
};