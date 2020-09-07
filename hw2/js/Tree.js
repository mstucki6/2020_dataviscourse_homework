/** Class representing a Tree. */
class Tree {

    /**
     * Creates a Tree Object
     * Populates a single attribute that contains a list (array) of Node objects to be used by the other functions in this class
     * note: Node objects will have a name, parentNode, parentName, children, level, and position
     * @param {json[]} json - array of json objects with name and parent fields
     */
    constructor(json) {
    Node {name: "Animal", parentNode: undefined, children: Array(2), level: 0, _}
        children: (2)
        level: 0
        name: "Animal"
        parentNode: Node {name:"Animal", parentName: "root", parentNode: undefined, children: Array(2), level: 0, _}
        position: 0
        _proto_: Object
    
    Node {name: "Nephrozoa", parentName: "Animal", parentNode: Node, children: Array(2), level: 1, _}
        children: (2) [Node, Node]
        level:1
        name: "Nephrozoa"
        parentName: "Animal"
        parentNode: Node {name: "Animal", parentName: "root", parentNode: undefined, children: Array (2), level: 0, _}
        position: 0
        _proto_: Object

    Node {name: "Sponges", parentName: "Animal", parentNode: Node, children: Array(2), level: 1, _}
        children: (2) [Node, Node]
        level:1
        name: "Sponges"
        parentName: "Animal"
        parentNode: Node {name: "Animal", parentName: "root", parentNode: undefined, children: Array (2), level: 0, _}
        position: 2
        _proto_: Object
        
    Node {name: "Calcinea", parentName: "Sponges", parentNode: Node, children: Array(2), level: 2, _}
        children: (2) [Node, Node]
        level:2
        name: "Calcinea"
        parentName: "Sponges"
        parentNode: Node {name: "Calcinea", parentName: "Animal", parentNode: Node, children: Array (2), level: 1, _}
        position: 0
        _proto_: Object
        
    Node {name: "Petronina", parentName: "Sponges", parentNode: Node, children: Array(2), level: 2, _}
        children: (2) [Node, Node]
        level:2
        name: "Petronina"
        parentName: "Sponges"
        parentNode: Node {name: "Petronina", parentName: "Sponges", parentNode: Node, children: Array (2), level: 2, _}
        position: 0
        _proto_: Object
    
    Node {name: "Vertebrates", parentName: "Nephrozoa", parentNode: Node, children: Array(3), level: 2, _}
        children: (3) [Node, Node, Node]
        level:3
        name: "Vertebrates"
        parentName: "Nephrozoa"
        parentNode: Node {name: "Vertebrates", parentName: "Nephrozoa", parentNode: Node, children: Array (2), level: 0, _}
        position: 0
        _proto_: Object   
            
    Node {name: "Protosomes", parentName: "Nephrozoa", parentNode: Node, children: Array(3), level: 2, _}
        children: (2) [Node, Node]
        level:3
        name: "Protosomes"
        parentName: "Nephrozoa"
        parentNode: Node {name: "Protosomes", parentName: "Nephrozoa", parentNode: Node, children: Array (2), level: 0, _}
        position: 0
        _proto_: Object 
        
    Node {name: "Lampreys", parentName: "Vertebrates", parentNode: Node, children: Array(3), level: 4, _}
        children: (2) [Node, Node]
        level:3
        name: "Lampreys"
        parentName: "Vertebrates"
        parentNode: Node {name: "Lampreys", parentName: "Vertebrates", parentNode: Node, children: Array (0), level: 4, _}
        position: 0
        _proto_: Object
            
    Node {name: "Sharks", parentName: "Vertebrates", parentNode: Node, children: Array(0), level: 4, _}
        children: (0) []
        level:3
        name: "Sharks"
        parentName: "Vertebrates"
        parentNode: Node {name: "Sharks", parentName: "Vertebrates", parentNode: Node, children: Array (0), level: 4, _}
        position: 0
        _proto_: Object
        
    Node {name: "Tetrapods", parentName: "Vertebrates", parentNode: Node, children: Array(3), level: 4, _}
        children: (2) [Node, Node]
        level:3
        name: "Tetropods"
        parentName: "Vertebrates"
        parentNode: Node {name: "Sharks", parentName: "Vertebrates", parentNode: undefined, children: Array (0), level: 4, _}
        position: 0
        _proto_: Object
    
    Node {name: "Water Bears", parentName: "Protosomes", parentNode: Node, children: Array(4), level: 4, _}
        children: (0) []
        level:3
        name: "Water Bears"
        parentName: "Protosomes"
        parentNode: Node {name: "Water Bears", parentName: "Protosomes", parentNode: undefined, children: Array (0), level: 4, _}
        position: 0
        _proto_: Object
        
    Node {name: "Hexapods", parentName: "Protosomes", parentNode: Node, children: Array(4), level: 4, _}
        children: (2) [Node, Node]
        level:4
        name: "Hexapods"
        parentName: "Protosomes"
        parentNode: Node {name: "Hexapods", parentName: "Protosomes", parentNode: undefined, children: Array (2), level: 4, _}
        position: 0
        _proto_: Object 

    Node {name: "Turtles", parentName: "Tetrapods", parentNode: Node, children: Array(3), level: 5, _}
        children: () []
        level:3
        name: "Turtles"
        parentName: "Tetrapods"
        parentNode: Node {name: "Turtles", parentName: "Tetrapods", parentNode: undefined, children: Array (0), level: 5, _}
        position: 0
        _proto_: Object

    Node {name: "Insects", parentName: "Hexapods", parentNode: Node, children: Array(4), level: 5, _}
        children: (0) []
        level:4
        name: "Insects"
        parentName: "Hexapods"
        parentNode: Node {name: "Insects", parentName: "Hexapods", parentNode: undefined, children: Array (), level: 5, _}
        position: 0
        _proto_: Object

    Node {name: "Proturans", parentName: "Hexapods", parentNode: Node, children: Array(4), level: 5, _}
        children: (0) []
        level:4
        name: "Proturans"
        parentName: "Hexapods"
        parentNode: Node {name: "Proturans", parentName: "Hexapods", parentNode: undefined, children: Array (), level: 5, _}
        position: 0
        _proto_: Object
    }

    /**
     * Function that builds a tree from a list of nodes with parent refs
     */
    buildTree() {
        // note: in this function you will assign positions and levels by making calls to assignPosition() and assignLevel()

    }

    /**
     * Recursive function that assign levels to each node
     */
    assignLevel(node, level) {

    }

    /**
     * Recursive function that assign positions to each node
     */
    assignPosition(node, position) {

    }

    /**
     * Function that renders the tree
     */
    renderTree() {

    }

}