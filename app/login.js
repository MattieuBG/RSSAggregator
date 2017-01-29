myApp.controller('loginCtrl',
    ['$scope', '$log', 'API_URL', 'IMG_URL', 'Data', 'tsUtils', '$state', '$rootScope',
        function ($scope, $log, API_URL, IMG_URL, Data, tsUtils, $state, $rootScope) {

            $scope.ok = function() {

                tsUtils.startLoader();

                Data.login(
                    $scope.email,
                    $scope.password,
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        $log.debug(data.status);

                        if(status >= 200 && status < 300 && data.status != "login.error") {
                            $log.debug(data);
                            tsUtils.storeUser(data);
                            $state.go("feed");
                        } else {
                            tsUtils.alertGenericError("Le compte n'existe pas");
                        }
                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertGenericError();
                    });
            };

            $scope.create = function() {

                tsUtils.startLoader();

                Data.createA(
                    $scope.email,
                    $scope.password,
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                       // $log.debug(data.status);
                        if(status >= 200 && status < 300 && data.status != "compte.exist") {// || data.status != "login.error") {
                            $log.debug(data);
                            tsUtils.storeUser(data);
                            $state.go("feed");
                        } else {
                            tsUtils.alertGenericError("Le compte existe déjà");
                        }
                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertGenericError();
                    });
            };

}]);
