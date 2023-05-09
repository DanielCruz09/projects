var square_class = document.getElementsByClassName("square");
var white_checker_class = document.getElementsByClassName("white_checker");
var black_checker_class = document.getElementsByClassName("black_checker");
var table = document.getElementById("table");
var score = document.getElementById("score");
var black_background = document.getElementById("black_background");
var moveSound = document.getElementById("moveSound");
var winSound = document.getElementById("winSound");
var windowHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;;
var windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
var Dimension = 1;
var selectedPiece, selectedPieceindex;
var upRight, upLeft, downLeft, downRight;
var contor = 0, gameOver = 0;
var bigScreen = 1;

var block = [];
var w_checker = [];
var b_checker = [];



getDimension();
if (windowWidth > 640) {
    moveLength = 80;
    moveDeviation = 10;
}
else {
    moveLength = 50;
    moveDeviation = 6;
}



var square_p = function (square, index) {
    this.id = square;
    this.ocupied = false;
    this.pieceId = undefined;
    this.id.onclick = function () {
        makeMove(index);
    }
}

var checker = function (piece, color, square) {
    this.id = piece;
    this.color = color;
    this.king = false;
    this.ocupied_square = square;
    this.alive = true;
    this.attack = false;
    if (square % 8) {
        this.coordX = square % 8;
        this.coordY = Math.floor(square / 8) + 1;
    }
    else {
        this.coordX = 8;
        this.coordY = square / 8;
    }
    this.id.onclick = function () {
        showMoves(piece);
    }
}

checker.prototype.setCoord = function (X, Y) {
    var x = (this.coordX - 1) * moveLength + moveDeviation;
    var y = (this.coordY - 1) * moveLength + moveDeviation;
    this.id.style.top = y + 'px';
    this.id.style.left = x + 'px';
}

checker.prototype.changeCoord = function (X, Y) {
    this.coordY += Y;
    this.coordX += X;
}

checker.prototype.checkIfKing = function () {
    if (this.coordY == 8 && !this.king && this.color == "white") {
        this.king = true;
        this.id.style.border = "4px solid #FFFF00";
    }
    if (this.coordY == 1 && !this.king && this.color == "black") {
        this.king = true;
        this.id.style.border = "4px solid #FFFF00";
    }
}

checker.prototype.isEmpty = function(x, y) {
    let pos = currBord[x][y].piece;
    if (pos == null) return true;
    return false;
}

checker.prototype.capture = function(oldx, oldy, newx, newy) {
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

var currBord = [[],[],[],[],[],[],[],[]];//list contains the board with cowardnits x0-7, y0-7
for(let i=0; i<8; i++){
    for(var j=0; j<8; j++){
        sq = document.getElementById("SQ" + (i*8+j+1));
        sq.X = j;
        sq.Y = i;
        currBord[j][i] = sq;
    }

}

the_checker = w_checker;
var xofset = document.getElementById("SQ1").getBoundingClientRect().left; //these are the distence from the edge of screen to the board
var yofset = document.getElementById("SQ1").getBoundingClientRect().top;
var moveList = [];//this is a list of the moves that the player wants to make. sence multable moves happen durring a jump, this 
//is cumulitive
var currTurn = "Black";


function getDimension() {
    contor++;
    windowHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;;
    windowWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
}




document.getElementsByTagName("BODY")[0].onresize = function () {

    getDimension();
    var cpy_bigScreen = bigScreen;

    if (windowWidth < 650) {
        moveLength = 50;
        moveDeviation = 6;
        if (bigScreen == 1) bigScreen = -1;
    }
    if (windowWidth > 650) {
        moveLength = 80;
        moveDeviation = 10;
        if (bigScreen == -1) bigScreen = 1;
    }

    if (bigScreen != cpy_bigScreen) {
        for (var i = 1; i <= 12; i++) {
            b_checker[i].setCoord(0, 0);
            w_checker[i].setCoord(0, 0);
        }
    }
}

var dragingPeice = null;

function inSquair(x, y,){//If element is in a squair, returns that squair. oatherwise returns false.
    
    if(((x > xofset) &&(x < xofset+640))&&((y > yofset)&&(y < yofset+640))){
        let idNumber = (((x - xofset) - (x - xofset)%80)/80) + ((((y - yofset) - (y - yofset)%80)/80)*8) + 1;
        return idNumber;
    }
    else{
        return false;
    }
}

function makeMovable(idList){ //this function needs to run once to make an object movable
    let id;
    for(let i=0; i<idList.length; i++){
        id = idList[i];
        let checker = document.getElementById(id);
        checker.style.position = "absolute"; //I beleave this makes the position an absolute x,y value
        checker.onmousedown = function(){ //this adds a finction that happnes when peice is clicked
            dragingPeice = checker;//the peice that is currently being dragged
        }
    }
}

document.onmouseup = function(e){//when you relese your mouse, stop dragging
    let currpeice = dragingPeice;
    dragingPeice = null;
    if(currpeice != null){
        let x = e.pageX;
        let y = e.pageY;
        let endingSquair = inSquair(x, y);
        if(endingSquair != false){
            currpeice.style.left = ((((endingSquair-1)%8) * 80)+8) + "px"; //move peice to center of SQ 
            currpeice.style.top = ((((endingSquair - ((endingSquair-1)%8))/8)*80)) + "px";
            moveList.push({peice:currpeice, to:endingSquair, toX: (endingSquair-1)%8, toY: (((endingSquair-1) - ((endingSquair-1)%8))/8)});
        }
        dragingPeice = null;
    }
}

document.onmousemove = function(e){//function runs whenever mouse moves
    if(dragingPeice != null){
        var x = e.pageX;
        var y = e.pageY;
        dragingPeice.style.left = (x - xofset - 27) + "px";
        dragingPeice.style.top = (y - yofset - 27) + "px";
    }
}

function move() {
    for (let i=0; i<64; i++) {
        for (let j=0; j<64; j++) {
            var chosenChecker = currBord[i][j].piece;
            var nextMoves = chosenChecker.getAllowedMoves(i,j);
            if (length != 0) chosenChecker.setCoord(nextMoves[0]);
        }
    }
}