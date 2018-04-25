/*
---------------------------------------------- 
    Glboals
---------------------------------------------- 
*/
var Globals = require("../Globals/variables");

/*
---------------------------------------------- 
    Generic Variables
----------------------------------------------
*/
var crypto = require('crypto');

const json_parse = {
    register: register_json_parse,
    new_session: new_session_json_parse,
    login: login_json_parse,
    session: session_json_parse,
    resetpass: resetpass_json_parse,
    resetpass_chg: resetpass_chg_json_parse
};

/*
---------------------------------------------- 
    json_parse Functions 
---------------------------------------------- 
*/
function register_json_parse(api_request_params) {
    if (Globals.debug)
        console.log("\nIN Utils.function :: \t" + arguments.callee.name);
    var entry = {
        email: convert_to_empty_if_null_or_undefined(api_request_params.email),
        password: convert_to_empty_if_null_or_undefined(api_request_params.password),
        name: convert_to_empty_if_null_or_undefined(api_request_params.name),
        phone: convert_to_empty_if_null_or_undefined(api_request_params.phone),
        gender: convert_to_empty_if_null_or_undefined(api_request_params.gender),
        grade_10: convert_to_empty_if_null_or_undefined(api_request_params.grade_10),
        institute: convert_to_empty_if_null_or_undefined(api_request_params.institute),
        app_code: convert_to_empty_if_null_or_undefined(api_request_params.app_code),
        dob: convert_to_empty_if_null_or_undefined(api_request_params.dob),
        jeeRollNumber: convert_to_empty_if_null_or_undefined(api_request_params.jeeRollNumber),
        jeeTotalScore: convert_to_empty_if_null_or_undefined(api_request_params.jeeTotalScore),
        jeePhysicsScore: convert_to_empty_if_null_or_undefined(api_request_params.jeePhysicsScore),
        jeeMathsScore: convert_to_empty_if_null_or_undefined(api_request_params.jeeMathsScore),
        jeeChemistryScore: convert_to_empty_if_null_or_undefined(api_request_params.jeeChemistryScore)
    }

    var returned = {
        entry: entry
    };

    if (Globals.debug)
        console.log("\n Parsed Object : \t" + JSON.stringify(returned));

    return returned;
}

function new_session_json_parse(api_request_params) {
    if (Globals.debug)
        console.log("\nIN Utils.function :: \t" + arguments.callee.name);
    var _id = api_request_params._id;
    var session_id = api_request_params._id + "comp";
    var start_session = api_request_params.start_session;
    var session_token = crypto.createHash('sha512').update(start_session + _id).digest("hex");

    var entry = {
        _id: session_token,
        start_session: start_session,
        set_1: {},
        set_2: {},
        set_3: {}
    };

    var returned = {
        _id: _id,
        entry: entry,
        session_token: session_token
    };

    if (Globals.debug)
        console.log("\n Parsed Object : \t" + JSON.stringify(returned));

    return returned;
}

function login_json_parse(api_request_params) {
    if (Globals.debug)
        console.log("\nIN Utils.function :: \t" + arguments.callee.name);
    var email = api_request_params.email;
    var password = api_request_params.password;
    var app_code = api_request_params.app_code;

    var returned = {
        email: email,
        password: password,
        app_code: app_code
    }

    if (Globals.debug)
        console.log("\n Parsed Object : \t" + JSON.stringify(returned));

    return returned;
}

function session_json_parse(api_request_params) {
    if (Globals.debug)
        console.log("\nIN Utils.function :: \t" + arguments.callee.name);
    var different_events = new Array();
    var _id = api_request_params._id;
    var set = api_request_params.set;
    var session_token = api_request_params.session_token;
    var start_session = api_request_params.start_session;
    var end_session = api_request_params.end_session;
    var name = api_request_params.name;
    var json_entry = [];

    for (var i = 0; i < api_request_params.different_events.length; i++) {
        json_entry.push({
            individual_event_score: api_request_params.different_events[i].individual_event_score,
            time_of_start: api_request_params.different_events[i].time_of_start,
            string_question: api_request_params.different_events[i].string_question,
            level: parseInt(api_request_params.different_events[i].level),
            time_of_submission: api_request_params.different_events[i].time_of_submission,
            string_answer: api_request_params.different_events[i].string_answer,
            lives_till_used: api_request_params.different_events[i].lives_till_used,
            total_volume: api_request_params.different_events[i].total_volume,
            success: String(api_request_params.different_events[i].success)
        });
    }

    var entry = {
        set: api_request_params.set,
        session_token: api_request_params.session_token,
        start_session: api_request_params.start_session,
        end_session: api_request_params.end_session,
        game_score: api_request_params.game_score,
        name: api_request_params.name,
        json_entry: json_entry
    };

    var returned = {
        entry: entry,
        _id: _id
    };

    if (Globals.debug)
        console.log("\n Parsed Object : \t" + JSON.stringify(returned));

    return returned;
}

function resetpass_json_parse(api_request_params) {
    if (Globals.debug)
        console.log("\nIN Utils.function :: \t" + arguments.callee.name);
    var email = api_request_params.email;

    var returned = {
        email: email
    }

    if (Globals.debug)
        console.log("\n Parsed Object : \t" + JSON.stringify(returned));

    return returned;
}

function resetpass_chg_json_parse(api_request_params) {
    if (Globals.debug)
        console.log("\nIN Utils.function :: \t" + arguments.callee.name);

    var email = api_request_params.email;
    var code = api_request_params.code;
    var newpass = api_request_params.newpass;

    var returned = {
        email: email,
        code: code,
        newpass: newpass
    }

    if (Globals.debug)
        console.log("\n Parsed Object : \t" + JSON.stringify(returned));

    return returned;
}

/*
---------------------------------------------- 
    Generic Functions
---------------------------------------------- 
*/
function check_if_null_or_undefined(variable) {
    // In case of a single variable
    if (typeof (variable) != 'object') {
        if (typeof (variable) == 'undefined' || variable == null) {
            return true;
        } else {
            return false;
        }
    } else {
        return isObjectEmpty(variable);
    }
    return true;
}

function convert_to_empty_if_null_or_undefined(variable) {
    if (check_if_null_or_undefined(variable)) {
        return "";
    } else {
        return variable;
    }
}

function isObjectEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))  {
            return false;
        }
    }
    return true;
}

exports.isObjectEmpty = isObjectEmpty;
exports.json_parse = json_parse;
exports.check_if_null_or_undefined = check_if_null_or_undefined;
exports.convert_to_empty_if_null_or_undefined = convert_to_empty_if_null_or_undefined;
