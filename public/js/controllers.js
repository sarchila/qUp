angular.module('qUpApp')
  .controller('queueController', function ($scope, $firebase, $q){
    var ref = new Firebase('https://santiago.firebaseio.com/');
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

    $scope.addToQueue = function(key) {
      if (key.keyCode === 13) {
        $scope.username = $scope.name;
        if (!$scope.alreadyQueued()){
          $scope.myRef = $scope.queue.$add({name: $scope.name});
          $scope.message = "You're Q'ed Up, " + $scope.username + "!";
          $scope.completeQueueProcess();
        }
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
      if ($scope.queue[inQueue[0]].name === $scope.username){
        $scope.message = "You're first in line!  Please De-Q when you're done!";
      }
    };

  });