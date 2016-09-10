'use strict';

(function() {

  class DashboardController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

      // sw => (f.b, b.b)
      // ne => (f.f, b.f)

      let bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(48.69096039092549, -118.4765625),
        new google.maps.LatLng(34.52466147177173, -78.3984375));
      this.rectangle = {
          bounds: bounds,
          fill: { color: '#000', opacity: 0.5}
      };

      // $scope.$on('$destroy', function() {
      //   socket.unsyncUpdates('thing');
      // });

        this.myChartObject = {};

        //Methods
        this.hideSeries = hideSeries;

        console.log('ok');
        this.getAdvertisement();

        this.init();

        function hideSeries(selectedItem) {
            var col = selectedItem.column;
            if (selectedItem.row === null) {
                if (this.myChartObject.view.columns[col] == col) {
                    this.myChartObject.view.columns[col] = {
                        label: this.myChartObject.data.cols[col].label,
                        type: this.myChartObject.data.cols[col].type,
                        calc: function() {
                            return null;
                        }
                    };
                    this.myChartObject.options.colors[col - 1] = '#CCCCCC';
                }
                else {
                    this.myChartObject.view.columns[col] = col;
                    this.myChartObject.options.colors[col - 1] = this.myChartObject.options.defaultColors[col - 1];
                }
            }
        }
    }

    getAdvertisement() {
        this.$http.get('/api/advertisements')
          .then((res) => {
              console.log(res);
              this.adv = res.data;
          });
    }

    setArea(){

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

      init() {

          this.myChartObject.type = "AreaChart";
          this.myChartObject.displayed = false;
          this.myChartObject.data = {
              "cols": [{
                  id: "month",
                  label: "Month",
                  type: "string"
              }, {
                  id: "laptop-id",
                  label: "Hours",
                  type: "number"
              }],
              "rows": [{
                  c: [{
                      v: "01/09/2016"
                  }, {
                      v: 150,
                      f: "150 hours"
                  }]
              },{
                  c: [{
                      v: "02/09/2016"
                  }, {
                      v: 155,
                      f: "155 hours"
                  }]
              },{
                  c: [{
                      v: "03/09/2016"
                  }, {
                      v: 170,
                      f: "170 hours"
                  }]
              },{
                  c: [{
                      v: "04/09/2016"
                  }, {
                      v: 195,
                      f: "195 hours"
                  }]
              },{
                  c: [{
                      v: "05/09/2016"
                  }, {
                      v: 233,
                      f: "233 hours"
                  }]
              },{
                  c: [{
                      v: "06/09/2016"
                  }, {
                      v: 234,
                      f: "234 hours"
                  }]
              },{
                  c: [{
                      v: "07/09/2016"
                  }, {
                      v: 250,
                      f: "250 hours"
                  }]
              },{
                  c: [{
                      v: "08/09/2016"
                  }, {
                      v: 266,
                      f: "266 hours"
                  }]
              },{
                  c: [{
                      v: "09/09/2016"
                  }, {
                      v: 258,
                      f: "258 hours"
                  }]
              }, {
                  c: [{
                      v: "10/09/2016"
                  }, {
                      v: 263,
                      f: "263 hours"
                  }]

              }, {
                  c: [{
                      v: "11/09/2016"
                  }, {
                      v: 154,
                      f: "154 hours"
                  }]
              }]
          };
          this.myChartObject.options = {
              "title": "Current month",
              "colors": ['#73D700'],
              "defaultColors": ['#0000FF'],
              "isStacked": "true",
              "fill": 20,
              "displayExactValues": true,
              "vAxis": {
                  "title": "Sales unit (hours)",
                  "gridlines": {
                      "count": 10
                  }
              },
              "hAxis": {
                  "title": "Date"
              }
          };

          this.myChartObject.view = {
              columns: [0, 1]
          };
      }
  }

  angular.module('localEyeApp')
    .component('dashboard', {
      templateUrl: 'app/dashboard/dashboard.html',
      controller: DashboardController,
      controllerAs: 'vm'
    });
})();
