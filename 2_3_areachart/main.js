var keys = ['POR','SEA','LA','SF','BI'];
var data;
var graphDimensions;
var containerDimensions = {
  height: 590, 
  width: 1650
};

var graphAxes;
var svg;
var line;
var dataPath;

function update(dataPassed) {
  data = dataPassed;
  
  data.map(a => {
    a.interval = new Date(a.interval)
    return a;
  })
  
	if (typeof graphDimensions === 'undefined') {
		setInitialGraphData();
		setAxesBasedOnDimensions();
		updateAxesBasedOnData();
		drawGraph();
		plotArea(false);
	} else {
		updateAxesBasedOnData();
		updateAxesWithNewData();
		plotArea(true);
	}
}

function setInitialGraphData() {
	const margins = { top: 20, right: 40, bottom: 40, left: 75 };
	const raints = { min: 700, max: 1400 };

	graphDimensions = {
		margin: margins,
		width: (containerDimensions.width || raints.min) - margins.left - 40,
		height: containerDimensions.height - margins.top - margins.bottom
	};

	graphDimensions.width = Math.max(Math.min(graphDimensions.width, raints.max), raints.min);
}

function setAxesBasedOnDimensions() {
	graphAxes = {
		x: d3.scaleTime().range([0, graphDimensions.width]),
		y: d3.scaleLinear().range([graphDimensions.height, 0])
	};

	graphAxes.xAxis = d3.axisBottom(graphAxes.x);
	graphAxes.yAxis = d3.axisLeft(graphAxes.y).tickSize(-graphDimensions.width);
}

function drawGraph() {
	svg = d3
		.select('div.graph')
		.append('svg')
		.attr('width', graphDimensions.width + graphDimensions.margin.left)
		.attr('height', graphDimensions.height + graphDimensions.margin.top + graphDimensions.margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + graphDimensions.margin.left + ',' + graphDimensions.margin.top + ')');

	svg
		.append('g')
		.attr('class', 'x-axis')
		.attr('transform', 'translate(0,' + graphDimensions.height + ')')
		.call(graphAxes.xAxis);

	svg
		.append('g')
		.attr('class', 'y-axis')
		.call(graphAxes.yAxis);
}

function updateAxesBasedOnData() {
	const maxYVal = getHighestValueForYAxis();

	graphAxes.x.domain(d3.extent(data, d => d.interval));
	graphAxes.y.domain([0, maxYVal]);
}

function updateAxesWithNewData() {
	graphAxes.xAxis.scale(graphAxes.x);
	graphAxes.yAxis.scale(graphAxes.y);

	const t = d3.transition().duration(500);

	svg
		.select('.x-axis')
		.transition(t)
		.call(graphAxes.xAxis);

	svg
		.select('.y-axis')
		.transition(t)
		.call(graphAxes.yAxis);
}

function plotArea(update) {
	const stack = d3.stack();
	stack.keys(keys);
	stack.order(d3.stackOrderReverse);

	const area = startFromZero => {
		const highestVal = getHighestValueForYAxis();
		return d3
			.area()
			.x(d => graphAxes.x(d.data.interval))
			.y0(d => (startFromZero ? highestVal : graphAxes.y(d[0])))
			.y1(d => (startFromZero ? highestVal : graphAxes.y(d[1])));
	};

	if (update) {
		dataPath
			.data(stack(data))
			.enter()
			.append('g')
			.attr('class', d => 'data-path type-' + d.key);
	} else {
		dataPath = svg
			.selectAll('.data-path')
			.data(stack(data))
			.enter()
			.append('g')
			.attr('class', d => 'data-path type-' + d.key);
	}
  
	dataPath.exit().remove();

	line = dataPath
		.append('path')
		.attr('class', 'area')
		.attr('d', area(true))
		.transition()
		.delay(200)
		.duration(700)
		.attr('d', area(false));
}

function getHighestValueForYAxis() {
	return d3.max(data, d => {
		const vals = d3.keys(d).map(key => (!key.startsWith('interval') ? d[key] : 0));
		return d3.sum(vals);
	});
}

var data = [
	{
		interval: "2020-05-01",
		POR: 783,
		SEA: 845,
		LA: 1208,
        SF: 655,
        BI: 245,
		
	},
	{
		interval: "2020-06-01",
		POR: 726,
		SEA: 885,
		LA: 1220,
        SF: 788,
        BI: 155,
		
	},
	{
		interval: "2020-07-01",
		POR: 854,
		SEA: 755,
		LA: 1450,
        SF: 703,
        BI: 185,
		
	},
	{
		interval: "2020-08-01",
		POR: 872,
		SEA: 940,
		LA: 1304,
        SF: 788,
        BI: 95, 
		
	},
    {
		interval: "2020-09-01",
		POR: 895,
		SEA: 900,
		LA: 1188,
        SF: 656,
        BI: 201, 
		
	},
    {
		interval: "2020-10-01",
		POR: 892,
		SEA: 815,
		LA: 1324,
        SF: 603,
        BI: 135, 
		
	},
    {
		interval: "2020-11-01",
		POR: 772,
		SEA: 724,
		LA: 1027,
        SF: 642,
        BI: 173,
		
	},
    {
		interval: "2020-12-01",
		POR: 729,
		SEA: 984,
		LA: 1059,
        SF: 697,
        BI: 116, 
		
	},
]

update(data)
setTimeout(() => update(data2), 2000)
