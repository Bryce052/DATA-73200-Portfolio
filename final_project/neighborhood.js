var margin = {top: 30, right: 30, bottom: 70, left: 60},
width = 930 - margin.left - margin.right,
height = 800 - margin.top - margin.bottom;


var svg = d3.select("#my_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleBand()
.range([ 0, width ])
.padding(0.2);
var xAxis = svg.append("g")
.attr("transform", "translate(0," + height + ")")


var y = d3.scaleLinear()
.range([ height, 0]);
var yAxis = svg.append("g")
.attr("class", "myYaxis")



function update(selectedVar) {


d3.csv("neighborhoodmeasures.csv", function(data) {


x.domain(data.map(function(d) { return d.group; }))
xAxis.transition().duration(1000).call(d3.axisBottom(x))


y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
yAxis.transition().duration(1000).call(d3.axisLeft(y));


var u = svg.selectAll("rect")
  .data(data)


u
  .enter()
  .append("rect")
  .merge(u)
  .transition()
  .duration(1000)
    .attr("x", function(d) { return x(d.group); })
    .attr("y", function(d) { return y(d[selectedVar]); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d[selectedVar]); })
    .attr("fill", "#1a89a6")
})

}
update('var1')
