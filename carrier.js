var genericPool = require('generic-pool')
var multiplex = require('multiplex')
var uuid = require('uuid');

var multiplex = require('multiplex')
var websocketStream = require('websocket-stream')
var url = require('url')

var opts = {
    max: 3, // maximum size of the pool
    min: 1, // minimum size of the pool
    acquireTimeoutMillis: 5000
}

var HttpsProxyAgent = require('https-proxy-agent')


var HTTPPROXY = process.env.http_proxy

if (HTTPPROXY) {
    console.log("http proxy:", HTTPPROXY)
}

var cfg = {
    create: function (config) {

        return new Promise(function (resolve, reject) {

            var agent = null

            if (HTTPPROXY) {
                var endpoint = config.getServer()
                var parsed = url.parse(endpoint)

                opts.secureEndpoint = parsed.protocol ? parsed.protocol == 'wss:' : false
                agent = new HttpsProxyAgent(opts)
            }

            var ws = new websocketStream(config.ws_url, {
                agent: agent
            });

            var plex = multiplex();

            ws.socket.on('open', function () {
                resolve({
                    ws: ws,
                    plex: plex
                });
            });

            function onReject() {
                reject()
            }

            ws.on('end', function () {
                reject()
            });

            plex.pipe(ws)
            ws.pipe(plex)

            ws.on('error', onReject)

            ws.socket.on('error', onReject)
            ws.socket.on('unexpected-response', onReject)
        });
    },

    destroy: function (resource) {

        return new Promise(function (resolve) {

            function onDone() {
                resolve();
            }

            resource.ws.on('end', onDone)
            resource.ws.on('error', onDone)
        });
    }
}


function carrierPool(config) {

    var pool_config = {
        create: cfg.create.bind(null, config),
        destroy: cfg.destroy
    }

    var myPool = genericPool.createPool(pool_config, opts)

    return myPool;
}

module.exports = {
    opts: opts,
    cfg: cfg,
    carrierPool: carrierPool
}