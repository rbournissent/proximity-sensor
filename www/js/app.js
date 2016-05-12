/* global angular, nfc, ndef */
angular.module('starter', ['ionic'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      window.cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      window.StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function ($scope, $timeout, $ionicPlatform) {
  $scope.checkNFC = function () {
    $ionicPlatform.ready(function () {
      nfc.enabled(function () {
        $scope.$apply(function () {
          $scope.nfcEnabled = true;
        });
      }, function () {
        $scope.$apply(function () {
          $scope.nfcEnabled = false;
        });
      });
    });
  };

  $scope.checkNFC();

  $scope.sendCredentials = function (username, password) {
    $scope.sendingCredentials = true;
    $scope.sent = false;
    $scope.error = null;

    var timeout = $timeout(function () {
      stopSharing();
    }, 10000);

    var message = [
      ndef.textRecord(username + ', ' + password)
    ];

    nfc.share(message, function () {
      $scope.sendingCredentials = false;
      $timeout.cancel(timeout);
      $scope.sent = true;

      $timeout(function () {
        $scope.sent = false;
      }, 2000);
    }, function (reason) {
      $scope.sendingCredentials = false;
      $timeout.cancel(timeout);
      $scope.error = 'Unable to send the creds: ' + reason;
    });
  };

  function stopSharing () {
    $scope.sendingCredentials = false;

    nfc.unshare(function () {
      $scope.$apply(function () {
        $scope.error = 'Credentials are not being sent anymore.';
      });
    }, function (reason) {
      $scope.$apply(function () {
        $scope.error = 'Unable to stop sending the creds: ' + reason;
      });
    });
  }
});
