angular.module('qUpApp', ['ngRoute','firebase'])
  .config(function ($routeProvider){
    $routeProvider.when('/', {
      templateUrl: 'partials/queue.html',
      controller: 'queueController'
    });

    $routeProvider.otherwise({
      templateUrl: 'partials/whoops.html',
      controller: 'whoopsController'
    });
  });