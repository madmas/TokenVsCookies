module.exports = {
    options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
    },
    js     : {
        src: [ '<%= config.files.app.js %>' ]
    },
    spec   : {
        src: ['<%= config.files.app.spec %>' ]
    }
    // gruntfile: [ 'Gruntfile-next.js']
};