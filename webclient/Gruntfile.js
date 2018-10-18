'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);

    // load grunt plugins on demand
    require('jit-grunt')(grunt, {
        // tasks which cannot be resolved by default rules have to be named explicitly
        'htmlbuild'  : 'grunt-html-build',
        'merge-json' : 'grunt-merge-json',
        'protractor' : 'grunt-protractor-runner',
        'awesome'    : 'grunt-is-awesome',
        'newer-clean': 'grunt-newer'
    });

    // load custom task plugins
    grunt.loadTasks('grunt/tasks');

    // load build config
    var options = require('./build.config');

    // load task configurations
    var configs = require('load-grunt-configs')(grunt, options);

    // initialize loaded configs
    grunt.initConfig(configs);

    /**
     * Define Task Aliases
     */
    grunt.registerTask('default', [ 'dist' ]);

    grunt.registerTask('run', 'Run the application in development environment', [
        'build', 'server:dev', 'watch'
    ]);

    grunt.registerTask('start', 'Prompt for possible configuration and run the application in development environment', [
        'prompt', 'build', 'server:dev', 'karma:dev', 'watch'
    ]);

    grunt.registerTask('show', 'Start the application in production environment', [
        'dist', 'server:dist'
    ]);

    grunt.registerTask('index:dev', 'Create index files for development environment', [
        'htmlbuild:devDe', 'htmlbuild:devEn'
    ]);

    grunt.registerTask('index:dist', 'Create index files for production environment', [
        'htmlbuild:distDe', 'htmlbuild:distEn'
    ]);

    grunt.registerTask('test', 'Run karma unit tests in development environment', [
        'build', 'karma:test'
    ]);

    grunt.registerTask('test:ci', 'Run karma unit tests in development environment', [
        'build', 'karma:ci'
    ]);

    grunt.registerTask('e2e', 'Runs the protractor e2e tests', [
        'build', 'server:e2edev','protractor:local', 'awesome'
    ]);

    grunt.registerTask('e2e:ci', 'Runs the protractor e2e tests', [
        'protractor:ci', 'awesome'
    ]);

    grunt.registerTask('build', 'Build the app for development environment', [
        'clean:dev',
        'copy:index',
        'copy:dev',
        'sass:dev',
        'merge-json:translations',
        'html2js',
        'index:dev'
    ]);

    grunt.registerTask('dist', 'Build the app for production environment', [
        'clean:dist',
        'jshint',
        'html2js',
        'sass:dist',
        'merge-json:translations',
        'copy:index',
        'copy:dist',
        'concat',
        'ngAnnotate',
        'uglify',
        'filerev',
        'index:dist',
        'htmlmin:index',
        'karma:dist',
        'awesome'
    ]);
};