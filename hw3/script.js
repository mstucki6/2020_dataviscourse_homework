/**
 * Makes the first bar chart appear as a staircase.
 *
 * Note: use only the DOM API, not D3!
 */
function staircase() {
  // ****** TODO: PART II ******
  let g = document.getElementById("aBarChart") //select the chart id
  let getter = []
  for (let rect of g.children){
    let width = rect.getAttribute('width')
    getter.push(width)
    
    //console.log(rev)
      }
  let rev = getter.sort((a, b)=>a-b) 
  counter = 0
  for (let rect of g.children){
    rect.setAttribute("width", rev[counter]) //gives value at the index
    counter ++
  }
}

/**
 * Render the visualizations
 * @param data
 */
function update(data) {
  /**
   * D3 loads all CSV data as strings. While Javascript is pretty smart
   * about interpreting strings as numbers when you do things like
   * multiplication, it will still treat them as strings where it makes
   * sense (e.g. adding strings will concatenate them, not add the values
   * together, or comparing strings will do string comparison, not numeric
   * comparison).
   *
   * We need to explicitly convert values to numbers so that comparisons work
   * when we call d3.max()
   **/

  for (let d of data) {
    d.cases = +d.cases; //unary operator converts string to number
    d.deaths = +d.deaths; //unary operator converts string to number
  }

  // Set up the scales
  let barChart_width = 345;
  let areaChart_width = 295;
  let maxBar_width = 240;
  let data_length = 15;
  let aScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.cases)])
    .range([0, maxBar_width]);
  let bScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.deaths)])
    .range([0, maxBar_width]);
  let iScale_line = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([10, 500]);
  let iScale_area = d3
    .scaleLinear()
    .domain([0, data_length])
    .range([0, 260]);

  // Draw axis for Bar Charts, Line Charts and Area Charts (You don't need to change this part.)
  d3.select("#aBarChart-axis").attr("transform", "translate(0,210)").call(d3.axisBottom(d3.scaleLinear().domain([0, d3.max(data, d => d.cases)]).range([barChart_width, barChart_width-maxBar_width])).ticks(5));
  d3.select("#aAreaChart-axis").attr("transform", "translate(0,245)").call(d3.axisBottom(d3.scaleLinear().domain([0, d3.max(data, d => d.cases)]).range([areaChart_width, areaChart_width-maxBar_width])).ticks(5));
  
  d3.select("#bBarChart-axis").attr("transform", "translate(5,210)").call(d3.axisBottom(bScale).ticks(5));
  d3.select("#bAreaChart-axis").attr("transform", "translate(5,245)").call(d3.axisBottom(bScale).ticks(5));
 
  let aAxis_line = d3.axisLeft(aScale).ticks(5);
  d3.select("#aLineChart-axis").attr("transform", "translate(50,15)").call(aAxis_line);
  d3.select("#aLineChart-axis").append("text").text("New Cases").attr("transform", "translate(50, -3)")
  let bAxis_line = d3.axisRight(bScale).ticks(5);
  d3.select("#bLineChart-axis").attr("transform", "translate(550,15)").call(bAxis_line);
  d3.select("#bLineChart-axis").append("text").text("New Deaths").attr("transform", "translate(-50, -3)")

  // ****** TODO: PART III (you will also edit in PART V) ******

  // TODO: Select and update the 'a' bar chart bars
  d3.select("#aBarChart").selectAll("rect")
  .data(data)
  .join("rect")
 .attr("width", d => aScale(d.cases)) //Pass in cases and send through scaler
  .attr("transform", (d, i) => `translate(0, ${i*14}) scale(-1,1)`) //Sets the transform attribute
  .attr("height", 12)
  
  .on('mouseover', function (d, i){
    d3.select(this)
      .attr('class', 'hovered')
  })
  .on('mouseout', function (d, i){
    d3.select(this)
      .attr('class', '')
  })

  //Transition
  // let svg = d3.select("svg")
  // //data binding
  // let aChart = svg.selectAll(".bar-chart bar-chart-x")
  //   .data(data)
  // //Transition new elements in with transparent grey bars of width 0
  // let newA = aChart.enter().append("rect")
  //   .attr("x", 0)
  //   .attr("y", (d, i) => i *14)
  //   .attr("width", 0)
  //   .attr("height", 20)
  //   .style("opacity", 0)
  //   .classed("bar-chart bar-chart-x", true);
  

  // TODO: Select and update the 'b' bar chart bars
  d3.select("#bBarChart").selectAll("rect")
  .data(data)
  .join("rect")
  .attr("width", d => bScale(d.deaths)) //Pass in cases and send through scaler
  .attr("height", 12)
  .attr("transform", (d, i) => `translate(0, ${i*14})`) //Sets the transform attribute
  
  .on('mouseover', function (d, i){
    d3.select(this)
      .attr('class', 'hovered')
  })
  .on('mouseout', function (d, i){
    d3.select(this)
      .attr('class', '')
  });
  

  // TODO: Select and update the 'a' line chart path using this line generator
  let aLineGenerator = d3.
    line()
    .x((d, i) => iScale_line(i))
    .y(d => aScale(d.cases));

  d3.select("#aLineChart")
    .join("path")
    .attr('d', aLineGenerator(data))

  

  // TODO: Select and update the 'b' line chart path (create your own generator)
  let bLineGenerator = d3.
  line()
  .x((d, i) => iScale_line(i))
  .y(d => bScale(d.deaths));

d3.select("#bLineChart")
  .join("path")
  .attr('d', bLineGenerator(data))

  // TODO: Select and update the 'a' area chart path using this area generator
  let aAreaGenerator = d3
    .area()
    .x((d, i) => iScale_area(i))
    .y0(0)
    .y1(d => aScale(d.cases));

  d3.select("#aAreaChart")
  .join("path")
  .attr('d', aAreaGenerator(data))


  // TODO: Select and update the 'b' area chart path (create your own generator)

  let bAreaGenerator = d3
  .area()
  .x((d, i) => iScale_area(i))
  .y0(0)
  .y1(d => bScale(d.deaths));

  d3.select("#bAreaChart")
  .join("path")
  .attr('d', bAreaGenerator(data))


  // TODO: Select and update the scatterplot points

  //Defined scatterplot axes
  let sx = d3.axisBottom(aScale).ticks(5)
  let sy = d3.axisLeft(bScale).ticks(5)

  d3.selectAll("#scatterplot > #y-axis")
    .call(sy)
  d3.selectAll("#scatterplot > #x-axis")
    .call(sx) 
  


    //Define data points
  let dotPoint = d3.select("#scatterplot").selectAll('circle')
    .data(data)
    .attr('cx', d => aScale(d.cases)) //#Assigns data to points
    .attr('cy', d => bScale(d.deaths)) //#Assigns data to points
    .attr('r', '5') //Set radius of points
    
  dotPoint.exit().remove()

  let newDots = dotPoint.enter().append('circle')
    .attr('cx', d => aScale(d.cases))
    .attr('cy', d=> bScale(d.deaths))
    .attr('r', '5')

  // ****** TODO: PART IV ******
}

/**
 * Update the data according to document settings
 */
async function changeData() {
  //  Load the file indicated by the select menu
  let dataFile = document.getElementById("dataset").value;
  try {
    const data = await d3.csv("data/" + dataFile + ".csv");
    if (document.getElementById("random").checked) {
      // if random
      update(randomSubset(data)); // update w/ random subset of data
    } else {
      // else
      update(data); // update w/ full data
    }
  } catch (error) {
    console.log(error)
    alert("Could not load the dataset!");
  }
}

/**
 *  Slice out a random chunk of the provided in data
 *  @param data
 */
function randomSubset(data) {
  return data.filter(d => Math.random() > 0.5);
}