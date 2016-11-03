(function () {
'use strict';

angular.module('Data')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Categories list
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/main-categories.template.html',
    controller: 'CategoryController as categories',
    resolve : {
      categories: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Items list
  .state('items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/menuapp/templates/main-items.template.html',
    controller: 'ItemsController as items',
    resolve : {
      items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
      }]
    }
  });

}

})();
