
var Puddle = require("./index");

var puddle = new Puddle([ 
    { hostname: '127.0.0.1', port: 80   },
    { hostname: '127.0.0.1', port: 8181 }
]);

puddle.on('healthy', function(node) { 
    console.log("%s:%s is up", node.hostname, node.port);
});                  

puddle.on('sick', function(node) { 
    console.log("%s:%s is down", node.hostname, node.port);
});                      

puddle.on('static', function(node) { 
    console.log("%s:%s static", node.hostname, node.port);
});

setInterval(
    function() { 
        console.log("checking the puddle");
        puddle.ping();
    }, 
    5000
);
