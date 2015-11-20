module.exports = {
    dev : [ '<%= config.dir.temp %>/*' ],
    dist: [
        '<%= config.dir.temp %>/*',
        '<%= config.dir.dist %>/*',
        '<%= config.dir.reports %>/*'
    ]
};