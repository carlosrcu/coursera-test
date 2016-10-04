(function () {
'use strict';

angular.module('Assignment2App', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingListCheckOff', ShoppingListCheckOffProvider)
.config(Config);

Config.$inject = ['ShoppingListCheckOffProvider'];
function Config(ShoppingListCheckOffProvider) {
  ShoppingListCheckOffProvider.defaults.itemsToBuy = [
    { name: "Cookies", quantity: 10 },
    { name: "Beer", quantity: 6 },
    { name: "Coke", quantity: 12 },
    { name: "Fruit", quantity: 8 },
    { name: "Milk", quantity: 3 }
  ];
}

ToBuyController.$inject = ['ShoppingListCheckOff'];
function ToBuyController(ShoppingListCheckOff) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOff.getItemsToBuy();

  toBuy.moveToAlreadyBought = function(itemIndex)  {
    ShoppingListCheckOff.moveToAlreadyBought(itemIndex);
  }

  toBuy.everythingIsBought = function () {
    return toBuy.items.length == 0;
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOff'];
function AlreadyBoughtController(ShoppingListCheckOff) {
  var alreadyBought = this;

  alreadyBought.items = ShoppingListCheckOff.getItemsAlreadyBought();

  alreadyBought.nothingAlreadyBought = function () {
    return alreadyBought.items.length == 0;
  }
}

function ShoppingListCheckOffService(paramItemsToBuy) {
  var service = this;

  var itemsToBuy = [];
  var itemsAlreadyBought = [];

  if (paramItemsToBuy !== undefined && paramItemsToBuy.length > 0) {
    itemsToBuy = paramItemsToBuy;
  }

  service.getItemsToBuy = function () {
    return itemsToBuy;
  }

  service.getItemsAlreadyBought = function () {
    return itemsAlreadyBought;
  }

  service.moveToAlreadyBought = function (index) {
    var item = itemsToBuy[index];
    itemsAlreadyBought.push(item);
    itemsToBuy.splice(index, 1);
  }
}

function ShoppingListCheckOffProvider() {
  var provider = this;

  provider.defaults = {
    itemsToBuy : []
  }

  provider.$get = function () {
    var shoppingListCheckOff = new ShoppingListCheckOffService(provider.defaults.itemsToBuy);
    return shoppingListCheckOff;
  }
}

})();
