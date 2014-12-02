function DotPlot(plotModel, plotSpec, experiment) {

    function buildXScale(plotSpec, width, xRightPadding) {
        if (plotSpec.xScale == 'LOG') {
            return D3Helper.buildLogXScale(new Range(0, width - xRightPadding), plotSpec.xRange);
        }
        return D3Helper.buildLinearXScale(new Range(0, width - xRightPadding), plotSpec.xRange);
    }

    function buildYScale(plotSpec, yBottomPadding, yHeight) {
        if (plotSpec.yScale == 'LOG') {
            return D3Helper.buildLogYScale(new Range(yBottomPadding, yHeight), plotSpec.yRange);
        }
        return D3Helper.buildLinearYScale(new Range(yBottomPadding, yHeight), plotSpec.yRange);
    }

    this.renderPlot = function () {
        var height = plotModel.height;
        var width = plotModel.width;
        var xRightPadding = 65;
        var yBottomPadding = 10;
        var yTopPadding = 30;
        var yHeight = height - yTopPadding;

        var xScale = buildXScale(plotSpec, width, xRightPadding);
        var yScale = buildYScale(plotSpec, yBottomPadding, yHeight);

        var xAxisOffset = 50;
        var canvas = D3Helper.renderCanvas(plotModel.parentNode, plotModel.plotId, width, height);

        renderAxes(canvas, xScale, yScale, xAxisOffset, yHeight);
        renderPlotData(canvas, experiment.current, plotSpec, xScale, yScale, xAxisOffset);
    }


    this.destroy = function () {
        clearGraphic();
    }

    function renderAxes(canvas, xScale, yScale, xAxisOffset, yHeight) {
        D3Helper.renderXAxis(canvas, xScale, xAxisOffset, yHeight);
        D3Helper.renderYAxis(canvas, yScale, xAxisOffset, 0);
    }

    function getChannelData(dataSet, parameter) {
        if (parameter == 'CH1') {
            return dataSet['CH1'];
        }
        if (parameter == 'CH2') {
            return dataSet['CH2'];
        }
        if (parameter == 'CH3') {
            return dataSet['CH3'];
        }
        return dataSet['CH4'];
    }

    function renderPlotData(canvas, dataSet, plotSpec, xScale, yScale, xAxisOffset) {
        var xChannelData = getChannelData(dataSet, plotSpec.xParameter);
        var yChannelData = getChannelData(dataSet, plotSpec.yParameter);
        var formattedData = DotPlotHelper.formatData(xChannelData, yChannelData, xScale, yScale, plotSpec.xRange, plotSpec.yRange);
        DotPlotHelper.renderScatterPlotData(canvas, formattedData, xAxisOffset, 0);
    }


    function clearGraphic() {
        d3.select('svg#' + plotModel.plotId).remove();
    }

}