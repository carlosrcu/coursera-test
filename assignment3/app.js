(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
	.directive('foundItems', FoundItemsDirective);

	function FoundItemsDirective() {
		var ddo = {
			templateUrl : 'foundItems.html',
			scope : {
				items : '<',
				onRemove : '&'
			},
			controller : FoundItemsDirectiveController,
			controllerAs : 'narrowItDown',
			bindToController : true,
			link : FoundItemsDirectiveLink,
			transclude : true
		};

		return ddo;
	}

	function FoundItemsDirectiveLink(scope, element, attrs, controller) {
		scope.$watch('narrowItDown.noItemsFound()', function (newValue, oldValue) {
			if (newValue) {
				displayNotFound();
			} else {
				removeNotFound();
			}
		});

		function displayNotFound() {
			var errElem = element.find("div.error");
			errElem.slideDown(900);
		}

		function removeNotFound() {
			var errElem = element.find("div.error");
			errElem.slideUp(900);
		}
	}

	function FoundItemsDirectiveController() {
		var narrowItDown = this;

		narrowItDown.noItemsFound = function () {
			return narrowItDown.items.length == 0;
		}
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var narrowItDown = this;

		narrowItDown.searchTerm = "";
		narrowItDown.found = [];

		narrowItDown.getMatchedMenuItems = function () {
			MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm).then(function (found) {
				narrowItDown.found = found;
			})
		}

		narrowItDown.removeFound = function (index) {
			narrowItDown.found.splice(index, 1);
		}
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {
		var service = this;

		var items = [];
		var found = [];

		service.getMenuItems = function () {
			var response = $http({
					method : "GET",
					url : (ApiBasePath + "/menu_items.json")
				});

			return response;
		};

		service.getMatchedMenuItems = function (searchTerm) {
			return this.getMenuItems().then(function (response) {
				service.items = response.data.menu_items;
				service.found = [];
				if (searchTerm != "") {
					for (var i = 0; i < service.items.length; i++) {
						if (service.items[i].name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
							service.items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
							service.found.push(service.items[i]);
						}
					}
				}
				return service.found;
			})
			.catch (function (error) {
				console.log(error);
			});
		};
	}

})();
