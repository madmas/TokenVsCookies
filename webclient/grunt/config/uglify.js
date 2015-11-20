module.exports = {
    options: {
        mangle: false
    },
    app    : {
        options: {
            wrap: true
            // banner: TODO
        },
        src    : '<%= config.dir.temp %>/scripts/app.js',
        dest   : '<%= config.dir.dist %>/scripts/app.js'
    },
    vendor : {
        options: {
            // banner: TODO
        },
        src    : '<%= config.dir.temp %>/scripts/vendor.js',
        dest   : '<%= config.dir.dist %>/scripts/vendor.js'
    }
};