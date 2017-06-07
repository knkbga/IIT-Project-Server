var users = require('../config/models');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

exports.session = function (w_wo , _id , entry , callback)
{    
    console.log("\nIn sessions.session\n");
    if(w_wo==0)//With Distraction Not Gaming
    {
        users.findByIdAndUpdate(ObjectId(_id), 
        {$push: {"comprehensive_events.trials.W_Distraction": entry}},
        {safe: true, upsert: true,new:true},
        function(err, model)
        {
            if(err)
            {
                callback({res:false,response:"Error in updation"});
            }
            else
            {
                callback({res:true,w_id:model._id});
                console.log(model);
            }
        });
    }
    else if(w_wo==1) //Without Distraction Not Gaming
    {
        users.findByIdAndUpdate(ObjectId(_id), 
        {$push: {"comprehensive_events.trials.WO_Distraction": entry}},
        {safe: true, upsert: true,new:true},
        function(err, model)
        {
            if(err)
            {
                callback({res:false,response:"Error in updation"});
            }
            else
            {
                callback({res:true,wo_id:model._id});
                console.log(model);
            }
        });
    }
    else if(w_wo==2) //With Distraction And Gaming
    {
        users.findByIdAndUpdate(ObjectId(_id), 
        {$push: {"comprehensive_events.gaming.W_Distraction": entry}},
        {safe: true, upsert: true,new:true},
        function(err, model)
        {
            if(err)
            {
                callback({res:false,response:"Error in updation"});
            }
            else
            {
                callback({res:true,g_w_id:model._id});
                console.log(model);
            }
        });
    }
    else if(w_wo==3) //Without Distraction And Gaming
    {
        users.findByIdAndUpdate(ObjectId(_id), 
        {$push: {"comprehensive_events.gaming.WO_Distraction": entry}},
        {safe: true, upsert: true,new:true},
        function(err, model)
        {
            if(err)
            {
                callback({res:false,response:"Error in updation"});
            }
            else
            {
                callback({res:true,g_wo_id:model._id});
                console.log(model);
            }
        });
    }
}