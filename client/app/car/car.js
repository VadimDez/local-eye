/**
 * Created by Vadym Yatsyuk on 10/09/16
 */
'use strict';

(function () {
  angular.module('localEyeApp')
    .config(function ($stateProvider) {
      $stateProvider.state('car', {
        url: '/car',
        templateUrl: 'app/car/car.html',
        controller: 'CarController',
        controllerAs: 'vm'
      });
    })
})();