module.exports = {
    // Compiles Sass to CSS and generates necessary files if requested
    options: {
        sassDir           : '<%= config.dir.app %>/styles',
        cssDir            : '<%= config.dir.temp %>/styles',
        imagesDir         : '<%= config.dir.app %>/assets/images',
        fontsDir          : '<%= config.dir.app %>/assets/fonts',
        importPath        : './vendor',
        relativeAssets    : false,
        assetCacheBuster  : false
    },
    dev    : {
        options: {
            environment: 'development',
            debugInfo: true
        }
    },
    dist   : {
        options: {
            environment: 'production',
            cssDir     : '<%= config.dir.dist %>/styles'
        }
    }
};