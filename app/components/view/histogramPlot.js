function HistogramPlot(plotModel, histogramSpec, experiment) {

    this.renderPlot = function () {
        var height = plotModel.height;
        var width = plotModel.width;
        var xRightPadding = 65;
        var yBottomPadding = 10;
        var yTopPadding = 30;
        var yHeight = height - yTopPadding;


        var xScale = D3Helper.buildLinearXScale(new Range(0, width - xRightPadding), histogramSpec.xRange);


        var channelData = getChannelData(experiment.current, histogramSpec.xParameter);

        var dataInDomain = HistogramHelper.getDataInDomain(channelData, histogramSpec.xRange);
        var binnedData = HistogramHelper.binData(dataInDomain, xScale, histogramSpec.numberOfBins);

        var yScale = D3Helper.buildLinearYScale(new Range(yBottomPadding, yHeight), new Range(0, Math.floor(d3.max(binnedData, function (d) {
            return d.y;
        }) * 1.1)));

        var xAxisOffset = 50;

        var canvas = D3Helper.renderCanvas(plotModel.parentNode, plotModel.plotId, width, height);
        renderAxes(canvas, xScale, xAxisOffset, yHeight, yScale);

        var scaledBinnedData = HistogramHelper.scaleBinnedData(binnedData, xScale, yScale);
        HistogramHelper.renderHistogramData(canvas, scaledBinnedData, xAxisOffset, 0, yHeight);
    }


    this.destroy = function(){
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