(function () {
  'use strict';

  angular.module('LunchChecker', [])

  .controller('LunchCheckerController', function ($scope) {
    $scope.dishes = "";
    $scope.lunchCheckerMessage = "";
    $scope.checkIfTooMuch = function () {
      $scope.lunchCheckerMessage = getLunchCheckerMessage($scope.dishes);
    }

    function getLunchCheckerMessage(dishes) {
      if (dishes.length == 0) {
        $scope.lunchCheckerMessagePanel = "panel-danger";
        return "Please enter data first";
      }

      $scope.lunchCheckerMessagePanel = "panel-success";

      var arrayOfDishes = dishes.split(",");
      if (arrayOfDishes.length < 4) {
        return "Enjoy!";
      }
      else {
        return "Too much!";
      }
    }

  });


})();
