myApp.factory("Data",
    [
        '$http', 'API_URL', 'tsUtils', 'DATE_EXCHANGE_FORMAT', '$log',
        function ($http, API_URL, tsUtils, DATE_EXCHANGE_FORMAT, $log) {

            var data = {};

            data.login = function (id, password, success, error) {

                var url = API_URL + "login/mailLogin";

                var req = {
                    method: 'POST'
                    , url: url
                    , headers: {
                        "Content-Type": "application/json" //application/x-www-form-urlencoded
                    }
                    , params: {
                        email: id,
                        password: password
                    }
                    , data: " "
                };

                return $http(req).success(success).error(error);
            };

            data.createA = function (email, password, success, error) {

                var url = API_URL + "accountRss/create";

                var req = {
                    method: 'POST'
                    , url: url
                    , headers: {
                        "Content-Type": "application/json" //application/x-www-form-urlencoded
                    }
                    , params: {
                        email: email,
                        password: password
                    }
                    , data: " "
                };

                return $http(req).success(success).error(error);
            };

            data.getfeed = function (success, error) {

                var url = API_URL + "feed/getFeeds";

                var req = {
                    method: 'GET'
                    , url: url
                    , headers: {
                        "Content-Type": "application/json",
                        "token": tsUtils.getToken()//"le token a get de la save : eyJ2ZXJzaW9uIjoxLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJyc3MuYWdncmVnIiwic3ViIjoiZGVkaWVycmVtaUBnbWFpbC5jb20ifQ.-DcUXDdQf4XZrJo4bKvXmOZJBhFqsIkpepdzqfYqEYlgJf8DAeL1xr7v8EU629b5Lr7QeCJsXVcZ14q4939tzQ"
                    }
                    , params: {
                        //email: id,
                        //password: password
                    }
                    , data: " "
                };

                return $http(req).success(success).error(error);
            };


            data.getRSSFlux = function (url, success, error) {

                var req = {
                    method: 'GET'
                    , url: url
                    , headers: {
                        "Content-Type": undefined, // SOIT L'ERREUR EST LA AVEC UN CONTENT TYPE DIFFERENT OU DES Access-Control-Allow-Origin different ???
                    }
                    , params: {
                    }
                    , data: " "
                };

                return $http(req).success(success).error(error); // deja testé en jsonp
            };

            data.addflux = function (urltoadd, success, error) {

                var url = API_URL + "feed/addFeeds";

                var req = {
                    method: 'POST'
                    , url: url
                    , headers: {
                        "Content-Type": "application/json",
                        "token": tsUtils.getToken()
                    }
                    , params: {
                        feedUrl: urltoadd,
                        //password: password
                    }
                    , data: " "
                };

                return $http(req).success(success).error(error);
            };

            data.deleteflux = function (id, success, error) {

                var url = API_URL + "feed/" + id;

                var req = {
                    method: 'DELETE'
                    , url: url
                    , headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": tsUtils.getToken()
                    }
                    , params: {
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