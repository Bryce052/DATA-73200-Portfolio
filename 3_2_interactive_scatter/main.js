let neighborhoodcrimedata = [ 
  { "title": "St Johns", "violentcrimes": 210, "population": 950, "propertycrimes": 1120, "districtnumber": 1645, "area": 25,"policeofficers": 205, "region": "North Portland","toolTipVisible": false }, 
  { "title": "Linnton", "violentcrimes": 40, "population": 540, "propertycrimes": 700, "districtnumber": 1630, "area": 17, "policeofficers": 220, "region": "Northwest Portland", "toolTipVisible": false}, 
  { "title": "Parkrose", "violentcrimes": 70, "population": 1800, "propertycrimes": 1200, "districtnumber": 1645, "area": 14, "policeofficers": 340, "region": "Northeast Portland", "toolTipVisible": false}, 
  { "title": "Ardenwald", "violentcrimes": 190, "population": 440, "propertycrimes": 2080, "districtnumber": 1610, "area": 9,"policeofficers": 220,"region": "South Portland","toolTipVisible": false}, 
  { "title": "Downtown", "violentcrimes": 150, "population": 250, "propertycrimes": 280, "districtnumber": 1620, "area": 27,"policeofficers": 620, "region": "Southwest Portland", "toolTipVisible": false}, 
  { "title": "Centennial", "violentcrimes": 90, "population": 490, "propertycrimes": 170, "districtnumber": 1655, "area": 10, "policeofficers": 360, "region": "Southeast Portland", "toolTipVisible": false}, 
  { "title": "Wilshire", "violentcrimes": 175, "population": 750, "propertycrimes": 1050, "districtnumber": 1630, "area": 25, "policeofficers": 450, "region": "Northeast Portland","toolTipVisible": false }, 
  { "title": "Goose Hollow", "violentcrimes": 405, "population": 1100, "propertycrimes": 715, "districtnumber": 16360, "area": 17, "policeofficers": 220, "region": "Southwest Portland", "toolTipVisible": false}, 
  { "title": "Lloyd", "violentcrimes": 130, "population": 490, "propertycrimes": 1075, "districtnumber": 1665, "area": 14, "policeofficers": 350, "region": "North Portland", "toolTipVisible": false}, 
  { "title": "Irvington", "violentcrimes": 185, "population": 570, "propertycrimes": 250, "districtnumber": 1670, "area": 9,"policeofficers": 130,"region": "Northeast Portland","toolTipVisible": false}, 
  { "title": "Lents", "violentcrimes": 145, "population": 250, "propertycrimes": 450, "districtnumber": 1680, "area": 27, "policeofficers": 615, "region": "South Portland", "toolTipVisible": false}, 
  { "title": "Pleasentvalley", "violentcrimes": 130, "population": 375, "propertycrimes": 890, "districtnumber": 1685, "area": 10, "policeofficers": 245, "region": "Southeast Portland", "toolTipVisible": false}, 
] 


let svg = d3.select("#plotSVG")
  .style("overflow","visible") 
  .append("g")
  .attr("transform", "translate(50,50)")

let xScale = d3.scaleLinear()
  .domain([0, 2000])   
  .range([0, 600]);   

let yScale = d3.scaleLinear()
  .domain([0, 1200])   
  .range([400, 0]);  

let yVar = "propertycrimes";

let pubColors = {
    "North Portland": "#ff8c00",
    "Northwest Portland": "#8c564b",
    "Northeast Portland": "#1f77b4",
    "South Portland": "#69b3a2",
    "Southwest Portland": "#2ca02c",
    "Southeast Portland": "#8b486b"
}

svg.append("g")      
  .attr("id","yAxis")
  .call(d3.axisLeft(yScale)
          .ticks(10)
          .tickFormat(d3.format("d"))
          .tickSizeOuter (4)
       )
  
svg.append("g")       
  .attr("transform", "translate(0,400)")    
  .attr("id","xAxis")
  .call(d3.axisBottom(xScale)
          .ticks(10)
          .tickFormat(d3.format("d"))
          .tickSizeOuter(0)
       )

svg.selectAll(".bubble")
  .data(neighborhoodcrimedata)   
  .join("circle")
  .attr("class", "bubble")
  .attr("cx", d => xScale(d.population))   
  .attr("cy", d => yScale(d.propertycrimes))  
  .attr("r", d => Math.sqrt(d.area)*1.5)  
  .attr("stroke", d => pubColors[d.region])
  .attr("fill", d => pubColors[d.region])
  .attr("fill-opacity", 3.5)
  .on("mouseover",(e,d) => {   
    d3.select("#bubble-tip-"+d.districtnumber)
      .style("display","block");
  })
  .on("mouseout", (e,d) => {    
    if(!d.toolTipVisible){
      d3.select("#bubble-tip-"+d.districtnumber)
        .style("display","none");
    }
  })
  .on("click", (e,d) => {    
    if(!d.toolTipVisible){
      d3.select("#bubble-tip-"+d.districtnumber)
        .style("display", "block");
      d.toolTipVisible = true;
    }
    else{
      d3.select("#bubble-tip-"+d.districtnumber)
        .style("display", "none");
      d.toolTipVisible = false;
    }
  });


svg.selectAll(".bubble-tip")
  .data(neighborhoodcrimedata)
  .join("g")
  .attr("class", "bubble-tip")
  .attr("id", (d)=> "bubble-tip-"+d.districtnumber)
  .attr("transform", d => "translate(" + (xScale( d.population )+20) + ", " + yScale( d.propertycrimes) + ")"  )
  .style("display", "none")   
  .append("rect")     
  .attr("x",-5)
  .attr("y",-20)
  .attr("rx",5)
  .attr("fill","lightgrey")
  .attr("fill-opacity", 0.2)
  .attr("width",150)
  .attr("height",90)


svg.selectAll(".bubble-tip")
  .append("text")
  .text(d =>d.title.split(" ").slice(0,4).join(" "))
  .style("font-family", "verdana")
  .style("font-size", 16)
  .attr("stroke", "none")
  .attr("fill", d => pubColors[d.region])

svg.selectAll(".bubble-tip")
  .append("text")
  .text(d => "- " + d.region)
  .attr("y", d => (d.title.split(" ").length > 8 ? 54 : 36) )
  .style("font-family", "verdana")
  .style("font-style", "italic")
  .style("font-size", 13)
  .attr("stroke", "none")
  .attr("fill", d => pubColors[d.region])

svg.selectAll(".bubble-tip")
  .append("text")
  .classed("bubble-tip-yText", true)
  .text(d => "(" + d[yVar] + " " + yVar + ")")
  .attr("y", d => (d.title.split(" ").length > 8 ? 72 : 54) )
  .style("font-family", "sans-serif")
  .style("font-size", 14)
  .attr("stroke", "none")
  .attr("fill", d => pubColors[d.region])

let xVar = document.getElementById("select-x-var").value;

document.getElementById("select-x-var").addEventListener("change", (e)=>{
  
  xVar = e.target.value   
  
  if(xVar === "districtnumber"){
            
    xScale = d3.scaleTime()
      .domain([d3.min(neighborhoodcrimedata, d => d[xVar]), d3.max(neighborhoodcrimedata, d => d[xVar])])
      .range([0, 600]);

    d3.select("#xAxis")
      .call(d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat("%b %d")) )  
          
  }
  else if(xVar === "region"){
             
    xScale = d3.scaleBand()
      .domain(Object.keys(pubColors))
      .range([0, 600])
      .padding(1) 
    
    svg.select("#xAxis")            
      .call(d3.axisBottom(xScale).tickSize(0))
      .selectAll("text")
        .attr("transform", (d,i)=>`translate(0, ${(i%2)*20})`)
        .style("fill", d => pubColors[d])
  }
  else{
    xScale = d3.scaleLinear()
      .domain([0, d3.max(neighborhoodcrimedata, d => d[xVar]) ])    
      .range([0, 600]);
      
    svg.select("#xAxis")            
      .call(d3.axisBottom(xScale)
          .ticks(5)
          .tickFormat(d3.format("d"))
          .tickSizeOuter(0)
       )
  
  }
    svg.selectAll(".bubble")
      .transition()
      .duration(1000)
      .attr("cx", (d) => xScale(d[xVar]) )
  
    svg.selectAll(".bubble-tip")
      .transition()
      .duration(1000)
      .attr("transform", d => "translate(" + (xScale(d[xVar])+20) + ", " +  yScale(d[yVar]) + ")" )
})

document.getElementById("select-y-var").addEventListener("change", (e)=>{
  
  yVar = e.target.value   

  yScale = d3.scaleLinear()
    .domain([0, d3.max(neighborhoodcrimedata, d => d[yVar]) ])    
    .range([400, 0]);

  svg.select("#yAxis")            
    .call(d3.axisLeft(yScale)
          .ticks(5)
          .tickFormat(d3.format("d"))
          .tickSizeOuter(0)
       )

  svg.selectAll(".bubble")
    .transition()
    .duration(1000)
    .attr("cy", (d) => yScale(d[yVar]) )
    
  svg.selectAll(".bubble-tip-yText")
    .text(d => "(" + d[yVar] + " " + yVar + ")")
  
  svg.selectAll(".bubble-tip")
      .attr("transform", d => "translate(" + (xScale(d[xVar])+20) + ", " +  yScale(d[yVar]) + ")" )
})
