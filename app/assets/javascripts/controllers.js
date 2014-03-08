
var controllers = angular.module('skim.controllers', []);

var STARTING_WPM = 300;
controllers.controller('SkimReaderCtrl',['$scope', function($scope) {
  $scope.wpm = STARTING_WPM;
}]);
