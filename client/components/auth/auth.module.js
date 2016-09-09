'use strict';

angular.module('localEyeApp.auth', ['localEyeApp.constants', 'localEyeApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
