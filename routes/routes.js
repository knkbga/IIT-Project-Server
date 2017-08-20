var chgpass = require('../config/chgpass');
var register = require('../config/register');
var login = require('../config/login');
var sessions = require('../config/sessions');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var crypto = require('crypto');
var rand = require('csprng');
var users = require('../config/models');

module.exports = function(app) {
    
    app.get('/' ,  function(req ,  res) {
        console.log("Get Requested");
        res.end("Node-Android-Project(IIT)");
    });

    app.get('/download' , function(req,res){
       
//        res.end("Updated app is in progress...");
        console.log("Download requested");
        var file = __dirname + '/../APK/Digit-span.apk';

        var filename = path.basename(file);
        var mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);

        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
        
    });
    
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
    
    app.post('/comprehensive/gaming/audio' , function(req , res){
        
//        console.log("/comprehensive/gaming/audio::\t"+JSON.stringify(req.body));
        
        var different_events = new Array();
        var _id = req.body._id;
        var set = req.body.set;
        var session_token = req.body.session_token;
        var start_session = req.body.start_session;
        var end_session = req.body.end_session;
        
//        console.log("session_token:\t"+req.body.session_token);
        
        var json_entry = {
            time_of_start: req.body.different_events[0].time_of_start,
            string_question: req.body.different_events[0].string_question,
            level: parseInt(req.body.different_events[0].level),
            time_of_submission: req.body.different_events[0].time_of_submission,
            string_answer: req.body.different_events[0].string_answer,
            lives_till_used : req.body.different_events[0].lives_till_used,
            success: String(req.body.different_events[0].success)
        };

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
    
    app.post('/comprehensive/gaming/visual' , function(req , res){
        
//        console.log("/comprehensive/gaming/visual::\t"+JSON.stringify(req.body));
        
        var different_events = new Array();
        var _id = req.body._id;
        var set = req.body.set;
        var session_token = req.body.session_token;
        var start_session = req.body.start_session;
        var end_session = req.body.end_session;
        
//        console.log("session_token:\t"+req.body.session_token);
        
        var json_entry = {
            time_of_start: req.body.different_events[0].time_of_start,
            string_question: req.body.different_events[0].string_question,
            level: parseInt(req.body.different_events[0].level),
            time_of_submission: req.body.different_events[0].time_of_submission,
            string_answer: req.body.different_events[0].string_answer,
            lives_till_used : req.body.different_events[0].lives_till_used,
            success: String(req.body.different_events[0].success)
        };

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
    
    app.post('/comprehensive/gaming/with' , function(req , res){
        
//        console.log("/comprehensive/gaming/with::\t"+JSON.stringify(req.body));
        
        var different_events = new Array();
        var _id = req.body._id;
        var set = req.body.set;
        var session_token = req.body.session_token;
        var start_session = req.body.start_session;
        var end_session = req.body.end_session;
        
//        console.log("session_token:\t"+req.body.session_token);
        
        var json_entry = {
            time_of_start: req.body.different_events[0].time_of_start,
            string_question: req.body.different_events[0].string_question,
            level: parseInt(req.body.different_events[0].level),
            time_of_submission: req.body.different_events[0].time_of_submission,
            string_answer: req.body.different_events[0].string_answer,
            lives_till_used : req.body.different_events[0].lives_till_used,
            success: String(req.body.different_events[0].success)
        };

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
    
    app.post('/comprehensive/gaming/without' , function(req , res){
        
        console.log("/comprehensive/gaming/without::\t"+JSON.stringify(req.body));
        
        var different_events = new Array();
        var _id = req.body._id;
        var set = req.body.set;
        var session_token = req.body.session_token;
        var start_session = req.body.start_session;
        var end_session = req.body.end_session;
        
//        console.log("session_token:\t"+req.body.session_token);
        
        var json_entry = {
            time_of_start: req.body.different_events[0].time_of_start,
            string_question: req.body.different_events[0].string_question,
            level: parseInt(req.body.different_events[0].level),
            time_of_submission: req.body.different_events[0].time_of_submission,
            string_answer: req.body.different_events[0].string_answer,
            lives_till_used : req.body.different_events[0].lives_till_used,
            success: String(req.body.different_events[0].success)
        };

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
 
 
    app.post('/api/resetpass' ,  function(req ,  res) {
 
        var email = req.body.email;
 
        chgpass.respass_init(email , function(found){
//                console.log(found);
                res.json(found);
        });
    });
 
 
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