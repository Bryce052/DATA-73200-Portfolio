var data = [
    {
      name: "Downtown",
      values: [
        {date: "2020-09-01", crimes: "9"},
        {date: "2020-09-02", crimes: "11"},
        {date: "2020-09-03", crimes: "14"},
        {date: "2020-09-04", crimes: "13"},
        {date: "2020-09-05", crimes: "8"},
        {date: "2020-09-06", crimes: "7"},
        {date: "2020-09-07", crimes: "9"},
        {date: "2020-09-08", crimes: "8"},
        {date: "2020-09-09", crimes: "9"},
        {date: "2020-09-10", crimes: "12"},
        {date: "2020-09-11", crimes: "14"},
        {date: "2020-09-12", crimes: "13"},
        {date: "2020-09-13", crimes: "8"},
        {date: "2020-09-14", crimes: "7"},
        {date: "2020-09-15", crimes: "9"},
        {date: "2020-09-16", crimes: "8"},
        {date: "2020-09-17", crimes: "9"},
        {date: "2020-09-18", crimes: "12"},
        {date: "2020-09-19", crimes: "14"},
        {date: "2020-09-20", crimes: "13"},
        {date: "2020-09-21", crimes: "8"},
        {date: "2020-09-22", crimes: "7"},
        {date: "2020-09-23", crimes: "9"},
        {date: "2020-09-24", crimes: "8"},
        {date: "2020-09-25", crimes: "9"},
        {date: "2020-09-26", crimes: "12"},
        {date: "2020-09-27", crimes: "14"},
        {date: "2020-09-28", crimes: "13"},
        {date: "2020-09-29", crimes: "8"},
        {date: "2020-09-30", crimes: "7"},
      ]
    },
    {
      name: "Hazelwood",
      values: [
        {date: "2020-09-01", crimes: "6"},
        {date: "2020-09-02", crimes: "5"},
        {date: "2020-09-03", crimes: "4"},
        {date: "2020-09-04", crimes: "1"},
        {date: "2020-09-05", crimes: "8"},
        {date: "2020-09-06", crimes: "11"},
        {date: "2020-09-07", crimes: "10"},
        {date: "2020-09-08", crimes: "4"},
        {date: "2020-09-09", crimes: "14"},
        {date: "2020-09-10", crimes: "12"},
        {date: "2020-09-11", crimes: "8"},
        {date: "2020-09-12", crimes: "3"},
        {date: "2020-09-13", crimes: "6"},
        {date: "2020-09-14", crimes: "11"},
        {date: "2020-09-15", crimes: "9"},
        {date: "2020-09-16", crimes: "14"},
        {date: "2020-09-17", crimes: "12"},
        {date: "2020-09-18", crimes: "7"},
        {date: "2020-09-19", crimes: "7"},
        {date: "2020-09-20", crimes: "10"},
        {date: "2020-09-21", crimes: "5"},
        {date: "2020-09-22", crimes: "7"},
        {date: "2020-09-23", crimes: "14"},
        {date: "2020-09-24", crimes: "15"},
        {date: "2020-09-25", crimes: "4"},
        {date: "2020-09-26", crimes: "9"},
        {date: "2020-09-27", crimes: "10"},
        {date: "2020-09-28", crimes: "8"},
        {date: "2020-09-29", crimes: "14"},
        {date: "2020-09-30", crimes: "11"},
      ]
    },
    {
      name: "Northwest",
      values: [
        {date: "2020-09-01", crimes: "6"},
        {date: "2020-09-02", crimes: "5"},
        {date: "2020-09-03", crimes: "6"},
        {date: "2020-09-04", crimes: "13"},
        {date: "2020-09-05", crimes: "11"},
        {date: "2020-09-06", crimes: "12"},
        {date: "2020-09-07", crimes: "7"},
        {date: "2020-09-08", crimes: "8"},
        {date: "2020-09-09", crimes: "14"},
        {date: "2020-09-10", crimes: "12"},
        {date: "2020-09-11", crimes: "10"},
        {date: "2020-09-12", crimes: "9"},
        {date: "2020-09-13", crimes: "5"},
        {date: "2020-09-14", crimes: "7"},
        {date: "2020-09-15", crimes: "13"},
        {date: "2020-09-16", crimes: "8"},
        {date: "2020-09-17", crimes: "5"},
        {date: "2020-09-18", crimes: "14"},
        {date: "2020-09-19", crimes: "6"},
        {date: "2020-09-20", crimes: "10"},
        {date: "2020-09-21", crimes: "5"},
        {date: "2020-09-22", crimes: "7"},
        {date: "2020-09-23", crimes: "8"},
        {date: "2020-09-24", crimes: "12"},
        {date: "2020-09-25", crimes: "14"},
        {date: "2020-09-26", crimes: "10"},
        {date: "2020-09-27", crimes: "8"},
        {date: "2020-09-28", crimes: "6"},
        {date: "2020-09-29", crimes: "7"},
        {date: "2020-09-30", crimes: "9"},
      ]
    }
  ];
  
  var width = 750;
  var height = 410;
  var margin = 60;
  var duration = 220;
  
  var lineOpacity = "0.35";
  var lineOpacityHover = "0.85";
  var otherLinesOpacityHover = "0.25";
  var lineStroke = "3px";
  var lineStrokeHover = "3.5px";
  
  var circleOpacity = '0.85';
  var circleOpacityOnLineHover = "0.75"
  var circleRadius = 3.25;
  var circleRadiusHover = 7;
  
  
  var parseDate = d3.timeParse("%Y-%m-%d");
  data.forEach(function(d) { 
    d.values.forEach(function(d) {
      d.date = parseDate(d.date);
      d.crimes = +d.crimes;    
    });
  });
  
  var xScale = d3.scaleTime()
    .domain(d3.extent(data[0].values, d => d.date))
    .range([0, width-margin]);
  
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data[0].values, d => d.crimes)])
    .range([height-margin, 0]);
  
  var color = d3.scaleOrdinal(d3.schemeCategory10);
  
  var svg = d3.select("#chart").append("svg")
    .attr("width", (width+margin)+"px")
    .attr("height", (height+margin)+"px")
    .append('g')
    .attr("transform", `translate(${margin}, ${margin})`);
  
  var line = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.crimes));
  
  let lines = svg.append('g')
    .attr('class', 'lines');
  
  lines.selectAll('.line-group')
    .data(data).enter()
    .append('g')
    .attr('class', 'line-group')  
    .on("mouseover", function(d, i) {
        svg.append("text")
          .attr("class", "title-text")
          .style("fill", color(i))        
          .text(d.name)
          .attr("text-anchor", "middle")
          .attr("x", (width-margin)/2)
          .attr("y", 15);
      })
    .on("mouseout", function(d) {
        svg.select(".title-text").remove();
      })
    .append('path')
    .attr('class', 'line')  
    .attr('d', d => line(d.values))
    .style('stroke', (d, i) => color(i))
    .style('opacity', lineOpacity)
    .on("mouseover", function(d) {
        d3.selectAll('.line')
                      .style('opacity', otherLinesOpacityHover);
        d3.selectAll('.circle')
                      .style('opacity', circleOpacityOnLineHover);
        d3.select(this)
          .style('opacity', lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
      })
    .on("mouseout", function(d) {
        d3.selectAll(".line")
                      .style('opacity', lineOpacity);
        d3.selectAll('.circle')
                      .style('opacity', circleOpacity);
        d3.select(this)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
      });
  
  lines.selectAll("circle-group")
    .data(data).enter()
    .append("g")
    .style("fill", (d, i) => color(i))
    .selectAll("circle")
    .data(d => d.values).enter()
    .append("g")
    .attr("class", "circle")  
    .on("mouseover", function(d) {
        d3.select(this)     
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(`${d.crimes}`)
          .attr("x", d => xScale(d.date) + 5)
          .attr("y", d => yScale(d.crimes) - 10);
      })
    .on("mouseout", function(d) {
        d3.select(this)
          .style("cursor", "none")  
          .transition()
          .duration(duration)
          .selectAll(".text").remove();
      })
    .append("circle")
    .attr("cx", d => xScale(d.date))
    .attr("cy", d => yScale(d.crimes))
    .attr("r", circleRadius)
    .style('opacity', circleOpacity)
    .on("mouseover", function(d) {
          d3.select(this)
            .transition()
            .duration(duration)
            .attr("r", circleRadiusHover);
        })
      .on("mouseout", function(d) {
          d3.select(this) 
            .transition()
            .duration(duration)
            .attr("r", circleRadius);  
        });
  

  var xAxis = d3.axisBottom(xScale).ticks(15);
  var yAxis = d3.axisLeft(yScale).ticks(10);
  
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height-margin})`)
    .call(xAxis);
  
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append('text')
    .attr("y", -30)
    .attr("transform", "rotate(-90)")
    .attr("fill", "#000")
    .text("Reported Crimes");
