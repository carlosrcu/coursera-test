(function () {
'use strict';

angular.module('Data')
.controller('CategoryController', CategoryController);

CategoryController.$inject = ['response'];
function CategoryController(response) {
  var categories = this;

  categories.list = response.data;
}

})();
