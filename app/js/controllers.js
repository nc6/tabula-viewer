'use strict';

/* Controllers */

var tabulaApp = angular.module('tabulaApp', []);

tabulaApp.controller('TabulaCtrl', function ($scope, $http) {
  $http.get('example.json').then(function (res) {
    $scope.entries = res.data;
  });
  $scope.orderProp = 'entry.startTime';

  $scope.getShortDir = function (cwd) {
    var comps = cwd.split("/");
    return  "../" + comps[comps.length - 1];
  };
  
  $scope.getDate = function(timestamp) {
    var comps = timestamp.split("T");
  return comps[0];
  };
  
  $scope.getTime = function(timestamp) {
    var comps = timestamp.split("T");
  return comps[1];
  };
  
  $scope.exitStatus = function(exitStatus) {
    if (exitStatus === 0) {
      // Successful
      return "exitSuccess";
    } else if (exitStatus > 127) {
      // Killed by user
      return "exitKilled";
    } else {
      // Failed for some reason.
      return "exitFailure";
    }
  };
  
});