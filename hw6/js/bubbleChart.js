const svgHeight=1000;
const svgWidth = 800;
const margin = {top:50, bottom:50, right:50, left:50};
const height=svgHeight-margin.top-margin.bottom; 
const width = svgWidth-margin.left-margin.right;

// console.log(colors(10))
class BubbleChart {
    constructor(data){
        data.forEach((d, index)=>{
            data[index].percentageofspeeches= (
                d.d_speeches*d.percent_of_d_speeches + d.r_speeches*d.percent_of_r_speeches)/d.total 
        }

        )
        console.log(data)
        console.log(data.filter((d)=>{return d.phrase==="income"}))
        
        this.svg = d3.select("#bubble-chart-svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
        
        const xDomainExtent = d3.extent(data,(d)=>{return d.position});
        xDomainExtent[0] *=1.1
        xDomainExtent[1] *=1.2
    
        const yDomainExtent = d3.extent(data,(d)=>{return d.sourceY});
        yDomainExtent[0] *=1.3
        yDomainExtent[1] *=1.4
    
        const x = d3.scaleLinear().rangeRound([0,width]).domain(xDomainExtent)
        this.y = d3.scaleLinear().rangeRound([height / 6, 0]).domain(yDomainExtent)
        const r = d3.scaleLinear().rangeRound([2,20]).domain(d3.extent(data,(d)=>{return Number(d.total)}))
        this.categoryMap = _.uniq(d3.map(data,(d)=>{return d.category}))
        const colors = d3.scaleOrdinal(d3.schemeCategory10).domain(this.categoryMap);
        console.log(colors("economy/fiscal issues"))
    
        console.log(d3.extent(data,(d)=>{return d.total}))
        this.svg.append("text")
            .text("Democratic leaning")
            .attr("x", 20)
            .attr("y", 30)
            this.svg.append("text")
            .text("Republican leaning")
            .attr("x", width-150)
            .attr("y", 30)
    
        this.svg.append("g")
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${margin.top})`)
            .select(".domain")
            .remove();
        this.allCircles = this.svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d)=>{return x(d.position)})
            .attr("cy", (d)=>{return this.yCalculator(d.sourceY, d.category)})
            .attr("r", (d)=>{return r(d.total)})
            .attr("fill", (d)=>{return colors(d.category)})
            //.attr("stroke-width", 3)
            .attr("stroke", "black")
            .on("mouseover",(d)=>{
                this.tooltip = this.svg.append("g")
                .attr("class", "tool-tip")
                this.tooltip.append("rect")
                .attr("x", x(d.position)+r(d.total))
                .attr("y", this.yCalculator(d.sourceY, d.category)-r(d.total))
                .attr("width", 200)
                .attr("height", 100)
                .attr("fill", "white")
                .attr("fill-opacity", 0.8)
                
                this.tooltip.append("text")
                .text(d.phrase)
                .attr("x", x(d.position)+r(d.total)+20)
                .attr("y",  this.yCalculator(d.sourceY, d.category)-r(d.total)+20)
               
                this.tooltip.append("text")
                .text(`R${d.position>0 ? "+":"-"} ${Math.abs(Number.parseFloat(d.position).toPrecision(4))}%`)
                .attr("x", x(d.position)+r(d.total)+20)
                .attr("y",  this.yCalculator(d.sourceY, d.category)-r(d.total)+40)
               
                this.tooltip.append("text")
                .text(`In ${(Number.parseFloat(d.percentageofspeeches).toPrecision(2))}% of speeches`)
                .attr("x", x(d.position)+r(d.total)+20)
                .attr("y",  this.yCalculator(d.sourceY, d.category)-r(d.total)+60)

                

            })
            .on("mouseout", (d)=>{
                this.svg.selectAll(".tool-tip")
                .remove()
            })
    
        console.log(x.domain())
    }
    separateByCategory(){
        this.separated=true
        this.allCircles.transition()
        .attr("cy", (d)=>{return this.yCalculator(d.sourceY, d.category)});
        this.container = this.svg.append("g")
            this.container.selectAll("text")
            .data(this.categoryMap)
            .enter()
            .append("text")
            .text((d)=>{
                return d
            })
            .attr("y", (d)=>{ return height /6 *this.categoryMap.indexOf(d) +margin.top+50 
            })
        
    }
    regroupEverything(){
        this.separated=false
        this.allCircles.transition()
        .attr("cy", (d)=>{return this.yCalculator(d.sourceY, d.category)})
        this.container.selectAll("text")
            .attr("y", -100)
    }
    yCalculator(sourceY,category){
        if (this.separated){
            return this.y(sourceY) + height /6 *this.categoryMap.indexOf(category)+margin.top
        }
        return this.y(sourceY)+margin.top
        
    }
}


