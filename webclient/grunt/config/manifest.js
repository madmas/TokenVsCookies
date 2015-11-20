module.exports = {

    options: {
        // if set to true the browser will still load the resources if the user is online
        // preferOnline: true,
        timestamp: true,
        // alow all other required resources (rest resouces etc.) to go online!
        network  : [ '*' ]
    },

    dev: {
        src : [],
        dest: "<%= config.dir.temp %>/manifest.appcache"
    },

    dist: {
        options: {
            basePath: "<%= config.dir.dist %>",
            cache   : [
                // manually add font awesome fonts because of the url search query param!
                "fonts/FontAwesome.otf?v=4.1.0",
                "fonts/fontawesome-webfont.eot?v=4.1.0",
                "fonts/fontawesome-webfont.svg?v=4.1.0",
                "fonts/fontawesome-webfont.ttf?v=4.1.0",
                "fonts/fontawesome-webfont.woff?v=4.1.0",
            ]
        },
        src    : [
            "assets/angular-i18n/*.js",
            "assets/translations/*.json",
            "scripts/*.js",
            "styles/*.css",
            "fonts/glyphicons-*",
            "fonts/mobinspfont.*",
            "index_*.html"
        ],
        dest   : "<%= config.dir.dist %>/manifest.appcache"
    }
};