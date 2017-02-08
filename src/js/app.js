
var app = angular.module('sgi', []);

//location provider to parse and update the URL in the browser
app.config(function($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
  	requireBase: false
	});
});


//This controller defines a dependency to $scope, $location and the $http module. An HTTP GET request to js/webdevtest-data.js is achieved using the get method and returns a promise with a success and an error method. The JSON data is assigned to $scope.promos, making it available in index.html.

app.controller('PromoListCtrl', function($scope, $location, $http) {
    $http.get("js/webdevtest-data.js").then(function success(response) {
        $scope.promos = response.data.promotion_objects;

        $scope.nextPromo = function (drawings) {
            if (typeof drawings !== 'undefined') {
              	var next;  

                // create new array for drawings
              	drawings.map(function(drawing) { 
                	var current = new Date(drawing.entry_deadline); //create new Date object
	                if (typeof next === 'undefined') {
	                  next = current;
	                } else if (next.getTime() > current.getTime()) {
	                  next = current;
	                }
              	});
              	return next;
            }
            return 0;
        }

        $scope.query = $location.search().promo;
        
        // click event
        $scope.setPromo = function (id) {
            $scope.query = id + 1;
            
            $scope.getPromo();
        }

        $scope.getPromo = function() {
            // check if query is set
            if (typeof $scope.query !== 'undefined') {
              	if (typeof $scope.query === 'string') {
                	var trim = $scope.query.replace(/[^\d.]/g, '');

                	trim = parseInt(trim,10) - 1;
             	} else {
                	var trim = $scope.query - 1;
              	}
              	// get the promo by query
              	$scope.promoView = $scope.promos[trim];
              	
                // gradient
              	document.body.className += " gradient";
            }
        }
        $scope.getPromo();

	}, function error(response) {
        console.log("nope");
    });
});