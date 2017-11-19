var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var users = require('../../Models/userModel');
var Globals = require('../../Globals/variables');

exports.session = function (w_wo , _id , entry , callback)
{    
    if (Globals.debug)
    {
        console.log("\n"+"entry :\t"+JSON.stringify(entry));
        console.log("\ngame_score:\t\t"+entry.game_score);
    }
    
    var set = "set_"+entry.set;
    if(w_wo==3) //Without Distraction
    {
        
        users.findOne(
            {
                _id : ObjectId(_id)
            }
        ).exec(
            function(err,instance){
                
                instance.comprehensive_events.id(entry.session_token).set({ "end_session" :entry.json_entry[entry.json_entry.length-1].time_of_submission});
                instance.comprehensive_events.id(entry.session_token)[set].scores.WO_Distraction=entry.game_score;
                for(var i=0;i<entry.json_entry.length;i++)
                {
                    instance.comprehensive_events.id(entry.session_token)[set].WO_Distraction.push(entry.json_entry[i]);
                }
                instance.save(function(err,model){
                    if(err)
                    {
                        callback({res:false,response:"Error in updation"});
                        if (Globals.debug)
                            console.log("\nError found");
                    }
                    else
                    {
                        callback({res:true,w_id:model._id});
                        if (Globals.debug)
                            console.log("\nSuccess");
                    }
                });
            }
        );
    }
    else if(w_wo==0)//Audio Only
    {
        users.findOne(
            {
                _id : ObjectId(_id)
            }
        ).exec(
            function(err,instance){
                
                instance.comprehensive_events.id(entry.session_token).set({ "end_session" :entry.json_entry[entry.json_entry.length-1].time_of_submission});
                
                instance.comprehensive_events.id(entry.session_token)[set].scores.Audio=entry.game_score;
                for(var i=0;i<entry.json_entry.length;i++)
                {
                    instance.comprehensive_events.id(entry.session_token)[set].Audio.push(entry.json_entry[i]);
                }
                instance.save(function(err,model){
                    if(err)
                    {
                        callback({res:false,response:"Error in updation"});
                        if (Globals.debug)
                            console.log(callback);
                    }
                    else
                    {
                        callback({res:true,w_id:model._id});
                        if (Globals.debug)
                            console.log(callback);
                    }
                });
            }
        );
    }
    else if(w_wo==1) //Visual Only
    {
        users.findOne(
            {
                _id : ObjectId(_id)
            }
        ).exec(
            function(err,instance){
                
                instance.comprehensive_events.id(entry.session_token).set({ "end_session" :entry.json_entry[entry.json_entry.length-1].time_of_submission});
                
                instance.comprehensive_events.id(entry.session_token)[set].scores.Visual=entry.game_score;
                for(var i=0;i<entry.json_entry.length;i++)
                {
                    instance.comprehensive_events.id(entry.session_token)[set].Visual.push(entry.json_entry[i]);
                }
                instance.save(function(err,model){
                    if(err)
                    {
                        callback({res:false,response:"Error in updation"});
                        if (Globals.debug)
                            console.log(callback);
                    }
                    else
                    {
                        callback({res:true,w_id:model._id});
                        if (Globals.debug)
                            console.log(callback);
                    }
                });
            }
        );
    }
    else if(w_wo==2) //With Distraction And Gaming
    {
        users.findOne(
            {
                _id : ObjectId(_id)
            }
        ).exec(
            function(err,instance){
                
                instance.comprehensive_events.id(entry.session_token).set({ "end_session" :entry.json_entry[entry.json_entry.length-1].time_of_submission});
                
                instance.comprehensive_events.id(entry.session_token)[set].scores.W_Distraction=entry.game_score;
                for(var i=0;i<entry.json_entry.length;i++)
                {
                    instance.comprehensive_events.id(entry.session_token)[set].W_Distraction.push(entry.json_entry[i]);
                }
                instance.save(function(err,model){
                    if(err)
                    {
                        callback({res:false,response:"Error in updation"});
                        if (Globals.debug)
                            console.log(callback);
                    }
                    else
                    {
                        callback({res:true,w_id:model._id});
                        if (Globals.debug)
                            console.log(callback);
                    }
                });
            }
        );
    }
}
exports.new_session = function (_id,entry,session_token,callback){
    console.log("\nIN Utils.function :: \t new_session");
    users.findByIdAndUpdate(_id, 
            {$push: {"comprehensive_events": entry}},
            {safe: true, upsert: true,new:true},
        function (err, model) {
            if (err) {
                callback({
                    success: false,
                    response: "Some error occured."
                });
                if (Globals.debug)
                    console.log("\nSome error ocurred");
            } else {
                callback({
                    success: true,
                    session_token: session_token
                });
                if (Globals.debug)
                    console.log("\nSuccesfully updated");
            }
    });
}