'use strict';

module.exports = function (app) {
    var webConsoleService = require('../service/webConsoleService');

    app.route('/version')
        .post(webConsoleService.getVersion)
        .get(webConsoleService.getVersion)
    ;
};