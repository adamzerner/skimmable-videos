(function() {


'use strict';

angular.module('skimmableVideosApp')
  .directive('subsection', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/skims/subsection/subsection.html',
      scope: {
        subsection: '=',
        parentNumber: '=',
        number: '=',
        player: '='
      },
      require: '^supersection',
      bindToController: true,
      controller: SubsectionCtrl,
      controllerAs: 'subsectionCtrl',
      link: function(scope, iEl, iAttrs, sectionCtrl) {
        iEl.find('.removeSubsection').bind('click', function() {
          scope.$apply(function() {
            sectionCtrl.removeSubsection(scope.subsectionCtrl.subsection);
          });
        });
      }
    };
  });

function SubsectionCtrl() {
}


})();