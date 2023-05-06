// // This file contains the functions that determine the actions of the AI

var checker = function(piece, color) {
    this.piece = piece;
    this.color = color;
    this.king = false;
}

checker.prototype.isEmpty = function(x, y) {
    let pos = currBord[x][y];
    if (pos == null) return true;
    return false;
}

checker.prototype.capture() = function(oldx, oldy, newx, newy) {
    let currentChecker = currBord[oldx][oldy].piece;
    let target = currBord[newx][newy].piece;
    currentChecker = target;
    target = null;
}

checker.prototype.getAllowedMoves = function () {
        let board = currBord;
        const moves = {}; // key = position of a piece, value = array of possible positions for that piece
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                var southeast = board[i+1][j+1];
                var southwest = board[i-1][j+1];
                var northwest = board[i-1][j-1];
                var northeast = board[i+1][j-1];
                var directions = [];
                if (this.color == "black" & this.isEmpty(i+1,j+1) & this.isEmpty(i-1,j+1) & this.isEmpty(i-1,j-1) & this.isEmpty(i+1,j-1)) {
                    if (i == 0) {
                        directions.push(southeast);
                        if (j == 0) {
                            moves.board[i][j] = directions;
                            continue;
                        }
                        directions.push(southwest);
                        moves.board[i][j] = directions;
                    }
                    else if (i == 7) {
                        directions.push(southwest);
                        if (j == 0) {
                            moves.board[i][j] = directions;
                            continue;
                        }
                        directions.push(northwest);
                        moves.board[i][j] = directions;
                    }
                    else if (j == 7) {
                        directions.push(northeast);
                        
                        if (i == 0) {
                            moves.board[i][j] = directions;
                            continue;
                        }
                        directions.push(northwest);
                        moves.board[i][j] = directions;
                    }
                    else if (i == 7 & j == 7) {
                        directions.push(northwest);
                        moves.board[i][j] = directions;
                    }
                    else {
                        directions.push(northwest);
                        directions.push(northeast);
                        directions.push(southwest);
                        directions.push(southeast);
                        moves.board[i][j] = directions;
                    }
                }
                var randNum = Math.floor(Math.random() * 100);
                if (this.color == "black" & !this.isEmpty(i+1,j+1)) {
                    // Capture is possible, move to the square diagonally
                    if (randNum > 50) this.capture(i+1,j+1,i+2,j+2);
                }
                if (this.color == "black" & !this.isEmpty(i-1,j+1)) {
                    if (randNum > 50) this.capture(i-1,j+1,i-2,j+2);
                }
            }
        }
        return moves;
    }

checker.prototype.move = function () {
    var nextMoves = this.getAllowedMoves();
    var randInt = Math.floor(Math.random() * 64);
}








// /*
// New algorithm:
//     1. Get all the allowed moves the AI can perform
//     2. Recurse until the game is over
//     3. Find the path that lead to victory (or random if we want)
//     4. Make the AI move according to that path
// */

// class Node {
//     constructor(state) {
//         this.left = null;
//         this.right = null;
//         this.state = state;
//         this.nextMoves = [];
//         this.numWins = 0;
//         this.iterations = 0;
//     }
// }

// class Tree {
//     constructor(gameBoard, turn) {
//         this.root = null;
//         this.gameBoard = gameBoard;
//         this.turn = turn; // 1 if player's turn, 0 otherwise
//     }

//     addNode(value) {
//         let nnode = new Node(value);
//         if (this.root = null) {
//             this.root = nnode;
//         }
//         else {
//             let nnode = new Node(value);
//             let currNode = this.root;
//             while (nnode.value < currNode.value) {
//                 if (currNode.left == null) currNode.left = nnode;
//                 else currNode = currNode.left; 
//             }
//             while (nnode.value > currNode.value) {
//                 if (currNode.right == null) currNode.right = nnode;
//                 else currNode = currNode.right;
//             }
//         }
//     }
    
//     findNode(value) {
//         let currNode = this.root;
//         while (true) {
//             if (value < currNode.value) currNode = currNode.left;
//             if (value > currNode.value) currNode = currNode.right;
//             if (value == currNode.value) return currNode.value;
//             if (currNode.left == null || currNode.right == null) return null;
//         }
//     }

//     allowedMoves() {
//         let board = currBord;
//         const moves = {}; // key = position of a piece, value = array of possible positions for that piece
//         for (let i=0; i<8; i++) {
//             for (let j=0; j<8; j++) {
//                 var checker = board[i][j];
//                 if (this.turn == 0) {
//                     if (i == 0) {
//                         let southeast = board[i+1][j+1];
//                         let directions = [];
//                         directions.push(southeast);
//                         if (j == 0) {
//                             moves.board[i][j] = directions;
//                             continue;
//                         }
//                         let southwest = board[i-1][j+1];
//                         directions.push(southwest);
//                         moves.board[i][j] = directions;
//                     }
//                     else if (i == 7) {
//                         let southwest = board[i-1][j+1];
//                         let directions = [];
//                         directions.push(southwest);
//                         if (j == 0) {
//                             moves.board[i][j] = directions;
//                             continue;
//                         }
//                         let northwest = board[i-1][j-1];
//                         directions.push(northwest);
//                         moves.board[i][j] = directions;
//                     }
//                     else if (j == 7) {
//                         let northeast = board[i+1][j-1];
//                         let directions = [];
//                         directions.push(northeast);
                        
//                         if (i == 0) {
//                             moves.board[i][j] = directions;
//                             continue;
//                         }
//                         let northwest = board[i-1][j-1];
//                         directions.push(northwest);
//                         moves.board[i][j] = directions;
//                     }
//                     else if (i == 7 & j == 7) {
//                         let northwest = board[i-1][j-1];
//                         let directions = [];
//                         directions.push(northwest);
//                         moves.board[i][j] = directions;
//                     }
//                     else {
//                         let northwest = board[i-1][j-1];
//                         let northeast = board[i+1][j-1];
//                         let southwest = board[i-1][j+1];
//                         let southeast = board[i+1][j+1];
//                         let directions = [];
//                         directions.push(northwest);
//                         directions.push(northeast);
//                         directions.push(southwest);
//                         directions.push(southeast);
//                         moves.board[i][j] = directions;
//                     }
//                 }
//             }
//         }
//         return moves;
//     }

//     update() {
//         return currBord;
//     }

//     move() {
//         let movesList = this.allowedMoves();
//         const futureMoves = {};
//         for (const [key, value] of Object.entries(movesList)) {
//             futureMoves.movesList.value = `${value}`;
//         }
//         return futureMoves;
//     }

// }


// function TreeSearch(currState) { 
//     let state = document.getElementsByName(currBord);
//     var TS = new Tree(state, 0);
//     const root = new Node(state);
//     TS.addNode(root);
//     var moves = TS.move();
// }