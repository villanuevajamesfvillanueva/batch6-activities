const player1Score = document.querySelector("#player1-score");
const player1CurrentScore = document.querySelector("#player1-currentscore");
const player1Container = document.querySelector("#player1-container");
const player2Score = document.querySelector("#player2-score");
const player2CurrentScore = document.querySelector("#player2-currentscore");
const player2Container = document.querySelector("#player2-container");
const dice = document.getElementById('dice');
const rollButton = document.querySelector('.roll');
const holdButton = document.querySelector('.hold');
const turnDisplay = document.querySelector(".turn-display");
const instruct = document.querySelector(".instruct");
const restartButton = document.querySelector(".restart");
const audio = document.getElementById("roll-audio");

let players = [
    {
        name: "Player 1",
        score: 0,
        accum: 0,
        rollResult: 0,
        rollHistory: []
    },
    {
        name: "Player 2",
        score: 0,
        accum: 0,
        rollResult: 0,
        rollHistory: []
    }
];

let turn, winningScore = 100;   // turn = 0 for player1, turn = 1 for player2

instruct.innerHTML = `First to ${winningScore} wins!`;

let hightlight = () => {
    if (turn === 0) {
        player1Container.style.border = "2px solid red";
        player2Container.style.border = "2px solid black";
        turnDisplay.innerHTML = "Player 1's turn";
    }
    else {
        player2Container.style.border = "2px solid red";
        player1Container.style.border = "2px solid black";
        turnDisplay.innerHTML = "Player 2's turn";
    }
}

let roll = (player) => {
    audio.play();
    player = turn; 
    let result = Math.floor(Math.random()*6 + 1);
    dice.dataset.side = result;
    dice.classList.toggle("reRoll");

    if (result !== 1) {
        players[player].rollResult = result;
        players[player].rollHistory.push(result); 
        players[player].accum += result;
    }

    else {
        players[player].accum = 0;
        // players[player].rollHistory.length = 0;
        turn = 1 - turn;
        hightlight();
    }
    setTimeout(function(){
        (player === 0) ? player1CurrentScore.innerHTML = players[player].accum : player2CurrentScore.innerHTML = players[player].accum; 
    }, 750);

    console.log(players);
}

dice.addEventListener("click", roll);

let gameOver = () => {
    turnDisplay.innerHTML = "";
    restartButton.style.opacity = 1;
    rollButton.classList.add("disable")
    holdButton.classList.add("disable");
}


let hold = (player) => {
    player = turn;
    players[player].score += players[player].accum;
    players[player].accum = 0;

    if (player === 0) { 
        player1Score.innerHTML = players[player].score;
        player1CurrentScore.innerHTML = players[player].accum;
    }

    else {
        player2Score.innerHTML = players[player].score;
        player2CurrentScore.innerHTML = players[player].accum;
    }

    //check for winners
    if (players[0].score >= winningScore) {
        instruct.innerHTML = "Player 1 wins!";
        console.log("Player 1 Wins!");
        gameOver();
        return;
    } 

    else if (players[1].score >= winningScore) {
        instruct.innerHTML = "Player 2 wins!";
        console.log("Player 2 Wins!");
        gameOver();
        return;
    }

    turn = 1 - turn;
    hightlight();
}
        
//--------------- roll dice to decide who goes first -----------------
let whoGoesFirst = () => {
    //players roll the dice onclick or whatever
    let player1Roll = Math.floor(Math.random()*6) + 1;
    let player2Roll = Math.floor(Math.random()*6) + 1;

    console.log(`player1Roll: ${player1Roll}`);
    console.log(`player2Roll: ${player2Roll}`);
    if (player1Roll === player2Roll) { whoGoesFirst(); }
    else if (player1Roll > player2Roll) { turn = 0; }
    else { turn = 1; }
    hightlight();
    return turn;
}
whoGoesFirst();




//add option for 1 more dice
//hold should only work after every after a roll
        