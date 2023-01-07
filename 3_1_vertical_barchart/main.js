var svg = d3.select("svg"),
    margin = {top: 30, right: 40, bottom: 60, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.2);
  
var x1 = d3.scaleBand()
    .padding(0.04);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#ff8c00", "#1a89a6", "#69b3a2", "#8b486b"]);

d3.csv("DistrictCrimeData.csv", function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = data.columns.slice(1);

  x0.domain(data.map(function(d) { return d.District; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
  
 g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("class","bar")
    .attr("transform", function(d) { return "translate(" + x0(d.District) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return z(d.key); });

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

  g.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 4)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Number of Crimes");

  var legend = g.append("g")
      .attr("font-family", "times")
      .attr("font-size", 13)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 17)
      .attr("width", 19)
      .attr("height", 18)
      .attr("fill", z)
      .attr("stroke", z)
      .attr("stroke-width",2)
      .on("click",function(d) { update(d) });

  legend.append("text")
      .attr("x", width - 23)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
  
  var filtered = [];
  
  function update(d) {  
   
    if (filtered.indexOf(d) == -1) {
     filtered.push(d); 

    if(filtered.length == keys.length) filtered = [];
    }
    else {
      filtered.splice(filtered.indexOf(d), 1);
    }
    
    var newKeys = [];
    keys.forEach(function(d) {
      if (filtered.indexOf(d) == -1 ) {
        newKeys.push(d);
      }
    })
    x1.domain(newKeys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { if (filtered.indexOf(key) == -1) return d[key]; }); })]).nice();
            svg.select(".y")
            .transition()
            .call(d3.axisLeft(y).ticks(null, "s"))
            .duration(1000);
    
    var bars = svg.selectAll(".bar").selectAll("rect")
      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    
   bars.filter(function(d) {
         return filtered.indexOf(d.key) > -1;
      })
      .transition()
      .attr("x", function(d) {
        return (+d3.select(this).attr("x")) + (+d3.select(this).attr("width"))/2;  
      })
      .attr("height",0)
      .attr("width",0)     
      .attr("y", function(d) { return height; })
      .duration(500);
      
    bars.filter(function(d) {
        return filtered.indexOf(d.key) == -1;
      })
      .transition()
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("fill", function(d) { return z(d.key); })
      .duration(500);
    
    legend.selectAll("rect")
      .transition()
      .attr("fill",function(d) {
        if (filtered.length) {
          if (filtered.indexOf(d) == -1) {
            return z(d); 
          }
           else {
            return "white"; 
          }
        }
        else {
         return z(d); 
        }
      })
      .duration(100);
    
     
  }
  
})
