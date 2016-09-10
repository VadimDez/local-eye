/**
 * Created by Vadym Yatsyuk on 10/09/16
 */

'use strict';

(function () {
  class AddController {
    constructor($http, $scope, $timeout) {
      this.$http = $http;
      this.newAdvertisement = {};

      // this.map = {
      //   control: {},
      //   center: { latitude: 48.14248507796358, longitude: 11.581680297851582 },
      //   zoom: 8,
      //   events: {
      //     // center_changed: this.bounds_changed.bind(this)
      //   }
      // };


      this.map = {
        center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4, bounds: {},
        events: {
        }
      };
      this.options = {scrollwheel: false};
      this.drawingManagerOptions = {
        drawingMode: 'marker',
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
          console.log('here');
          console.log(rectangle);
          console.log(rectangle.getBounds());

          // this.newAdvertisement.
        });

      }, 1000);
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