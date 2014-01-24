'use strict';

/* Controllers */

var tabulaApp = angular.module('tabulaApp', []);

tabulaApp.controller('TabulaCtrl', function ($scope, $http) {
  $http.get('example.json').then(function (res) {
    $scope.entries = res.data;
  });
});