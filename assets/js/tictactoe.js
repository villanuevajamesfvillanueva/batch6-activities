let history = [
    [
        [1,  2,  3,],
        [4,  5,  6,],
        [7,  8,  9,],
    ]
];
let board = [
    [1,  2,  3,],
    [4,  5,  6,],
    [7,  8,  9,],
];


var turn;
var scoreX = 0;
var scoreO = 0;



//default printing main game board
//can accept history indeces to print board histories
let printBoard = () => {
    let boardDiv = document.getElementById("board");
    var output = "";
    for (let i = 0; i < 3; i++) {
        output += `<div class="row">`;
        for (let j = 0; j < 3; j++) {
            var diag = "";
            if (i === j){
                diag += "diag1";
            }

            if (i + j == 2){
                diag += " diag2";
            }
            output += `<div class="cell clickable pointer col${j} ${diag}" id="${i},${j}" onclick="playerMove(this.id)">${board[i][j]}</div>`;
        }
        output += "</div>";
    }
    boardDiv.innerHTML = output;
}
printBoard();


function playerMove(cell) {
    let target = document.getElementById(cell);
    //extracting coords of target cell, returns an array of length = 2
    let index = target.id.match(/\d+/g).map(Number);
    // console.log(`clicked ${cell}`);
    // console.log(target);
    if (turn === 1) {
        target.innerHTML = "X";
        board[index[0]][index[1]] = "X";
        playAudio(moveAudio);
    }
    else if (turn === 0) {
        target.innerHTML = "O";
        board[index[0]][index[1]] = "O";
        playAudio(moveAudio);
    }

    target.removeAttribute("onclick");
    target.classList.remove("clickable");
    target.classList.remove("pointer");

    if (detectWinner() || detectDraw()) {
        //disable clicks
        var cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.removeAttribute("onclick");
            cell.classList.remove("pointer");
        });

        //announce winner
        overlay2.classList.add("active");

        if (!detectWinner() && detectDraw()) {
            draw.style.transform = "translate(-50%, -50%) scale(1)";
            //put scores for both
        }
        else if (detectWinner()) {
            

            if (turn === 1) {
                xWinner.style.transform = "translate(-50%, -50%) scale(1)";
                scoreX++;
                playAudio(roundWinAudio);
                scoreXdisplay.innerHTML = scoreX;
                if (scoreX === 5) {
                    xGameWinner.style.transform = "translate(-50%, -50%) scale(1)";
                    //game over banner
                    gameoverContainer.firstElementChild.innerHTML = "GAME OVER";
                    playAudio(winAudio);

                    //reset button reloads window
                    document.getElementById("reset").onclick = function () {
                        window.location.reload();
                    }
                    chessAd();
                }
               
            }
            else if (turn === 0) {
                oWinner.style.transform = "translate(-50%, -50%) scale(1)";
                scoreO++;
                playAudio(roundWinAudio);
                scoreOdisplay.innerHTML = scoreO;
                if (scoreO === 5) {
                    oGameWinner.style.transform = "translate(-50%, -50%) scale(1)";
                    //game over banner
                    gameoverContainer.firstElementChild.innerHTML = "GAME OVER";
                    playAudio(winAudio);

                    //reset button reloads window
                    document.getElementById("reset").onclick = function () {
                        window.location.reload();
                    }
                    chessAd();
                }
            }
            
        }
        
        overlay2.onclick = function() { closeModal(); }
        //history can now be accessed
        //Previous and Next will show up
        showHistory();   
    }
    turn = 1 - turn;

    //deep copy
    let entry = JSON.parse(JSON.stringify(board));
    history.push(entry);
}



let highlightWinningCells = (cells) => {
    for (i = 0; i < 1; i++) {
        cells[i].style.background = "rgba(0, 0, 255, 0.3)";
        cells[i+1].style.background = "rgba(0, 0, 255, 0.3)";
        cells[i+2].style.background = "rgba(0, 0, 255, 0.3)";
    }
}


let detectWinner = () => {
//accessing rows
var rows = document.querySelectorAll(".row");
//accessing columns
var columnOne = document.querySelectorAll(".col0");
var columnTwo = document.querySelectorAll(".col1");
var columnThree = document.querySelectorAll(".col2");
//accessing diags
var diagOne = document.querySelectorAll(".diag1");
var diagTwo = document.querySelectorAll(".diag2");

    var winner = false;

    //checking rows
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 1; j++) {
            if ((rows[i].childNodes[j].innerHTML === rows[i].childNodes[j+1].innerHTML) && (rows[i].childNodes[j+1].innerHTML === rows[i].childNodes[j+2].innerHTML)) {
                console.log(`Uwian na may nanalo na (row${i+1})`);
                highlightWinningCells(rows[i].childNodes);
                winner = true;
                // return winner;
            }
        }
    }

    for (let j = 0; j < 1; j++) {
        //checking cols   
        if ((columnOne[j].innerHTML === columnOne[j+1].innerHTML) && (columnOne[j+1].innerHTML === columnOne[j+2].innerHTML)) {
            console.log("Uwian na may nanalo na (col1)");
            highlightWinningCells(columnOne);
            winner = true;
            // return winner;
        }

        if ((columnTwo[j].innerHTML === columnTwo[j+1].innerHTML) && (columnTwo[j+1].innerHTML === columnTwo[j+2].innerHTML)) {
            console.log("Uwian na may nanalo na (col2)");
            highlightWinningCells(columnTwo);
            winner = true;
            // return winner;
        }
        
        if ((columnThree[j].innerHTML === columnThree[j+1].innerHTML) && (columnThree[j+1].innerHTML === columnThree[j+2].innerHTML)) {
            console.log("Uwian na may nanalo na (col3)");
            highlightWinningCells(columnThree);
            winner = true;
            // return winner;
        }

        //checking diags
        if ((diagOne[j].innerHTML === diagOne[j+1].innerHTML) && (diagOne[j+1].innerHTML === diagOne[j+2].innerHTML)) {
            console.log("Uwian na may nanalo na (diag1)");
            highlightWinningCells(diagOne);
            winner = true;
            // return winner;
        }
        
        if ((diagTwo[j].innerHTML === diagTwo[j+1].innerHTML) && (diagTwo[j+1].innerHTML === diagTwo[j+2].innerHTML)) {
            console.log("Uwian na may nanalo na (diag2)");
            highlightWinningCells(diagTwo);
            winner = true;
            // return winner;
        }
        
    }
    return winner;  
}

let detectDraw = () => {
    var draw = false;
    var count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (typeof board[i][j] === "string") {
                count++;
            }
            if (count === 9) {
                draw = true;
                return draw;
            }
        }
    }
}

//activates when reset button is clicked
let clearHistory = () => {
    let boardDiv2 = document.getElementById("board");
    history.length = 1;
    board.length = 0;
    boardDiv2.innerHTML = "";
    board = [
        [1,  2,  3,],
        [4,  5,  6,],
        [7,  8,  9,],
    ];
    previous.style.transform = "scale(0)";
    next.style.transform = "scale(0)";
    
    printBoard();
}


var previous = document.getElementById("previous");
var next = document.getElementById("next");
var currentHistoryIndex;
let showHistory = () => {
    previous.style.transform = "scale(1)";
    next.style.transform = "scale(1)";
    currentHistoryIndex = history.length;
}
    
    previous.addEventListener("click", () => { 
        currentHistoryIndex--;
        if (currentHistoryIndex <= 0) {
            previous.classList.add("inactive");
            previous.disabled = true;
            currentHistoryIndex = 0;
        }
        if (currentHistoryIndex < history.length - 1) {
            next.classList.remove("inactive");
            next.disabled = false;
        }
        
        console.log(history[currentHistoryIndex]);
        updateBoard(history[currentHistoryIndex]);
        console.log("index: " + currentHistoryIndex);
        // console.log(previous); 
    });
    
    //bug report: after first round, next button is not automatically disabled
    next.addEventListener("click", () => {
        currentHistoryIndex++;
        if (currentHistoryIndex >= history.length - 1) {
            next.classList.add("inactive");
            next.disabled = true;
            currentHistoryIndex = history.length - 1;
        }
        if (currentHistoryIndex > 0) {
            previous.classList.remove("inactive");
            previous.disabled = false;
        }
        console.log(history[currentHistoryIndex]);
        updateBoard(history[currentHistoryIndex]);
        console.log("index: " + currentHistoryIndex);
        // console.log(next);
    });

    //bug report: when history is accessed and previous and next button are used,
    //the index changes depending on which item in the history the player is accessing.
    //the last know value of index gets carried over the next round when the history is reenabled
    //but gets updated immediately when previous and next button are pressed


let updateBoard = (entry) => {
    let boardDiv = document.getElementById("board");
    var output = "";
    for (let i = 0; i < 3; i++) {
        output += `<div class="row">`;
        for (let j = 0; j < 3; j++) {
            if (typeof entry[i][j] !== "string") {
                var classToUse = "clickable";
            }
            else {
                classToUse = "";
            }
            output += `<div class="cell ${classToUse}">${entry[i][j]}</div>`;
            // console.log(`${entry[i][j]}: ${typeof(entry[i][j])}`);
        }
        output += "</div>";
    }
    boardDiv.innerHTML = output;
}

//accessing X and O buttons at the start
var modal1 = document.getElementById("modal1");
var overlay1 = document.getElementById("overlay1");
var overlay2 = document.getElementById("overlay2");
var playerX = document.getElementById("buttonX");
var playerO= document.getElementById("buttonO");

var scoreXdisplay = document.getElementById("scoreX");
var scoreOdisplay = document.getElementById("scoreO");


var xWinner = document.getElementById("win-X");
var xGameWinner = document.getElementById("win-X-game");
var oWinner = document.getElementById("win-O");
var oGameWinner = document.getElementById("win-O-game");
var draw = document.getElementById("draw");

//closing the heck out of everything
let closeModal = () => {
    modal1.classList.remove("active");
    overlay1.classList.remove("active");
    overlay2.classList.remove("active");
    xWinner.style.transform = "translate(-50%, -50%) scale(0)";
    xGameWinner.style.transform = "translate(-50%, -50%) scale(0)"
    oWinner.style.transform = "translate(-50%, -50%) scale(0)";
    oGameWinner.style.transform = "translate(-50%, -50%) scale(0)"
    draw.style.transform = "translate(-50%, -50%) scale(0)";
    buildLog.style.transform = "translate(-50%, -50%) scale(0)";
  }

let closeAd = () => {
    chessAdMsg.style.transform = "scale(0)";
}

    playerX.addEventListener("click", () => {
        turn = 1;
        closeModal();
    });

    playerO.addEventListener("click", () => {
        turn = 0;
        closeModal();
    });


//cursor toggles between X and O for 2 human players
    //turn = 1: X
    //turn = 0: O
let mouseCursor = document.querySelector(".cursor");
window.addEventListener("mousemove", (e) => {
    mouseCursor.style.left = e.pageX + "px";
    mouseCursor.style.top = e.pageY + "px";
});

let gameboard = document.querySelector("#board");
gameboard.addEventListener("mouseover", () => {
    if (turn === 1) {
        mouseCursor.innerHTML = "X";
    }
    else if (turn === 0) {
        mouseCursor.innerHTML = "O";
    }
});
document.querySelector("#board").addEventListener("mouseleave", () => {
    mouseCursor.innerHTML = "";
});


var buildVersion = document.getElementById("build-log");
var buildLog = document.querySelector("#modal2");
var xButton = document.getElementById("modal2-close");
buildVersion.addEventListener("click", () => {
    buildLog.style.transform = "translate(-50%, -50%) scale(1)";
    overlay2.classList.add("active");

});
overlay2.onclick = function() { closeModal(); }
xButton.onclick = function() { closeModal(); }

var gameoverContainer = document.querySelector(".header");

const moveAudio = document.querySelector("#move-audio");
const roundWinAudio = document.querySelector("#roundwin-audio");
const winAudio = document.querySelector("#win-audio");

let playAudio = (audio) => {
    audio.currentTime = 0;
    audio.play();
} 

const chessAdMsg = document.querySelector(".chess-ad-container");
let chessAd = () => {
    let rand = Math.round(Math.random()*10)
    //change this to 50% chance
    if (rand) {
        chessAdMsg.style.transform = "scale(1)";
    }
}

var chessAdClose = document.querySelector("#chess-ad-close");
chessAdClose.onclick = function() { closeAd(); }