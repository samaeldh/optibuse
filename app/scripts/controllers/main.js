'use strict';

/**
 * @ngdoc function
 * @name optibuseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the optibuseApp
 */
angular.module('optibuseApp')
  .controller('MainCtrl', function($scope, $http, OpticipApiConfig) {
    $scope.activeBtnRecherche = true;
    $scope.viewResultat = false;
    $scope.loadCriteres = function(search) {
        var url = OpticipApiConfig.searchUrl + OpticipApiConfig.appid;
        $http.get(url)
        .then(function(response) {
            $scope.criteres = response.data.criteres;
        });
    };

    $scope.loadCriteres();

    var tabCriteres = {};

    $scope.update = function($selectedItem, $critere) {

        tabCriteres[$critere] = $selectedItem;
        if (Object.keys(tabCriteres).length == 6) {
            var url = OpticipApiConfig.searchUrl + '/recherche/';
            for (var i = 1; i <= 6; i++) {
                    url += tabCriteres[i];
                    if (i < 6 ) url += '/';
            }
            url += OpticipApiConfig.appid;
            $http.get(url)
            .then(function(response) {
                $scope.activeBtnRecherche = false;
                $scope.resultat = response.data.result;
            }, function() {
                $scope.activeBtnRecherche = true;
                $scope.viewResultat = false;
            });
        }
    };

    $scope.afficheResultat = function() {
        $scope.viewResultat = true;
    };
});

angular.module('optibuseApp')

.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
