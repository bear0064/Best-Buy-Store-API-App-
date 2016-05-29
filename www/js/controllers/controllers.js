angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $auth, $state, $ionicViewService, $localstorage) {
    $scope.data = {};
    $scope.Auth = false;


    //Very poor implementation, but for the sake of app requirements this works...
    //Like... I am absolutely aware this is a horrible way to do this.

    $scope.doLogin = function() {

        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);

        if ($scope.data.username == 'guest' ) {
          angular.element(document.querySelector('#alert')).html("Guest can not be used");

            if ($localstorage.getObject('logs') === null || $localstorage.getObject('log') === undefined) {

              var d = new Date();
              var stack = new Error().stack;
              var data = "Wrong Credentials, Guest can not be used!";
              $localstorage.setObject( 'logs', [{
                time: d,
                text: data,
                stack: stack
              }] );

              $scope.logs  = $localstorage.getObject('logs');


            } else {

              d = new Date();
              stack = new Error().stack;
              var data = "Wrong Credentials, Guest can not be used!";
              var obj = $localstorage.getObject('logs');

              obj.push({
                time: d,
                text: data,
                stack: stack
              });

              $localstorage.setObject( 'logs', obj);
              $scope.logs  = $localstorage.getObject('logs');

            }
        } else {

          angular.element(document.querySelector('#alert')).html("");

          document.getElementById('status').innerHTML =
            'Welcome, ' + $scope.data.username + '!';

          $scope.Auth = true;
          console.log('Welcome ' + name + '!');

          $ionicViewService.nextViewOptions({
            disableBack: true
          });

          $state.go("app.search");
        }

      };



    $scope.authenticate = function (provider) {
      $auth.authenticate(provider);
      console.log($auth.isAuthenticated());

      testAPI();

    };

    function testAPI() {

      $ionicViewService.nextViewOptions({
        disableBack: true
      });

      $state.go("app.search");
      //$state.go('search');


      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);

        document.getElementById('status').innerHTML =
          'Welcome, ' + response.name + '!';

      });
    }

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };


    $scope.logout = function()
    {
      console.log($auth.isAuthenticated());

      if ($auth.isAuthenticated() == true || $scope.Auth == true ) {

        $auth.logout();

        console.log($auth.isAuthenticated());

        $scope.Auth = false;
        console.log($scope.Auth);
        $ionicViewService.nextViewOptions({
          disableBack: true
        });

        $state.go("app.login");

      }
    };


  });

