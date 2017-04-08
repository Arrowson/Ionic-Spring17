
angular.module('App')

.filter('directionFilter', function(){
  var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  
  return function(degree){
    if (degree > 338){
      degree = 360 - degree;
    }
    var index = Math.floor((degree + 22) / 45);
    return directions[index];
  };
})

.controller('WeatherController', ['$scope', '$ionicLoading', 'weatherService', 'localStorageService',
function ($scope, $ionicLoading, weatherService, localStorageService) {
  
  var wc = this;
  var age = Date.now();
  var first = true;
 
  
  wc.cities =[
        {
					name: "Amarillo",
					lat: 35.2018863,
					weather:{
						currently: "test",
						temperature: 0,
						windBearing: 0,
						windSpeed: 0
						
					},
					lon: -101.9450233
		   	},
		   	{
					name: "Hermleigh",
					lat: 32.6365437,
					weather:{
						currently: "test",
						temperature: 0,
						windBearing: 0,
						windSpeed: 0
						
					},
					lon: -100.7873474
				},
	   		{
					name: "Seattle",
					lat: 47.6147628,
					weather:{
						currently: "test",
						temperature: 0,
						windBearing: 0,
						windSpeed: 0
						
					},
					lon: -122.4759875
	   		},
		   	{
					name: "Raleigh",
					lat: 35.8434428,
					weather:{
						currently: "test",
						temperature: 0,
						windBearing: 0,
						windSpeed: 0
						
					},
					lon: -78.9252357
		   	},
				{
					name: "Austin",
					lat: 30.3074624,
					weather:{
						currently: "test",
						temperature: 0,
						windBearing: 0,
						windSpeed: 0
						
					},
					lon: -98.0335833
	   		}
    ]
  wc.selected_city = wc.cities[1];

  wc.getWeather = function(){
      
    		weatherService.getCurrentConditions(wc.selected_city)
		   			.then(function(res){
		   				console.log(res);
		   				//get the weather stuff here
		   				wc.selected_city.weather.temperature = res.data.currently.temperature;
		   				wc.selected_city.weather.windBearing = res.data.currently.windBearing;
		   				wc.selected_city.weather.windSpeed = res.data.currently.windSpeed;
		   				wc.selected_city.weather.currently = res.data.currently.summary;
		   				
		   				wc.db.latest_temperature =  wc.selected_city.weather.temperature;
		   				wc.db.latest_windBearing =  wc.selected_city.weather.windBearing;
		   				wc.db.latest_windSpeed =  wc.selected_city.weather.windSpeed;
		   				wc.db.latest_currently =  wc.selected_city.weather.currently;
		   				wc.db.last_accessed = new Date().getTime();
		   				
		   				wc.db.$save().then(function(){
		   					console.log("SAVED")
		   				}).catch(function(error){
		   					console.log("NOPE" + error)
		   				})
		   				
		   			})
		   			.catch(function(err){
		   				console.log("PROBLEM" + err);
		   			});
		   			/*
		   			if(Date.now() > age + 1000 * 60 * 15 || first){
      
      first = false;
      
      age = Date.now();
      
        weatherService.getCurrentConditions(wc.selected_city).success(function(weather){
        wc.updateWeather(weather);
        wc.weather = weather;
        
        console.log(wc.weather);
        
        $ionicLoading.hide();
      }).error(function(err){
        $ionicLoading.show({
          template: 'could not load weather. Please try again later.',
          duration: 3000
        });
        $ionicLoading.hide();
      });
    }else{
      wc.weather = wc.latestWeather();
      
    };
		   			*/
		    $ionicLoading.hide();	
  };
  
  wc.checkWeather = function(){
  	if(new Date().getTime() >= wc.db.last_accessed + (15 * 60000)){
  		wc.getWeather();
  	}else{
  		/*
  						wc.db.latest_temperature =  wc.selected_city.weather.temperature;
		   				wc.db.latest_windBearing =  wc.selected_city.weather.windBearing;
		   				wc.db.latest_windSpeed =  wc.selected_city.weather.windSpeed;
		   				wc.db.latest_currently =  wc.selected_city.weather.currently;
  		*/
  		wc.selected_city.weather.temperature = wc.db.latest_temperature;
  		wc.selected_city.weather.windBearing = wc.db.latest_windBearing;
  		wc.selected_city.weather.windSpeed = wc.db.latest_windSpeed;
  		wc.selected_city.weather.currently = wc.db.latest_currently;
  	}
  };
  wc.getWeather();
}]);
