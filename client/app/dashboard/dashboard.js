'use strict';

angular.module('localEyeApp',['chart.js'])
  .config(function($stateProvider) {
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      template: '<dashboard></dashboard>'
    });
  });
