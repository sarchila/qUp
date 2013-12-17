angular.module('qUpApp')
  .controller('queueController', function ($rootScope, $scope, $firebase, $location, $cookieStore, Session){
    $scope.queueName = $location.path().slice(1);
    var ref = new Firebase('https://santiago.firebaseio.com/queues/' + $scope.queueName);
    $scope.queue = $firebase(ref);

    $scope.alreadyQueued = function (){
      var inQueue = $scope.queue.$getIndex();
      for (var i = 0 ; i < inQueue.length ; i++){
        if ($scope.queue[inQueue[i]].name === $scope.username){
          $scope.myRef = ref.child(inQueue[i]);
          $scope.message = "You are already in the Q, " + $scope.username + "!";
          $scope.completeQueueProcess();
          return true;
        }
      }
      return false;
    };

    $scope.addToQueue = function() {
      console.log("$scope =====> ", $scope);
      console.log("$rootScope =====> ", $rootScope);
      console.log("currentUser =====> ", Session.currentUser);
      $scope.username = Session.currentUser.email;
      if (!$scope.alreadyQueued()){
        $scope.myRef = $scope.queue.$add({name: $scope.username});
        $scope.message = "You're Q'ed Up, " + $scope.username + "!";
        $scope.completeQueueProcess();
      }
    };

    $scope.completeQueueProcess = function (){
      $scope.name = "";
      ref.on('value', function() {
        $scope.checkIfFirst();
      });
    };

    $scope.removeFromQueue = function (){
      ref.off('value');
      $scope.myRef.remove();
      delete $scope.username;
    };

    $scope.checkIfFirst = function (){
      var inQueue = $scope.queue.$getIndex();
      if (inQueue.length === 1 || ($scope.queue[inQueue[0]]).name === $scope.username){
        $scope.message = "You're first in line, " + $scope.username + ".  Please De-Q when you're done";
      }
    };
  })

  .controller("authController", function($rootScope, $scope, Session) {
    var ref = new Firebase('https://santiago.firebaseio.com');
    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
      $scope.$apply(function(){
        if (error) {
          // an error occurred while attempting login
          console.log(error);
        } else if (user) {
          // user authenticated with Firebase
          $scope.user = user;
          Session.setAuthenticated(user);
        } else {
          console.log("user is logged out");
        }
      });
    });

    $scope.newUser = function (){
      auth.createUser($scope.email, $scope.password, function(error, user) {
        $scope.$apply(function (){
          if (!error) {
            $scope.user = user;
            console.log('User Id: ' + user.id + ', Email: ' + user.email);
          } else {
             console.error(error);
          }
        });
      });
    };

    $scope.logThemIn = function (){
      auth.login('password', {
        email: $scope.email,
        password: $scope.password
      });
    };

    $scope.logThemOut = function (){
      auth.logout();
      delete $scope['user'];
      $scope.password = "";
      Session.endSession();
    };
  })
  
  .controller('homeController', function ($scope){
    $scope.name = "test";
  });