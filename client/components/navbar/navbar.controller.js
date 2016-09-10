'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor(Auth,$timeout, $mdSidenav) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    this.toggleLeft = buildToggler('left');
    this.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }
  }

}

angular.module('localEyeApp')
  .controller('NavbarController', NavbarController);
