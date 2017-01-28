myApp.factory("Data",
    [
        '$http', 'API_URL', 'tsUtils', 'DATE_EXCHANGE_FORMAT', '$log',
        function ($http, API_URL, tsUtils, DATE_EXCHANGE_FORMAT, $log) {

            var data = {};

            data.login = function (id, password, success, error) {

                var url = API_URL + "login";

                var req = {
                    method: 'POST'
                    , url: url
                    , headers: {
                        "Content-Type": "application/json"
                    }
                    , params: {
                        username: id,
                        password: password
                    }
                    , data: " "
                };

                return $http(req).success(success).error(error);
            };

            /* Information : exemple type d'une requête */

            // data.getNumberofAllInvalidMasterEvent = function(success, error) {
            //     var url = API_URL + "master/getNumberofAllInvalidMasterEvent";
            //     var req = {
            //         method: 'POST',
            //         url: url,
            //         headers: {
            //             "Content-Type": "application/json",
            //             "X-TS-Admin-Token": tsUtils.getToken()
            //         },
            //         data: " "
            //     };
            //
            //     return $http(req).success(success).error(error);
            // };

            return data;
        }]);