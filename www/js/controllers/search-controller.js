angular.module('starter')


  .controller('search', ['$scope', '$ionicSlideBoxDelegate', '$APICall', '$localstorage', function($scope, $ionicSlideBoxDelegate, $APICall, $localstorage) {

  $scope.findProduct = function(product){

    $scope.productText = '';

    $APICall.ajaxProductSearch(product).then( function (data) {


      $localstorage.setObject( "searchedProduct", data );
      $scope.searchedProduct = $localstorage.getObject( "searchedProduct");

      $ionicSlideBoxDelegate.update();

    }).catch(function(data)  {

      if ($localstorage.getObject('logs') === null || $localstorage.getObject('log') === undefined) {

        var d = new Date();
        var stack = new Error().stack;

        $localstorage.setObject( 'logs', [{
          time: d,
          text: data,
          stack: stack
        }] );

        $scope.logs  = $localstorage.getObject('logs');


      } else {

        d = new Date();
        stack = new Error().stack;

        var obj = $localstorage.getObject('logs');

        obj.push({
          time: d,
          text: data,
          stack: stack
        });


        $localstorage.setObject( 'logs', obj);
        $scope.logs  = $localstorage.getObject('logs');

      }


    })
    };



    $ionicSlideBoxDelegate.update();

}]);
