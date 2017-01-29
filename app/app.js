myApp = angular.module(
    "tsAdminApp",
    [
        'app.config',
        'ngStorage',
        'ui.router',
        'ngResource',
        'ui.bootstrap',
        'darthwade.loading',
      
    ]
);


myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'pages/login.html',
            controller: 'loginCtrl',
            data: {
                requireLogin: false,
                title: "Connexion"
            }
        })

        .state('feed', {
            url: '/feed',
            templateUrl: 'pages/feed.html',
            controller: 'feedCtrl',
            data: {
                requireLogin: true,
                title: "Feed"
            }
        })

        /* Information: Sert à rajouter une route
        * templateUrl : Code HTML dans le dossier pages
         * controller: Nom du controlleur dans le dossier app ( validationsCtrl.js )
          * PS: ne pas oublier à CHAQUE nouveau Controlleur, il faut le déclarer dans index.html */

        // .state('validation', {
        //     url: '/validation',
        //     templateUrl: 'pages/validation.html',
        //     controller: 'validationCtrl',
        //     data: {
        //         requireLogin: true,
        //         title: "Validation de masters"
        //     }
        // });
});


myApp.run(['$rootScope', '$location', '$log', '$state', 'tsUtils',
    function ($rootScope, $location, $log, $state, tsUtils) {


        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

            // change this to "load from local storage"
            var user = tsUtils.loadUser();

            $log.debug(user);
            $log.debug(toState);

            if (
                angular.isDefined(toState) && // no state
                angular.isDefined(toState.data) & // state has no data
                angular.isDefined(toState.data.title)) {

                $rootScope.title = toState.data.title;

            }

            if (
                angular.isUndefined(toState) || // no state
                toState == null ||
                angular.isUndefined(toState.name) || // state has no name
                angular.isUndefined(toState.data) || // state has no data
                toState.data == null || // state's data is null
                (toState.data.requireLogin && user == null) // state requires login and user is null
            ) {

                if (toState.name !== "login") {
                    $state.go("login");
                    $rootScope.title = $state.get("login").data.title;
                    event.preventDefault();
                    $log.debug("redirecting to login");

                } else {
                    $log.debug("already in login");
                }
            }

        });

    }]);
