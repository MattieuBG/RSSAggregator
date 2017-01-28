myApp.controller('feedCtrl',
    ['$scope', '$log', 'API_URL', 'IMG_URL', 'Data', 'tsUtils', '$state', '$rootScope',
        function ($scope, $log, API_URL, IMG_URL, Data, tsUtils, $state, $rootScope) {

            $scope.ok = function() {

                tsUtils.startLoader();

                Data.login(
                    $scope.email,
                    $scope.password,
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        if(status >= 200 && status < 300) {
                            $log.debug(data);
                            tsUtils.storeUser(data);
                            $state.go("qualitycheck");
                        } else {
                            tsUtils.alertGenericError();
                        }
                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertGenericError();
                    });
            };

        }]);