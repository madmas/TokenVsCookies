module.exports = {
    app   : {
        src : [
            '<%= config.files.app.js %>',
            '<%= html2js.build.dest %>'
        ],
        dest: '<%= config.dir.temp %>/scripts/app.js'
    },
    vendor: {
        src : [ '<%= config.files.vendor.js %>' ],
        dest: '<%= config.dir.temp %>/scripts/vendor.js'
    }
};