
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
  

  wc.latestWeather = function(){
    return localStorageService.getData();
  };
  
  wc.updateWeather = function(val){
    return localStorageService.setData(val);
  };
  
  wc.getWeather = function(){
      

    if(Date.now() > age + 1000 * 60 * 15 || first){
      
      first = false;
      
      age = Date.now();
      
      weatherService.getWeather().success(function(weather){
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
    $ionicLoading.hide();
    
  };
  wc.getWeather();
}]);
