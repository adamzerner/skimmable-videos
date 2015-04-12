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
        player: '=',
        removeSection: '&'
      },
      bindToController: true,
      controller: SectionCtrl,
      controllerAs: 'sectionCtrl'
    };
  });

function SectionCtrl() {
  var vm = this;
  vm.addSubsection = function() {
    vm.section.subsections.push({});
  };
  vm.removeSubsection = function(subsection) {
    var index = vm.section.subsections.indexOf(subsection);
    vm.section.subsections.splice(index, 1);
  };
}


})();