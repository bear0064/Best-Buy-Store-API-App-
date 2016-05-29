angular.module('starter')

  .factory("$APICall", ['$http', "$log", "$localstorage", '$q', function($http, $log, $localstorage, $q) {



    return {

      ajax: function (long, lat) {


        var deferred = $q.defer();
         $http.get( 'http://api.bestbuy.com/v1/stores(area(' + lat + ',' + long + ',250))?format=json&show=storeId,name,distance&apiKey=j35d23awj5fdtt4xqtj44wj3' )
          .success(function (data) {

            deferred.resolve(data);

          }).error(function (data) {

           deferred.reject(data);

        });

        return deferred.promise;

      }, //end ajax

      ajaxCity: function (city) {

        var deferred = $q.defer();

        $http.get( 'http://api.bestbuy.com/v1/stores(city=' + city + ')?format=json&apiKey=j35d23awj5fdtt4xqtj44wj3' )
          .success(function (data) {

            deferred.resolve(data);

          }).error(function (data) {

            deferred.reject(data);

        });


        return deferred.promise;

      },

      ajaxProductSearch: function (product) {

        var deferred = $q.defer();

         $http.get( 'http://api.bestbuy.com/v1/products((search=' + product + '))?show=name,sku,salePrice,image&format=json&apiKey=j35d23awj5fdtt4xqtj44wj3' )
          .success(function (data) {

            deferred.resolve(data);

          }).error(function (data) {
          deferred.reject(data);

        });

        return deferred.promise;

      }

    }

}]);

