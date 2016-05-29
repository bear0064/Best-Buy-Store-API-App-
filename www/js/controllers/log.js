angular.module('starter')

  .controller('logs', ['$scope', '$localstorage', function($scope, $localstorage) {

    $scope.$on('$ionicView.enter', function() {
      $scope.logs = $localstorage.getObject( "logs");
    });



  }]);
