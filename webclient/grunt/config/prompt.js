module.exports = function (grunt, options) {
    return {
        browser: {
            options: {
                questions: [
                    {
                        config : 'karma.dev.browsers',
                        type   : 'list',
                        message: 'Browsers for Karma',
                        default: 'Chrome',
                        choices: [ 'Chrome', 'PhantomJS', 'IE' ],
                        when: function() {
                            return !grunt.option('browser');
                        },
                        filter : function (value) {
                            return [ value ];
                        }
                    }
                ]
            }
        },

        env: {
            options: {
                questions: [
                    {
                        config : 'server.options.proxy.env',
                        type   : 'list',
                        message: 'Proxy targets to use',
                        default: 'dev',
                        choices: function() {
                            var config = grunt.config.get('proxy');
                            return Object.keys(config);
                        },
                        filter: function(value) {
                            return value.toLowerCase();
                        },
                        when: function() {
                            return !grunt.option('proxy');
                        }
                    }
                ]
            }
        }

    }
};