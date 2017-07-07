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
    var target = document.getElementById('jauge'); // your canvas element

    var legend = document.getElementById('legendJauge');
    var ctx = legend.getContext("2d");

    // Rouge
    ctx.beginPath();
    ctx.fillStyle ="#f03e3e";
    ctx.rect(10,10,30,16);
    ctx.fill();

    ctx.font = '12pt Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText("Inadapté",50,24);

    // Orange
    ctx.beginPath();
    ctx.fillStyle ="#ffa500";
    ctx.rect(10,40,30,16);
    ctx.fill();

    ctx.font = '12pt Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText("Vigilant",50,54);

    // Rouge
    ctx.beginPath();
    ctx.fillStyle ="#30b32c";
    ctx.rect(10,70,30,16);
    ctx.fill();

    ctx.font = '12pt Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText("Bien",50,84);




    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 60; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 32; // set animation speed (32 is default value)

    $scope.activeBtnRecherche = true;
    $scope.viewResultat = false;
    $scope.loadCriteres = function(search) {
        var url = OpticipApiConfig.searchUrl + OpticipApiConfig.appid;
        $http.get(url)
        .then(function(response) {
            $scope.criteres = response.data.criteres;
        });
    };

    $scope.afficheJauge = function() {
        if (typeof $scope.data.jauge[0] === 'undefined') {
            var valeur = 60;
        } else {
            if ( $scope.data.crit1 === '1' ) {
                var valeur = ( $scope.data.jauge[0].note_globale / 42 ) * 60;
            } else {
                var valeur = ( $scope.data.jauge[0].note_globale / 39 ) * 60;
            }
        }
        gauge.set(valeur); // set actual value
    };

    $scope.data = {
        jauge:'',
        crit1:''
    };

    $scope.loadCriteres();

    var tabCriteres = {};

    $scope.update = function($selectedItem, $critere) {

        tabCriteres[$critere] = $selectedItem;
        if (Object.keys(tabCriteres).length == 6) {
            var url = OpticipApiConfig.searchUrl + '/recherche/';
            for (var i = 1; i <= 6; i++) {
                    if ( i === 1) { 
                        $scope.data.crit1 = tabCriteres[i];
                    }
                    if (i === 6 && $scope.data.crit1 !== '1') url += '1';
                    else url += tabCriteres[i];
                    if (i < 6 ) url += '/';
            }
            url += OpticipApiConfig.appid;
            $http.get(url)
            .then(function(response) {
                $scope.activeBtnRecherche = false;
                $scope.resultat = response.data.result;
                $scope.data.jauge = response.data.result;
                $scope.afficheJauge();
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
