'use strict';

var app = angular.module('app', [
    'droplit.angular-color-picker'
]);

app.controller('MyController', ['$scope', function ($scope) {
    // $scope.hue = 90;
    $scope.hue = 0x7fff;
    $scope.range = 0xffff;
}]);