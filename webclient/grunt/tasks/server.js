'use strict';
module.exports = function (grunt) {

    var _ = require('lodash');
    var URL = require('url');
    var path = require('path');
    var connect = require(path.join(process.cwd(), 'node_modules/grunt-contrib-connect/node_modules/connect'));

    var proxy = require('./lib/middleware/proxy');
    var headers = require('./lib/middleware/headers');

    function logHeaders(msg, headers) {
        grunt.log.debug(msg, JSON.stringify(headers, null, 2));
    }

    function normalizeTargets(targets, https) {
        return targets.map(function (target) {
            var url = URL.parse(target.target);
            if (/^https/.test(url.protocol) && https) {
                target.https = https;
            }
            if (!Array.isArray(target.context)) {
                target.context = [ target.context ];
            }
            return target;
        });
    }

    function normalizeResources(resources) {
        return resources.map(function (resource) {
            if (typeof resource === 'string') {
                return { path: resource, context: '/' };
            }
            if (!resource.hasOwnProperty('context')) {
                resource.context = '/';
            }
            return resource;
        });
    }

    grunt.registerMultiTask('server', 'Creates configuration for the grunt-contrib-connect grunt task and runs it', function () {

        var task = this;
        var opts = task.options({
            // custom server options
            middleware: [],
            resources : [],
            headers   : {},
            proxy     : {}
        });

        var options = _.clone(opts);
        var middleware = options.middleware;

        if (opts.ca) {
            options.ca = grunt.file.read(opts.ca);
        }
        if (opts.key) {
            options.key = grunt.file.read(opts.key);
        }
        if (opts.cert) {
            options.cert = grunt.file.read(opts.cert);
        }

        // add request header middleware
        if (options.headers.request) {
            logHeaders('Using request headers:', options.headers.request);
            middleware.push(headers.request(grunt, options.headers.request));
        }
        // add proxy middleware

        grunt.log.ok();

        var env = options.proxy.env;
        var targets = grunt.config.get([ 'proxy', env, 'targets']);

        grunt.log.write('Loading proxy: %s ...', env.green).ok();

        if (targets) {
            targets = normalizeTargets(targets, {});
            targets.forEach(function (target) {
                target.context.forEach(function (ctx) {
                    grunt.log.debug("Using proxy:", ctx, "=>", target.target);
                });
                middleware.push(proxy(grunt, target));
            });
        } else {
            grunt.log.error('Proxy environment "' + env.red + '" not found');
        }

        // add response header middleware
        if (options.headers.response) {
            logHeaders('Using response headers:', options.headers.response);
            middleware.push(headers.response(grunt, options.headers.response));
        }

        // add connect static middleware for serving static resource files
        var resources = options.resources;
        if (resources) {
            resources = normalizeResources(resources);
            resources.forEach(function (resource) {
                grunt.verbose.writeln('Using resource path: ' + JSON.stringify(resource));
                // make this path available under the given context
                grunt.log.debug('Serving resources from: %s => %s', resource.path, resource.context);
                middleware.push(connect().use(resource.context, connect.static(resource.path, resource.options || {})));
            })
        } else {
            grunt.log.error('No resource definitions found');
        }

        // if this task was started with the keepalive flag,
        // then pass it to the plugin
        options.keepalive = this.flags.keepalive || options.keepalive;

        // cleanup invalid grunt-contrib-connect options
        delete options.resources;
        delete options.headers;
        delete options.proxy;

        var config = {
            // default options for the connect task
            options: options
        };
        config[task.target] = { /* empty target to execute */ };

        // set the created configuration
        grunt.config.set('connect.' + task.target, config);

        // run the configured task
        grunt.task.run('connect:' + task.target);
    });
};
