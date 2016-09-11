/**
 * Created by Vadym Yatsyuk on 10/09/16
 */

'use strict';

(function () {
  class CarController {
    constructor($http, $scope, $timeout) {
      this.$http = $http;
      this.$timeout = $timeout;


      $timeout(() => {
        this.setupRoute();
      }, 2000);
    }
    setupRoute() {
      this.$http.get(`/api/routes?start=Munich&end=Berlin`)
        .then(res => {
          this.polylines = [
            {
              id: 1,
              path: res.data.points.map(point => {
                return {
                  latitude: point[0],
                  longitude: point[1]
                };
              }),
              stroke: {
                color: '#6060FB',
                weight: 3
              },
              editable: false,
              draggable: false,
              geodesic: true,
              visible: true,
              icons: [{
                icon: {
                  path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                },
                offset: '25px',
                repeat: '50px'
              }]
            },
          ];

          if (this.timer) {
            this.$timeout.cancel(this.timer);
          }

          this.simulateRun(0);
        });
    }

    simulateRun(i) {
      console.log('simulting');
      this.timer = this.$timeout(() => {
        const length = this.polylines[0].path.length - 1;

        if (i === length) {
          this.$timeout.cancel(this.timer);
          return;
        }

        this.locationBasedAdvertisement(this.polylines[0].path[i].latitude, this.polylines[0].path[i].longitude);
        this.simulateRun(Math.min(i + 2, length));
      }, 200);
    }

    locationBasedAdvertisement(lat, lng) {

      this.$http.get(`/api/advertisements?latitude=${ lat }&longitude=${ lng }`)
        .then(res => {

            if (res.data.length) {
              // ad found!
              this.advertisement = res.data[0];
            } else {
              this.advertisement = null;
              // render default advertising
              // if needed
            }


          });

    }
  }

  angular.module('localEyeApp')
    .controller('CarController', CarController);
})();