function D3Helper() {

}

D3Helper.buildLinearXScale = function (range, domain) {
    var scale = d3.scale;

    var linear = scale.linear();
    linear.range([range.min, range.max]);
    linear.domain([domain.min, domain.max]);
    return linear;
}
D3Helper.buildLinearYScale = function (range, domain) {
    var scale = d3.scale;
    var linear = scale.linear();
    linear.range([range.min, range.max]);
    linear.domain([domain.max, domain.min]);
    return linear;
}

D3Helper.buildLogXScale = function (range, domain) {
    var log = d3.scale.log();
    log.range([range.min, range.max]);
    log.domain([domain.min, domain.max]);
    return log;
}
D3Helper.buildLogYScale = function (range, domain) {
    var log = d3.scale.log();
    log.range([range.min, range.max]);
    log.domain([domain.max, domain.min]);
    return log;
}
D3Helper.renderCanvas = function (parent, plotId, width, height) {
    var canvas = d3.select(parent).append('svg').attr('id', plotId)
        .attr('height', height)
        .attr('width', width);
    return canvas;
}

buildAxis = function (canvas, scale, xTranslate, yTranslate, className, orientation) {
    var axisGroup = canvas.append("g");
    axisGroup
        .attr("class", className)
        .attr("transform", "translate(" + xTranslate + " ," + yTranslate + ")");
    var axis = d3.svg.axis().scale(scale).orient(orientation).ticks(4, ".0f");

    axisGroup.call(axis);
}

D3Helper.renderXAxis = function(canvas, xScale, xTranslate, yTranslate) {

    buildAxis(canvas, xScale, xTranslate, yTranslate, 'x axis', 'bottom');
}

D3Helper.renderYAxis= function(canvas, yScale, xTranslate, yTranslate) {
    buildAxis(canvas, yScale, xTranslate, yTranslate, 'y axis', 'left');
}
