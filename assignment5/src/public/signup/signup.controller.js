(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['SignUpService'];
function SignUpController(SignUpService) {
  var signUpCtrl = this;

  signUpCtrl.submit = function() {
    signUpCtrl.menuNumber = signUpCtrl.menuNumber.toUpperCase();
    SignUpService.checkMenuNumberIsValid(signUpCtrl.menuNumber).then(function(validMenuNumber) {
      signUpCtrl.validMenuNumber = validMenuNumber;
      if (validMenuNumber) {
        SignUpService.save(signUpCtrl.firstName, signUpCtrl.lastName, signUpCtrl.phone, signUpCtrl.email, signUpCtrl.menuNumber);
        signUpCtrl.saved = true;
      }
      else {
        signUpCtrl.saved = false;
      }
    });
  };

}

})();
