var URL = require('url');
var fs = require('fs');
var http = require('http');
var https = require('https');
var httpProxy = require('http-proxy');

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

module.exports = function (grunt, options) {

    var contexts, target, proxy, agent;

    options = options || {};

    if(!options.context) {
        throw new TypeError("Context is a required parameter");
    }

    if(!Array.isArray(options.context)) {
        contexts = [options.context];
    } else {
        contexts = options.context;
    }

    if(!options.target) {
        throw new TypeError("Target is a required parameter");
    }
    target = options.target;

    if(options.https) {
        options.https.rejectUnauthorized = false;
        agent = new https.Agent(options.https);
        proxy = httpProxy.createServer({ agent: agent });
    } else {
        proxy = httpProxy.createServer();
    }

    // Listen for the `error` event on `proxy`.
    proxy.on('error', function (err, req, res) {
        grunt.log.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Something went wrong. See log for more information');
    });

    contexts = contexts.map(function (context) {
        var escPath = escapeRegExp(context);
        var regex = new RegExp('^' + escPath, 'i');
        return {
            context: context,
            test: function(url) {
                return regex.test(url);
            }
        };
    });

    function find(url) {
        var i, result;
        for(i = 0; i < contexts.length; i++) {
            result = contexts[i];
            if(result.test(url)) {
                return result;
            }
        }
        return null;
    }

    function handleRedirect(proxyResponse, clientResponse, originUrl) {

        var proxyLocation = proxyResponse.headers.location;
        var redirectUrl = URL.parse(proxyLocation);

        originUrl.search = redirectUrl.search;
        originUrl.pathname = redirectUrl.pathname;
        originUrl.hash = redirectUrl.hash;

        var clientLocation = URL.format(originUrl);

        // patch the headers
        delete proxyResponse.headers.location;
        clientResponse.setHeader("location", clientLocation);

        grunt.log.debug("proxy: handle redirect: %s -> %s ".yellow, proxyLocation, clientLocation);
    }

    return function (req, res, next) {

        var origin = {
            protocol: req.connection.encrypted ? 'https:' : 'http:',
            host: req.headers.host
        };

        var ctx = find(req.url);

        if(ctx) {
            grunt.log.debug('proxy request: %s %s => %s'.green, req.method, req.url, target + req.url, JSON.stringify(req.headers, null, 2));

            proxy.once('proxyRes', function (proxyRes) {
                grunt.log.debug('proxy response: %s %s - %s %s'.yellow, req.method, req.url, proxyRes.statusCode, http.STATUS_CODES[proxyRes.statusCode], JSON.stringify(proxyRes.headers, null, 2));
                //grunt.log.debug('proxy response headers: %s <='.yellow, req.url, JSON.stringify(proxyRes.headers, null, 2));
                // if the response is a redirect then change the new location header field to localhost
                if (proxyRes.statusCode === 302) {
                    handleRedirect(proxyRes, res, origin);
                }
            });

            proxy.web(req, res, { target: target });
        } else {
            next();
        }
    };
};
