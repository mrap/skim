'use strict';

var MAX_INTERVAL_BETWEEN = 1000;

var directives = angular.module('skim.directives', []);

directives.directive('skimReader', function($http, $location, $interval){
  function link(scope, element, attrs) {
    var intervalBetween = MAX_INTERVAL_BETWEEN,
        optimizedTextArray = [],
        currentIndex = 0,
        keyword = "",
        timer,
        isTimerRunning = false;

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

    var punctuationPauseInterval = function(){
      return intervalBetween * 1.5;
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
        element.html(keyword);

        // If last character is a punctuation, pause timer.
        if (isLastCharacterPunctuation(word)) {
          pauseTimer(punctuationPauseInterval);
        }
      } else {
        stopTimer();
      }
    }

    function formatKeyword(word, keyIndex) {
      var keywordMarkup = "<span class=\"first-half\">";
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
      keywordMarkup += "</span";
      return keywordMarkup;
    }

    function startTimer(){
      if (!isTimerRunning) {
        isTimerRunning = true;
        timer = $interval(function() {
          progressKeyword()
        }, intervalBetween);
        console.log("Timer started");
      }
    }

    function stopTimer(){
      if (isTimerRunning) {
        isTimerRunning = false;
        $interval.cancel(timer);
        timer = undefined;
        console.log("Timer Stopped");
      }
    }

    function restartTimer(){
      stopTimer();
      startTimer();
    }

    function pauseTimer(delay) {
      stopTimer();
      if (delay) {
        console.log("Paused for: " + delay() + "s");
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
});
