(function () {
'use strict';

angular.module('Data')
.controller('CategoryController', CategoryController);

CategoryController.$inject = ['categories'];
function CategoryController(categories) {
  var $ctrl = this;

  $ctrl.list = categories;
}

})();
