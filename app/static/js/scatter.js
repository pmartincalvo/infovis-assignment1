function get_info_on_var(variable) {
    var rel_meta = meta_data.find(function(d) {
        return d.Variabele == variable;
    })

    var label = rel_meta['Label_1'];
    var definition = rel_meta['Definition'];

    return [label, definition]
}

var width = 1000;
var height = 700;
var MOUSEOVER = false;

var svgContainer = d3.select("#scatter").append("svg")
						.attr("height", height)
						.attr("width", width);



var chart_height = 400,
	chart_width = 700;

// Code for vertical bar chart
// var x = d3.scaleBand().rangeRound([0, chart_width]).padding(0.1),
//     y = d3.scaleLinear().rangeRound([chart_height, 0]);

var x = d3.scaleLinear().rangeRound([0, chart_width]),
    y = d3.scaleBand().rangeRound([chart_height, 0]).padding(0.1);

var chart_group = svgContainer.append("g")
	.attr("id", "chart_group")
    .attr("transform", "translate(" + 100 + "," + 50 + ")");

// Code for vertical bar chart
// x.domain(x_variables);
// y.domain([0, 100]);

x.domain([0, 100]);
y.domain([0, 100]);

chart_group.append("g")
    .attr("transform", "translate(" + 0 + "," + chart_height + ")")
    .call(d3.axisBottom(x));
    // Code for vertical bar chart
    // .selectAll("text")
    // .attr("y", 0)
    // .attr("x", 9)
    // .attr("transform", "rotate(90)")
    // .style("text-anchor", "start");

chart_group.append("g")
    .call(d3.axisLeft(y));

var map = d3.map(data[0]);


chart_group.selectAll("dot")
    .data(map.entries())
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.value.WOPPONB_P); } )
      .attr("cy", function (d) { return y(d.value.WHUURHOOG_P); } )
      .attr("r", 6)
      .style("fill", "blue")

    // .append("rect")
    // .attr("class", "bar")
    // .attr("x", 1)
    // .attr("y", function (d) { return y(d.key) })
    // .attr("width", function(d) { return x(d.value); })
    // .attr("height", y.bandwidth())


    .on("mouseover", function(d, i) {
        var x_var = d.key;
        var value = d.value;
        var info = get_info_on_var(x_var);
        var label = info[0]
        var definition = info[1];

        displayTooltip("<b>Variable: </b>" + label + "<br /><b>Percentage: </b>" + 
            value + "%<br /><b>Explanation: </b>" + definition)

        //d3.select(this).attr("fill", "DarkOrange");
    })
    // .on("mousemove", function(d, i) {
    //     var x_var = d.key;
    //     var value = d.value;
    //     var info = get_info_on_var(x_var);
    //     var label = info[0]
    //     var definition = info[1];

    //     displayTooltip("<b>Variable: </b>" + label + "<br /><b>Percentage: </b>" + 
    //         value + "%<br /><b>Explanation: </b>" + definition)

    //     //d3.select(this).attr("fill", "DarkOrange");
    // })
    .on("mouseout", function(d) {
        hideTooltip();
        //d3.select(this).attr("fill", "steelblue");
    });

// text label for the x axis
svgContainer.append("text")             
  .attr("transform",
        "translate(" + (width/2 - (100/2)) + " ," + 
                       (chart_height + 100) + ")")
  .style("text-anchor", "middle")
  .style("font-size", "13px")
  .text("Percentage");

chart_group.append("text")
        .attr("class", "title")
        .attr("id", "chart-title")
        .attr("y", -25)
        .attr("x", chart_width / 2)
        .style("font-weight", "bold")               
        .style("text-anchor", "middle");
        // .text("Rental statistics of " + selected_area);

// Code for vertical bar chart
// chart_group.selectAll(".bar")
//     .data(map.entries())
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("x", function (d) { return x(d.key)})
//     .attr("y", function (d) { return y(d.value) })
//     .attr("width", x.bandwidth())
//     .attr("height", function(d) { return chart_height - y(d.value); })
//     .on("mouseover", function(d, i) {
//         var x_var = d.key;
//         var value = d.value;
//         var info = get_info_on_var(x_var);
//         var label = info[0]
//         var definition = info[1];

//         displayTooltip("<b>Variable: </b>" + label + "<br /><b>Percentage: </b>" + 
//             value + "%<br /><b>Explanation: </b>" + definition)

//         //d3.select(this).attr("fill", "DarkOrange");
//     })
//     .on("mousemove", function(d, i) {
//         var x_var = d.key;
//         var value = d.value;
//         var info = get_info_on_var(x_var);
//         var label = info[0]
//         var definition = info[1];

//         displayTooltip("<b>Variable: </b>" + label + "<br /><b>Percentage: </b>" + 
//             value + "%<br /><b>Explanation: </b>" + definition)

//         //d3.select(this).attr("fill", "DarkOrange");
//     })
//     .on("mouseout", function(d) {
//         hideTooltip();
//         //d3.select(this).attr("fill", "steelblue");
//     });


