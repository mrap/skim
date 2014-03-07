var controllers = angular.module('skim.controllers', []);

controllers.controller('SkimReaderCtrl', function($scope, $location, $http, $timeout) {
  $scope.optimizedTextArray = [];
  $scope.currentIndex = 0;
  $scope.wpm = 300;

  var convertToMs = function(wpm) {
    return wpm/60 * 10
  };

  var progressKeyword = function() {
    $scope.keyword = $scope.optimizedTextArray[$scope.currentIndex].word
    $scope.currentIndex += 1;
    $timeout(progressKeyword,$scope.ms);
    console.log($scope.ms);
  };

  var optimizedDocumentURL = $location.absUrl() + '/optimized.json'
  $http.get(optimizedDocumentURL).success(function(data, status){
    $scope.optimizedTextArray = data;

    $scope.ms = convertToMs($scope.wpm);

    // Timer
    $timeout(progressKeyword,$scope.ms);
  });
});
