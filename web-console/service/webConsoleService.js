'use strict';

exports.getVersion = function (req, res) {
    var c = require('../common/constants');
    console.log("version called: "+c.APP_VERSION);
    res.json({version:c.APP_VERSION});
};