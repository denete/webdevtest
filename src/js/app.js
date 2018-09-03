angular.module("webdevtest", ['ngRoute'])
.config(function($locationProvider, $routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'templates/main.html',
        controller: 'MainController' 
    })
    .when('/promo/:promoId', {
        templateUrl: 'templates/promo.html',
        controller: 'PromoController'    
    })
    .otherwise({
        redirectTo : '/'
    });
    
    $locationProvider.html5Mode(true);

})
.controller("MainController", function($scope, $http, $location, dataFactory){

    $scope.name = 'MainController';
    $scope.main = {};

    var init = function() {

        $http.get("js/webdevtest-data.js").then(
            function(result) {
                $scope.main.data = result.data;
                dataFactory.setData(result.data);
            }, function(error) {
                alert(error.message);
            }
        );
    };

    init();

    $scope.main.goToDetails = function(promoIndex) {
        $location.url('/promo/'+promoIndex);
    };
})
.controller('PromoController', function($scope, $routeParams, dataFactory) {

    $scope.name = 'PromoController';
    $scope.promo = {};

    var init = function() {
        var id = $routeParams.promoId;
        $scope.promo.data = dataFactory.getDataById(id);
    };

    init();

    $scope.promo.goBack = function() {
        $location.url('/');
    };
})
.factory('dataFactory', function() {
    var data = {};

    var setData = function(payload) {
        data = payload;
    };

    var getAllData = function() {
        return data;
    };

    var getDataById = function(id) {
        return data.promotion_objects[id];
    };

    return {
        setData:setData,
        getAllData:getAllData,
        getDataById:getDataById
    };
});