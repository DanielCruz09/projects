// This file contains the functions that determine the actions of the AI

/*
MCTS algorithm:
    1. Set the current game state as the root node
    2. For every possible move, add a node to the tree
    3. Each node will have a value that will determine its effect on the game 
    (the higher the value, the closer the AI is to winning)
    4. Traverse the tree and find the path you want (highest value, lowest value, etc.)
*/

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    addNode(value) {
        let nnode = new Node(value);
        if (this.root = null) {
            this.root = nnode;
        }
        else {
            let nnode = new Node(value);
            let currNode = this.root;
            while (nnode.value < currNode.value) {
                if (currNode.left == null) currNode.left = nnode;
                else currNode = currNode.left; 
            }
        }
    }
}


function MonteCarloTreeSearch(root) { // root is the current game state
    var MCT = new Tree();
    var player1 = document.getElementsByClassName("white_checker");
    var player2 = document.getElementsByClassName("black_checker");
}