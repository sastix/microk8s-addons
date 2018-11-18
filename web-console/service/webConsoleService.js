'user strict';
var VERSION = "0.0.1";
exports.getVersion = function (req, res) {
    console.log("version called: "+VERSION);
    res.json({version:VERSION});
};