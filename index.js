/**
 *  puddle
 *
 *  Regularly inspects a small pool (puddle) of servers and
 *  reports back on their state of health
 *
**/

'use strict';

var http = require("http");
var util = require("util");
var EventEmitter = require('events').EventEmitter;

function Puddle(servers) { 

    var puddle = this;
    this.servers = [];

    this.ping = function() { 
        this.servers.forEach(this.pingServer);
    };

    this.dump = function() { 
        return this.servers;
    };

    this.pingServer = function(server) { 

        var options = { 
          hostname: server.hostname,
          port: server.port,
          path: '/',
          method: 'HEAD'
        };

        var request = http.request(options, function(response) { 
            if(!server.healthy) { 
                server.healthy = true;
                server.reason  = new Date();
                puddle.emit('healthy', server);
            }
            else { 
                server.reason  = new Date();
                puddle.emit('static', server);
            }
        });

        request.on('error', function(error) { 
            if(server.healthy === false) { 
                server.reason  = error;
                puddle.emit('static', server);
            }
            else { 
                server.healthy = false;
                server.reason  = error;
                puddle.emit('sick', server);
            }
        });

        request.end();

    }

    servers.forEach(function(server) { 
        server.healthy = undefined;
        puddle.servers.push(server);
    });

    puddle.ping();

};

util.inherits(Puddle, EventEmitter);

module.exports = Puddle;
