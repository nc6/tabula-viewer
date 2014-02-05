'use strict';

/* Controllers */

var tabulaApp = angular.module('tabulaApp', []);

tabulaApp.controller('TabulaCtrl', function ($scope, $http) {
  $http.get('example.json').then(function (res) {
    $scope.entries = res.data;
  });
  
  $scope.orderProp = 'entry.startTime';
  
  $scope.getId = function(entry, prefix) {
    return prefix + entry.timestamp.hashCode();
  };

  $scope.getShortDir = function (cwd) {
    var comps = cwd.split("/");
    return "../" + comps[comps.length - 1];
  };

  $scope.getDate = function (timestamp) {
    var comps = timestamp.split("T");
    return comps[0];
  };

  $scope.getTime = function (timestamp) {
    var comps = timestamp.split("T");
    return comps[1];
  };

  $scope.exitStatus = function (exitStatus) {
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

  $scope.exitStatusInfo = function (exitStatus) {
    switch (exitStatus) {
    case 0:
      return "Success";
    case 1:
      return "Catchall for general errors";
    case 2:
      return "Misues of shell builtins";
    case 126:
      return "Command invoked couldn't execute";
    case 127:
      return "Command not found";
    case 130:
      return "Script terminated by Control-C";
    default:
      return "Command failed";
    }
  };
  
  $scope.selectedTab = '';
  
  $scope.changeTab = function(entry, tab) {
    $scope.selectedTab = $scope.getId(entry, tab);
  };

});