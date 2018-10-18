module.exports = {
    options: {
        sourceMap: true,
        includePaths: ['./vendor']
    },
    dev: {
        files: {
            '<%= config.dir.temp %>/styles/main.css': '<%= config.dir.app %>/styles/main.scss'
        }
    },
    dist: {
        files: {
            '<%= config.dir.dist %>/styles/main.css': '<%= config.dir.app %>/styles/main.scss'
        }
    }
};