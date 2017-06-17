var chgpass = require('../config/chgpass');
var register = require('../config/register');
var login = require('../config/login');
var sessions = require('../config/sessions');
var path = require('path');
var mime = require('mime');
var fs = require('fs');

module.exports = function(app) {
    
    app.get('/' ,  function(req ,  res) {
        console.log("Get Requested");
        res.end("Node-Android-Project");
    });

    app.get('/download' , function(req,res){
       
        res.end("Updated app is in progress...");
        /*console.log("Download requested");
        var file = __dirname + '/../APK/app-release.apk';

        var filename = path.basename(file);
        var mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);

        var filestream = fs.createReadStream(file);
        filestream.pipe(res);*/
        
    });
    
    app.post('/login' , function(req , res){
        console.log("In login");
        var email = req.body.email;
        var password = req.body.password;
        var password = req.body.password;
        
        login.login(email , password , app_code , function (found) {
            console.log(found);
            res.json(found);
        });
    });

 
    app.post('/register' , function(req , res){
        
        console.log("Register Params::\t"+JSON.stringify(req.body));
        
        var email = req.body.email;
        var password = req.body.password;
        var name = req.body.name;
        var phone = req.body.phone;
        var gender = req.body.gender;
        var age = req.body.age;
        var sleep_hours = req.body.sleep_hours;
        var grade_10 = req.body.grade_10;
        var test_rank = req.body.test_rank;
        var institute = req.body.institute;
        
        register.register(email , password , name , phone , gender , age , grade_10 , sleep_hours , test_rank , institute , function (found) {
            res.json(found);
        });
    });
    
    app.post('/comprehensive/trial/with' , function(req , res){
        
        console.log("/comprehensive/trial/with::\t"+JSON.stringify(req.body));
        
        var different_events = new Array();
        var _id = req.body._id;
        
        for(var i = parseInt(0) ; i < parseInt(req.body.different_events.length) ;i++)
        {
            different_events[i] = {
                lives_till_used : req.body.different_events[i].lives_till_used,
                string_answer: req.body.different_events[i].string_answer,
                set_number: req.body.different_events[i].set_number,
                string_question: req.body.different_events[i].string_question,
                time_of_start: req.body.different_events[i].time_of_start,
                time_of_end: req.body.different_events[i].time_of_end,
                level: parseInt(req.body.different_events[i].level),
                success: String(req.body.different_events[i].success),
                time_of_submission: req.body.different_events[i].time_of_submission
            };
        }

        var entry ={
            start_session: req.body.start_session,
            end_session: req.body.end_session,
            point_end: parseInt(req.body.point_end),
            different_events: different_events
        };
        
        sessions.session(0 , _id , entry , function(found)
        {
//            console.log("\n\n\n"+JSON.stringify(found)+"\n\n\n");
            res.json(found);
        });
    });
    
    app.post('/comprehensive/trial/without' , function(req , res){
        
        console.log("/comprehensive/trial/without::\t"+JSON.stringify(req.body));
        
        var different_events = new Array();
        var _id = req.body._id;
        
        for(var i = parseInt(0) ; i < parseInt(req.body.different_events.length) ;i++)
        {
            different_events[i] = {
                lives_till_used : req.body.different_events[i].lives_till_used,
                string_answer: req.body.different_events[i].string_answer,
                set_number: req.body.different_events[i].set_number,
                string_question: req.body.different_events[i].string_question,
                time_of_start: req.body.different_events[i].time_of_start,
                time_of_end: req.body.different_events[i].time_of_end,
                level: parseInt(req.body.different_events[i].level),
                success: String(req.body.different_events[i].success),
                time_of_submission: req.body.different_events[i].time_of_submission
            };
            
        }

        var entry ={
            start_session: req.body.start_session,
            end_session: req.body.end_session,
            point_end: parseInt(req.body.point_end),
            different_events: different_events
        };
        
        sessions.session(1 , _id, entry , function(found)
        {
//            console.log("\n\n\n"+JSON.stringify(entry)+"\n\n\n\n");
            res.json(found);
        });
    });
    
    app.post('/comprehensive/gaming/with' , function(req , res){
        
        console.log("/comprehensive/gaming/with::\t"+JSON.stringify(req.body));
        
        var different_events = new Array();
        var _id = req.body._id;
        
        for(var i = parseInt(0) ; i < parseInt(req.body.different_events.length) ;i++)
        {
            different_events[i] = {
                lives_till_used : req.body.different_events[i].lives_till_used,
                string_answer: req.body.different_events[i].string_answer,
                set_number: req.body.different_events[i].set_number,
                string_question: req.body.different_events[i].string_question,
                time_of_start: req.body.different_events[i].time_of_start,
                time_of_end: req.body.different_events[i].time_of_end,
                lives_till_used: parseInt(req.body.different_events[i].lives_till_used),
                level: parseInt(req.body.different_events[i].level),
                success: String(req.body.different_events[i].success),
                time_of_submission: req.body.different_events[i].time_of_submission
            };
        }

        var entry ={
            start_session: req.body.start_session,
            end_session: req.body.end_session,
            point_end: parseInt(req.body.point_end),
            different_events: different_events
        };
        
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
        
        for(var i = parseInt(0) ; i < parseInt(req.body.different_events.length) ;i++)
        {
            different_events[i] = {
                lives_till_used : req.body.different_events[i].lives_till_used,
                string_answer: req.body.different_events[i].string_answer,
                set_number: req.body.different_events[i].set_number,
                string_question: req.body.different_events[i].string_question,
                time_of_start: req.body.different_events[i].time_of_start,
                time_of_end: req.body.different_events[i].time_of_end,
                lives_till_used: parseInt(req.body.different_events[i].lives_till_used),
                level: parseInt(req.body.different_events[i].level),
                success: String(req.body.different_events[i].success),
                time_of_submission: req.body.different_events[i].time_of_submission
            };
        }

        var entry ={
            start_session: req.body.start_session,
            end_session: req.body.end_session,
            point_end: parseInt(req.body.point_end),
            different_events: different_events
        };
        
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
                console.log(found);
                res.json(found);
        });
    });
 
 
    app.post('/api/resetpass/chg' ,  function(req ,  res) {
 
        var email = req.body.email;
        var code = req.body.code;
        var npass = req.body.newpass;
 
        chgpass.respass_chg(email , code , npass , function(found){
                console.log(found);
                res.json(found);
        });
    });
 
 
};