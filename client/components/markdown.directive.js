(function() {


'use strict';

angular.module('skimmableVideosApp')
  .directive('markdown', function () {
    return {
      restrict: 'E',
      require:  'ngModel',
      link: function (scope, element, attrs, ngModel) {
        $(element).markdown({
          resize: 'vertical',
          height: '200',
          iconlibrary: 'fa',
          onChange: function(e){
            ngModel.$setViewValue(e.getContent());
          }
        });
      }
    }
  });


})();