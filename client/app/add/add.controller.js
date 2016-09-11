/**
 * Created by Vadym Yatsyuk on 10/09/16
 */

'use strict';

(function () {
  class AddController {
    constructor($http, $scope, $timeout) {
      this.$http = $http;
      this.newAdvertisement = {
        url: '/assets/images/banner3_nürnberg.jpg'
      };
      this.isCreated = false;

      // this.map = {
      //   control: {},
      //   center: { latitude: 48.14248507796358, longitude: 11.581680297851582 },
      //   zoom: 8,
      //   events: {
      //     // center_changed: this.bounds_changed.bind(this)
      //   }
      // };


      this.map = {
        center: { latitude: 48.14248507796358, longitude: 11.581680297851582 },
        zoom: 8,
        bounds: {},
        events: {}
      };
      this.options = {scrollwheel: false};
      this.drawingManagerOptions = {
        // drawingMode: 'rectangle',
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['circle', 'polygon', 'polyline', 'rectangle']
        },
        circleOptions: {
          fillColor: '#ffff00',
          fillOpacity: 0.3,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1
        }
      };
      this.markersAndCircleFlag = true;
      this.drawingManagerControl = {};

      $scope.$watch('markersAndCircleFlag', () => {
        if (!this.drawingManagerControl.getDrawingManager) {
          return;
        }
        var controlOptions = angular.copy(this.drawingManagerOptions);
        if (!this.markersAndCircleFlag) {
          controlOptions.drawingControlOptions.drawingModes.shift();
          controlOptions.drawingControlOptions.drawingModes.shift();
        }
        this.drawingManagerControl.getDrawingManager().setOptions(controlOptions);
      });

      $timeout(() => {
        google.maps.event.addListener(this.drawingManagerControl.getDrawingManager(), 'rectanglecomplete', (rectangle) => {
          const bounds = rectangle.getBounds();

            this.newAdvertisement.southwest_latitude = bounds.f.b;
            this.newAdvertisement.southwest_longitude = bounds.b.b;
            this.newAdvertisement.northeast_latitude = bounds.f.f;
            this.newAdvertisement.northeast_longitude = bounds.b.f;

          $scope.$apply($scope.newAdvertisement = this.newAdvertisement);
        });

      }, 1000);
    }

    createAdvertisement() {
      this.$http.post('/api/advertisements', this.newAdvertisement)
        .then(() => {
          this.isCreated = true;
          this.newAdvertisement = {
            // url: '/assets/images/banner1_techfest.jpg'
          };
        });
    }
  }

  angular.module('localEyeApp')
    .controller('AddController', AddController);
})();