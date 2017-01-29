/*
* Information:
 * Pour la mise en cache (équivalent aux sessions)
  * localStorage est stocké dans le navigateur
  * sessionStorage est stocké dans les sessions. */

myApp.factory('tsUtils',
    ['$http', '$log', '$loading', '$filter', '$localStorage',
        function ($http, $log, $loading, $filter ,$localStorage) {
            var obj = {
                alertGenericError: function () {
                    alert("Une erreur s'est produite");
                },
                alertGenericError: function (text) {
                    alert(text);
                },
                alertError: function(error) {
                    alert(error);
                },
                startLoader: function () {
                    $loading.start("ts_loader");
                },
                propertyWiseCopy: function(source, destination){
                    for(var k in source) destination[k]=source[k];
                },
                stopLoader: function () {
                    $loading.finish('ts_loader');
                },
                loadUser: function () {
                    var user = $localStorage.ts_admin_user;;
                    return user;
                },
                storeUser: function (user) {
                    $localStorage.ts_admin_user = user;
                },
                logOut: function () {
                    $localStorage.ts_admin_user = null;
                },
                isConnected: function () {
                    return angular.isDefined($localStorage.ts_admin_user) && $localStorage.ts_admin_user != null;
                },
                getToken: function () {
                    return $localStorage.ts_admin_user.token;
                },

            };

            return obj;

        }]);

