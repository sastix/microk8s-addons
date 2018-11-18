'use strict';
module.exports = function (app) {
    var routes = require('../common/routes');
    var webConsoleService = require('../service/webConsoleService');
    var mk8sService = require('../service/mk8sService');

    app.route('/'+routes.VERSION)
        .post(webConsoleService.getVersion)
        .get(webConsoleService.getVersion)
    ;
    app.route('/'+routes.DNS+'/:pathVar')
        .get(mk8sService.dns)
};