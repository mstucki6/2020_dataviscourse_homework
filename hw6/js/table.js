// const svgHeight=1000;
// const svgWidth = 800;
// const margin = {top:50, bottom:50, right:50, left:50};
// const height=svgHeight-margin.top-margin.bottom; 
// const width = svgWidth-margin.left-margin.right;

// console.log(colors(10))
class Table {
    constructor(data){
        this.render(data)
        this.state={
            sortedBy:null, sortedDirection:null
        }
        
    }
    render(data){
        document.getElementById("table-svg").innerHTML=""
        this.svg = d3.select("#table-svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
            console.log(this.svg)
            this.phraseContainer=this.svg.append("g")
            this.freqContainer=this.svg.append("g")
            this.percentContainer=this.svg.append("g")
            this.totalContainer=this.svg.append("g")
            const rectWidth = svgWidth/4-15
           
            this.phraseHeader=this.phraseContainer.append("g")
            this.phraseHeader.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", rectWidth)
                .attr("height", 50)
                .attr("fill", "blue")
                .attr("fill-opacity", 0.09)
              
            
                this.phraseHeader.append("text")
                .text("Phrase")
                .attr("x", rectWidth/2)
                .attr("y", 20)
                .attr("text-anchor", "middle")
                
              
                this.phraseHeader.on("click", (d)=>{
                    if (this.state.sortedBy==="phrase" && this.state.sortedDirection=== "descending"){
                       this.render(data.sort((a, b) => d3.descending(a.phrase, b.phrase)))
                       this.state.sortedBy="phrase"
                       this.state.sortedDirection="ascending"
                    }
                    else{ 
                        this.render(data.sort((a, b) => d3.ascending(a.phrase, b.phrase)))
                        this.state.sortedBy="phrase"
                        this.state.sortedDirection="descending"}
                    
                })

            this.freqHeader = this.freqContainer.append('g')
            this.freqHeader.append("rect")
                .attr("x", rectWidth+5)
                .attr("y", 0)
                .attr("width", rectWidth)
                .attr("height", 50)
                .attr("fill", "blue")
                .attr("fill-opacity", 0.09)
            this.freqHeader.append("text")
                .text("Frequency")
                .attr("x", rectWidth/2+rectWidth+5)
                .attr("y", 20)
                .attr("text-anchor", "middle")

            this.freqHeader.on("click", (d)=>{
                if (this.state.sortedBy==="frequency" && this.state.sortedDirection=== "descending"){
                    this.render(data.sort((a, b) => d3.ascending(a.frequency, b.frequency)))
                    this.state.sortedBy="frequency"
                    this.state.sortedDirection="ascending"
                }
                else{ 
                    this.render(data.sort((a, b) => d3.descending(a.frequency, b.frequency)))
                    this.state.sortedBy="frequency"
                    this.state.sortedDirection="descending"}
                    
            })
            
            this.percentHeader = this.percentContainer.append("g")
            this.percentHeader.append("rect")
                .attr("x", rectWidth*2+10)
                .attr("y", 0)
                .attr("width", rectWidth)
                .attr("height", 50)
                .attr("fill", "blue")
                .attr("fill-opacity", 0.09)
            this.percentHeader.append("text")
                .text("Percentages")
                .attr("x", rectWidth*2+10+rectWidth/2)
                .attr("y", 20)
                .attr("text-anchor", "middle")

            this.percentHeader.on("click", (d)=>{
                if (this.state.sortedBy==="percent" && this.state.sortedDirection=== "descending"){
                    this.render(data.sort((a, b) => d3.ascending(a.percentageofspeeches, b.percentageofspeeches)))
                    this.state.sortedBy="percent"
                    this.state.sortedDirection="ascending"
                }
                else{ 
                    this.render(data.sort((a, b) => d3.descending(a.percentageofspeeches, b.percentageofspeeches)))
                    this.state.sortedBy="percent"
                    this.state.sortedDirection="descending"}
                    
            })

            this.totalHeader = this.totalContainer.append("g")
            this.totalHeader.append("rect")
                .attr("x", rectWidth*3+15)
                .attr("y", 0)
                .attr("width", rectWidth)
                .attr("height", 50)
                .attr("fill", "blue")
                .attr("fill-opacity", 0.09)
            this.totalHeader.append("text")
                .text("Total")
                .attr("x", rectWidth*3+15+rectWidth/2)
                .attr("y", 20)
                .attr("text-anchor", "middle")

            this.totalHeader.on("click", (d)=>{
                if (this.state.sortedBy==="total" && this.state.sortedDirection=== "descending"){
                    this.render(data.sort((a, b) => d3.ascending(Number(a.total), Number(b.total))))
                    this.state.sortedBy="total"
                    this.state.sortedDirection="ascending"
                }
                else{ 
                    this.render(data.sort((a, b) => d3.descending(Number(a.total), Number(b.total))))
                    this.state.sortedBy="total"
                    this.state.sortedDirection="descending"}
                    
            })
            
            this.phraseTable=this.phraseContainer.append("g")
            this.phraseTable.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text((d)=> {return d.phrase})
                .attr("y", (d,i)=>{return i*32 + 80})

            this.freqTable=this.freqContainer.append("g")
            const frequencyScale = d3.scaleLinear().rangeRound([0,rectWidth-20]).domain([0,1])
            this.categoryMap = _.uniq(d3.map(data,(d)=>{return d.category}))
            const colors = d3.scaleOrdinal(d3.schemeCategory10).domain(this.categoryMap);
            this.freqContainer.append("g")
            .call(d3.axisTop(frequencyScale).ticks("3"))
            .attr("transform", `translate(${rectWidth+15}, ${margin.top})`)
            .select(".domain")
            .remove();
            this.freqTable.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", rectWidth+15)
                .attr("width", (d)=>{return frequencyScale(d.frequency)})
                .attr("y", (d,i)=>{return i*32 + 60})
                .attr("height", 25)
                .attr("fill", (d)=>{return colors(d.category)})

            // this.percentTable=this.percentContainer.append("g")
            this.percentDTable=this.percentContainer.append("g")
            const percentScale = d3.scaleLinear().rangeRound([0,rectWidth-20]).domain([-100,100])
            this.percentContainer.append("g")
            .call(d3.axisTop(percentScale).ticks("5").tickFormat((x)=>Math.abs(x)))
            .attr("transform", `translate(${rectWidth*2+20}, ${margin.top})`)
            .select(".domain")
            .remove();
            this.percentDTable.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("transform", `translate(${rectWidth*2+20}, 0)`)
                .attr("x", (d)=>{return Math.min(percentScale(Number(d.percent_of_d_speeches)*-1)-2, ((rectWidth-20)/2)-6)})
                .attr("width", (d)=>{ 
                   return Math.max(((rectWidth-20)/2)-(percentScale(Number(d.percent_of_d_speeches)*-1)), 5)
                })
                .attr("y", (d,i)=>{return i*32 + 60})
                .attr("height", 25)
                .attr("fill", "blue")

                this.percentRTable=this.percentContainer.append("g")
                // const percentScale = d3.scaleLinear().rangeRound([0,rectWidth-20]).domain([-100,100])
                this.percentRTable.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("transform", `translate(${rectWidth*2+20}, 0)`)
                    .attr("x", (rectWidth-20)/2+2)
                    .attr("width", (d)=>{ 
                       return Math.max(percentScale(Number(d.percent_of_r_speeches))-(rectWidth-20)/2, 5)
                    })
                    .attr("y", (d,i)=>{return i*32 + 60})
                    .attr("height", 25)
                    .attr("fill", "red")

                this.phraseTable=this.phraseContainer.append("g")
                this.phraseTable.selectAll("text")
                     .data(data)
                    .enter()
                     .append("text")
                     .text((d)=> {return d.total})
                     .attr("y", (d,i)=>{return i*32 + 80})
                     .attr("x", rectWidth*3+15+rectWidth/2)
                     .attr("text-anchor", "middle")
    }
}