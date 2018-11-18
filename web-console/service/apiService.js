'user strict';
exports.echo = function (req, res) {
    var value  = req.params.value;
    console.log("echo called: " + value);
    res.json({echo:value});
};