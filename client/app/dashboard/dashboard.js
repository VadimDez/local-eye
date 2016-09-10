'use strict';

angular.module('localEyeApp')
  .config(function($stateProvider) {
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      template: '<dashboard></dashboard>'
    });
  });
