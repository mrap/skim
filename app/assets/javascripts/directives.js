'use strict';

var MAX_INTERVAL_BETWEEN = 1000;

var directives = angular.module('skim.directives', []);

directives.directive('skimReader', function($http, $location, $interval){
  function link(scope, element, attrs) {
    var intervalBetween = MAX_INTERVAL_BETWEEN,
        optimizedTextArray = [],
        currentIndex = 0,
        keyword = "",
        timer;

    // Before anything, get the optimized text.
    var optimizedDocumentURL = $location.absUrl() + '/optimized.json';
    $http.get(optimizedDocumentURL).success(function(data, status){
      optimizedTextArray = data;
      console.log(optimizedTextArray);

      // Prepare timer.
      element.on('$destroy', function() {
        console.log("SkimReader destroyed");
        stopTimer();
      });

      // Updates intervalBetween if wpm changes changes
      scope.$watch(attrs.wpm, function(value) {
        console.log("WPM: "+value);
        updateIntervalBetweenWithWPM(value);
      });

      // Start skimming
      console.log(element);
      startTimer();
    });


    function updateIntervalBetweenWithWPM(wpm) {
      intervalBetween = Math.min(1000 / (wpm/60), MAX_INTERVAL_BETWEEN);
      restartTimer();
    }

    function progressKeyword() {
      if (currentIndex < optimizedTextArray.length) {
        var wordHash = optimizedTextArray[currentIndex];
        keyword = formatKeyword(wordHash.word, wordHash.optimum_index);
        currentIndex += 1;
        element.html(keyword);
      } else {
        stopTimer();
      }
    }

    function formatKeyword(word, keyIndex) {
      var keywordMarkup = "";
      for(var i = 0; i < word.length; i++ ) {
        if (i == keyIndex) {
          keywordMarkup += "<span class=\""+attrs.keyLetterClass+"\">"+word[i] + "</span>";
        } else {
          keywordMarkup += word[i];
        }
      }
      return keywordMarkup;
    }

    function startTimer(){
      timer = $interval(function() {
        progressKeyword()
      }, intervalBetween);
      console.log("Timer started");
    }

    function stopTimer(){
      $interval.cancel(timer);
      console.log("Timer Stopped");
    }

    function restartTimer(){
      stopTimer();
      startTimer();
    }
  }

  return {
    link: link
  };
});
