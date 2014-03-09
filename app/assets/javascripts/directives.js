'use strict';

var MAX_INTERVAL_BETWEEN = 1000;
var WORDS_IN_PHRASE = 3;

var directives = angular.module('skim.directives', []);

directives.directive('skimReader',['$http', '$location', '$interval', function($http, $location, $interval){
  function link(scope, element, attrs) {
    // Initial variables.
    var intervalBetween = MAX_INTERVAL_BETWEEN,
        optimizedTextArray = [],
        currentIndex = 0,
        phraseCount = 1,
        keyword = "",
        timer,
        isTimerRunning = false;

    scope.userWantsToSkim = false;


    // Interface variables.
    scope.startSkimming = function(){
      scope.userWantsToSkim = true;
      startTimer();
    };

    scope.stopSkimming = function(){
      scope.userWantsToSkim = false;
      stopTimer();
    };

    // Updates intervalBetween if wpm changes changes
    scope.$watch(attrs.wpm, function(value) {
      updateIntervalBetweenWithWPM(value);
    });

    // Prepare timer.
    element.on('$destroy', function() {
      stopTimer();
    });

    // Get the optimized text.
    var optimizedDocumentURL = $location.absUrl() + '/optimized.json';
    $http.get(optimizedDocumentURL).success(function(data, status){
      optimizedTextArray = data;
    });

    var punctuationPauseInterval = function(){
      return intervalBetween * 1.5;
    };

    var phrasePauseInterval = function(){
      return intervalBetween / 2;
    };


    function updateIntervalBetweenWithWPM(wpm) {
      intervalBetween = Math.min(1000 / (wpm/60), MAX_INTERVAL_BETWEEN);
      restartTimer();
    }

    function progressKeyword() {
      if (currentIndex < optimizedTextArray.length) {
        var wordHash = optimizedTextArray[currentIndex];
        var word = wordHash.word;
        keyword = formatKeyword(word, wordHash.optimum_index);
        currentIndex += 1;
        phraseCount += 1;
        element.html(keyword);

        // If last character is a punctuation, pause timer.
        if (isLastCharacterPunctuation(word)) {
          phraseCount = 0;
          pauseTimer(punctuationPauseInterval);
        } else if (phraseCount >= WORDS_IN_PHRASE) {
          phraseCount = 0;
          pauseTimer(phrasePauseInterval);
        }
      } else {
        stopTimer();
      }
    }

    function formatKeyword(word, keyIndex) {
      var keywordMarkup = "<span class=\"first-half\">";

      // One letter word, close the first half span.
      if (word.length < 2) {
        keywordMarkup += "</span>";
      }
      for(var i = 0; i < word.length; i++ ) {
        if (i == keyIndex) {
          keywordMarkup += "<span class=\""+attrs.keyLetterClass+"\">"+word[i] + "</span>";
        }
        else if (i == keyIndex - 1) {
          keywordMarkup += word[i] + "</span>";
        }
        else if (i == keyIndex + 1) {
          keywordMarkup += "<span>" + word[i];
        }
        else {
          keywordMarkup += word[i];
        }
      }
      // Close the last span.
      keywordMarkup += "</span>";
      return keywordMarkup;
    }

    function startTimer(){
      if (!isTimerRunning && scope.userWantsToSkim) {
        isTimerRunning = true;
        timer = $interval(function() {
          progressKeyword()
        }, intervalBetween);
      }
    }

    function stopTimer(){
      if (isTimerRunning) {
        isTimerRunning = false;
        $interval.cancel(timer);
        timer = undefined;
      }
    }

    function restartTimer(){
      stopTimer();
      startTimer();
    }

    function pauseTimer(delay) {
      stopTimer();
      if (delay) {
        $interval(function() {
          startTimer();
        }, delay(), 1);
      }
    }

    function isLastCharacterPunctuation (word){
      var punctutations = ".,:;?!)";
      var lastCharacter = word[word.length - 1];
      return punctutations.indexOf(lastCharacter) != -1;
    }
  }

  return {
    link: link
  };
}]);
