let history = [];
let board = [
    [1,  2,  3,],
    [4,  5,  6,],
    [7,  8,  9,],
];
var turn;
// console.log(board);



let boardDiv = document.getElementById("board");
let printBoard = () => {
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

            output += `<div class="cell clickable col${j} ${diag}" id="${i},${j}" onclick="playerMove(this.id)">${board[i][j]}</div>`;
        }
        output += "</div>";
    }
    // console.log(output);
    boardDiv.innerHTML = output;
}



function playerMove(cell) {
    let target = document.getElementById(cell);
    // console.log(`clicked ${cell}`);
    // console.log(target);
    if (turn === 1) {
        target.innerHTML = "X";
    }
    else if (turn === 0) {
        target.innerHTML = "O";
    }

    target.removeAttribute("onclick");
    target.classList.remove("clickable");
    if (detectWinner()) {
        cells.forEach(cell => {
            cell.classList.add("winnerceleb");
        });
        //announce winner
    }
    turn = 1 - turn;
}


printBoard();

let detectWinner = () => {
    var winner = false;
    rows.forEach(row => {               //checking rows
        if ((row.childNodes[0].innerHTML == row.childNodes[1].innerHTML) && (row.childNodes[1].innerHTML == row.childNodes[2].innerHTML)) {
            console.log("Uwian na may nanalo na (row)");
            winner = true;
        }
    });
    for (i = 0; i < 1; i++) {
        //checking cols
        if ((columnOne[i].innerHTML == columnOne[i+1].innerHTML) && (columnOne[i+1].innerHTML == columnOne[i+2].innerHTML)) {
            console.log("Uwian na may nanalo na (col1)");
            winner = true;
        }

        if ((columnTwo[i].innerHTML == columnTwo[i+1].innerHTML) && (columnTwo[i+1].innerHTML == columnTwo[i+2].innerHTML)) {
            console.log("Uwian na may nanalo na (col2)");
            winner = true;
        }

        if ((columnThree[i].innerHTML == columnThree[i+1].innerHTML) && (columnThree[i+1].innerHTML == columnThree[i+2].innerHTML)) {
            console.log("Uwian na may nanalo na (col3)");
            winner = true;
        }
        //checking diags
        if ((diagOne[i].innerHTML == diagOne[i+1].innerHTML) && (diagOne[i+1].innerHTML == diagOne[i+2].innerHTML)) {
            console.log("Uwian na may nanalo na (diag1)");
            winner = true;
        }

        if ((diagTwo[i].innerHTML == diagTwo[i+1].innerHTML) && (diagTwo[i+1].innerHTML == diagTwo[i+2].innerHTML)) {
            console.log("Uwian na may nanalo na (diag2)");
            winner = true;
        }
    }
    return winner;
}


//X is reserved for player1, O is for player2/bot
//ask player to pick which side he/she will play








var cells = document.querySelectorAll(".cell");
//accessing rows
var rows = document.querySelectorAll(".row");
//accessing columns
var columnOne = document.querySelectorAll(".col0");
var columnTwo = document.querySelectorAll(".col1");
var columnThree = document.querySelectorAll(".col2");
//accessing diags
var diagOne = document.querySelectorAll(".diag1");
var diagTwo = document.querySelectorAll(".diag2");

//accessing X and O buttons at the start
var modal1 = document.getElementById("modal1");
var overlay1 = document.getElementById("overlay1");
var playerX = document.getElementById("buttonX");
var playerO= document.getElementById("buttonO");


let closeModal = (modal) => {
    if (modal == null) return
    modal.classList.remove("active");
    overlay1.classList.remove("active");
    // winner.classList.remove("active");
  }

    playerX.addEventListener("click", () => {
        turn = 1;
        closeModal(modal1);
    });

    playerO.addEventListener("click", () => {
        turn = 0;
        closeModal(modal1);
    });

    



//for now, user will play X
    //put X wherever player clicks
//cursor toggles between X and O for 2 human players

