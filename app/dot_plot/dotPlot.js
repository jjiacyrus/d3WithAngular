(function () {
    var app = angular.module('dot_plot', []);

    app.directive("dotPlot", ['$rootScope', function ($rootScope) {

        return {
            restrict: 'E',
            scope: {
                plot: '='
            },
            templateUrl: './dot_plot/dotPlot.html',
            link: function (scope, element, attrs) {
                scope.plotId = attrs.plot;

                var plotModel = {
                    parentNode: "#" + scope.plotId + " .dotPlotCanvas",
                    plotId: 'dotPlotFor' + scope.plotId,
                    width: 300,
                    height: 300
                }
                var plotSpec = {
                    xRange: new Range(0, 100),
                    yRange: new Range(0, 100),
                    xParameter: 'CH1',
                    yParameter: 'CH2',
                    xScale: 'LIN',
                    yScale: 'LIN'

                }

                scope.dotPlotUI = new DotPlot(plotModel, plotSpec, $rootScope.experiment);
                scope.plotSpec = plotSpec;

                scope.$watch('plotSpec', function () {
                    scope.render();
                }, true);

                scope.$watch('plotSpec.xScale', function () {
                    var xRange = scope.plotSpec.xRange;
                    if (xRange.min == 0  && scope.plotSpec.xScale == 'LOG') {
                        xRange.min = 1;
                    }
                }, true);

                scope.$watch('plotSpec.yScale', function () {
                    var yRange = scope.plotSpec.yRange;
                    if (yRange.min == 0  && scope.plotSpec.yScale == 'LOG') {
                        yRange.min = 1;
                    }
                }, true);
                $rootScope.$watch('experiment.current', function () {
                    scope.render();
                })
                scope.render = function () {
                    scope.dotPlotUI.destroy();
                    scope.dotPlotUI.renderPlot();
                }

            }

        };
    }])

    app.directive("dotPlotControls", function () {
        return {
            restrict: 'E',
            templateUrl: './dot_plot/dotPlotControls.html',
            controller: function () {
                this.showControls = false;

                this.setShowControls = function (showControlState) {
                    this.showControls = showControlState;
                }
            },
            controllerAs: "dotPlotControls"
        };
    });
})();