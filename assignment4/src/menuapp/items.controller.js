(function () {
'use strict';

angular.module('Data')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items'];
function ItemsController(items) {
  var $ctrl = this;

  $ctrl.list = items.menu_items;
}

})();
