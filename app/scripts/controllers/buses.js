'use strict';

/**
 * @ngdoc function
 * @name optibuseApp.controller:BusesCtrl
 * @description
 * # BusesCtrl
 * Controller of the optibuseApp
 */
angular.module('optibuseApp')
  .controller('BusesCtrl', function($scope, $http, OpticipApiConfig, BusesService) {
    $scope.viewResultat = false;

    var tabCriteres = {};

    $scope.buses = {
        Marque:'',
        Modele:'',
        Vitesse:'',
        Quantite:''
    };



    $scope.resultat = {};

    BusesService.getMarque().then(function (response) {
        $scope.marques = response.data.criteres;
    });

    $scope.getMarqueModele = function() {
        $scope.viewResultat = false;
        $scope.buses.Modele = '';
        $scope.marque = $scope.buses.Marque;
        BusesService.getMarqueModele($scope.buses.Marque.marque).then(function (response) {
            $scope.modeles = response.data.criteres;
        });
    }

    $scope.getResultat = function() {
        if ( $scope.buses.Modele ) {
            BusesService.getBusesResult($scope.buses.Modele.id, $scope.buses.Vitesse, $scope.buses.Quantite ).then(function (response) {
                $scope.resultat = response.data.result;
                $scope.activeBtnRecherche = false;
                $scope.viewResultat = true;
            }, function() {
                $scope.viewResultat = false;
            });
        } else {
            $scope.viewResultat = false;
        }
    }

});

angular.module('optibuseApp')

.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});


angular.module('optibuseApp')
    .factory("BusesService", ['$http', 'OpticipApiConfig',function($http, OpticipApiConfig) {
        var BusesService = {};

        BusesService.getMarque = function(){
            var url = OpticipApiConfig.searchUrl + '/marques' + OpticipApiConfig.appid;
            return $http.get(url);
        };

        BusesService.getMarqueModele = function($marque){
            var url = OpticipApiConfig.searchUrl + '/modeles/' + $marque + OpticipApiConfig.appid;
            return $http.get(url);
        };

        BusesService.getBusesResult = function($idModele, $vitesse, $debit){
            var url = OpticipApiConfig.searchUrl + '/buses/recherche/' + $idModele + '/' + $vitesse + '/' + $debit + OpticipApiConfig.appid;
            return $http.get(url);
        };

        return BusesService;
}]);