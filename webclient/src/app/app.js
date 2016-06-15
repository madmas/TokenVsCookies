angular.module('jwtSample', [
    'app.templates',
    'app.auth',
    'ui.router',
    'angular-jwt',
    'ngResource'
])

    .controller('AppCtrl', function($http, $rootScope, $scope, $state, $locale, $log, authService) {
        $scope.date = Date.now();
        $scope.locale = $locale.id;

        $scope.username = authService.payload().userName;

        $scope.logout = function(){
            authService.logout();
            $state.go('login');
        };

         $http.get('api')
                .success(function(data) {
                    $scope.message = data;
                })
                .error(function(error) {
                    $log.error(error);
                });

        $rootScope.$on('unauthenticated', function() {
            $state.go('login');
        });
    })

    .config(function Config($httpProvider, jwtInterceptorProvider) {
        jwtInterceptorProvider.tokenGetter = function() {
            var token = sessionStorage.getItem('token');
            return token;
        };
        $httpProvider.interceptors.push('jwtInterceptor');
    })

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('login', {
                url: '/',
                views: {
                    "contentHeader": {
                        templateUrl: 'authentication/basicHeader.tpl.html'
                    },
                    "contentBody": {
                        templateUrl: 'authentication/login.tpl.html',
                        controller: 'AuthCtrl'
                    }
                }
            })
            .state('test', {
                url: '/test',
                data: {
                    requiresLogin: true
                }, 
                views: {
                    "contentHeader": {
                        templateUrl: 'views/basicHeader.tpl.html',
                        controller: 'AppCtrl'
                    },
                    "contentBody": {
                        templateUrl: 'app.tpl.html',
                        controller: 'AppCtrl'
                    }
                }
            })
            ;
    }])
   .run(function($http, $q, $rootScope, $state, $log, authService) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams /* , fromState, fromParams */) {
            if (toState.data && toState.data.requiresLogin) {

                if (!authService.token()) {
                    // User isn’t authenticated
                    $log.info("app.routings->redirecting to login as User isn’t authenticated [toState :" + toState.name + "]");
                    $state.go("login");
                    event.preventDefault();
                }

            }
        });
    })
    .factory('errorHttpInterceptor',
    function ($q, $rootScope, $log) {
        return {
            'responseError': function (rejection) {
                if (rejection.status === 401) {
                    $log.log('401 - login required');
                    $rootScope.$broadcast('unauthenticated');
                } else if (rejection.status >= 400 && rejection.status < 500) {
                    $log.log('Server was unable to find what you were looking for... Sorry!!');
                }
                return $q.reject(rejection);
            }
        };
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('errorHttpInterceptor');
    });
