myApp.controller('feedCtrl',
    ['$scope', '$log', 'API_URL', 'IMG_URL', 'Data', 'tsUtils', '$state', '$rootScope', '$http',
        function ($scope, $log, API_URL, IMG_URL, Data, tsUtils, $state, $rootScope, $http) {

            $scope.getFluxRSS = function(url) {

                Data.getRSSFlux(url,
                  function (data, status, headers, config) {
                    //$log.debug("REUSSITE");
                    //$log.debug(headers);
                    //$log.debug(url);
                    $log.debug("DATA :" + data);

                    var x2js = new X2JS();
                      $scope.myJSON = x2js.xml_str2json(data);
                    $log.debug("IOJCEZF : " +  $scope.myJSON);
                  },
                  function (data, status, headers, config) {
                      $log.debug("FAIL DE LA MISTIFICATION");
                  })

                //$http.get("http://www.lepoint.fr/24h-infos/rss.xml");
            };

            function feedCtrl($scope) {
                $scope.items = x2js;
            }

            $scope.ok = function() {

                //tsUtils.startLoader();

                Data.getfeed(
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        if(status >= 200 && status < 300) {
                            //$log.debug(data);

                            //tsUtils.storeUser(data);
                            //parse xml to list
                            //$state.go("qualitycheck");
                            $log.debug("before");

                            var donnee = data.feedList.feedList;
                            $log.debug("middle");
                            var listUrl = new Array();
                            $log.debug(donnee);
                            for (var toto = 0; toto < donnee.length; toto++){
                                //$log.debug(donnee[toto].url);
                                listUrl[toto] = donnee[toto].url;
                                //$scope.trustAsResourceUrl(donnee[toto].url);
                                $scope.getFluxRSS(donnee[toto].url);                            // -> http://blog.inovia-conseil.fr/?p=202
                            }
                            //$log.debug(listUrl);

                        } else {
                            tsUtils.alertGenericError();
                        }
                    },
                    function (data, status, headers, config) {
                        //tsUtils.stopLoader();
                        //tsUtils.alertGenericError();
                    });
            };

            $scope.ok();

        }]);