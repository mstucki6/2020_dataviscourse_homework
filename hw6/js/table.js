// const svgHeight=1000;
// const svgWidth = 800;
// const margin = {top:50, bottom:50, right:50, left:50};
// const height=svgHeight-margin.top-margin.bottom; 
// const width = svgWidth-margin.left-margin.right;

// console.log(colors(10))
class Table {
    constructor(data){
        this.svg = d3.select("#table-svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
            this.phraseContainer=this.svg.append("g")
            this.freqContainer=this.svg.append("g")
            this.percentContainer=this.svg.append("g")
            this.totalContainer=this.svg.append("g")
            const rectWidth = svgWidth/4-15

            this.phraseContainer.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", rectWidth)
                .attr("height", 50)
                .attr("fill", "blue")
                .attr("fill-opacity", 0.09)
            this.phraseContainer.append("text")
                .text("Phrase")
                .attr("x", 75)
                .attr("y", 20)

            this.freqContainer.append("rect")
                .attr("x", rectWidth+5)
                .attr("y", 0)
                .attr("width", rectWidth)
                .attr("height", 50)
                .attr("fill", "blue")
                .attr("fill-opacity", 0.09)
            this.freqContainer.append("text")
                .text("Frequency")
                .attr("x", rectWidth+75)
                .attr("y", 20)
            
            this.percentContainer.append("rect")
                .attr("x", rectWidth*2+10)
                .attr("y", 0)
                .attr("width", rectWidth)
                .attr("height", 50)
                .attr("fill", "blue")
                .attr("fill-opacity", 0.09)
            this.percentContainer.append("text")
                .text("Percentages")
                .attr("x", rectWidth*2+75)
                .attr("y", 20)
            
            this.totalContainer.append("rect")
                .attr("x", rectWidth*3+15)
                .attr("y", 0)
                .attr("width", rectWidth)
                .attr("height", 50)
                .attr("fill", "blue")
                .attr("fill-opacity", 0.09)
            this.totalContainer.append("text")
                .text("Total")
                .attr("x", rectWidth*3+70)
                .attr("y", 20)
            
            this.phraseTable=this.phraseContainer.append("g")



            
    }
}