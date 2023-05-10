
var square_class = document.getElementsByClassName("square");
var white_checker_class = document.getElementsByClassName("white_checker");
var black_checker_class = document.getElementsByClassName("black_checker");
var table = document.getElementById("table");
var score = document.getElementById("score");
var black_background = document.getElementById("black_background");
var moveSound = document.getElementById("moveSound");
var winSound = document.getElementById("winSound");
var slectedChecker = null;
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
    this.ocupied = false;
    this.pieceId = undefined;
    // this.id.onclick = function () {
    //     makeMove(index);
    // }
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
    //this.id.onclick = function () {
    //    showMoves(piece);            commneted out becouse showMoves not yet defined yet
    //}
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
    if (this.coordY === 8 && !this.king && this.color === "white") {
        this.king = true;
        this.id.style.border = "4px solid #FFFF00";
    }
    if (this.coordY === 1 && !this.king && this.color === "black") {
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

var currBord = [[],[],[],[],[],[],[],[]];//list contains the board with cowardnits x0-7, y0-7
for(var i=0; i<8; i++){
    for(var j=0; j<8; j++){
        sq = document.getElementById("SQ" + (i*8+j+1));
        sq.X = j;
        sq.Y = i;
        currBord[j][i] = sq;
    }

}
var checkerNumber = 1;//not used after for loop
for(var i=0; i<3; i++){
    for(var j=0; j<4; j++){
        document.getElementById("W" + checkerNumber).king = false;
        document.getElementById("B" + checkerNumber).king = false;
        currBord[j*2+(i%2)][i].peice = document.getElementById("W" + checkerNumber);
        document.getElementById("W" + checkerNumber).X = j*2+(i%2);
        document.getElementById("W" + checkerNumber).Y = i;
        currBord[j*2+((i+1)%2)][i+5].peice = document.getElementById("B" + checkerNumber);
        document.getElementById("B" + checkerNumber).X = j*2+((i+1)%2);
        document.getElementById("B" + checkerNumber).Y = i+5;
        checkerNumber++
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

var dragingPeice = null;//equal to the peice that user is currently dragging

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

moveList = [];

function makeAImove(){
    moveList = [];
    var idList = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];
    var id;
    var check;
    for (let k=0; k<idList.length; k++) {
        id = idList[k];
        check = document.getElementById(id);
        if(check.X+1 <= 7 && check.X-1 >= 0 && check.Y+1 <=7 && check.style.display != "none"){
            if(currBord[check.X+1][check.Y+1].peice == null){
                moveList.push({peice:check, toX:check.X+1, toY:check.Y+1, to:currBord[check.X+1][check.Y+1]});
            }
        }
    }
    moveList = [moveList[0]];
    let movedPeice = moveList[0].peice;
    makeAMove();
    movedPeice.style.left = (((movedPeice.X) * 80)+8) + "px"; //move peice to center of SQ 
    movedPeice.style.top = (((movedPeice.Y)*80)+8) + "px";
}
currTurn = "Black";
//runs when the move button is pressed, 
//if move is valid, updates peice.x, peice.y the currbord, takes taken peices, and makes peice a king if nessesary
function makeAMove(){
    if(moveList.length == 0){
        resetMove();
        return;
    }
    else{
        if(moveList.length == 1){
            let oneMove = moveList[0];
            if(currBord[oneMove.toX][oneMove.toY].peice == null){
                if(currTurn == "Black"){
                    if(oneMove.peice.id[0] == "B"){
                        if(oneMove.peice.isKing){
                            if((oneMove.toX == oneMove.peice.X+1 || oneMove.peice.X-1 == oneMove.toX)&&(oneMove.toY==oneMove.peice.Y+1||oneMove.toY == oneMove.peice.Y-1)){
                                console.log("move made King black");
                                currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                oneMove.peice.X = oneMove.toX;
                                oneMove.peice.Y = oneMove.toY;
                                currTurn = "White";
                                document.getElementById("turn-color").textContent = "Red";
                                moveList = [];
                                
                                
                            }
                            else{
                                if(((oneMove.toX == oneMove.peice.X+2)&&(oneMove.toY==oneMove.peice.Y-2)&&(currBord[oneMove.peice.X+1][oneMove.peice.Y-1].peice.id[0] == "W"))){
                                    currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                    currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                    takenPice = currBord[oneMove.peice.X+1][oneMove.peice.Y-1].peice;
                                    currBord[oneMove.peice.X+1][oneMove.peice.Y-1].peice = null;
                                    oneMove.peice.X = oneMove.toX;
                                    oneMove.peice.Y = oneMove.toY;
                                    takenPice.style.display = 'none';
                                    currTurn = "White";
                                    document.getElementById("turn-color").textContent = "Red";
                                    moveList = [];
    
                                }
                                else if((oneMove.toX == oneMove.peice.X-2)&&(oneMove.toY==oneMove.peice.Y+2)&&(currBord[oneMove.peice.X-1][oneMove.peice.Y+1].peice.id[0] == "W")){
                                    currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                    currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                    takenPice = currBord[oneMove.peice.X-1][oneMove.peice.Y+1].peice;
                                    currBord[oneMove.peice.X-1][oneMove.peice.Y+1].peice = null;
                                    oneMove.peice.X = oneMove.toX;
                                    oneMove.peice.Y = oneMove.toY;
                                    takenPice.style.display = 'none';
                                    currTurn = "White";
                                    moveList = [];

                                }
                                else if(((oneMove.toX == oneMove.peice.X+2)&&(oneMove.toY==oneMove.peice.Y+2)&&(currBord[oneMove.peice.X+1][oneMove.peice.Y+1].peice.id[0] == "W"))){
                                    currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                    currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                    takenPice = currBord[oneMove.peice.X+1][oneMove.peice.Y+1].peice;
                                    currBord[oneMove.peice.X+1][oneMove.peice.Y+1].peice = null;
                                    oneMove.peice.X = oneMove.toX;
                                    oneMove.peice.Y = oneMove.toY;
                                    takenPice.style.display = 'none';
                                    currTurn = "White";
                                    document.getElementById("turn-color").textContent = "Red";
                                    moveList = [];

                                }
                                else if(((oneMove.toX == oneMove.peice.X-2)&&(oneMove.toY==oneMove.peice.Y-2)&&(currBord[oneMove.peice.X-1][oneMove.peice.Y-1].peice.id[0] == "W"))){
                                    currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                    currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                    takenPice = currBord[oneMove.peice.X-1][oneMove.peice.Y-1].peice;
                                    currBord[oneMove.peice.X-1][oneMove.peice.Y-1].peice = null;
                                    oneMove.peice.X = oneMove.toX;
                                    oneMove.peice.Y = oneMove.toY;
                                    takenPice.style.display = 'none';
                                    currTurn = "White";
                                    document.getElementById("turn-color").textContent = "Red";
                                    moveList = [];

                                }
                                else{
                                    console.log("move not vallid 1");
                                    resetMove();
                                    return;
                                }
                    
                            }
                        }
                        else{
                            if((oneMove.toX==oneMove.peice.X+1 || oneMove.peice.X -1==oneMove.toX)&&(oneMove.toY == oneMove.peice.Y-1)){
                                console.log("made move black non-king");
                                currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                if(oneMove.toY == 0){
                                    oneMove.peice.isKing = true;//here add the code for making a peice a king
                                    oneMove.peice.style.border = "4px solid #FFFF00";
                                }
                                oneMove.peice.X = oneMove.toX;
                                oneMove.peice.Y = oneMove.toY;
                                currTurn = "White";
                                document.getElementById("turn-color").textContent = "Red";
                                moveList = [];

                            }
                            else{
                                if(((oneMove.toX == oneMove.peice.X+2)&&(oneMove.toY==oneMove.peice.Y-2)&&(currBord[oneMove.peice.X+1][oneMove.peice.Y-1].peice.id[0] == "W"))){
                                    console.log("jumped left");
                                    if(oneMove.toY == 0){
                                        oneMove.peice.isKing = true;//here add the code for making a peice a king
                                        oneMove.peice.style.border = "4px solid #FFFF00";
                                    }
                                        currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                    currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                    takenPice = currBord[oneMove.toX-1][oneMove.toY+1].peice;
                                    currBord[oneMove.toX-1][oneMove.toY+1].peice = null;
                                    oneMove.peice.X = oneMove.toX;
                                    oneMove.peice.Y = oneMove.toY;
                                    takenPice.style.display = "none";
                                    currTurn = "White";
                                    document.getElementById("turn-color").textContent = "Red";
                                    moveList = [];
    
                                }
                                else if(((oneMove.toX == oneMove.peice.X-2)&&(oneMove.toY==oneMove.peice.Y-2)&&(currBord[oneMove.peice.X-1][oneMove.peice.Y-1].peice.id[0] == "W"))){
                                    console.log("Black jumped right");
                                    if(oneMove.toY == 0){
                                        oneMove.peice.isKing = true;//here add the code for making a peice a king
                                        oneMove.peice.style.border = "4px solid #FFFF00";
                                    }    
                                    currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                    currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                    takenPice = currBord[oneMove.peice.X-1][oneMove.peice.Y-1].peice;
                                    currBord[oneMove.peice.X-1][oneMove.peice.Y-1].peice = null;
                                    oneMove.peice.X = oneMove.toX;
                                    oneMove.peice.Y = oneMove.toY;
                                    takenPice.style.display = 'none';
                                    currTurn = "White";
                                    document.getElementById("turn-color").textContent = "Red";
                                    moveList = [];

                                }
                                else{
                                    console.log("move not vallid 2");
                                    resetMove()
                                    return;
                                }



                            }
                        }
                    }
                    else{
                        resetMove();
                        return;
                    }   
                }
                else if(currTurn == "White"){
                    console.log("It is AI's turn");
                    oneMove = moveList[0];
                    if(oneMove.peice.id[0] == "W"){
                        if(oneMove.peice.isKing){
                            if((oneMove.toX==oneMove.peice.X+1 || oneMove.peice.X -1==oneMove.toX)&&(oneMove.toY==oneMove.peice.Y+1||oneMove.toY == oneMove.peice.Y-1)){
                                //scussesfully made move
                                currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                oneMove.peice.X = oneMove.toX;
                                oneMove.peice.Y = oneMove.toY;
                                currTurn = "Black";
                                document.getElementById("turn-color").textContent = "Black";
                                moveList = [];
                                console.log("made move King wight");
                                
                            }
                            else{
                                if(((oneMove.toX == oneMove.peice.X+2)&&(oneMove.toY==oneMove.peice.Y-2)&&(currBord[oneMove.peice.X+1][oneMove.peice.Y-1].peice.id[0] == "B"))){
                                    currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                    currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                    takenPice = currBord[oneMove.peice.X+1][oneMove.peice.Y-1].peice;
                                    currBord[oneMove.peice.X+1][oneMove.peice.Y-1].peice = null;
                                    oneMove.peice.X = oneMove.toX;
                                    oneMove.peice.Y = oneMove.toY;
                                    takenPice.style.display = 'none';
                                    currTurn = "Black";
                                    document.getElementById("turn-color").textContent = "Black";
                                    moveList = [];
    
                                }
                                else if((oneMove.toX == oneMove.peice.X-2)&&(oneMove.toY==oneMove.peice.Y+2)&&(currBord[oneMove.peice.X-1][oneMove.peice.Y+1].peice.id[0] == "B")){
                                    currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                    currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                    takenPice = currBord[oneMove.peice.X-1][oneMove.peice.Y+1].peice;
                                    currBord[oneMove.peice.X-1][oneMove.peice.Y+1].peice = null;
                                    oneMove.peice.X = oneMove.toX;
                                    oneMove.peice.Y = oneMove.toY;
                                    takenPice.style.display = 'none';
                                    currTurn = "Black";
                                    document.getElementById("turn-color").textContent = "Black";
                                    moveList = [];

                                }
                                else if(((oneMove.toX == oneMove.peice.X+2)&&(oneMove.toY==oneMove.peice.Y+2)&&(currBord[oneMove.peice.X+1][oneMove.peice.Y+1].peice.id[0] == "B"))){
                                    currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                    currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                    takenPice = currBord[oneMove.peice.X+1][oneMove.peice.Y+1].peice;
                                    currBord[oneMove.peice.X+1][oneMove.peice.Y+1].peice = null;
                                    oneMove.peice.X = oneMove.toX;
                                    oneMove.peice.Y = oneMove.toY;
                                    takenPice.style.display = 'none';
                                    currTurn = "Black";
                                    document.getElementById("turn-color").textContent = "Black";
                                    moveList = [];

                                }
                                else if(((oneMove.toX == oneMove.peice.X-2)&&(oneMove.toY==oneMove.peice.Y-2)&&(currBord[oneMove.peice.X-1][oneMove.peice.Y-1].peice.id[0] == "B"))){
                                    currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                    currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                    takenPice = currBord[oneMove.peice.X-1][oneMove.peice.Y-1].peice;
                                    currBord[oneMove.peice.X-1][oneMove.peice.Y-1].peice = null;
                                    oneMove.peice.X = oneMove.toX;
                                    oneMove.peice.Y = oneMove.toY;
                                    takenPice.style.display = 'none';
                                    currTurn = "Black";
                                    document.getElementById("turn-color").textContent = "Black";
                                    moveList = [];

                                }
                                else{
                                    console.log("move not vallid 3");
                                    resetMove();
                                    return;
                                }
                    

                            }
                        }
                        else{
                            if((oneMove.toX==oneMove.peice.X+1 || oneMove.toX==oneMove.peice.X-1)&&(oneMove.toY==oneMove.peice.Y+1)){
                                //scussesfull, to do
                                console.log("made move non-king wight");
                                currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                if(oneMove.toY == 7){
                                    oneMove.peice.isKing = true;//here add the code for making a peice a king
                                    oneMove.peice.style.border = "4px solid #FFFF00";
                                }
                                oneMove.peice.X = oneMove.toX;
                                oneMove.peice.Y = oneMove.toY;
                                moveList = [];
                                currTurn = "Black";
                                document.getElementById("turn-color").textContent = "Black";
                            }
                            else{
                                if(((oneMove.toX == oneMove.peice.X+2)&&(oneMove.toY==oneMove.peice.Y+2)&&(currBord[oneMove.peice.X+1][oneMove.peice.Y+1].peice.id[0] == "B"))){
                                    console.log("whight took to the right");
                                    if(oneMove.toY == 7){
                                        oneMove.peice.isKing = true;//here add code for making a peice a king
                                        oneMove.peice.style.border = "4px solid #FFFF00";
                                    }
                                    currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                    currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                    takenPice = currBord[oneMove.peice.X+1][oneMove.peice.Y+1].peice;
                                    currBord[oneMove.peice.X+1][oneMove.peice.Y+1].peice = null;
                                    oneMove.peice.X = oneMove.toX;
                                    oneMove.peice.Y = oneMove.toY;
                                    takenPice.style.display = 'none';
                                    currTurn = "Black";
                                    document.getElementById("turn-color").textContent = "Black";
                                    moveList = [];
    
                                }
                                else if(((oneMove.toX == oneMove.peice.X-2)&&(oneMove.toY==oneMove.peice.Y+2)&&(currBord[oneMove.peice.X-1][oneMove.peice.Y+1].peice.id[0] == "B"))){
                                    console.log("white took to left");
                                    if(oneMove.toY == 7){
                                        oneMove.peice.isKing = true;//here add code for making a peice a king
                                        oneMove.peice.style.border = "4px solid #FFFF00";
                                    }
                                    currBord[oneMove.peice.X][oneMove.peice.Y].peice = null;
                                    currBord[oneMove.toX][oneMove.toY].peice = oneMove.peice;
                                    takenPice = currBord[oneMove.peice.X-1][oneMove.peice.Y+1].peice;
                                    currBord[oneMove.peice.X-1][oneMove.peice.Y+1].peice = null;
                                    oneMove.peice.X = oneMove.toX;
                                    oneMove.peice.Y = oneMove.toY;
                                    takenPice.style.display = 'none';
                                    currTurn = "Black";
                                    document.getElementById("turn-color").textContent = "Black";
                                    moveList = [];

                                }
                                else{
                                    resetMove();
                                    console.log("move not vallid 4");
                                    return;
                                }
                            }
                        }
                    }
                    else{
                        console.log("its not your turn2");
                        resetMove();
                        return;
                    }
                }
            }
            else{
                console.log("squair occupied");
                resetMove();
                return;
            }
        }
        else{
            if(moveList.length > 1){
                peiceMoved = moveList[0].peice;
                postMoveX = peiceMoved.X;
                postMoveY = peiceMoved.Y;
                movingColor = peiceMoved.id[0];
                if(movingColor == 'W'){
                    movingColor = "White";
                    notMovingColor = "Black";
                }
                else if(movingColor == 'B'){
                    movingColor = "Black";
                    notMovingColor = "White";
                }
                if(movingColor != currTurn){
                    console.log("Its not your turn 1");
                    return;
                }
                madeKing = false;
                moveValid = true;
                peicesTaken = [];
                for(let i=0; (i<moveList.length)&&moveValid; i++){
                    move = moveList[i];
                    if(move.peice.id == peiceMoved.id){
                        preMoveX = postMoveX;
                        preMoveY = postMoveY;
                        postMoveX = move.toX;
                        postMoveY = move.toY;
                        if(peiceMoved.isKing){
                            if((preMoveX==postMoveX+2) && (preMoveY==postMoveY+2) && (currBord[preMoveX+1][preMoveY+1].peice.id[0] == notMovingColor[0]) && (currBord[postMoveX][postMoveY].peice==null)){
                                peicesTaken[i] = currBord[preMoveX+1][preMoveY+1].peice;
                            }
                            else if((preMoveX==postMoveX-2) && (preMoveY==postMoveY+2) && (currBord[preMoveX-1][preMoveY+1].peice.id[0] == notMovingColor[0])  && (currBord[postMoveX][postMoveY].peice==null)){
                                peicesTaken[i] = currBord[preMoveX-1][preMoveY+1].peice;
                            }
                            else if((preMoveX==postMoveX+2) && (preMoveY==postMoveY-2) && (currBord[preMoveX+1][preMoveY-1].peice.id[0] == notMovingColor[0])  && (currBord[postMoveX][postMoveY].peice==null)){
                                peicesTaken[i] = currBord[preMoveX+1][preMoveY-1].peice;
                            }
                            else if((preMoveX==postMoveX-2) && (preMoveY==postMoveY-2) && (currBord[preMoveX-1][preMoveY-1].peice.id[0] == notMovingColor[0]) && (currBord[postMoveX][postMoveY].peice==null)){
                                peicesTaken[i] = currBord[preMoveX-1][preMoveY-1].peice;
                            }
                            else{
                                moveValid = false
                            }
                        }
                        else{
                            if(movingColor == "White"){
                                if(preMoveY+2==postMoveY && preMoveX-2==postMoveX){
                                    if(currBord[preMoveX-1][preMoveY+1].peice.id[0] == notMovingColor[0]  && (currBord[postMoveX][postMoveY].peice==null)){
                                        peicesTaken[i] = currBord[preMoveX-1][preMoveY+1].peice;
                                        if(postMoveY == 7){
                                            madeKing = true;
                                            peiceMoved.isKing = true;
                                        }
                                    }
                                    else{
                                        console.log("invalid move, no peice to take");
                                        moveValid = false;                                    }
                                }
                                else if((preMoveY+2==postMoveY)&&(preMoveX+2 == postMoveX)){
                                    if(currBord[preMoveX+1][preMoveY+1].peice.id[0] == notMovingColor[0]  && (currBord[postMoveX][postMoveY].peice==null)){
                                        peicesTaken[i] = currBord[preMoveX+1][preMoveY+1].peice;
                                        if(postMoveY == 7){
                                            madeKing = true;
                                            peiceMoved.isKing = true;
                                        }
                                    }
                                    else{
                                        console.log("invalid move, no peice to take");
                                        moveValid = false;                                    }
                                }
                                else{
                                    moveValid = false;
                                }
    
                            }
                            else if(movingColor == "Black"){
                                if(preMoveY-2==postMoveY && preMoveX-2==postMoveX){
                                    if((currBord[preMoveX-1][preMoveY-1].peice.id[0] == notMovingColor[0])  && (currBord[postMoveX][postMoveY].peice==null)){
                                        peicesTaken[i] = currBord[preMoveX-1][preMoveY-1].peice;
                                        if(postMoveY == 7){
                                            madeKing = true;
                                            peiceMoved.isKing = true;
                                        }
                                    }
                                    else{
                                        console.log("invalid move, no peice to take");
                                        moveValid = false;                                    }
                                }
                                else if((preMoveY-2==postMoveY)&&(preMoveX+2 == postMoveX)){
                                    if((currBord[preMoveX+1][preMoveY-1].peice.id[0] == notMovingColor[0])  && (currBord[postMoveX][postMoveY].peice==null)){
                                        peicesTaken[i] = currBord[preMoveX+1][preMoveY-1].peice;
                                        if(postMoveY == 0){
                                            madeKing = true;
                                            peiceMoved.isKing = true;
                                        }
                                    }
                                    else{
                                        console.log("invalid move, no peice to take");
                                        moveValid = false;                                    
                                    }
                                }
                                else{
                                    console.log("you cannot go there");
                                    moveValid = false;
                                }
                            }
                        }
                    }
                    else{
                        console.log("tried moving multable peices in one turn");
                        moveValid = false;
                    }
                }
                if(moveValid){
                    for(let j=0; j<peicesTaken.length;j++){
                        peiceTaken = peicesTaken[j];
                        peiceTaken.style.display = 'none';
                        currBord[peiceTaken.X][peiceTaken.Y].peice = null;
                    }
                    if(madeKing){
                        //here add code for making peice a king, the peice is in peiceMoved varable
                        peiceMoved.style.border = "4px solid #FFFF00";
                    }
                    currBord[peiceMoved.X][peiceMoved.Y].peice = null;
                    currBord[postMoveX][postMoveY].peice = peiceMoved;
                    console.log("debugging info");
                    console.log(currTurn);
                    currTurn = notMovingColor;
                    if(notMovingColor == "Black"){
                        document.getElementById("turn-color").textContent = "Black";
                    }
                    else{
                        document.getElementById("turn-color").textContent = "Red";
                    }
                    console.log(notMovingColor);
                    console.log(movingColor);
                    peiceMoved.X = postMoveX;
                    peiceMoved.Y = postMoveY;
                    moveList = [];
                    console.log("jumped multable peices");
                    return;
                }
                else{
                    if(madeKing){
                        peiceMoved.isKing = false;
                    }
                    resetMove();
                    console.log("move made was not a vallid Move");
                    return;
                }
            }
            else{
                console.log("Impossable state reached 1");
            }
        }
    }
}

function resetMove(){
    moveList = [];
    let currPeice = null;
    let currSpace = null;
    let spaceID = null;
    for(let xval=0; xval<8; xval++){
        for(let yval=0;yval<8; yval++){
            currSpace = currBord[xval][yval];
            currPeice = currSpace.peice;
            idLength = currSpace.id.length
            spaceID = Number(currSpace.id.substring(2, idLength));
            if(currPeice != null){
                currPeice.style.left = ((((spaceID-1)%8) * 80)+8) + "px";
                currPeice.style.top = ((((spaceID - ((spaceID-1)%8))/8)*80)) + "px";
            }
        }
    }
}


document.getElementsByTagName("BODY")[0].onresize = function () {

    getDimension();
    var cpy_bigScreen = bigScreen;

    if (windowWidth < 650) {
        moveLength = 50;
        moveDeviation = 6;
        if (bigScreen === 1) bigScreen = -1;
    }
    if (windowWidth > 650) {
        moveLength = 80;
        moveDeviation = 10;
        if (bigScreen === -1) bigScreen = 1;
    }

    if (bigScreen != cpy_bigScreen) {
        for (var i = 1; i <= 12; i++) {
            b_checker[i].setCoord(0, 0);
            w_checker[i].setCoord(0, 0);
        }
    }
}




