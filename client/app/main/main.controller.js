'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, $timeout) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.$timeout = $timeout;
      this.departure = 'Munich';
      this.destination = 'Berlin';

      this.map = {
        control: {},
        center: { latitude: 48.14248507796358, longitude: 11.581680297851582 },
        zoom: 8,
        events: {
          center_changed: this.bounds_changed.bind(this)
        }
      };


      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.directionsService = new google.maps.DirectionsService();
      this.geocoder = new google.maps.Geocoder();

      // this.directionsRequest = {
      //   origin: '48.1351, 11.5820',
      //   destination: '52.5200, 13.4050',
      //   waypoints: [
      //    {
      //      location: '50.1109, 8.6821',
      //      stopover: false
      //    }],
      //   provideRouteAlternatives: false,
      //   travelMode: 'DRIVING',
      //   drivingOptions: {
      //    departureTime: new Date(1337675679473),
      //    trafficModel: 'pessimistic'
      //   },
      //   unitSystem: google.maps.UnitSystem.IMPERIAL,
      //   showList: false
      // };

      this.centerMarker = this.map.center;
      this.locationBasedAdvertisement(this.centerMarker.latitude, this.centerMarker.longitude);


      // $scope.$on('$destroy', function() {
      //   socket.unsyncUpdates('thing');
      // });
    }

    setupRoute() {
      this.$http.get(`/api/routes?start=${ this.departure }&end=${ this.destination }`)
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
      this.timer = this.$timeout(() => {
        const length = this.polylines[0].path.length - 1;

        this.map.center = this.polylines[0].path[i];
        this.centerMarker = this.polylines[0].path[i];

        if (i === length) {
          this.$timeout.cancel(this.timer);
          return;
        }

        this.simulateRun(Math.min(i + 2, length));
      }, 100);
    }

    $onInit() {
      // this.$http.get('/api/things')
      //   .then(response => {
      //     this.awesomeThings = response.data;
      //     this.socket.syncUpdates('thing', this.awesomeThings);
      //   });
    }

    // addThing() {
    //   if (this.newThing) {
    //     this.$http.post('/api/things', {
    //       name: this.newThing
    //     });
    //     this.newThing = '';
    //   }
    // }

    // deleteThing(thing) {
    //   this.$http.delete('/api/things/' + thing._id);
    // }

    // getDirections() {
    //
    //   let vm = this;
    //   this.directionsService.route(this.directionsRequest, function (response, status) {
    //     if (status === google.maps.DirectionsStatus.OK) {
    //       alert('Google route succesfull!');
    //       console.log(vm.map.control);
    //       vm.directionsDisplay.setMap(vm.map.control.getGMap());
    //       vm.directionsDisplay.setDirections(response);
    //       vm.directionsDisplay.setPanel(document.getElementById('directionsList'));
    //       vm.directions.showList = true;
    //     } else {
    //       alert('Google route unsuccesfull!');
    //     }
    //   });
    // }

    bounds_changed(e) {
      this.$timeout(() => {
        const lat = e.center.lat();
        const lng = e.center.lng();

        this.centerMarker = {
          latitude: lat,
          longitude: lng
        };

        this.locationBasedAdvertisement(lat, lng);
      }, 300);
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


        },  function fallBackOnError(resp) {

            //
            // faking advertisement when the server returns an error
            //
            if (lat < 48.20842133818611 && lat > 47.98462736343803 && lng > 11.405899047851582 && lng < 11.740982055664082) {
              this.advertisement = 'BMW';
            } else {
              this.advertisement = 'AUDI';
            }
          }
        );
        
    }
  }

  angular.module('localEyeApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'vm'
    });
})();
