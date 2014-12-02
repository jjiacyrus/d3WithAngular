function DotPlotHelper(){

}
DotPlotHelper.formatData = function(xChannel, yChannel, xScale, yScale, xDomain, yDomain) {
    formattedData = [];
    for (i = 0; i < xChannel.length; i++) {
        if (xDomain.contains(xChannel[i]) && yDomain.contains(yChannel[i])) {
            formattedData.push([xScale(xChannel[i]), yScale(yChannel[i])]);
        }
    }
    return formattedData;

}

DotPlotHelper.renderScatterPlotData = function(canvas, data, xAxisOffset, yAxisOffset) {
    var dataGroup = canvas.append('g').attr('transform', 'translate(' + xAxisOffset + ', ' + yAxisOffset + ')');

    dataGroup.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot").attr('r', 2)
        .attr("cx", function (d) {
            return d[0];
        })
        .attr("cy", function (d) {
            return d[1];
        });
}


