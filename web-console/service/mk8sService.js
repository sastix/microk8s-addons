'use strict';
var routes = require('../common/routes');
const operation = {
    ENABLE: 'enable',
    DISABLE: 'disable',
    STATUS: 'status'
};

exports.dns = function (req, res) {
    var pathVar  = req.params.pathVar;
    if(pathVar !== 'enable' && pathVar !== 'disable' && pathVar !== 'status'){
        var error = 'Error: You can use only enable|disable|status in context path. eg '+routes.DNS+'/enable';
        console.log(error);
        res.send(error);
    }

    switch (pathVar) {
        case 'enable':
            mk8s.dnsSync(operation.ENABLE, function(error, data){
                res.json({error: error, data: data});
            });
            break;
        case 'disable':
            mk8s.dnsSync(operation.DISABLE, function(error, data){
                res.json({error: error, data: data});
            });
            break;
        case 'status':
            res.send('Not yet supported');
            /* // uncomment when this PR https://github.com/ubuntu/microk8s/pull/178 is merged to production
            mk8s.dnsSync(operation.STATUS, function(error, data){
                res.json({error: error, data: data});
            });*/
            break;
    }
};

var mk8s = {
    dnsAsync: function(operation, cb){
        const
            { spawn } = require( 'child_process' ),
            cmd = spawn( 'microk8s.'+operation, [ 'dns' ] );

        cmd.stdout.on( 'data', data => {
            console.log( `stdout: ${data}` );
            if(cb){
                cb(null,`${data}`);
            }
        } );

        cmd.stderr.on( 'data', data => {
            console.log( `stderr: ${data}` );
            if(cb){
                cb(`${data}`,null);
            }
        } );

        cmd.on( 'close', code => {
            console.log( `child process exited with code ${code}` );
        } );
    },
    dnsSync: function(operation, cb){
        const
            { spawnSync } = require( 'child_process' ),
            cmd = spawnSync( 'microk8s.'+operation, [ 'dns' ] );

        if(cmd.stdout == null || cmd.stderr==null){
            if(cb){
                cb('microk8s seems not enabled or installed');
            }
        }else {
            console.log(`stderr: ${cmd.stderr.toString()}`);
            console.log(`stdout: ${cmd.stdout.toString()}`);
            if (cb) {
                cb(`${cmd.stderr.toString()}`, `${cmd.stdout.toString()}`);
            }
        }
    },
};