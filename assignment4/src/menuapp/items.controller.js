(function () {
'use strict';

angular.module('Data')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['response'];
function ItemsController(response) {
  var items = this;

  items.list = response.data.menu_items;
}

})();
