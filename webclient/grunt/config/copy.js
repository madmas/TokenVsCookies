module.exports = {

    index: {
        files: [
            {'<%= config.dir.temp %>/html/index.html': '<%= config.files.app.index %>'},
            {'<%= config.dir.temp %>/html/index_en.html': '<%= config.files.app.index %>'}
        ]
    },

    dev: {
        files: [
            {
                // assets
                cwd: 'src',
                expand: true,
                src: ['assets/**', '!assets/translations/**'],
                dest: '<%= config.dir.temp %>'
            },
            {
                expand: true,
                flatten: true,
                src    : [ '<%= config.files.vendor.font %>' ],
                dest   : '<%= config.dir.temp %>/fonts/'
            },
            {
                expand: true,
                flatten: true,
                src: ['<%= config.files.vendor.glyphfont %>'],
                dest: '<%= config.dir.temp %>/fonts/bootstrap/'
            }
        ]
    },

    dist: {
        files: [
            {
                // translations
                cwd   : 'src',
                expand: true,
                src   : [ 'assets/**', '!assets/translations/**' ],
                dest  : '<%= config.dir.dist %>'
            },
            {
                // i18n
                expand: true,
                src   : [ '<%= config.files.i18n.de %>', '<%= config.files.i18n.en %>' ],
                dest  : '<%= config.dir.dist %>'
            },
            {
                // vendor fonts
                expand : true,
                flatten: true,
                src    : [ '<%= config.files.vendor.font %>' ],
                dest   : '<%= config.dir.dist %>/fonts/'
            },
            {
                expand: true,
                flatten: true,
                src: ['<%= config.files.vendor.glyphfont %>'],
                dest: '<%= config.dir.dist %>/fonts/bootstrap/'
            },
            {
                expand: true,
                flatten: true,
                src: ['<%= config.files.vendor.styles %>'],
                dest: '<%= config.dir.dist %>/styles/'
            },
            {

                cwd   : '<%= config.dir.temp %>',
                expand: true,
                src   : [
                    // '<%= merge.translations.dest %>'
                    'assets/translations/**/*.json'
                ],
                dest  : '<%= config.dir.dist %>'
            }
        ]
    }
};