'use strict';

angular.module('localEyeApp', ['localEyeApp.auth', 'localEyeApp.admin', 'localEyeApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'validation.match',
  'uiGmapgoogle-maps'
  ])
  .config(function($urlRouterProvider, $locationProvider, uiGmapGoogleMapApiProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    uiGmapGoogleMapApiProvider.configure({
      china: true
    });
  });
