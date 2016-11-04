(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['myinfo'];
function MyInfoController(myinfo) {
  var $ctrl = this;
  $ctrl.userData = myinfo.UserData;
  if (myinfo.UserData !== undefined) {
    myinfo.FavoriteMenuPromise.then(function(fv) {
      $ctrl.favoriteMenu = fv;
    })
  }
}

})();
