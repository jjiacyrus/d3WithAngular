'use strict';


(function () {
    var app = angular.module('line_plot', []);

    app.directive("linePlot", ['$rootScope', function ($rootScope) {
        return {
            restrict: 'E',
            scope: {
                plot: '='
            },
            templateUrl: './line_plot/linePlot.html',
            link: function (scope, element, attrs) {
                scope.plotId = attrs.plot;

                var plotModel = {
                    parentNode: "#" + scope.plotId + " .linePlotCanvas",
                    plotId: 'canvasFor' + scope.plotId,
                    width: 300,
                    height: 300
                }
                var linePlotSpec = {
                    xRange: new Range(0, 10),
                    xParameter: 'CH1',
                    xScale: 'LIN',
                    xIncrement: 1
                }
                scope.linePlotUI = new LinePlot(plotModel, linePlotSpec, $rootScope.experiment);
                scope.linePlotSpec = linePlotSpec;

                scope.$watch('linePlotSpec', function () {
                    scope.render();
                }, true);

                $rootScope.$watch('experiment.current', function () {
                    scope.render();
                })
                scope.render = function () {
                    scope.linePlotUI.destroy();
                    scope.linePlotUI.renderPlot();
                }
            },
            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                var forwardId;
                var reverseId;

                function updateOffset() {
                    var length = $rootScope.experiment.current['CH1'].length;
                    if ($scope.linePlotSpec.xRange.max < length) {
                        var increment = $scope.linePlotSpec.xIncrement;
                        var amountItGoesOverTheMax = (($scope.linePlotSpec.xRange.max + increment) - length);
                        if (amountItGoesOverTheMax > 0) {
                            increment = increment - amountItGoesOverTheMax;
                        }
                        $scope.linePlotSpec.xRange.max += increment;
                        $scope.linePlotSpec.xRange.min += increment;
                        $scope.$digest();
                    }
                    else {
                        window.clearInterval(forwardId);
                        window.clearInterval(reverseId);
                    }
                };
                function updateOffsetReverse() {

                    if ($scope.linePlotSpec.xRange.min > 0) {
                        var increment = $scope.linePlotSpec.xIncrement;
                        var amountItGoesUnderTheMin= (0 - ($scope.linePlotSpec.xRange.min - increment));
                        if(amountItGoesUnderTheMin > 0){
                            increment = increment - amountItGoesUnderTheMin;
                        }
                        $scope.linePlotSpec.xRange.min -= increment;
                        $scope.linePlotSpec.xRange.max -= increment;
                        $scope.$digest();
                    }
                    else {
                        window.clearInterval(forwardId);
                        window.clearInterval(reverseId);
                    }
                };
                function setForwardInterval() {
                    return window.setInterval(updateOffset, 50)

                }

                function setReverseInterval() {
                    return window.setInterval(updateOffsetReverse, 50)

                }


                this.start = function () {
                    this.stop();
                    forwardId = setForwardInterval();
                }
                this.reverse = function () {
                    this.stop();
                    reverseId = setReverseInterval();
                }
                this.stop = function () {
                    window.clearInterval(forwardId);
                    window.clearInterval(reverseId);
                }
            }],
            controllerAs: 'linePlot'
        };
    }])

    app.directive("lineControls", function () {
        return {
            restrict: 'E',
            templateUrl: './line_plot/lineControls.html',
            controller: function () {

                this.showControls = false;

                this.setShowControls = function (showControlState) {
                    this.showControls = showControlState;
                }
            },
            controllerAs: "lineControls"
        };
    });


})()