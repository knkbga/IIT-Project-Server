var mongoose = require('mongoose');

var versionSchema = mongoose.Schema({
    "version_list":
    [
        {
            "version" : String,
            "date-of-issue" : String,
            "new-features" : [String],
            "beta" : Boolean,
            "release-number" : Number
        }
    ],
    "latest_version":
    {
        "version" : String,
        "date-of-issue" : String,
        "new-features" : [String],
        "beta" : Boolean,
        "release-number" : Number
    }
});

var model = mongoose.model('version', versionSchema);

module.exports = model;