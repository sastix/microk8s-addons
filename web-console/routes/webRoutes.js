'use strict';
module.exports = function (app) {
    var routes = require('../common/routes');
    var webConsoleService = require('../service/webConsoleService');
    var mk8sService = require('../service/mk8sService');

    app.set('views', './views');
    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);


    app.route('/'+routes.VERSION)
        .post(webConsoleService.getVersion)
        .get(webConsoleService.getVersion)
    ;
    app.route('/'+routes.DNS+'/:pathVar')
        .get(mk8sService.dns);
    app.route('/')
        .get(function(req,res){
            res.render('index', { title: 'Microk8s - Web Console'})
        });
};