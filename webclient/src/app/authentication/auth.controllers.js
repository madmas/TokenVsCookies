angular.module('auth.controllers',[])

    .controller('AuthCtrl',function($scope, $rootScope, $state, $log, authService) {
        $scope.isValid="valid";

        $scope.logout =  function() {
            $log.log('Logout');
            authService.logout();
        };

        $rootScope.$on('unauthenticated', function() {
            $state.go('login');
        });

        $scope.submitLogin = function () {
            authService.login($scope.user, $scope.password).then(
                function (data) {
                    if (data.validLogin) {
                        $state.go('test');
                    } else {
                        $scope.isValid = 'invalid';
                    }
                }
            );
        };
    })

;
