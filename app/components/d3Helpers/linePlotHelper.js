function LinePlotHelper() {

}

LinePlotHelper.getDataInDomain = function (data, domain) {
    var dataInDomain = [];
    for (var index = domain.min; index <= domain.max && index <= data.length - 1; index++) {
        dataInDomain.push({x: index, y: data[index]});
    }
    return dataInDomain;
}

LinePlotHelper.scaleData = function (dataInRange, xScale, yScale) {
    var scaledData = [];
    dataInRange.forEach(function (data) {
        scaledData.push({x: xScale(data.x), y: yScale(data.y)});
    });
    return scaledData
}


LinePlotHelper.renderLine = function (canvas, data, xAxisOffset, yAxisOffset) {
    var line = d3.svg.line().x(function (d) {
            return d.x;
        }
    ).y(function (d) {
            return d.y;
        })
    .interpolate('linear');;


    var dataGroup = canvas.append('g').attr('transform', 'translate(' + xAxisOffset + ', ' + yAxisOffset + ')').attr('class', 'dataGroup');
    dataGroup.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line) .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', 'none');

}