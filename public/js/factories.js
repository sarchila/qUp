angular.module('qUpApp')
  .factory('Session', function ($q, $http, $cookieStore, $location) {
    var service = {
      currentUser: null,
      isLoggedIn: function() {
        return !!service.currentUser;
      },
      setAuthenticated: function (user) {
        $cookieStore.put('user', user);
        service.currentUser = user;
        $location.path('/');
      },
      endSession: function (){
        $cookieStore.remove('user');
        service.currentUser = null;
        $location.path('/');
      }
    };
    service.currentUser = $cookieStore.get('user');
    return service;
  });