angular.module('qUpApp', ['ngRoute','firebase'])
  .config(function ($routeProvider){
    $routeProvider.when('/', {
      templateUrl: 'partials/login.html',
      controller: 'authController'
    });

    $routeProvider.otherwise({
      templateUrl: 'partials/queue.html',
      controller: 'queueController'
    });
  });