
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


the_checker = w_checker;



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




