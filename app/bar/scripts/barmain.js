/**
 * Created by DILIP KOSURI on 24/7/17.
 */

'use strict';
angular.module('bar-graph-dynamic', ['ui.router', 'config']);

angular
    .module('bar-graph-dynamic')
    .controller('BarGraphController', BarGraphController)
    .factory('HttpService', HttpService)
    .factory('ServiceURL', ServiceURL)
    .service('BGBarModel', BGBarModel);


angular.module('bar-graph-dynamic').config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise("landing");

    $stateProvider
        .state('landing', {
            url: '/landing',
            templateUrl: 'bar/scripts/partials/landing/welcome-page.html',
            controller: "BarGraphController"
        })
        .state('homepage', {
            url: '/homepage',
            templateUrl: 'bar/scripts/partials/landing/bg-homepage.html',
            controller: "BarGraphController"
        });
});