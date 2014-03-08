
var controllers = angular.module('skim.controllers', []);

var STARTING_WPM = 300;
controllers.controller('SkimReaderCtrl', function($scope, $location, $http, $timeout) {
  $scope.wpm = STARTING_WPM;
//   $scope.optimizedTextArray = [];
//   $scope.currentIndex = 0;
//   $scope.wpm = 300;
//
//   $scope.ms = function() {
//     return Math.min(1000 / ($scope.wpm/60), 1000);
//   };
//
//   var progressKeyword = function() {
//     $scope.keyword = $scope.optimizedTextArray[$scope.currentIndex].word
//     $scope.currentIndex += 1;
//     $timeout(progressKeyword,$scope.ms());
//     console.log($scope.ms());
//   };
//
//   var optimizedDocumentURL = $location.absUrl() + '/optimized.json'
//   $http.get(optimizedDocumentURL).success(function(data, status){
//     $scope.optimizedTextArray = data;
//
//     // Timer
//     $timeout(progressKeyword,$scope.ms());
//   });
});
