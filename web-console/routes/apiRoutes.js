'use strict';

module.exports = function (app) {
    var apiService = require('../service/apiService');

    app.route('/echo/:value')
        .post(apiService.echo)
        .get(apiService.echo)
    ;
};