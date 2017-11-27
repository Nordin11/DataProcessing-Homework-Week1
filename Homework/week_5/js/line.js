/*******************************/
/* Nordin Bouchrit 11050608 ***/
/*****************************/
function load() {

	// define margins 
	var margin = { top: 20, right: 10, bottom: 100, left: 40 },
		width = 900 - margin.right - margin.left,
		height = 500 - margin.top - margin.bottom;

	// define svg
	var svg = d3.select("#container")
		.append("svg")
		// group attributes together
		.attr ({
			"width": width + margin.right + margin.left,
			"height": height + margin.top + margin.bottom
		})
			.append("g")
				.attr("transform", "translate(" + margin.left + ',' + margin.right + ')');

	// Define color scale
    var color = d3.scaleOrdinal(d3.SchemeCategory10);

    // parse date
	var DateParse = d3.timeParse("%B %Y");

	// define the x y scales
	var xScale = d3.scale.ordinal()
		.rangeRoundBands([0,width], 0.2, 0.2);
		
	var yScale = d3.scale.linear()
		// make sure the height goes upwards in stead of top to bottom
		.range([height, 0]);

	// define x and y axis
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

	// Define the lines
	var priceline = d3.line()	
    	.xScale(function(d) { return xScale(d.Date); })
    	.yScale(function(d) { return yScale(d.Price); });

	var highline = d3.line()	
    	.xScale(function(d) { return xScale(d.Date); })
    	.yScale(function(d) { return yScale(d.High); });

    var lowline = d3.line()
    	.xScale(function(d) { return xScale(d.Date); })
    	.yScale(function(d) { return yScale(d.Low); });

	//import the data
	d3.csv("BTC USD Historical Data.csv", function(error, data){
		
		// check for errors
		if(error) console.log("Error: data not loaded")

		// convert data in proper format
		data.forEach(function(d) {
			d.Date = DateParse(d.date);
			d.High = +d.High;
			d.Price = +d.Price;
			d.Low = +d.Low;
		});	

		// specify the domains of xscale yscale
		xScale.domain(d3.extent(date, function(d) { return d.Date; }));
		yScale.domain( [ 0, d3.max(data, function(d) { return d.High; }) + 1 ] );

		// Add xAxis to svg       
    	svg.append("g")
	    	.attr("class", "x axis")
	        .attr("transform", "translate(0," + height + ")") 
	        .call(xAxis)
	        .style("font-size", "11px")
	       // add x axis label
	       .append("text")
	        .attr("class", "label")
	        .attr("x", width) 
	        .attr("y", -6)    
	        .style("text-anchor", "end") 
	        .text("Date");
		
		// Add yAxis to svg 
		svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .style("font-size", "11px")
           .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 15) 
            .style("text-anchor", "end")
            .text("Price ($)");

	});
}






