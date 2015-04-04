(function() {


'use strict';

angular.module('skimmableVideosApp')
  // .directive('markdown', function () {
  //   return {
  //     restrict: 'E',
  //     require:  'ngModel',
  //     link: function (scope, element, attrs, ngModel) {
  //       $(element).markdown({
  //         savable: true,
  //         onChange: function(e){
  //           scope.$apply(function() {
  //             ngModel.$setViewValue(e.getContent());
  //           });
  //         }
  //       });
  //     }
  //   }
  // });
  .directive("markdownEditor", function () {
    return {
      restrict: "A",
      require:  'ngModel',
      link:     function (scope, element, attrs, ngModel) {
        $(element).markdown({
          savable:false,
          onChange: function(e){
            ngModel.$setViewValue(e.getContent());
          }
        });
      }
    }
  });


})();