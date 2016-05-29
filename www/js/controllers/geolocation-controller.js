angular.module('starter')

  .controller('mystore', ['$scope', '$APICall', '$GeoCtrl', '$localstorage', function($scope, $APICall, $GeoCtrl, $localstorage) {


    $GeoCtrl.geoLookUp().then( function (data) {

      console.log( data );
      $localstorage.setObject( "stores", data );
      $scope.closestStores = $localstorage.getObject( "stores", data );

    } ).catch( function (data) {

      if ($localstorage.getObject( 'logs' ) === null || $localstorage.getObject( 'log' ) === undefined) {

        var d = new Date();
        var stack = new Error().stack;

        $localstorage.setObject( 'logs', [{
          time: d,
          text: data,
          stack: stack
        }] );

        $scope.logs = $localstorage.getObject( 'logs' );


      } else {

        d = new Date();
        stack = new Error().stack;

        var obj = $localstorage.getObject( 'logs' );

        obj.push( {
          time: d,
          text: data,
          stack: stack
        } );


        $localstorage.setObject( 'logs', obj );
        $scope.logs = $localstorage.getObject( 'logs' );

      }


    });


  $scope.cityLookup = function(city){
    $APICall.ajaxCity(city)
      .then( function (data) {

        console.log( data );
        $localstorage.setObject( "stores", data );
        $scope.closestStores = $localstorage.getObject( "stores", data );

      } ).catch(function(data)  {

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
    $scope.cityText = '';



    $scope.searchedStores = $localstorage.getObject( "stores");
  }

  }]);

