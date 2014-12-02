function HistogramHelper() {

}

HistogramHelper.getDataInDomain = function (data, domain){

    dataInDomain = [];
    data.forEach(function(dataPoint){
        if(domain.contains(dataPoint)){
            dataInDomain.push(dataPoint);
        }
    })
    return dataInDomain;
}
HistogramHelper.binData = function (data, xScale, numberOfBins) {
    return  d3.layout.histogram().bins(xScale.ticks(numberOfBins))(data);
}
HistogramHelper.scaleBinnedData = function (binnedData, xScale, yScale) {
    var scaledData = [];
    binnedData.forEach(function (data) {
        scaledData.push({x: xScale(data.x), y: yScale(data.y), width: xScale(data.dx)});
    });
    return scaledData
}
HistogramHelper.renderHistogramData = function (canvas, data, xAxisOffset, yAxisOffset, graphingAreaHeight) {
    var dataGroup = canvas.append('g').attr('transform', 'translate(' + xAxisOffset + ', ' + yAxisOffset + ')').attr('class', 'dataGroup');
    var bar = dataGroup.selectAll(".bar")
        .data(data)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function (d) {
            return "translate(" + d.x + ", " + d.y + ")";
        });
    bar.append("rect")
        .attr("x", 1)
        .attr("width", function (d) {
            return d.width - 1;
        })
        .attr("height", function (d) {
            return  graphingAreaHeight - d.y;
        });

}