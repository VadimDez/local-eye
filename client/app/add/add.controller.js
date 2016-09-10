/**
 * Created by Vadym Yatsyuk on 10/09/16
 */

'use strict';

(function () {
  class AddController {
    constructor($http) {
      this.$http = $http;
      this.newAdvertisement = {};

      this.map = {
        control: {},
        center: { latitude: 48.14248507796358, longitude: 11.581680297851582 },
        zoom: 8,
        events: {
          // center_changed: this.bounds_changed.bind(this)
        }
      };
    }

    createAdvertisement() {
      this.$http.post('/api/advertisements', this.newAdvertisement)
        .then(() => {
          this.newAdvertisement = {};
        });
    }
  }

  angular.module('localEyeApp')
    .controller('AddController', AddController);
})();