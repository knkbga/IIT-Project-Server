//Change to corresponding environment
var Global = {
    env: "PROD_IIT",
    debug: false
};

switch (Global.env) {
    case "PROD_MZF":
        {
            Global.connect_url = "mongodb://mzf:1Direction@ds129422.mlab.com:29422/muzaffarnagar";
        }
        break;
    case "PROD_IIT":
        {
            Global.connect_url = "mongodb://iit:1Direction@ds129003.mlab.com:29003/iit_delhi";
        }
        break;
    case "LOCAL":
        {
            Global.connect_url = "mongodb://localhost/test";
        }
}

module.exports = Global;
