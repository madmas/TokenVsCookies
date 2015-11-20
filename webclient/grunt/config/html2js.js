module.exports = {
    options: {
        base   : 'src/app',
        // TODO rename templates module name to "mcs.ui.tpls"
        module : 'app.templates',
        htmlmin: {
            collapseWhitespace: true,
            removeComments    : true
        }
    },
    build  : {
        src : '<%= config.files.app.tpls %>',
        dest: '<%= config.dir.temp %>/scripts/app.tpls.js'
    }
};