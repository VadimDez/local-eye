/**
 * Created by Vadym Yatsyuk on 10/09/16
 */
'use strict';

(function () {
  angular.module('localEyeApp')
    .config(function ($stateProvider) {
      $stateProvider.state('add', {
        url: '/add',
        templateUrl: 'app/add/add.html',
        controller: 'AddController',
        controllerAs: 'vm'
      });
    })
})();