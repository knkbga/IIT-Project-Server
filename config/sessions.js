var users = require('../config/models');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

exports.session = function (w_wo , _id , entry , callback)
{    
    console.log("\n\n\n\n\n\t\t\t\t\t"+"entry :\t"+JSON.stringify(entry)+"\n\n\n\n\n");
    
    if(w_wo==3) //Without Distraction
    {
        
        users.findOne(
            {
                _id : ObjectId(_id)
            }
        ).exec(
            function(err,instance){                
                switch(entry.set)
                {
                    case 1:
                    {
                        instance.comprehensive_events.id(entry.session_token).set_1.WO_Distraction.push(entry.json_entry)
                        instance.save(function(err,model){
                            if(err)
                            {
                                callback({res:false,response:"Error in updation"});
                                console.log("Error found");
                            }
                            else
                            {
                                callback({res:true,w_id:model._id});
                                console.log("Success");
                            }
                        });
                    }
                    break;
                    case 2:
                    {
                        instance.comprehensive_events.id(entry.session_token).set_2.WO_Distraction.push(entry.json_entry)
                        instance.save(function(err,model){
                            if(err)
                            {
                                callback({res:false,response:"Error in updation"});
                                console.log(callback);
                            }
                            else
                            {
                                callback({res:true,w_id:model._id});
                                console.log(callback);
                            }
                        });
                    }
                    break;
                    case 3:
                    {
                        instance.comprehensive_events.id(entry.session_token).set_3.WO_Distraction.push(entry.json_entry)
                        instance.save(function(err,model){
                            if(err)
                            {
                                callback({res:false,response:"Error in updation"});
                                console.log(callback);
                            }
                            else
                            {
                                callback({res:true,w_id:model._id});
                                console.log(callback);
                            }
                        });
                    }
                    break;
                }
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
                switch(entry.set)
                {
                    case 1:
                    {
                        instance.comprehensive_events.id(entry.session_token).set_1.Audio.push(entry.json_entry)
                        instance.save(function(err,model){
                            if(err)
                            {
                                callback({res:false,response:"Error in updation"});
                                console.log(callback);
                            }
                            else
                            {
                                callback({res:true,w_id:model._id});
                                console.log(callback);
                            }
                        });
                    }
                    break;
                    case 2:
                    {
                        instance.comprehensive_events.id(entry.session_token).set_2.Audio.push(entry.json_entry)
                        instance.save(function(err,model){
                            if(err)
                            {
                                callback({res:false,response:"Error in updation"});
                                console.log(callback);
                            }
                            else
                            {
                                callback({res:true,w_id:model._id});
                                console.log(callback);
                            }
                        });
                    }
                    break;
                    case 3:
                    {
                        instance.comprehensive_events.id(entry.session_token).set_3.Audio.push(entry.json_entry)
                        instance.save(function(err,model){
                            if(err)
                            {
                                callback({res:false,response:"Error in updation"});
                                console.log(callback);
                            }
                            else
                            {
                                callback({res:true,w_id:model._id});
                                console.log(callback);
                            }
                        });
                    }
                    break;
                }
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
                switch(entry.set)
                {
                    case 1:
                    {
                        instance.comprehensive_events.id(entry.session_token).set_1.Visual.push(entry.json_entry)
                        instance.save(function(err,model){
                            if(err)
                            {
                                callback({res:false,response:"Error in updation"});
                                console.log(callback);
                            }
                            else
                            {
                                callback({res:true,w_id:model._id});
                                console.log(callback);
                            }
                        });
                    }
                    break;
                    case 2:
                    {
                        instance.comprehensive_events.id(entry.session_token).set_2.Visual.push(entry.json_entry)
                        instance.save(function(err,model){
                            if(err)
                            {
                                callback({res:false,response:"Error in updation"});
                                console.log(callback);
                            }
                            else
                            {
                                callback({res:true,w_id:model._id});
                                console.log(callback);
                            }
                        });
                    }
                    break;
                    case 3:
                    {
                        instance.comprehensive_events.id(entry.session_token).set_3.Visual.push(entry.json_entry)
                        instance.save(function(err,model){
                            if(err)
                            {
                                callback({res:false,response:"Error in updation"});
                                console.log(callback);
                            }
                            else
                            {
                                callback({res:true,w_id:model._id});
                                console.log(callback);
                            }
                        });
                    }
                    break;
                }
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
                switch(entry.set)
                {
                    case 1:
                    {
                        instance.comprehensive_events.id(entry.session_token).set_1.W_Distraction.push(entry.json_entry)
                        instance.save(function(err,model){
                            if(err)
                            {
                                callback({res:false,response:"Error in updation"});
                                console.log(callback);
                            }
                            else
                            {
                                callback({res:true,w_id:model._id});
                                console.log(callback);
                            }
                        });
                    }
                    break;
                    case 2:
                    {
                        instance.comprehensive_events.id(entry.session_token).set_2.W_Distraction.push(entry.json_entry)
                        instance.save(function(err,model){
                            if(err)
                            {
                                callback({res:false,response:"Error in updation"});
                                console.log(callback);
                            }
                            else
                            {
                                callback({res:true,w_id:model._id});
                                console.log(callback);
                            }
                        });
                    }
                    break;
                    case 3:
                    {
                        instance.comprehensive_events.id(entry.session_token).set_3.W_Distraction.push(entry.json_entry)
                        instance.save(function(err,model){
                            if(err)
                            {
                                callback({res:false,response:"Error in updation"});
                                console.log(callback);
                            }
                            else
                            {
                                callback({res:true,w_id:model._id});
                                console.log(callback);
                            }
                        });
                    }
                    break;
                }
            }
        );
    }
}