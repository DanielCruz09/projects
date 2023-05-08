// This file contains the functions that determine the actions of the AI

var length = 0;

checker.prototype.isEmpty = function(x, y) {
    let pos = currBord[x][y].piece;
    if (pos == null) return true;
    return false;
}

checker.prototype.capture() = function(oldx, oldy, newx, newy) {
    let currentChecker = currBord[oldx][oldy].piece;
    let target = currBord[newx][newy].piece;
    currentChecker.setCoord(newx, newy);
    target = null;
}

checker.prototype.getAllowedMoves = function (x,y) {
        var board = currBord;
        var southeast = board[x+1][y+1];
        var southwest = board[x-1][y+1];
        var directions = [];
        if (this.color == "white") {
            if (this.isEmpty(x+1,y+1)) {
                directions.push(southeast);
                length++;
            }
            else this.capture(x+1,y+1,x+2,y+2);
            if (this.isEmpty(x-1,y+1)) {
                directions.push(southwest);
                length++;
            }
            else this.capture(x-1,y+1,x-2,y+2);
        }
        return directions;
    }

function init() {
    for (var i = 1; i <= 64; i++)
        block[i] = new square_p(square_class[i], i);

    for (var i = 1; i <= 4; i++) {
        w_checker[i] = new checker(white_checker_class[i], "white", 2 * i - 1);
        w_checker[i].setCoord(0, 0);
        block[2 * i - 1].ocupied = true;
        block[2 * i - 1].pieceId = w_checker[i];
    }

    for (var i = 5; i <= 8; i++) {
        w_checker[i] = new checker(white_checker_class[i], "white", 2 * i);
        w_checker[i].setCoord(0, 0);
        block[2 * i].ocupied = true;
        block[2 * i].pieceId = w_checker[i];
    }

    for (var i = 9; i <= 12; i++) {
        w_checker[i] = new checker(white_checker_class[i], "white", 2 * i - 1);
        w_checker[i].setCoord(0, 0);
        block[2 * i - 1].ocupied = true;
        block[2 * i - 1].pieceId = w_checker[i];
    }


    for (var i = 1; i <= 4; i++) {
        b_checker[i] = new checker(black_checker_class[i], "black", 56 + 2 * i);
        b_checker[i].setCoord(0, 0);
        block[56 + 2 * i].ocupied = true;
        block[56 + 2 * i].pieceId = b_checker[i];
    }

    for (var i = 5; i <= 8; i++) {
        b_checker[i] = new checker(black_checker_class[i], "black", 40 + 2 * i - 1);
        b_checker[i].setCoord(0, 0);
        block[40 + 2 * i - 1].ocupied = true;
        block[40 + 2 * i - 1].pieceId = b_checker[i];
    }

    for (var i = 9; i <= 12; i++) {
        b_checker[i] = new checker(black_checker_class[i], "black", 24 + 2 * i);
        b_checker[i].setCoord(0, 0);
        block[24 + 2 * i].ocupied = true;
        block[24 + 2 * i].pieceId = b_checker[i];
    }

}

function move() {
    init();
    for (let i=0; i<64; i++) {
        for (let j=0; j<64; j++) {
            var chosenChecker = currBord[i][j].piece;
            var nextMoves = chosenChecker.getAllowedMoves(i,j);
            if (length != 0) {
                chosenChecker.setCoord(nextMoves[0]);
            }
        }
    }
}

// Alternate implementation for getAllowedMoves:
// const moves = {}; // key = position of a piece, value = array of possible positions for that piece
        // for (let i=0; i<8; i++) {
        //     for (let j=0; j<8; j++) {
        //         var southeast = board[i+1][j+1];
        //         var southwest = board[i-1][j+1];
        //         var northwest = board[i-1][j-1];
        //         var northeast = board[i+1][j-1];
        //         var directions = [];
        //         if (this.color == "white" & this.isEmpty(i+1,j+1) & this.isEmpty(i-1,j+1) & this.isEmpty(i-1,j-1) & this.isEmpty(i+1,j-1)) {
        //             if (i == 0) {
        //                 directions.push(southeast);
        //                 if (j == 0) {
        //                     moves.board[i][j] = directions;
        //                     continue;
        //                 }
        //                 directions.push(southwest);
        //                 moves.board[i][j] = directions;
        //             }
        //             else if (i == 7) {
        //                 directions.push(southwest);
        //                 if (j == 0) {
        //                     moves.board[i][j] = directions;
        //                     continue;
        //                 }
        //                 directions.push(northwest);
        //                 moves.board[i][j] = directions;
        //             }
        //             else if (j == 7) {
        //                 directions.push(northeast);
                        
        //                 if (i == 0) {
        //                     moves.board[i][j] = directions;
        //                     continue;
        //                 }
        //                 directions.push(northwest);
        //                 moves.board[i][j] = directions;
        //             }
        //             else if (i == 7 & j == 7) {
        //                 directions.push(northwest);
        //                 moves.board[i][j] = directions;
        //             }
        //             else {
        //                 directions.push(northwest);
        //                 directions.push(northeast);
        //                 directions.push(southwest);
        //                 directions.push(southeast);
        //                 moves.board[i][j] = directions;
        //             }
        //         }
        //         var randNum = Math.floor(Math.random() * 100);
        //         if (this.color == "white" & !this.isEmpty(i+1,j+1)) {
        //             // Capture is possible, move to the square diagonally
        //             // only capture if the random number is greater than 50
        //             if (randNum > 50) this.capture(i+1,j+1,i+2,j+2);
        //         }
        //         if (this.color == "white" & !this.isEmpty(i-1,j+1)) {
        //             if (randNum > 50) this.capture(i-1,j+1,i-2,j+2);
        //         }
        //         if (this.color == "white" & !this.isEmpty(i-1,j-1)) {
        //             if (randNum > 50) this.capture(i-1,j-1,i-2,j-2);
        //         }
        //         if (this.color == "white" & !this.isEmpty(i+1,j-1)) {
        //             if (randNum > 50) this.capture(i+1,j-1,i+2,j-2);
        //         }
        //     }
        // }