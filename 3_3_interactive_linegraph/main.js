var margin = {top: 10, right: 180, bottom: 50, left: 50},
width = 800 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;

var svg = d3.select("#my_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

d3.csv("SeptCrimebyDistrct.csv", function(data) {

var allGroup = ["Downtown", "Hazelwood", "Northwest"]

var dataReady = allGroup.map( function(grpName) { 
  return {
    name: grpName,
    values: data.map(function(d) {
      return {day: d.day, value: +d[grpName]};
    })
  };
});
var accent = d3.scaleOrdinal()
  .domain(allGroup)
  .range(d3.schemeSet1);

var x = d3.scaleLinear()
  .domain([0,30])
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

 var y = d3.scaleLinear()
  .domain( [0,35])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y));

svg.append("text")
.attr("text-anchor", "end")
.attr("x", width/2 + margin.left)
.attr("y", height + margin.top + 20)
.text("Day of the Month");

svg.append("text")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
.attr("y", -margin.left + 20)
.attr("x", -margin.top - height/2 + 20)
.text("Number of Crimes")

var line = d3.line()
  .x(function(d) { return x(+d.day) })
  .y(function(d) { return y(+d.value) })
svg.selectAll("myLines")
  .data(dataReady)
  .enter()
  .append("path")
    .attr("class", function(d){ return d.name })
    .attr("d", function(d){ return line(d.values) } )
    .attr("stroke", function(d){ return accent(d.name) })
    .style("stroke-width", 4)
    .style("fill", "none")

var Tooltip = d3.select("#my_dataviz")
.append("div")
.style("opacity", 0)
.attr("class", "tooltip")
.style("background-color", "lightgrey")
.style("border", "solid")
.style("border-width", "3px")
.style("border-radius", "4px")
.style("padding", "6px")

var mouseover = function(d) {
Tooltip
  .style("opacity", 1)
}
var mousemove = function(d) {
Tooltip
  .html("Number of Crimes: " + d.value)
  .style("left", (d3.mouse(this)[0]+70) + "px")
  .style("top", (d3.mouse(this)[1]) + "px")
}
var mouseleave = function(d) {
Tooltip
  .style("opacity", 0)
}

svg
  .selectAll("myDots")
  .data(dataReady)
  .enter()
    .append('g')
    .style("fill", function(d){ return accent(d.name) })
    .attr("class", function(d){ return d.name })

  .selectAll("myPoints")
  .data(function(d){ return d.values })
  .enter()
  .append("circle")
    .attr("cx", function(d) { return x(d.day) } )
    .attr("cy", function(d) { return y(d.value) } )
    .attr("r", 5)
    .attr("stroke", "white")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

svg
  .selectAll("myLabels")
  .data(dataReady)
  .enter()
    .append('g')
    .append("text")
      .attr("class", function(d){ return d.name })
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) 
      .attr("transform", function(d) { return "translate(" + x(d.value.day) + "," + y(d.value.value) + ")"; }) 
      .text(function(d) { return d.name; })
      .style("fill", function(d){ return accent(d.name) })
      .style("font-size", 15)

svg
  .selectAll("myLegend")
  .data(dataReady)
  .enter()
    .append('g')
    .append("text")
      .attr('x', function(d,i){ return 200 + i*90})
      .attr('y', 2)
      .text(function(d) { return d.name; })
      .style("fill", function(d){ return accent(d.name) })
      .style("font-size",17)
    .on("click", function(d){
      currentOpacity = d3.selectAll("." + d.name).style("opacity")
      d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1? 0:1)

    })})
