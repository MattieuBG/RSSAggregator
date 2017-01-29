myApp.controller('feedCtrl',
    ['$scope', '$log', 'API_URL', 'IMG_URL', 'Data', 'tsUtils', '$state', '$rootScope', '$http',
        function ($scope, $log, API_URL, IMG_URL, Data, tsUtils, $state, $rootScope, $http) {

            $scope.listUrl = new Array();
            $scope.listXML = new Array();

            $scope.user = tsUtils.loadUser();
            $log.debug("USERRRR");
            $log.debug($scope.user);

            $scope.getFluxRSS = function(url) {

                Data.getRSSFlux(url,
                  function (data, status, headers, config) {
                    //$log.debug("REUSSITE");
                    //$log.debug(headers);
                    //$log.debug(url);
                    $log.debug("DATA :" + data);

                    // var x2js = new X2JS();
                    //   $scope.myJSON = x2js.xml_str2json(data);
                    //
                    //   $log.debug("IOJCEZF : ");
                    //   $log.debug($scope.myJSON.books);
                  },
                  function (data, status, headers, config) {
                      $log.debug("FAIL DE LA MISTIFICATION");
                  })

                //$http.get("http://www.lepoint.fr/24h-infos/rss.xml");
            };


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
                            $log.debug(donnee);
                            for (var toto = 0; toto < donnee.length; toto++){
                                $log.debug("URL: " + donnee[toto].url);
                                $log.debug("ID:" + donnee[toto].id);
                                $log.debug("RESPONSE:" + donnee[toto].xmlParsed);

                                $scope.listUrl[toto] = donnee[toto];
                                $scope.listXML[toto] = donnee[toto].xmlParsed;

                                //$scope.trustAsResourceUrl(donnee[toto].url);
                                //$scope.getFluxRSS(donnee[toto].url);                            // -> http://blog.inovia-conseil.fr/?p=202
                            }

                            //$scope.listXML = $scope.decode($scope.listXML);
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

            $scope.addFlux = function(url) {

                //tsUtils.startLoader();

                Data.addflux(url,
                    function (data, status, headers, config) {
                        $log.debug("REUSSITE");
                        //$log.debug(headers);
                        //$log.debug(url);
                        $log.debug("DSATA :::: ");

                        $log.debug(data);

                        $scope.listUrl = data.feedList.feedList;
                        location.reload();
                        //$scope.ok();
                    },
                    function (data, status, headers, config) {
                        $log.debug("FAIL DU ADD");
                    })
            };

            $scope.logout = function() {
                tsUtils.logOut();
                $state.go("login");
            };

            $scope.deleteFlux = function(id) {

                //tsUtils.startLoader();

                Data.deleteflux(id,
                    function (data, status, headers, config) {
                        $log.debug("DATA:::");
                        $log.debug(data);
                        $scope.listUrl = new Array();
                        $scope.listXML = new Array();
                        $scope.ok();

                    },
                    function (data, status, headers, config) {
                        $log.debug("FAIL DU delete");
                    })
            };

            $scope.ok();


        }]);