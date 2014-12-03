function LinePlot(plotModel, lineSpec, experiment) {

    this.renderPlot = function () {
        var height = plotModel.height;
        var width = plotModel.width;
        var xRightPadding = 65;
        var yBottomPadding = 10;
        var yTopPadding = 30;
        var yHeight = height - yTopPadding;


        var xScale = D3Helper.buildLinearXScale(new Range(0, width - xRightPadding), lineSpec.xRange);

        var channelData = getChannelData(experiment.current, lineSpec.xParameter);

        var dataInDomain = LinePlotHelper.getDataInDomain(channelData, lineSpec.xRange);

        var max = Math.floor(d3.max(dataInDomain, function (d) {
            return d.y;
        }) * 1.1);

        var min = Math.floor(d3.min(dataInDomain, function (d) {
            return d.y;
        }) * 0.9);
        var yScale = D3Helper.buildLinearYScale(new Range(yBottomPadding, yHeight), new Range(min, max));

        var scaledDAta = LinePlotHelper.scaleData(dataInDomain, xScale, yScale);


        var xAxisOffset = 50;

        var canvas = D3Helper.renderCanvas(plotModel.parentNode, plotModel.plotId, width, height);
        renderAxes(canvas, xScale, xAxisOffset, yHeight, yScale);

        LinePlotHelper.renderLine(canvas, scaledDAta, xAxisOffset, 0)
    }


    this.destroy = function () {
        clearGraphic();
    }

    function clearGraphic() {
        d3.select('svg#' + plotModel.plotId).remove();
    }

    function renderAxes(canvas, xScale, xAxisOffset, yHeight, yScale) {
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
}
