angular.module('App', ['ionic', 'firebase'])

///// WEATHER SERVICE FACTORY //////////////////////////////////////////////////
.factory('weatherService',['$sce','$http','$firebaseArray', function($sce,$http,$firebaseArray){
  
  //create service object
				var weatherService = {};
				
				//DarkSky API key
				var key = "cbc599f65e3253df70f69be7a60b673e";
				
				weatherService.getCurrentConditions = function(location){
					
					var url = "https://api.darksky.net/forecast/" + key + 
								"/" + location.lat + "," + location.lon;
								
					var trustedUrl = $sce.trustAsResourceUrl(url);
					console.log("Weather Api Url: ");		
					console.log(url);
					return $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'});
					//return $http.get(trustedUrl);
					
					
				};
				
				return weatherService;
				
		}])

.factory("localStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'current-weather') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('current-weather', val);
            return this;
        },
        getData: function() {
            
            var val = $window.localStorage && $window.localStorage.getItem('current-weather');
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
})

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html'
    })
    .state('reservation', {
      url: '/reservation',
      controller: 'ReservationController',
      templateUrl: 'views/reservation/reservation.html'
    })
    .state('weather', {
      url: '/weather',
      controller: 'WeatherController as wc',
      templateUrl: 'views/weather/weather.html'
    })
    .state('restaurants', {
      url: '/restaurants',
      controller: 'RestaurantsController',
      templateUrl: 'views/restaurants/restaurants.html'
    })
    .state('tour', {
      url: '/tour',
      templateUrl: 'views/tour/tour.html'
    })
    .state('directions', {
      url: '/directions',
      templateUrl: 'views/directions/directions.html'
    });

  $urlRouterProvider.otherwise('/tour');

})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


/*angular.module('App', ['ionic'])

.factory('weatherService', ['$http', function ($http){
  var weatherService = {};
  weatherService.getWeather = function(){
    return $http.get('https://ionic-in-action-api.herokuapp.com/weather')
  };
  return weatherService;
}])

.factory("localStorageService", function($window, $rootScope){
  
  angular.element($window).on('storage', function(event){
    if (event.key === 'current-weather'){
      $rootScope.$apply();
    }
  });
  
  return {
    setData: function(val){
      $window.localStorage && $window.localStorage.setItem('current-weather', val);
      return this;
    },
    getData: function(){
      var val = $window.localStorage && $window.localStorage.getItem('current-weather');
      
      var data = angular.fromJson(val);
      
      return data;
    }
    
  }
})

*/
