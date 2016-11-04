(function(){
  "use strict";

  angular.module('common')
  .service('SignUpService', SignUpService);

  SignUpService.$inject = ['$http', 'ApiPath'];
  function SignUpService($http, ApiPath) {
    var service = this;

  service.checkMenuNumberIsValid = function(menuNumber) {
      return $http.get(ApiPath + "/menu_items/" + menuNumber + ".json").then(function (response) {
        return true;
      }, function (response) {
        return false;
      })
    }

    service.save = function(firstName, lastName, phoneNumber, email, menuNumber) {
      service.UserInfo = {
        FirstName : firstName,
        LastName : lastName,
        Email : email,
        PhoneNumber : phoneNumber,
        MenuNumber : menuNumber
      }
    }

    service.getUserInfo = function () {
      return service.UserInfo;
    }

  }

})();
