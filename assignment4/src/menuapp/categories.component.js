(function () {
'use strict';

angular.module('Data')
.component('categories', {
  templateUrl: 'src/menuapp/templates/categories.template.html',
  bindings: {
    list: '<'
  }
});

})();
