//var chgpass = require('./config/chgpass');
var register = require('../config/register');
var login = require('../config/login');
var sessions = require('../config/sessions');
 
module.exports = function(app) {
    
    app.get('/' ,  function(req ,  res) {
        res.end("Node-Android-Project");
    });

    app.post('/login' , function(req , res){
        var email = req.body.email;
        var password = req.body.password;
        
        login.login(email , password , function (found) {
            console.log(found);
            res.json(found);
        });
    });

 
    app.post('/register' , function(req , res){
        
        var email = req.body.email;
        var password = req.body.password;
        var name = req.body.name;
        var phone = req.body.phone;
        
        register.register(email , password , name , phone , function (found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/comprehensive/with' , function(req , res){
        
        var different_events = new Array();
        var _id = req.body._id;
        
        for(var i = parseInt(0) ; i < parseInt(req.body.different_events.length) ;i++)
        {
            different_events[i] = {
                string_answer: req.body.different_events[i].string_answer,
                string_question: req.body.different_events[i].string_question,
                time_of_start: req.body.different_events[i].time_of_start,
                time_of_end: req.body.different_events[i].time_of_end,
                level: parseInt(req.body.level),
                success: Boolean(String(req.body.different_events[i].success)),
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
            console.log("\n\n\n"+JSON.stringify(found)+"\n\n\n");
            res.json(found);
        });
    });
    
    app.post('/comprehensive/without' , function(req , res){
        
        var different_events = new Array();
        var _id = req.body._id;
        
        for(var i = parseInt(0) ; i < parseInt(req.body.different_events.length) ;i++)
        {
            different_events[i] = {
                string_answer: req.body.different_events[i].string_answer,
                string_question: req.body.different_events[i].string_question,
                time_of_start: req.body.different_events[i].time_of_start,
                time_of_end: req.body.different_events[i].time_of_end,
                level: parseInt(req.body.level),
                success: Boolean(String(req.body.different_events[i].success)),
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
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/gaming/with' , function(req , res){
        
        var different_events = new Array();
        var _id = req.body._id;
        
        for(var i = parseInt(0) ; i < parseInt(req.body.different_events.length) ;i++)
        {
            different_events[i] = {
                string_answer: req.body.different_events[i].string_answer,
                string_question: req.body.different_events[i].string_question,
                time_of_start: req.body.different_events[i].time_of_start,
                time_of_end: req.body.different_events[i].time_of_end,
                lives_till_used: parseInt(req.body.different_events[i].lives_till_used),
                level: parseInt(req.body.level),
                success: Boolean(String(req.body.different_events[i].success)),
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
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/gaming/without' , function(req , res){
        
        var different_events = new Array();
        var _id = req.body._id;
        
        for(var i = parseInt(0) ; i < parseInt(req.body.different_events.length) ;i++)
        {
            different_events[i] = {
                string_answer: req.body.different_events[i].string_answer,
                string_question: req.body.different_events[i].string_question,
                time_of_start: req.body.different_events[i].time_of_start,
                time_of_end: req.body.different_events[i].time_of_end,
                lives_till_used: parseInt(req.body.different_events[i].lives_till_used),
                level: parseInt(req.body.level),
                success: Boolean(String(req.body.different_events[i].success)),
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
            console.log(found);
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
    });
 
 
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
    });*/
 
 
};