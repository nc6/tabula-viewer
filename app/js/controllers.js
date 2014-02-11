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

  /* Directory stuff */
  $scope.getShortDir = function (cwd) {
    var comps = cwd.split("/");
    return "../" + comps[comps.length - 1];
  };
  
  $scope.changeDirLength = function (entry) {
    if (!entry.hasOwnProperty('dirLength')) {
      entry.dirLength = "long";
    }
    else if (entry.dirLength === "short") {
      entry.dirLength="long";
    }
    else if (entry.dirLength === "long") {
      entry.dirLength="short";
    }
  };
  
  $scope.isShort = function (entry) {
    if (entry.hasOwnProperty('dirLength')) {
      return (entry.dirLength==="short");
    }
    return true;
  };
  /* End directory stuff */
  
  /* Tab selection */
  $scope.changeTab = function (entry, tab) {
    if (!entry.hasOwnProperty('selectedTab')) {
      entry.selectedTab = tab;
    }
    else if (entry.selectedTab === tab) {
      entry.selectedTab = 'none';
    }
    else {
      entry.selectedTab = tab;
    }
  };
  
  /* $scope.changeTab = function(entry, tab) {
    $scope.selectedTab = $scope.getId(entry, tab);
  };
*/
  
  /* End tab stuff */
  
  /* Datetime */
  $scope.getDate = function (timestamp) {
    var comps = timestamp.split("T");
    return comps[0];
  };
  
  $scope.isDateSameAsPrevious = function (index, filteredEntries) {
    if (index - 1 >= 0) {
      return ($scope.getDate(filteredEntries[index].entry.startTime)===$scope.getDate(filteredEntries[index - 1].entry.startTime));
    }
    return false;
  };

  $scope.getTime = function (timestamp) {
    var comps = timestamp.split("T");
    return comps[1];
  };
  /* End datetime */

  /* Exit status lozenges */
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
  /* End exit status lozenges */
});

