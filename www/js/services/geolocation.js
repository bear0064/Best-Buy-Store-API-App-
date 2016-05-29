angular.module('starter')

  .factory("$GeoCtrl",  ['$cordovaGeolocation', '$APICall', '$log', '$localstorage', '$q', function($cordovaGeolocation, $APICall, $log, $localstorage, $q){

    return {


      geoLookUp: function() {

        var deferred = $q.defer();


        var options = {
          timeout: 20000,
          maximumAge        : 2000,
          enableHighAccuracy: false // may cause errors if true
        };

        $cordovaGeolocation
          .getCurrentPosition(options)
          .then(function (result) {


            var long = result.coords.longitude;
            var lat = result.coords.latitude;

            $APICall.ajax(long,lat).then(function (data) {

              deferred.resolve(data);


            });



          }), function (error) {


          deferred.reject(error);
        };

        console.log(deferred.promise);

        return deferred.promise;


      }//endLookup

    };//endReturn

  }]); //close
