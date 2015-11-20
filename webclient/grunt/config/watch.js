module.exports = {
    options     : {
        livereload: true
    },
    js          : {
        files: [ '<%= config.files.app.js %>' ],
        tasks: [ 'newer:jshint:js', 'karma:dev:run' ]
    },
    spec        : {
        files  : [ '<%= config.files.app.spec %>' ],
        tasks  : [ 'newer:jshint:spec', 'karma:dev:run' ],
        options: { livereload: false }
    },
    styles      : {
        files: [ '<%= config.files.app.styles.all %>' ],
        tasks: [ 'compass:dev' ]
    },
    index       : {
        files  : [ '<%= config.files.app.index %>' ],
        tasks  : [ 'clean:index', 'index:dev']
    },
    scripts    : {
        files  : [ '<%= config.files.app.js %>' ],
        tasks  : [ 'index:dev'],
        options: { event: ['added', 'deleted'] }
    },
    tpls        : {
        files: [ '<%= config.files.app.tpls %>' ],
        tasks: [ 'html2js' ]
    },
    translations: {
        files: [ '<%= config.files.app.translations %>' ],
        tasks: [ 'merge:translations' ]
    },
    gruntfile   : {
        files  : [ 'Gruntfile-next.js' ],
//                tasks  : [ 'newer:jshint:gruntfile' ],
        options: { livereload: false, reload: true }
    }
};
