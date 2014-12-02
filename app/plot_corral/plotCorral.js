/**
 * Created by Cyrus on 12/1/14.
 */

(function () {
    var app = angular.module('plot_corral', []);
    app.directive("plotCorral", function ($compile) {
        return {
            scope: {
                id: '='
            },
            templateUrl: './plot_corral/plotCorral.html',
            link: function (scope, element, attrs) {
                scope.id = attrs.id;

                scope.destroy= function(){
                    scope.plotShowing = false;
                    $('plot-corral#'+scope.id +' histogram-plot').remove();
                    $('plot-corral#'+scope.id +' dot-plot').remove();
                }

                scope.renderHistogram = function(){
                    scope.plotShowing = true;
                    element.append($compile("<histogram-plot plot='"+ scope.id +"'></histogram-plot>")(scope));

                }
                scope.renderDotPlot = function(){
                    scope.plotShowing = true;
                    element.append($compile("<dot-plot plot='"+ scope.id +"'></dot-plot>")(scope));

                }
            }


        }
    })
})();