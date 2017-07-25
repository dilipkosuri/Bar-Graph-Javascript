/**
 * Created by DILIP KOSURI on 24/7/17.
 */

'use strict';


function BarGraphController($scope, $state, $http, ServiceURL, $location, BGBarModel, HttpService) {

    $scope.navigateToHomePage = function(){

        $location.path("homepage");
    };

    function fetchResponse(){
        $scope.data = {};
        $scope.fetchResponse = HttpService.load(ServiceURL.getBarResponse)
            .then(function (response) {
                $scope.data = response;
                $scope.selectedBar = 0;
                $scope.barData = BGBarModel.getAggregatedData($scope.data);
            },function (error) {
                alert("There is no response from the server. Please try again!")
            });
        return $scope.data;
    }

    $scope.init = function(){
        $scope.data = fetchResponse();
    };

    $scope.calculateProgress = function(val){
        if($scope.selectedBar !== undefined) {
            $scope.data.bars[$scope.selectedBar] = $scope.data.bars[$scope.selectedBar] + val;
            $scope.barData = BGBarModel.getAggregatedData($scope.data);
        }
    };

    $scope.barChange = function(){
        console.log("hrg",$scope.selectedBar);
    };
}
