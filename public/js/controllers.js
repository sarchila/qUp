angular.module('qUpApp')
  .controller('queueController', function ($scope, $firebase, $q){
    var ref = new Firebase('https://santiago.firebaseio.com/');
    $scope.queue = $firebase(ref);

    $scope.alreadyQueued = function (){
      var inQueue = $scope.queue.$getIndex();
      for (var i = 0 ; i < inQueue.length ; i++){
        if ($scope.queue[inQueue[i]].name === $scope.username){
          $scope.myRef = ref.child(inQueue[i]);
          $scope.message = "You were already in the Q, " + $scope.username + "!";
          $scope.name = "";
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
          $scope.name = "";
        }
      }
    };


    $scope.removeFromQueue = function (){
      $scope.myRef.remove();
      delete $scope.username;
    };
  });