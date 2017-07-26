/**
 * Created by DILIP KOSURI on 24/7/17.
 */

'use strict';


function BarGraphController($scope, $http, ServiceURL, $location, BGBarModel, HttpService) {

    $scope.data = {};

    $scope.init = function(){
        $scope.data = $scope.fetchResponse();
    };

    //function to redirect to homepage when showbargraph is clicked or tapped from welcomepage or landing page
    $scope.navigateToHomePage = function(){

        $location.path("homepage");
    };

    $scope.fetchResponse = function(){
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
    };

    $scope.calculateProgress = function(val){
        if($scope.selectedBar !== undefined) {
            $scope.data.bars[$scope.selectedBar] = $scope.data.bars[$scope.selectedBar] + val;
            $scope.barData = BGBarModel.getAggregatedData($scope.data);
        }
    };
}
