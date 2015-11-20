angular.module('app.auth', [
    'auth.controllers',
    'angular-jwt'
])
    .factory('authService', function($http, $window, $q, jwtHelper) {

        var storage = $window.sessionStorage;

        var service = {
            login: getLogin,
            token: getToken,
            logout: doLogout,
            payload: getPayLoad
        };

        return service;

        function getLogin(userLogin, userPassword) {

            var data = {
                'username': userLogin,
                'password': userPassword
            };

            var dfd = $q.defer();

            $http.post('sessions/create', data)
                .success(function(data) {
                    storage.setItem('token', data.token);
                    dfd.resolve({validLogin: true});
                })
                .error(function() {
                    dfd.resolve({validLogin: false});
                });

            return dfd.promise;

        }

        function getToken() {
            return storage.getItem('token');
        }

        function doLogout() {
            storage.setItem('token', null);
        }

        function getPayLoad() {
            var token = storage.getItem('token');
            if (token && token != null && token != "null" ) {
                var decodedToken = jwtHelper.decodeToken(token);
                var payLoad = {
                    userId: decodedToken.userId,
                    userName: decodedToken.cn,
                    userEmail: decodedToken.email
                };
                return payLoad;
            }
            else {
                return {};
            }
        }
    })
;
