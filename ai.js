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
    constructor(state, move) {
        this.left = null;
        this.right = null;
        this.state = state;
        this.move = move;
        this.nextMoves = [];
        this.numWins = 0;
        this.iterations = 0;
    }
}

class Tree {
    constructor(gameBoard, turn) {
        this.root = null;
        this.gameBoard = gameBoard;
        this.turn = turn; // 1 if player's turn, 0 otherwise
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
            while (nnode.value > currNode.value) {
                if (currNode.right == null) currNode.right = nnode;
                else currNode = currNode.right;
            }
        }
    }
    
    findNode(value) {
        let currNode = this.root;
        while (true) {
            if (value < currNode.value) currNode = currNode.left;
            if (value > currNode.value) currNode = currNode.right;
            if (value == currNode.value) return currNode.value;
            if (currNode.left == null || currNode.right == null) return null;
        }
    }

    Move(move) {
        move = makeAMove();
        return move;
    }

    allowedMoves() {
        let board = currBord;
        const moves = {}; // key = position of a piece, value = possible positions for that piece
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                var checker = board[i][j];
                if (checker * this.turn == 0) {
                    // TODO: get possible directions for each checker
                    if (i == 0) {
                        let southeast = board[i+1][j+1];
                        let directions = [];
                        directions.push(southeast);
                        if (j == 0) {
                            moves.board[i][j] = directions;
                            continue;
                        }
                        let southwest = board[i-1][j+1];
                        directions.push(southwest);
                        moves.board[i][j] = directions;
                    }
                    else if (i == 7) {
                        let southwest = board[i-1][j+1];
                        moves.board[i][j] = southwest;
                        if (j == 0) continue;
                        let northwest = board[i-1][j-1];
                        moves.board[i][j] = northwest;
                        continue;
                    }
                    else if (j == 7) {
                        let northeast = board[i+1][j-1];
                        moves.board[i][j] = northeast;
                        if (i == 0) continue;
                        let northwest = board[i-1][j-1];
                        moves.board[i][j] = northwest;
                        continue;
                    }
                    else if (i == 7 & j == 7) {
                        let northwest = board[i-1][j-1];
                        moves.board[i][j] = northwest;
                        continue;
                    }
                    else {
                        let northwest = board[i-1][j-1];
                        let northeast = board[i+1][j-1];
                        let southwest = board[i-1][j+1];
                        let southeast = board[i+1][j+1];
                        let directions = [];
                        directions.push(northwest);
                        directions.push(northeast);
                        directions.push(southwest);
                        directions.push(southeast);
                        moves.board[i][j] = directions;
                    }
                }
            }
        }
    }

    update() {
        return currBord;
    }

    simulation() {
        let state = new Tree(currBord, null); // copy of game state
        while (!gameOver) {
            let moves = state.allowedMoves();
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
        }
    }
}


function MonteCarloTreeSearch(currState) { // root is the current game state
    var MCT = new Tree();
    const root = new Node(currState, null);
    MCT.addNode(root);
    
}