module.exports.config = {

    // load-grunt-configs path
    src: 'grunt/config/*.js',

    app: {
        name   : 'app-ui',
        version: '1.0.0'
    },

    dir: {
        app    : 'src',
        dist   : 'dist',
        temp   : '.tmp',
        reports: 'reports'
    },

    files: {

        i18n: {
            de: [
                'vendor/angular-i18n/angular-locale_de.js'
            ],
            en: [
                'vendor/angular-i18n/angular-locale_en.js'
            ]
        },

        app: {

            jsAll: [
                'src/app/**/*.js'
            ],

            js: [
                'src/app/**/*.js',
                '!src/app/**/*.spec.js',
                '!src/app/**/*.mocks.js'
            ],

            spec: [
                'test/unit/**/*.spec.js',
                'test/unit/**/*.mocks.js',
                'src/app/**/*.spec.js',
                'src/app/**/*.mocks.js'
            ],

            translations: [
                'src/i18n/**/*.json'
            ],

            tpls: [
                'src/app/**/*.tpl.html'
            ],

            index: [
                'src/index.tpl.html'
            ],

            styles: {
                all : 'src/styles/**/*.scss'
            }
        },

        vendor: {
            js: [
                'vendor/angular/angular.js',
                'vendor/angular-resource/angular-resource.js',
                'vendor/angular-ui-router/release/angular-ui-router.js',
                'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
                'vendor/angular-jwt/dist/angular-jwt.js'
            ],

            spec: [
                'vendor/angular-mocks/angular-mocks.js'
            ],

            styles: [
            ],

            font: [
                'vendor/font-awesome/fonts/*'
            ],

            glyphfont: [
                'vendor/bootstrap-sass-official/assets/fonts/bootstrap/*'
            ]
        }

    }
};
