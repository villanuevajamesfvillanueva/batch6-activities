
// 0x88 board + positional scores
var board = [

    22, 20, 21, 23, 19, 21, 20, 22,    0,  0,  5,  5,  0,  0,  5,  0, 
    18, 18, 18, 18, 18, 18, 18, 18,    5,  5,  0,  0,  0,  0,  5,  5,
      0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 15, 20, 20, 15, 10,  5,
      0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 20, 30, 30, 20, 10,  5,    
      0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 20, 30, 30, 20, 10,  5,
      0,  0,  0,  0,  0,  0,  0,  0,    5, 10, 15, 20, 20, 15, 10,  5,
      9,  9,  9,  9,  9,  9,  9,  9,    5,  5,  0,  0,  0,  0,  5,  5,
    14, 12, 13, 15, 11, 13, 12, 14,    0,  0,  5,  5,  0,  0,  5,  0

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
const bP = "<img src='images/chess/pieces/black/bP.svg' alt=''>";
const bK = "<img src='images/chess/pieces/black/bK.svg' alt=''>";
const bN = "<img src='images/chess/pieces/black/bN.svg' alt=''>";
const bB = "<img src='images/chess/pieces/black/bB.svg' alt=''>";
const bR = "<img src='images/chess/pieces/black/bR.svg' alt=''>";
const bQ = "<img src='images/chess/pieces/black/bQ.svg' alt=''>";

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
function search_position(side, depth, alpha, beta) {
  // we are in the leaf node
  if (depth == 0)
  {
    // static evaluation score
    var score = 0;

    // loop over board square
    for (var square = 0; square < 128; square++)
    {
      // make sure square is on board
      if ((square & 0x88) == 0)
      {
        // init piece
        piece = board[square]
        
        // make sure piece is available
        if (piece)
        {
          // calculate material score
          score += piece_weights[piece & 15];
          
          // calculate positional score
          (piece & WHITE) ? (score += board[square + 8]) : (score -= board[square + 8]);
        }
      }
    }

    // return positive score for white and negative for black
    return (side == WHITE) ? score: -score;
  }


var old_alpha = alpha;       // needed to check whether to store best move or not
var temp_source;             // temorary best from square
var temp_target;             // temporary best to square
var score = -10000;          // minus infinity
        
// move generator variables
var piece, piece_type, directions, source_square, target_square, captured_square, captured_piece, step_vector;
          
  // loop over board squares
  for (var square = 0; square < 128; square++)
  {
    // make sure that square is on board
    if ((square & 0x88) == 0)
    {
      // init source square
      source_square = square
    
      // init piece to move
      piece = board[square];
      
      // make sure piece belongs to the side to move
      if (piece & side)
      {
        // extract piece type
        piece_type = piece & 7;
        
        // init directions
        directions = move_offsets[piece_type + 30];
        //console.log(pieces[piece & 15] + ' ' + directions);
        
        // loop over piece move directions
        while(step_vector = move_offsets[++directions])    // loop over move offsets
        {
          // init target square
          target_square = source_square;
          
          // loop over squares within a given move direction ray
          do
          {
            // init next target square within move direction ray
            target_square += step_vector;
            
            // init captured piece
            captured_square = target_square;
            
            // drop sliding if hit the edge of the board
            if(target_square & 0x88) break;
            
            // init captured piece
            captured_piece = board[captured_square];
            
            // break if captured own piece
            if(captured_piece & side) break;
            
            // pawns captures only diagonally
            if(piece_type < 3 && !(step_vector & 7) != !captured_piece) break;
            
            // return mating score if king has been captured
            if((captured_piece & 7) == 3) return 10000;
            
            // make move
            board[captured_square] = 0;       // clear captured square
            board[source_square] = 0;         // clear source square (from square where piece was)
            board[target_square] = piece;     // put piece to destination square (to square)

            // pawn promotion
            if(piece_type < 3)    // if pawn
            {
                if(target_square + step_vector + 1 & 0x80)    // goes to the 1th/8th rank
                    board[target_square] |= 7;                // convert it to queen
            }

            // recursive negamax search call
            score = -search_position(24 - side, depth - 1, -beta, -alpha);    // recursive negamax search call

            // take back
            board[target_square] = 0;                   // clear the destination square (to square)
            board[source_square] = piece;               // put the piece back to it's original square (from square)
            board[captured_square] = captured_piece;    // restore captured piece on source square if any
            
            //Needed to detect checkmate
            best_source = source_square;
            best_target = target_square;
            
            // PV node
            if(score > alpha)
            {
              // fail-high node
              if(score >= beta)
                return beta;    // beta cutoff
              
              // update alpha value
              alpha = score;

              // save best move in given branch
              temp_source = source_square;
              temp_target = target_square;
            }        
            
            // fake capture for non-slider pieces
            captured_piece += piece_type < 5;
            
            // unfake capture for pawns if double pawn push is on the cards
            if(piece_type < 3 & 6*side + (target_square & 0x70) == 0x80) captured_piece--;
          }
          
          // condition to break out of loop over squares for non-slider pieces
          while(captured_piece == 0)
        }
      }
    }
  }
  
  // store the best move
  if(alpha != old_alpha)
  {
      best_source = temp_source;
      best_target = temp_target;
  }

  // fail-low node
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
    }
    chess_board += '</div>';
  }  
  board.innerHTML = chess_board;
}
        
        
function update_board() {
  // player move constraint
  if (side === 8) {   
    player_moves(8);
}

  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 16; col++){
      var square = row * 16 + col;      
      // make sure square is on board
      if ((square & 0x88) == 0) {
        document.getElementById(square).innerHTML = pieces[board[square] & 15];
        moveAudio.play();
      }
      whiteLog.style.border = "1px solid gray";
    }
  }
}
        


        //--------------------------------------- make move --------------------------------------------
var click_lock = false;
var user_source, user_target;

// default search depth
var search_depth = 3;
    function make_move(sq) {
        // convert div ID to square index
        var click_sq = parseInt(sq, 10)
      
        // if user clicks on source square 
        if (!click_lock && board[click_sq]) {
            document.getElementById(sq).style.backgroundColor = "rgba(0, 0, 255, 0.5)";
          
            // init user source square
            user_source = click_sq;
            
            // lock click
            click_lock ^= 1;
        }
      
        // if user clicks on destination square
        else if (click_lock) {
            // extract row and column from target square
            var col = user_source & 7;
            var row = user_source >> 4;
            
            // restore color of the square that piece has left
            var color = (col + row) % 2 ? 'gray' : 'gray'
                document.getElementById(user_source).style.backgroundColor = color;
                
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
                whiteMoveLog(pieceStr, coordinates[click_sq]);
            
            // make computer move in response
            setTimeout("think(search_depth)", 500);
        }
    }
        





//--------------------------------------------- AI think ----------------------------------
function think(depth) {
    // search position
    var score = search_position(side, depth, -10000, 10000);

// make AI move
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
    }

    else if (score == -10000) {
        setTimeout(
        function(){
        whiteWins();
        }, 100);
        winAudio.play(); 
    }

    else { update_board();}

// log stats
    console.log('score: ', score);
    console.log('move: ', coordinates[best_source] + coordinates[best_target]);

    let str = document.getElementById(best_target).firstElementChild.src
    let pieceStr = str.substring(str.length - 6, str.length - 4);
        blackMoveLog(pieceStr, coordinates[best_target]);

    whiteLog.style.border = "2px solid rgba(0, 0, 255, 0.7)";
}
        

draw_board();
update_board();


//------------------------------------ white's turn visual cue -----------------------------
whiteLog.style.border = "2px solid rgba(0, 0, 255, 0.7)";



//-------------------------------------- move log -------------------------------------------
let whiteMoveLog = (piece, coords) => {
    let w = document.createElement("p");
    if (piecesLog["white"][piece]) {
      w.innerHTML = piecesLog["white"][piece] + coords;
    }
    else { w.innerHTML = "---";}
    whiteLog.appendChild(w); 
}

let blackMoveLog = (piece, coords) => {
    let b = document.createElement("p");
    if (piecesLog["black"][piece]) {
      b.innerHTML = piecesLog["black"][piece] + coords;
    }
    else { b.innerHTML = "---";}
    blackLog.appendChild(b);    
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
  let options = {};

  var piece, piece_type, directions, source_square, target_square, captured_square, captured_piece, step_vector;
  for (var square = 0; square < 128; square++) {
      if ((square & 0x88) == 0) {
          source_square = square;
          piece = board[square];
          if (piece & side) {
              piece_type = piece & 7; 
              directions = move_offsets[piece_type + 30];
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
                      options[source_square] = target_square;
                      
                      //highlight move options
                      // console.log(`move:  ${coordinates[source_square]} -> ${coordinates[target_square]}`);
                      
                      chosen_piece.setAttribute("style", "cursor: pointer;");
                     
                      
                      chosen_piece.setAttribute("onclick", "make_move(this.id)");
                      landing.setAttribute("onclick", "make_move(this.id)");
                      // landing.setAttribute("style", "background-color: blue;");
                      
                      //need to map source to corresponding target squares
                      //problem: improper target correspondence, all source squares can use all target squares


                      
                      // console.log(chosen_piece);

                      captured_piece += piece_type < 5;
                      // unfake capture for pawns if double pawn push is on the cards
                      // 6*side + (target_square & 0x70) == 0x80 detects if pawn is in 2nd or 7th rank
                      if (piece_type < 3 & 6*side + (target_square & 0x70) == 0x80) captured_piece--;
                  }
                  //condition to break out of loop over squares for non-slider pieces
                  while (captured_piece == 0)
              }
          }
      }
  }
  console.log(options);
}

