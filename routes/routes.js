/*
---------------------------------------------- 
    Node Modules 
----------------------------------------------
*/
var path         = require('path');
var mime         = require('mime');
var fs           = require('fs');
var crypto       = require('crypto');
var rand         = require('csprng');

/*
---------------------------------------------- 
    Glboals 
---------------------------------------------- 
*/
var Globals      = require("../Globals/variables");

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
Route functions
*/
module.exports = function(app) {
    
    // Simple get html
    app.get('/' ,  function(req ,  res) {
        console.log("Get Requested");
        res.end("Node-Android-Project(IIT)");
    });
    
    // API to dowload APK
    app.get('/download' , function(req,res){
       
        console.log("Download requested");
        var file = __dirname + '/../APK/Digit-span.apk';

        var filename = path.basename(file);
        var mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);

        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
        
    });
    
    //API to update APK
    app.post('/api/update' , function(req,res) {
        var curr_version = req.body.version;
        versions.
    });
    
    // API to login
    app.post('/login' , function(req , res){
        console.log("In login");
        var email = req.body.email;
        var password = req.body.password;
        var app_code = req.body.app_code;
        
        login.login(email , password , app_code , function (found) {
//            console.log(found);
            res.json(found);
        });
    });

    // API to Register
    app.post('/register' , function(req , res){
        
//        console.log("Register Params::\t"+JSON.stringify(req.body));
        
        var entry = { email : req.body.email,
        password : req.body.password,
        name : req.body.name,
        phone : req.body.phone,
        gender : req.body.gender,
        grade_10 : req.body.grade_10,
        institute : req.body.institute,
        app_code : req.body.app_code,
        dob : req.body.dob,
        jeeRollNumber : req.body.jeeRollNumber,
        jeeTotalScore : req.body.jeeTotalScore,
        jeePhysicsScore : req.body.jeePhysicsScore,
        jeeMathsScore : req.body.jeeMathsScore,
        jeeChemistryScore : req.body.jeeChemistryScore }
        
        register.register(entry, function (found) {
            res.json(found);
        });
    });
    
    // API to start a new session
    app.post('/start_session' , function(req,res){
        
//        console.log(JSON.stringify(req.body));
        
        var callback;
        var _id  = req.body._id;
        var session_id  = req.body._id+"comp";
        var start_session = req.body.start_session;
        var session_token = crypto.createHash('sha512').update(start_session+_id).digest("hex");
        
        var entry = {
            _id : session_token,
            start_session : start_session,
            set_1 : {},
            set_2 : {},
            set_3 : {}
        };
        
//        console.log(JSON.stringify(entry));
        
        users.findByIdAndUpdate(_id, 
        {$push: {"comprehensive_events": entry}},
        {safe: true, upsert: true,new:true},
        function(err, model)
        {
            if(err)
            {
                callback = {success:false,response:"Some error occured."};
                res.json(callback);
            }
            else
            {         
                callback = {success:true,session_token:session_token};
                res.json(callback);
            }
        });
    });    
    
    //API to collect data for audio game
    app.post('/comprehensive/gaming/audio' , function(req , res){
        
//        console.log("/comprehensive/gaming/audio::\t"+JSON.stringify(req.body));
        
        var different_events = new Array();
        var _id = req.body._id;
        var set = req.body.set;
        var session_token = req.body.session_token;
        var start_session = req.body.start_session;
        var end_session = req.body.end_session;
        
//        console.log("session_token:\t"+req.body.session_token);
        
        var json_entry = [];
        for (var i=0;i<req.body.different_events.length;i++)
        {
            json_entry.push({
                time_of_start: req.body.different_events[i].time_of_start,
                string_question: req.body.different_events[i].string_question,
                level: parseInt(req.body.different_events[i].level),
                time_of_submission: req.body.different_events[i].time_of_submission,
                string_answer: req.body.different_events[i].string_answer,
                lives_till_used : req.body.different_events[i].lives_till_used,
                total_volume : req.body.different_events[i].total_volume,
                success: String(req.body.different_events[i].success)
            });
        }

        var entry = {
            set : req.body.set,
            session_token : req.body.session_token,
            start_session : req.body.start_session,
            end_session : req.body.end_session,
            json_entry: json_entry
        };
        if(req.body.different_events[0].time_of_start != null)
        sessions.session(0 , _id , entry , function(found)
        {
//            console.log("\n\n\n"+JSON.stringify(found)+"\n\n\n");
            res.json(found);
        });
    });
    
    //API to collect data for visual game
    app.post('/comprehensive/gaming/visual' , function(req , res){
        
//        console.log("/comprehensive/gaming/visual::\t"+JSON.stringify(req.body));
        
        var different_events = new Array();
        var _id = req.body._id;
        var set = req.body.set;
        var session_token = req.body.session_token;
        var start_session = req.body.start_session;
        var end_session = req.body.end_session;
        
//        console.log("session_token:\t"+req.body.session_token);
        
        var json_entry = [];
        for (var i=0;i<req.body.different_events.length;i++)
        {
            json_entry.push({
                time_of_start: req.body.different_events[i].time_of_start,
                string_question: req.body.different_events[i].string_question,
                level: parseInt(req.body.different_events[i].level),
                time_of_submission: req.body.different_events[i].time_of_submission,
                string_answer: req.body.different_events[i].string_answer,
                lives_till_used : req.body.different_events[i].lives_till_used,
                total_volume : req.body.different_events[i].total_volume,
                success: String(req.body.different_events[i].success)
            });
        }

        var entry = {
            set : req.body.set,
            session_token : req.body.session_token,
            start_session : req.body.start_session,
            end_session : req.body.end_session,
            json_entry: json_entry
        };
        if(req.body.different_events[0].time_of_start != null)
        sessions.session(1 , _id, entry , function(found)
        {
//            console.log("\n\n\n"+JSON.stringify(entry)+"\n\n\n\n");
            res.json(found);
        });
    });
    
    //API to collect data for audio & visual game
    app.post('/comprehensive/gaming/with' , function(req , res){
        
        console.log("\n\n\n\n\n\n\t\t\t\t\t\t /comprehensive/gaming/with:\t\t"+JSON.stringify(req.body)+"\n\n\n\n\n");
        
        var different_events = new Array();
        var _id = req.body._id;
        var set = req.body.set;
        var session_token = req.body.session_token;
        var start_session = req.body.start_session;
        var end_session = req.body.end_session;
        
//        console.log("session_token:\t"+req.body.session_token);
        
        var json_entry = [];
        for (var i=0;i<req.body.different_events.length;i++)
        {
            json_entry.push({
                time_of_start: req.body.different_events[i].time_of_start,
                string_question: req.body.different_events[i].string_question,
                level: parseInt(req.body.different_events[i].level),
                time_of_submission: req.body.different_events[i].time_of_submission,
                string_answer: req.body.different_events[i].string_answer,
                lives_till_used : req.body.different_events[i].lives_till_used,
                total_volume : req.body.different_events[i].total_volume,
                success: String(req.body.different_events[i].success)
            });
        }

        var entry = {
            set : req.body.set,
            session_token : req.body.session_token,
            start_session : req.body.start_session,
            end_session : req.body.end_session,
            json_entry: json_entry
        };
        if(req.body.different_events[0].time_of_start != null)
        sessions.session(2 , _id, entry , function(found)
        {
//            console.log("\n\n\n"+JSON.stringify(entry)+"\n\n\n\n");
            res.json(found);
        });
    });
    
    //API to collect data for audio & visual-distraction game
    app.post('/comprehensive/gaming/without' , function(req , res){
        
        console.log("/comprehensive/gaming/without::\t"+JSON.stringify(req.body));
        
        var different_events = new Array();
        var _id = req.body._id;
        var set = req.body.set;
        var session_token = req.body.session_token;
        var start_session = req.body.start_session;
        var end_session = req.body.end_session;
        
//        console.log("session_token:\t"+req.body.session_token);
        
        var json_entry = [];
        for (var i=0;i<req.body.different_events.length;i++)
        {
            json_entry.push({
                time_of_start: req.body.different_events[i].time_of_start,
                string_question: req.body.different_events[i].string_question,
                level: parseInt(req.body.different_events[i].level),
                time_of_submission: req.body.different_events[i].time_of_submission,
                string_answer: req.body.different_events[i].string_answer,
                lives_till_used : req.body.different_events[i].lives_till_used,
                total_volume : req.body.different_events[i].total_volume,
                success: String(req.body.different_events[i].success)
            });
        }

//        console.log("\n\n\n\n\n\n"+JSON.stringify(json_entry));
        
        var entry = {
            set : req.body.set,
            session_token : req.body.session_token,
            start_session : req.body.start_session,
            end_session : req.body.end_session,
            json_entry: json_entry
        };
        if(req.body.different_events[0].time_of_start != null)
        sessions.session(3 , _id, entry , function(found)
        {
//            console.log("\n\n\n"+JSON.stringify(entry)+"\n\n\n\n");
            res.json(found);
        });
    });
    
    
    /*app.post('/api/chgpass' ,  function(req ,  res) {
        var id = req.body.id;
                var opass = req.body.oldpass;
        var npass = req.body.newpass;
 
        chgpass.cpass(id , opass , npass , function(found){
            console.log(found);
            res.json(found);
        });
    });*/
 
    //API to initialize reset password request
    app.post('/api/resetpass' ,  function(req ,  res) {
 
        var email = req.body.email;
 
        chgpass.respass_init(email , function(found){
//                console.log(found);
                res.json(found);
        });
    });
 
    //API to confirm the change of password
    app.post('/api/resetpass/chg' ,  function(req ,  res) {
 
        var email = req.body.email;
        var code = req.body.code;
        var npass = req.body.newpass;
 
        chgpass.respass_chg(email , code , npass , function(found){
//                console.log(found);
                res.json(found);
        });
    });
 
 
};