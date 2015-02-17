var angular;
var console = {log: function() {}};
var app = angular.module('app',[]);

app.controller('main-controller', function($scope, $http, $interval){
	$http.get('http://api.openweathermap.org/data/2.5/weather?id=2147714&APPID=2eca592cb736665e4889c10c8374cb9b')
		.success(function(data){
			$scope.weather = {
				"currentTemp" : Math.round(data.main.temp*0.1),
				"maximumTemp" : Math.round(data.main.temp_max*0.1),
				"minimumTemp" : Math.round(data.main.temp_min*0.1),
				"condition" : data.weather[0].main,
				"conditionCode" : data.weather[0].id
			};
		})
		.error(function(status){
			console.log("GET weather failed with code: "+status);
		});

		$interval(function(){
			var date = new Date();
			var s = date.getSeconds();
			var m = date.getMinutes();
			var h = date.getHours();
			$scope.time = h +" "+m+" "+s;
		}, 1000);
	
});








