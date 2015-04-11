(function() {


'use strict';

angular.module('skimmableVideosApp')
  .directive('supersection', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/skims/form/section/section.html',
      scope: {
        section: '=',
        number: '=',
        player: '='
      },
      bindToController: true,
      controller: SectionCtrl,
      controllerAs: 'sectionCtrl'
    };
  });

function SectionCtrl() {
  this.addSubsection = function() {
    this.section.subsections.push({});
  };
  this.removeSubsection = function(subsection) {
    var index = this.section.subsections.indexOf(subsection);
    this.section.subsections.splice(index, 1);
  };
  this.test = function() {
    console.log(this.player.getCurrentTime());
  };
}


})();