'use strict';

angular.module('skimmableVideosApp')
  .service('Utils', function () {
    var vm = this;

    vm.hmsToSecs = function(h, m, s) {
      return h*60*60 + m*60 + s;
    };

    vm.secsToHms = function(seconds) {
      var hours, minutes, seconds, hms;
      hours = Math.floor(seconds/60/60);
      seconds -= hours*60*60;
      minutes = Math.floor(seconds/60);
      seconds -= minutes*60;
      hms = [hours, minutes, seconds];
      hms.toString = function() {
        var str = '(';
        if (hms[0] === 1) str += hms[0] + 'hour, ';
        else if (hms[0] === 0) {} // do nothing
        else str += hms[0] + ' hours, ';
        if (hms[1] === 1) str += hms[1] + ' minute, ';
        else if (hms[1] === 0) {} // do nothing
        else str += hms[1] + ' minutes, ';
        if (hms[2] === 1) str += Math.round(hms[2]) + ' second)';
        else str += Math.round(hms[2]) + ' seconds)';
        return str;
      }
      return hms;
    };
  });
