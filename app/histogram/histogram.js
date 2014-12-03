'use strict';


(function () {
    var app = angular.module('histogram', []);

    app.directive("histogramPlot", ['$rootScope', function ($rootScope) {
        return {
            restrict: 'E',
            scope: {
                plot: '='
            },
            templateUrl: './histogram/histogramPlot.html',
            link: function (scope, element, attrs) {
                scope.plotId = attrs.plot;

                var plotModel = {
                    parentNode: "#" + scope.plotId + " .histogramCanvas",
                    plotId: 'canvasFor' + scope.plotId,
                    width: 300,
                    height: 300
                }
                var histogramSpec = {
                    xRange: new Range(0, 100),
                    xParameter: 'CH1',
                    xScale: 'LIN',
                    numberOfBins: 10
                }
                scope.histogramPlotUI = new HistogramPlot(plotModel, histogramSpec, $rootScope.experiment);
                scope.histogramSpec = histogramSpec;

                scope.$watch('histogramSpec', function () {
                    scope.render();
                }, true);
                scope.$watch('histogramSpec.xScale', function () {
                    var xRange = scope.histogramSpec.xRange;
                    if (xRange.min == 0 && scope.histogramSpec.xScale == 'LOG') {
                        xRange.min = 1;
                    }
                }, true);

                $rootScope.$watch('experiment.current', function () {
                    scope.render();
                })
                scope.render = function () {
                    scope.histogramPlotUI.destroy();
                    scope.histogramPlotUI.renderPlot();
                }
            }
        };
    }])


    app.directive("histogramControls", function () {
        return {
            restrict: 'E',
            templateUrl: './histogram/histogramControls.html',
            controller: function () {

                this.showControls = false;

                this.setShowControls = function (showControlState) {
                    this.showControls = showControlState;
                }
            },
            controllerAs: "histogramControls"
        };
    });

})()