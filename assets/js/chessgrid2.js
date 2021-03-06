
// 0x88 board + positional scores
// var board = [

//     22, 20, 21, 23, 19, 21, 20, 22,    0,  0,  5,  5,  0,  0,  5,  0, 
//     18, 18, 18, 18, 18, 18, 18, 18,    5,  5,  0,  0,  0,  0,  5,  5,
//       0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 15, 20, 20, 15, 10,  5,
//       0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 20, 30, 30, 20, 10,  5,    
//       0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 20, 30, 30, 20, 10,  5,
//       0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 15, 20, 20, 15, 10,  5,
//       9,  9,  9,  9,  9,  9,  9,  9,    5,  5,  0,  0,  0,  0,  5,  5,
//     14, 12, 13, 15, 11, 13, 12, 14,    0,  0,  5,  5,  0,  0,  5,  0

// ];

var board = [

   54, 20, 21, 23, 51, 21, 20, 54,    0,  0,  5,  5,  0,  0,  5,  0, 
   50, 50, 50, 50, 50, 50, 50, 50,    5,  5,  0,  0,  0,  0,  5,  5,
    0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 15, 20, 20, 15, 10,  5,
    0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 20, 30, 30, 20, 10,  5,    
    0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 20, 30, 30, 20, 10,  5,
    0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 15, 20, 20, 15, 10,  5,
   41, 41, 41, 41, 41, 41, 41, 41,    5,  5,  0,  0,  0,  0,  5,  5,
   46, 12, 13, 15, 43, 13, 12, 46,    0,  0,  5,  5,  0,  0,  5,  0

];

var coordinates = [                                          // convert square id to board notation

    "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",     "i8","j8","k8","l8","m8","n8","o8", "p8",
    "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",     "i7","j7","k7","l7","m7","n7","o7", "p7",
    "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",     "i6","j6","k6","l6","m6","n6","o6", "p6",
    "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",     "i5","j5","k5","l5","m5","n5","o5", "p5",
    "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",     "i4","j4","k4","l4","m4","n4","o4", "p4",
    "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",     "i3","j3","k3","l3","m3","n3","o3", "p3",
    "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",     "i2","j2","k2","l2","m2","n2","o2", "p2",
    "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1",     "i1","j1","k1","l1","m1","n1","o1", "p1",

];
                

//svg chess pieces
const bP = "<img src='images/chess/pieces/black/bP.svg'  alt=''>";   
const bK = "<img src='images/chess/pieces/black/bK.svg'  alt=''>";
const bN = "<img src='images/chess/pieces/black/bN.svg'  alt=''>";
const bB = "<img src='images/chess/pieces/black/bB.svg'  alt=''>";
const bR = "<img src='images/chess/pieces/black/bR.svg'  alt=''>";
const bQ = "<img src='images/chess/pieces/black/bQ.svg'  alt=''>";

const wP = "<img src='images/chess/pieces/white/wP.svg' alt=''>";
const wK = "<img src='images/chess/pieces/white/wK.svg' alt=''>";
const wN = "<img src='images/chess/pieces/white/wN.svg' alt=''>";
const wB = "<img src='images/chess/pieces/white/wB.svg' alt=''>";
const wR = "<img src='images/chess/pieces/white/wR.svg' alt=''>";
const wQ = "<img src='images/chess/pieces/white/wQ.svg' alt=''>";

const blank = "<img id='blank' src='images/chess/pieces/blank.svg' alt=''>";

const moveAudio = document.getElementById("move-audio");
const winAudio = document.getElementById("win-audio");

var pieces = [
    blank, blank, bP, bK, bN, bB, bR, bQ, 
    blank, wP, blank, wK, wN, wB, wR, wQ, ];

const piecesLog = { 
    white: {wK: "♔", wQ : "♕", wR : "♖", wB : "♗", wN : "♘", wP : "♙"},
    black: {bK : "♚", bQ : "♛", bR : "♜", bB : "♝", bN : "♞", bP : "♟"}};

    const blackLog = document.getElementById("black-log");
    const whiteLog = document.getElementById("white-log");
            
        
// relative piece weights
var piece_weights = [0, 0, -100, 0, -300, -350, -500, -900, 0, 100, 0, 0, 300, 350, 500, 900];
        
// piece move offsets
// doesn't include en passant and castling yet?
var move_offsets = [
    15,  16,  17,   0,                           
  -15, -16, -17,   0,                           
    1,  16,  -1, -16,   0,                      
    1,  16,  -1, -16,  15, -15, 17, -17,  0,    
    14, -14,  18, -18,  31, -31, 33, -33,  0,    
    3,  -1,  12,  21,  16,   7, 12              
];

// color constants
WHITE = 8;
BLACK = 16;

// side to move
var side = WHITE;

// to store the best move found in search
var best_source, best_target;
        

//------------------------------------------ move generation ---------------------------------
// search board position for the best move
// search_position() has 3 nested loops:
//      1. loop over board array
//      2. loop over move_offsets
//      3. loop over tiles in a given direction (for sliding pieces)
function search_position(side, depth, alpha, beta) {      //alpha and beta are scored bounds were searching in, for pruning moves in a sure losing position
  
  if (depth == 0) {                                       // we are in the leaf node
    var score = 0;                                        // static evaluation score
    for (var square = 0; square < 128; square++) {        // loop over board tiles 
      if ((square & 0x88) == 0) {                         // make sure square is on board
        piece = board[square]                             // init piece
        if (piece) {                                      // make sure piece is available
          score += piece_weights[piece & 15];             // calculate material score
          // calculate positional score
          (piece & WHITE) ? (score += board[square + 8]) : (score -= board[square + 8]);
        }
      }
    }    
    return (side == WHITE) ? score: -score;               // return positive score for white and negative for black
  }


var old_alpha = alpha;       // needed to check whether to store best move or not
var temp_source;             // temorary best from square
var temp_target;             // temporary best to square
var score = -10000;          // minus infinity
        
// move generator variables
var piece, piece_type, directions, source_square, target_square, captured_square, captured_piece, step_vector;
          
  
  for (var square = 0; square < 128; square++) {              // loop over board squares
    if ((square & 0x88) == 0) {                               // make sure that square is on board
      source_square = square                                  // init source square
      piece = board[square];                                  // init piece to move
      if (piece & side) {                                     // make sure piece belongs to the side to move
        piece_type = piece & 7;                               // extract piece type
        directions = move_offsets[piece_type + 30];           // init directions
        //console.log(pieces[piece & 15] + ' ' + directions);
        while(step_vector = move_offsets[++directions]) {     // loop over move offsets
          target_square = source_square;                      // init target square
          do {                                                // loop over squares within a given move direction
            target_square += step_vector;                     // init next target square within move direction
            captured_square = target_square;                  // init captured piece
            if(target_square & 0x88) break;                   // drop sliding if hit the edge of the board
            captured_piece = board[captured_square];          // init captured piece
            if(captured_piece & side) break;                  // break if captured own piece
            if(piece_type < 3 && !(step_vector & 7) != !captured_piece) break;  // pawns captures only diagonally
            if((captured_piece & 7) == 3) return 10000;       // return mating score if king has been captured
            
            // make move
            board[captured_square] = 0;       // clear captured square
            board[source_square] = 0;         // clear source square (from square where piece was)
            board[target_square] = piece;     // put piece to destination square (to square)
            //=====for castling and En Passant, additional code to strip virgin bit is needed=====

            // pawn promotion
            if(piece_type < 3) {                              // if pawn
                if(target_square + step_vector + 1 & 0x80)    // goes to the 1st/8th rank
                    board[target_square] |= 7;                // convert it to queen
            }
            score = -search_position(24 - side, depth - 1, -beta, -alpha);      // recursive negamax search call

            // take back
            board[target_square] = 0;                   // clear the destination square (to square)
            board[source_square] = piece;               // put the piece back to it's original square (from square)
            board[captured_square] = captured_piece;    // restore captured piece on source square if any
            
            //Needed to detect checkmate
            best_source = source_square;
            best_target = target_square;
            
            //fail-soft alpha beta framework: score might go beyond the alpha beta bounds
            if(score > alpha) {                   // principal-varionation (PV) node
              if(score >= beta)                   // fail-high node
                return beta;                      // beta cutoff
              alpha = score;                      // update alpha value

              // save best move in given branch
              temp_source = source_square;
              temp_target = target_square;
            }        
            
            captured_piece += piece_type < 5;     // fake capture for non-slider pieces
            
            // unfake capture for pawns if double pawn push is on the cards
            // making sure first is pawn is on the 2nd/7th rank; H.G. Muller implementation
            if(piece_type < 3 & 6*side + (target_square & 0x70) == 0x80) captured_piece--;
          }
          
          // condition to break out of loop over squares for non-slider pieces
          while(captured_piece == 0)
        }
      }
    }
  }
  
  // store the best move
  if(alpha != old_alpha) {
      best_source = temp_source;
      best_target = temp_target;
  }

  // fail-low node (no better move is found than the current one)
  return alpha;
}
        
//-------------------------------------------- board init ------------------------------------
function draw_board() {
  var board = document.getElementById("board");
    var chess_board = "";
  for (var row = 0; row < 8; row++) {
    chess_board += '<div class="row">';

    for (var col = 0; col < 16; col++) {
      var square = row * 16 + col;
      // make sure square is on board
      if ((square & 0x88) == 0)
        chess_board += '<div id="' + square + '"class="' + ( ((col + row) % 2) ? 'white' : 'black') + '"></div>';
        // chess_board += '<div id="' + square + '"class="' + ( ((col + row) % 2) ? 'white"' : 'black" onclick="make_move(this.id)"') + '></div>';
    }
    chess_board += '</div>';
  }  
  board.innerHTML = chess_board;
  // console.log(chess_board);
}
        


function update_board() {
  // player move constraint
  player_moves();
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 16; col++){
      var square = row * 16 + col;      
      // make sure square is on board
      if ((square & 0x88) == 0) {
        document.getElementById(square).innerHTML = pieces[board[square] & 15];
        moveAudio.play();
      }
      // unhighlight white player bec it's black's turn
      whiteLog.style.border = "1px solid gray";

      //make cursor pointer on blanks default

    }
  }
}



//-----------------------------------chess clock------------------------------
const blackTime = document.getElementById("black-clock");
const whiteTime = document.getElementById("white-clock");
const minutes = 10; 
const seconds = 0;

function getTime(totalSecs) {
  var min = Math.floor(totalSecs / 60);
  var sec = totalSecs % 60;
  return min + ":" + (sec < 10 ? "0" + sec : sec);
}

function getSeconds(min, sec) {
  var time = min * 60 + sec;
  return time;
}

function timerStart() {  
    times = [getSeconds(minutes, seconds), getSeconds(minutes, seconds)];
    let index = side/8 - 1;
    
    blackTime.innerHTML = getTime(getSeconds(minutes, seconds));
    whiteTime.innerHTML = getTime(getSeconds(minutes, seconds));
    
    timer = setInterval(function() {
        times[index]--;
        if (side == WHITE) whiteTime.innerHTML = getTime(times[index]);
        else blackTime.innerHTML = getTime(times[index]);
        
        if (times[index] == 0) {
            navigator.vibrate(1000);
            clearInterval(timer);
            timer = false;
        }
        
    }, 1000);   
}



//--------------------------------------- make move --------------------------------------------
var click_lock = false;
var user_source, user_target;
var capture = false;
// default search depth
var search_depth = 5;
    function make_move(sq) {  

        let sources = Object.keys(player_moves());
        let targ;
        // convert div ID to square index
        var click_sq = parseInt(sq, 10)

        // if player clicks on source square 
        if (!click_lock && board[click_sq]) {
            // init user source square
            user_source = click_sq;

            targ = player_moves()[click_sq];
            console.log(`user source:\n id: ${user_source}\n tile: ${coordinates[user_source]}\n piece type: ${board[user_source]}\n possible targets id: ${targ}`);
            timerStart();

            // disable all mouse clicks except self and targets
            // for proper source target correspondence
            for (let i = 0; i < 128; i++) {
              if (((i & 0x88) == 0) && (i != user_source) && !targ.includes(i)) {
                document.getElementById(i).removeAttribute("onclick");
              }
            }
            
            // lock click
            click_lock ^= 1;
            document.getElementById(sq).style.backgroundColor = "rgba(0, 0, 255, 0.5)";
          }

        // if player clicks on the same piece
        else if (user_source == click_sq) {
            // negate piece highlight
            document.getElementById(sq).style.backgroundColor = "rgba(0, 0, 255, 0)";
            click_lock ^= 1;
        
          

            // unset user source
            user_source = undefined;
            console.log(`selected ${coordinates[user_source]}(${board[user_source]}) click_lock: ${click_lock}`); 
        }
    


        // if player clicks on destination square
        else if (click_lock && player_moves()[user_source]) {

            // extract row and column from target square
            var col = user_source & 7;
            var row = user_source >> 4;
            
            
            // restore color of the square that piece has left
            var color = (col + row) % 2 ? 'gray' : 'gray'
            document.getElementById(user_source).style.backgroundColor = color;
             
            //detect capture
            if (board[click_sq] != 0) {
              capture = true;
            }

            // move piece
            board[click_sq] = board[user_source];
            board[user_source] = 0;
            


            // if pawn promotion
            if (((board[click_sq] == 9) && (click_sq >= 0 && click_sq <= 7)) ||
                ((board[click_sq] == 18) && (click_sq >= 112 && click_sq <= 119)))
                    board[click_sq] |= 7;    // convert pawn to corresponding side's queen
            
            // change side
            side = 24 - side;
            
            // unlock click
            click_lock ^= 1;
            
            // update position
            update_board();

            let str = pieces[board[click_sq]];
            let pieceStr = str.substring(str.length - 15, str.length - 13);
              whiteMoveLog(pieceStr, coordinates[click_sq], capture);
              
              capture = false;
            
            // make computer move in response
            setTimeout("think(search_depth)", 500);
        }
    }
        



//--------------------------------------------- AI think ----------------------------------
function think(depth) {
    // search position
    var score = search_position(side, depth, -10000, 10000);

//detect capture
if (board[best_target] != 0) {
  capture = true;
}

// make AI move
console.log(`best_source: ${best_source}(${board[best_source]}), best_target: ${best_target}(${board[best_target]})`);
    board[best_target] = board[best_source];
    board[best_source] = 0;

// if pawn promotion
    if (((board[best_target] == 9) && (best_target >= 0 && best_target <= 7)) ||
        ((board[best_target] == 18) && (best_target >= 112 && best_target <= 119)))
          board[best_target] |= 7;    // convert pawn to corresponding side's queen

    // change side
    side = 24 - side;

    // Checkmate detection
    if (score == 10000) {
        update_board();
        setTimeout(
        function(){
        blackWins();
        }, 100);
        winAudio.play();

        //disable all movements when game is over
        document.getElementById("board").style.pointerEvents = "none";
        
    }

    else if (score == -10000) {
        setTimeout(
        function(){
        whiteWins();
        }, 100);
        winAudio.play();

        //disable all movements
        document.getElementById("board").style.pointerEvents = "none";
        
    }

    else { update_board();}

    // log stats
    console.log('score: ', score);
    console.log('move: ', coordinates[best_source] + coordinates[best_target]);
    

    let str = document.getElementById(best_target).firstElementChild.src
    let pieceStr = str.substring(str.length - 6, str.length - 4);
        blackMoveLog(pieceStr, coordinates[best_target], capture);

    whiteLog.style.border = "2px solid rgba(0, 0, 255, 0.7)";
    capture = false;
}
        

draw_board();
update_board();


//------------------------------------ white's turn visual cue -----------------------------
whiteLog.style.border = "2px solid rgba(0, 0, 255, 0.7)";



//-------------------------------------- move log -------------------------------------------
let whiteMoveLog = (piece, coords, capture) => {
    let w = document.createElement("p");
    if (piecesLog["white"][piece] && capture === false) {
      w.innerHTML = piecesLog["white"][piece] + coords;
    }
    else if(piecesLog["white"][piece] && capture === true) {
      w.innerHTML = piecesLog["white"][piece] + "x" + coords;
    }
    else { w.innerHTML = "---";}
    whiteLog.appendChild(w);
    whiteLog.scrollTop = whiteLog.scrollHeight; 
}

let blackMoveLog = (piece, coords) => {
    let b = document.createElement("p");
    if (piecesLog["black"][piece] && capture === false) {
      b.innerHTML = piecesLog["black"][piece] + coords;
    }
    else if(piecesLog["black"][piece] && capture === true) {
      b.innerHTML = piecesLog["black"][piece] + "x" + coords;
    }
    else { b.innerHTML = "---";}
    blackLog.appendChild(b);
    blackLog.scrollTop = blackLog.scrollHeight;    
}




//--------------------------------- random player info ------------------------------------
let randNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const guestNum = document.getElementById("guest-number");
const botNum = document.getElementById("bot-number");
const flag1 = document.getElementById("flag1");
const flags = ["images/chess/icons/germany.svg", "images/chess/icons/japan.svg", "images/chess/icons/russia.svg", "images/chess/icons/uk.svg", "images/chess/icons/us.svg"];

    guestNum.innerHTML = "Guest #" + randNum(1, 99999);
    botNum.innerHTML = "Guest #" + randNum(1, 99999);
    flag1.src = flags[randNum(0,4)];




//--------------------------------- for build-log pop-up ------------------------------------
const openModalButton = document.getElementById("build-log");
const closeModalButton = document.getElementById("modal-close");
const overlay = document.getElementById("overlay-gray");
const modal = document.getElementById("modal");

    overlay.addEventListener("click", () => {
        const modalActive = document.querySelector(".modal.active");
        const winAnnounceActive = document.querySelector(".win-announce.active");
        closeModal(modalActive);
        closeModal(winAnnounceActive);
    });

    openModalButton.addEventListener("click", () => {
        openModal(modal);
    });
    closeModalButton.addEventListener("click", () => {
        closeModal(modal);
    });

    let openModal = (modal) => {
      if (modal == null) return
      modal.classList.add("active");
      overlay.classList.add("active");
    }

    let closeModal = (modal) => {
      if (modal == null) return
      modal.classList.remove("active");
      overlay.classList.remove("active");
      winnerWhite.classList.remove("active");
    }



//------------------------------------- winner announce --------------------------------------
const winnerWhite = document.getElementById("win-white");
const winnerBlack = document.getElementById("win-black");

    let whiteWins = () => {
      if (winnerWhite == null) return
      winnerWhite.classList.add("active");
      overlay.classList.add("active");
    }

    let blackWins = () => {
      if (winnerBlack == null) return
      winnerBlack.classList.add("active");
      overlay.classList.add("active");
    }



//----------------------------------- page loader --------------------------------------------
window.onload = function(){
  document.getElementById("loader-wrapper").style.display = "none";
};


//-----------------------------------player move constraints-----------------------
function player_moves(side) {
  side = 8;
  let options = {};

  var piece, piece_type, directions, source_square, target_square, captured_square, captured_piece, step_vector;
  for (var square = 0; square < 128; square++) {
      if ((square & 0x88) == 0) {
          source_square = square;
          piece = board[square];
          if (piece & side) {
              piece_type = piece & 7; 
              directions = move_offsets[piece_type + 30];
              
              // init container for possible moves of a particular piece
              options[source_square] = [];

              while (step_vector = move_offsets[++directions]) {   //loop over  move offsets
                  target_square = source_square;

                  do {
                      target_square += step_vector;
                      captured_square = target_square;
                      if (target_square & 0x88) break;
                      captured_piece = board[captured_square];    
                      if (captured_piece & side) break;       
                      if (piece_type < 3 && !(step_vector & 7) != !captured_piece) break;
                    
                      var chosen_piece = document.getElementById(source_square);
                      var landing = document.getElementById(target_square);
                      
                      chosen_piece.setAttribute("style", "cursor: pointer;");
                     
                      chosen_piece.setAttribute("onclick", "make_move(this.id)");
                      landing.setAttribute("onclick", "make_move(this.id)");
                      // landing.setAttribute("style", "background-color: blue;");
                     
                      // populate container for moves
                      options[source_square].push(target_square);
                      
                      captured_piece += piece_type < 5;
                      // unfake capture for pawns if double pawn push is on the cards
                      // 6*side + (target_square & 0x70) == 0x80 detects if pawn is in 2nd/7th rank
                      if (piece_type < 3 & 6*side + (target_square & 0x70) == 0x80) captured_piece--;
                  }
                  //condition to break out of loop over squares for non-slider pieces
                  while (captured_piece == 0)
              }
          }
      }
  }

  // for cleanup, leaving only moveable tiles and their corresponding target tiles
  for (let i = 0; i < 128; i++) {
    if (!options[i] || options[i].length === 0) {
      delete options[i];
    }
  }

  // console.log(options);
  return  options;
}




