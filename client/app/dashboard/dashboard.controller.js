'use strict';

(function() {

  class DashboardController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];

      this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

      // $scope.$on('$destroy', function() {
      //   socket.unsyncUpdates('thing');
      // });

        this.myChartObject = {};

        //Methods
        this.hideSeries = hideSeries;

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
          this.myChartObject.type = "LineChart";
          this.myChartObject.displayed = false;
          this.myChartObject.data = {
              "cols": [{
                  id: "month",
                  label: "Month",
                  type: "string"
              }, {
                  id: "laptop-id",
                  label: "Laptop",
                  type: "number"
              }, {
                  id: "desktop-id",
                  label: "Desktop",
                  type: "number"
              }, {
                  id: "server-id",
                  label: "Server",
                  type: "number"
              }, {
                  id: "cost-id",
                  label: "Shipping",
                  type: "number"
              }],
              "rows": [{
                  c: [{
                      v: "January"
                  }, {
                      v: 19,
                      f: "42 items"
                  }, {
                      v: 12,
                      f: "Ony 12 items"
                  }, {
                      v: 7,
                      f: "7 servers"
                  }, {
                      v: 4
                  }]
              }, {
                  c: [{
                      v: "February"
                  }, {
                      v: 13
                  }, {
                      v: 1,
                      f: "1 unit (Out of stock this month)"
                  }, {
                      v: 12
                  }, {
                      v: 2
                  }]

              }, {
                  c: [{
                      v: "March"
                  }, {
                      v: 24
                  }, {
                      v: 5
                  }, {
                      v: 11
                  }, {
                      v: 6
                  }]
              }]
          };
          this.myChartObject.options = {
              "title": "Sales per month",
              "colors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
              "defaultColors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
              "isStacked": "true",
              "fill": 20,
              "displayExactValues": true,
              "vAxis": {
                  "title": "Sales unit",
                  "gridlines": {
                      "count": 10
                  }
              },
              "hAxis": {
                  "title": "Date"
              }
          };

          this.myChartObject.view = {
              columns: [0, 1, 2, 3, 4]
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
