myApp.controller('validationCtrl',
    [
        '$scope', '$log', '$http', '$resource', 'API_URL', 'IMG_URL', '$uibModal', 'Data', 'tsUtils', 'DATE_EXCHANGE_FORMAT',
        function ($scope, $log, $http, $resource, API_URL, IMG_URL, $uibModal, Data, tsUtils, DATE_EXCHANGE_FORMAT) {

            $scope.showPagination = true;
            $scope.data = [];
            $scope.showAll = false;
            /* Set Number of Page Displayed*/
            $scope.maxSize = 6;
            /* On set le Cursor de la page */
            $scope.bigCurrentPage = 1;


            $scope.pageChanged = function() {
                if ($scope.showAll){
                    $scope.displayAll();
                }
                else{
                    $scope.displayNoValidated();
                }
            };

            /* Calcul number event to display, and request about paginationNumber */
            $scope.displayAll = function(){
                $scope.getNumberOfAllMasterEvent();
                $scope.loadAll();
            };

            /* Calcul number event to display, and request about paginationNumber */
            $scope.displayNoValidated = function(){
                $scope.getNumberofAllInvalidMasterEvent();
                $scope.load();
            };

            $scope.$watch("showAll", function(newValue, oldValue) {

                $scope.showPagination = true;
                $scope.owner = "";
                
                if(newValue) {
                    $scope.displayAll();
                } else {
                    $scope.displayNoValidated();
                }
            });

            $scope.getNumberofAllInvalidMasterEvent = function(){
                tsUtils.startLoader();

                Data.getNumberofAllInvalidMasterEvent(
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();

                        if(status >= 200 && status < 300) {
                            $scope.bigTotalItems = data;
                        } else {
                            tsUtils.alertGenericError();
                        }

                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertGenericError();
                    }
                );
            };

            $scope.getNumberOfAllMasterEvent = function(){
                tsUtils.startLoader();
                Data.getNumberOfAllMasterEvent(
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();

                        if(status >= 200 && status < 300) {
                            $scope.bigTotalItems = data;
                        } else {
                            tsUtils.alertGenericError();
                        }

                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertGenericError();
                    }
                );
            };
            
            $scope.load = function() {

                tsUtils.startLoader();

                Data.getMasters(($scope.bigCurrentPage - 1),
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();

                        if(status >= 200 && status < 300) {
                            $scope.data = data;
                        } else {
                            tsUtils.alertGenericError();
                        }

                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertGenericError();
                    }
                );
            };

            $scope.loadAll = function() {

                tsUtils.startLoader();

                Data.getAllMasters(($scope.bigCurrentPage - 1),
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        if(status >= 200 && status < 300) {
                            $scope.data = data;
                        } else {
                            tsUtils.alertGenericError();
                        }

                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertGenericError();
                    }
                );
            };

            $scope.getMastersForOwner = function() {

                $scope.showPagination = false;

                tsUtils.startLoader();

                Data.getAllMastersForOwner($scope.owner,
                    function (data, status, headers, config) {

                        tsUtils.stopLoader();

                        if(status >= 200 && status < 300) {

                            $scope.data = data;

                            if (angular.isDefined($scope.data) && angular.isArray($scope.data)) {

                                $log.debug("Sorting");

                                $scope.data.sort(function(a, b) {
                                    var aDate = moment(a.master.createdDate, DATE_EXCHANGE_FORMAT);
                                    var bDate = moment(b.master.createdDate, DATE_EXCHANGE_FORMAT);

                                    if (aDate.isSame(bDate)) {
                                        return 0;
                                    }

                                    if (aDate.isAfter(bDate)) {
                                        return -1;
                                    }

                                    return 1;
                                });
                            }

                        } else {
                            tsUtils.alertGenericError();
                        }

                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertGenericError();
                    }
                );

            };

            $scope.load();

            $scope.openPopup = function(response) {

            };

            $scope.setValidation = function(response, state, sendEmail) {

                tsUtils.startLoader();

                Data.validateMaster(
                    response.master.id,
                    state,
                    sendEmail,
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();

                        if(status >= 200 && status < 300) {
                            response.master.isValidated = state;
                        } else {
                            tsUtils.alertGenericError();
                        }
                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertGenericError();
                    }
                );
            };

            $scope.openModal = function (master, children) {

                $scope.selectedMaster = master;
                $scope.selectedChildren = children;

                var modalInstance = $uibModal.open({
                    
                    animation: false
                    , templateUrl: 'masterModal.html'
                    , controller: 'masterModalCtrl'
                    , size: 'lg'
                    , resolve: {
                        master: function () {
                            return $scope.selectedMaster;
                        },
                        children: function() {
                            return $scope.selectedChildren;
                        }
                    }
                });
            };

            $scope.showConvertToTicketV1Button = function(response) {
                return response.master.visibilityOrTicketing === 'ticketing_v2' || response.master.visibilityOrTicketing === 'bookAndPayLaterOrPayNow';
            };

            $scope.showConvertToBookableV1Button = function(response) {
                return response.master.visibilityOrTicketing === 'bookable_v2' && response.master.needsSwipeToConfirm;
            };

            $scope.neutralizeMasterAndEvent = function(response, neutralizePromotion) {

                tsUtils.startLoader();

                Data.neutralizeMasterAndEvent(
                    response.master.id,
                    neutralizePromotion,
                    function (data, status, headers, config) {

                        tsUtils.stopLoader();

                        if(status >= 200 && status < 300) {

                            response.master.visibilityOrTicketing = data.master.visibilityOrTicketing;
                            response.master.hasPromotion = data.master.hasPromotion;
                            response.master.isPricePromotion = data.master.isPricePromotion;
                            response.master.promotionText = data.master.promotionText;

                        } else {
                            tsUtils.alertGenericError();
                        }
                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertGenericError();
                    }
                )
            };

            $scope.convertToTicketV1 = function(response) {

                tsUtils.startLoader();

                Data.convertToTicketV1(
                    response.master.id,
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();

                        if(status >= 200 && status < 300) {
                            response.master.visibilityOrTicketing = "ticketing";
                            response.greenBackground = true;
                        } else {
                            tsUtils.alertGenericError();
                        }
                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertError(data.errorMessage);
                    }
                );
            };

            $scope.convertToBookable = function(response) {

                tsUtils.startLoader();

                Data.convertToBookable(
                    response.master.id,
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();

                        if(status >= 200 && status < 300) {
                            response.master.visibilityOrTicketing = "visibility";
                            response.greenBackground = true;
                        } else {
                            tsUtils.alertGenericError();
                        }
                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertError(data.errorMessage);
                    }
                );
            };

            $scope.showConvertToBookAndPayButton = function(response) {
                return response.master.visibilityOrTicketing === 'ticketing';
            };

            $scope.convertToBookAndPay = function(response, allowInstantPay, allowBookAndPay) {

                tsUtils.startLoader();

                Data.convertToBookAndPay(
                    response.master.id,
                    allowInstantPay,
                    allowBookAndPay,
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();

                        if(status >= 200 && status < 300) {

                            if (allowBookAndPay) {
                                response.master.visibilityOrTicketing = "bookAndPayLaterOrPayNow";
                            } else if (allowInstantPay) {
                                response.master.visibilityOrTicketing = "ticketing_v2";
                            }

                            response.greenBackground = true;

                        } else {
                            tsUtils.alertGenericError();
                        }
                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertError(data.errorMessage);
                    }
                );
            };

            $scope.formatPricePromotion = function(price, currency) {
                return tsCurrencyUtils.formatPricePromotionShort(price, currency);
            };

            $scope.getSpecificMasterEvent = function() {
                tsUtils.startLoader();

                Data.getMasterEventById($scope.specificMasterEventId,
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();

                        if(status >= 200 && status < 300) {
                            $scope.data = data;
                        } else {
                            tsUtils.alertGenericError();
                        }

                    },
                    function (data, status, headers, config) {
                        tsUtils.stopLoader();
                        tsUtils.alertGenericError();
                    }
                );
            };
        }]);
