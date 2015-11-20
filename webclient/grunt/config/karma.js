module.exports = function (grunt, options) {

    var browsers = {
        'chrome' : 'Chrome',
        'ie'     : 'IE',
        'phantom': 'PhantomJS',
        'default': 'PhantomJS'
    };
    var option = grunt.option('browser');
    var browser = option in browsers ? browsers[option] : browsers['default'];

    return {

        options: {
            autoWatch : false,
            background: true,
            frameworks: [ 'jasmine' ],
            reporters : [ 'progress' ],
            plugins   : [
                'karma-jasmine',
                'karma-ie-launcher',
                'karma-chrome-launcher',
                'karma-phantomjs-launcher'
            ],
            logLevel  : 'INFO', // 'OFF', 'ERROR', 'WARN', 'INFO', 'DEBUG',
            files     : [
                '<%= config.files.vendor.js %>',
                '<%= config.files.vendor.spec %>',
                '<%= config.files.app.jsAll %>',
                '<%= html2js.build.dest %>',
                '<%= config.files.app.spec %>'
            ]
        },

        dev: {
            browsers: [ browser ]
        },

        test: {
            singleRun : true,
            background: false,
            browsers  : [ browser ]
        },

        ie: {
            browsers: [ 'IE' ]
        },

        chrome: {
            browsers: [ 'Chrome' ]
        },

        phantom: {
            browsers: [ 'PhantomJS' ]
        },

        ci: {
            singleRun       : true,
            background      : false,
            colors          : false,
            reporters       : [ 'dots', 'coverage', 'html', 'teamcity'],
            browsers        : [ 'PhantomJS' ],
            plugins         : [
                'karma-jasmine',
                'karma-coverage',
                'karma-htmlfile-reporter',
                'karma-teamcity-reporter',
                'karma-phantomjs-launcher'
            ],
            htmlReporter    : {
                outputFile: 'reports/karma-results.html'
            },
            coverageReporter: {
                type: 'html', dir: 'reports/coverage/'
            },
            preprocessors   : {
                'src/app/**/*.js': 'coverage'
            }
        },

        dist: {
            singleRun       : true,
            background      : false,
            colors          : false,
            reporters       : [ 'dots' ],
            browsers        : [ 'PhantomJS' ],
            plugins         : [
                'karma-jasmine',
                'karma-phantomjs-launcher'
            ],
            options         : {
                files: [
                    '<%= config.dir.dist %>/scripts/vendor.*.js',
                    '<%= config.files.vendor.spec %>',
                    '<%= config.dir.dist %>/scripts/app.*.js',
                    '<%= config.files.app.spec %>'
                ]
            }
        }
    }
};
