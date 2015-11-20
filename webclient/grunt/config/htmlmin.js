module.exports = {
    options: {
        removeComments    : true,
        collapseWhitespace: true
    },
    index  : {
        files: {
            '<%= config.dir.dist %>/index_de.html': '<%= config.dir.dist %>/index_de.html',
            '<%= config.dir.dist %>/index_en.html': '<%= config.dir.dist %>/index_en.html'
        }
    }
};