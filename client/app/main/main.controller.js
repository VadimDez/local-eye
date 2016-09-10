'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, $timeout) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.$timeout = $timeout;

      this.map = {
        control: {},
        center: { latitude: 45, longitude: -73 },
        zoom: 8,
        events: {
          center_changed: this.bounds_changed.bind(this)
        }
      };

      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.directionsService = new google.maps.DirectionsService();
      this.geocoder = new google.maps.Geocoder();

      this.directions = {
        origin: "Collins St, Melbourne, Australia",
        destination: "MCG Melbourne, Australia",
        showList: false
      };

      this.centerMarker = this.map.center;

      // $scope.$on('$destroy', function() {
      //   socket.unsyncUpdates('thing');
      // });
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

    getDirections() {
      var request = {
        origin: this.directions.origin,
        destination: this.directions.destination,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      };
      let vm = this;
      this.directionsService.route(request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          vm.directionsDisplay.setDirections(response);
          console.log(vm.map.control);
          vm.directionsDisplay.setMap(vm.map.control.getGMap());
          vm.directionsDisplay.setPanel(document.getElementById('directionsList'));
          vm.directions.showList = true;
        } else {
          alert('Google route unsuccesfull!');
        }
      });
    }

    bounds_changed(e) {
      this.$timeout(() => {
        this.centerMarker = {
          latitude: e.center.lat(),
          longitude: e.center.lng()
        };
      }, 300);
    }
  }

  angular.module('localEyeApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'vm'
    });
})();
