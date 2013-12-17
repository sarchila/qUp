angular.module('qUpApp', ['ngRoute','firebase', 'ngCookies'])
  .config(function ($routeProvider){

    $routeProvider.when('/', {
      templateUrl: 'partials/home.html',
      controller: 'homeController',
    });

    $routeProvider.when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'homeController',
    });

    $routeProvider.otherwise({
      templateUrl: 'partials/queue.html',
      controller: 'queueController'
    });
  })
  .run(function($rootScope, $location, Session) {
    $rootScope.$on('$routeChangeStart', function(evt, nextUrl, currentUrl) {
      if (!Session.isLoggedIn()) {
        $location.path('/home');
      }
    });
  });