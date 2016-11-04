(function () {
  "use strict";

  angular.module('common')
  .service('MenuService', MenuService);


  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
    var service = this;

    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        return response.data;
      });
    };


    service.getMenuItems = function (category) {
      var config = {};
      if (category) {
        config.params = {'category': category};
      }

      return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
        return response.data;
      });
    };

    service.getMenuItem = function(menuNumber) {
      return service.getMenuItems(menuNumber.replace(/\d+/, "")).then(function (response) {
        var items = response.menu_items;
        for(var i = 0; i < items.length; i++) {
          if (items[i].short_name == menuNumber) {
            return items[i];
          }
        }
      });
    };

  };


})();
