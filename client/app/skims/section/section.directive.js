(function() {


'use strict';

angular.module('skimmableVideosApp')
  .directive('supersection', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/skims/section/section.html',
      scope: {
        section: '=',
        number: '='
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
    console.log(this.section.subsections);
    this.section.subsections.splice(index, 1);
    console.log(this.section.subsections);
  };
}


})();