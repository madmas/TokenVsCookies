module.exports = function (grunt, options) {


    return {

        options: {

            // options passed directly to grunt-contrib-connect task
            livereload: true,
            port      : 8000,

            // protocol  : 'http',
            // cert paths relative to Gruntfile.js
            // ca        : 'certs/ca.pem',
            // key       : 'certs/server/https-server-key.pem',
            // cert      : 'certs/server/https-server-cert.pem',
            // passphrase: 'c0me!n',

            // middleware for serving static resource files
            resources : [
                { path: '.tmp', context: '/', options: { index: 'index.html' } },
                { path: '.' }
            ],

            // middleware for setting the HTTP headers
            headers   : {

                // these HTTP headers are also send to proxy target
                request : {
                    'x-custom-token': 'MY-CUSTOM-TOKEN'
                },

                // these HTTP headers will be set on the response to the browser
                response: {
                    'Cache-Control': 'no-cache, max-age=0, must-revalidate',
                    'Expires'      : 'Fri, 01 Jan 2020 00:00:00 GMT',
                    'Pragma'       : 'no-cache'
                }
            },

            proxy: {
                // proxy environment config
                env : 'dev'
            }

        },

        dev: {
            options: {
                open: 'http://localhost:8000/',
                debug: true
            }
        },

        e2edev: {
            options: {
                port      : 8001,
                open: 'http://localhost:8000/',
                debug: true
            }
        },

        dist: {
            options: {
                keepalive : true,
                livereload: false,

                resources: [
                    { path: '<%= config.dir.dist %>', context: '/home', options: { index: 'index.html' } }
                ]
            }
        }
    };
};
