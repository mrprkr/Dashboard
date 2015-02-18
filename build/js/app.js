var angular;
var console = {log: function() {}};
var app = angular.module('app',[]);

app.controller('main-controller', function($scope, $http, $interval){

	//WEATHER
	$http.get('http://api.openweathermap.org/data/2.5/weather?id=2147714&APPID=2eca592cb736665e4889c10c8374cb9b')
		.success(function(data){
			$scope.rawWeather = data;
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

	//CLOCK
	$interval(function(){
		var addZero = function(number){
			if(number < 10){
				return "0"+number;
			}
			else {
				return number;
			}
		};
		var date = new Date();
		var s = addZero(date.getSeconds());
		var m = addZero(date.getMinutes());
		var h = addZero(date.getHours());
		$scope.time = h+":"+m+":"+s;
	}, 1000);

	//HEADLINES
	$http.get('http://content.guardianapis.com/australia-news?api-key=fmhmn6m4jy8g5hcgr2rsm622')
		.success(function(data){
			$scope.news = data.response;
		})
		.error(function(status){
			console.log("error getting news: " +status)
		});
});








