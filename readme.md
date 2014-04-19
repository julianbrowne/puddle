# Puddle

Puddle manages a small pool of HTTP server endpoints, indicating which ones are up or down at any moment.

All server endpoints start in a state of 'undefined'. Each server is periodically 'pinged' (HTTP HEAD of '/') to check it's status. There are two states: 'healthy' and 'sick'. On a state change an event is emitted. For debugging and monitoring purposes a 'static' event is emitted when there has been no change in a server's availability since the last check.

## Bundled Example

    git clone https://github.com/julianbrowne/puddle.git

    cd puddle

    node puddle

## Install (NPM)

    npm install git+https://github.com/julianbrowne/puddle.git

## Usage

    var Puddle = require("puddle");

    var puddle = new Puddle([ 
        { hostname: '127.0.0.1', port: 80   },
        { hostname: '127.0.0.1', port: 8181 }
    ]);

    // events return a 'node' object: { hostname: x, port: y, healthy: true/false, reason: timestamp/error-code }

    puddle.on('healthy', function(node) { ... });

    puddle.on('sick', function(node) { ... });

    puddle.on('static', function(node) { ... });
