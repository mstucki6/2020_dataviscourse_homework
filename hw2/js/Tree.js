/** Class representing a Tree. */
class Tree {


    /**
     * Creates a Tree Object
     * Populates a single attribute that contains a list (array) of Node objects to be used by the other functions in this class
     * note: Node objects will have a name, parentNode, parentName, children, level, and position
     * @param {json[]} json - array of json objects with name and parent fields
     */
    constructor(json) {
        /**map json to a new array called node */
        this.hwlist = json.map(input => {
            return new Node(input.name, input.parent)
        })

        console.log(this.hwlist);
    }

    /**
     * Function that builds a tree from a list of nodes with parent refs
     */
    buildTree() {
        for(let treeNode of this.hwlist){
            let parentName = treeNode.parentName
            let parentNode = this.hwlist.find(node => node.name === treeNode.parentName)
            if(parentNode) {
                parentNode.addChild(treeNode);
            }
        } 
        console.log(this.treeNode)

    // note: in this function you will assign positions and levels by making calls to assignPosition() and assignLevel()
    /**Recursive fucntion that assign level to each node */
        let treeNode = this.hwlist.find(node => node.name === 'Animal')
        this.assignLevel(treeNode, 0)
        this.assignPosition(treeNode, 0) 
    }



    assignLevel(node, level){
       node.level = level
       for (let treeNode of node.children){
            this.assignLevel(treeNode, level +1)
            console.log(treeNode)
        }
    }

    /**
     * Recursive function that assign positions to each position
     */
    assignPosition(node, position){
        node.position = position

        /**Recursive function to navigate and find last node with largest position */
        function findPosition(node, Run) {
            if(Run){
                return
            }
            let lastChild = node.children[node.children.length -1]
            console.log('findPosition:lastChild', lastChild)
            return findPosition(lastChild, true)
        }


        for(let treeIndex in node.children){
            let treeNode = node.children[treeIndex]
            if(treeIndex==0){
                this.assignPosition(treeNode, position)
            } else {
                this.assignPosition(treeNode, position +1)
            }
        }
        
    }

    /**
     * Function that renders the tree
     */
    renderTree(){
        let body = d3.select('body')

        /**Created svg */
        let svg= body.append("svg")
            .attr('height', 1200)
            .attr("width", 1200)

        /**Lines - Drew these first to layer them on the below the circles */
        /**My line connecting function isn't working because children array is empty
         * to remedy this I would connect my parentNode with my treeNode but I was
         * not able to get this to work.
         */
        let  children = this.hwlist.filter(node => node.parentNode)
        svg.selectAll("line")
        .data(children)
        .enter()
        .append("line")
        .attr("x1", treeNode => (treeNode.parentNode.level*150)+150)
        .attr("y1", treeNode => (treeNode.parentNode.position*150)+150)
        .attr("x2", treeNode => (treeNode.level*150)+150)
        .attr("y2", treeNode => (treeNode.position*150)+150)

        /**Created the circle groupings */
        let drumcircle = svg.selectAll("g")
            .data(this.hwlist)
            .enter().append("g")
            .attr("class", "nodeGroup")
            .attr("transform", d => `translate (${(d.level*150)+150}, ${(d.position*100)+100})`)

        drumcircle.append('circle')
            .attr('r', 45)
        
        drumcircle.append("text")
            .attr('class', 'label')
            .html(d=> d.name)

            console.log(children)
    } 

    

    

}