
//------------------- randomizing bg orientation ----------------------
const whites = Array.from(document.querySelectorAll(".white"));
const blacks = Array.from(document.querySelectorAll(".black"));

let randomRotateTile = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        var rotate = Math.floor(Math.random() * 4);
        if (rotate === 0) {
            arr[i].style.transform = "rotate(90deg)";
            if (arr[i].firstChild) {
                arr[i].firstElementChild.style.transform = "rotate(-90deg)";
            }
            
        }
        else if (rotate === 1) {
            arr[i].style.transform = "rotate(180deg)";
            if (arr[i].firstChild) {
                arr[i].firstElementChild.style.transform = "rotate(-180deg)";
            }
        }
        else if (rotate === 2) {
            arr[i].style.transform = "rotate(270deg)";
            if (arr[i].firstChild) {
                arr[i].firstElementChild.style.transform = "rotate(-270deg)";
            }
        }

        else if (rotate === 3) {
            arr[i].style.transform = "rotate(360deg)";
        }
        
    }
}

randomRotateTile(whites);
randomRotateTile(blacks);





//====================================================================================

//------------------------------------ movement demo ----------------------------------
const board = document.getElementById("board");
const row = board.querySelectorAll(".row");
const audio = document.getElementById("move-audio"); 



 for (let i = 0; i < 8; i++) {
     const rowTiles = row[i].querySelectorAll(".tile");
    for (let j = 0; j < 8; j++) {
        rowTiles[j].addEventListener("click", () => {
            console.log("row " + (-i + 8) + ", " + "column = " + (j+1));
            // console.log(rowTiles[j]);
            
            if (rowTiles[j].firstChild) {
                console.log("occupied");       
                // rowTiles[j].style.border = "3px solid red";          //highlight tile to show piece is picked up
                var pick = rowTiles[j].firstElementChild;
                var style1 = rowTiles[j].getAttribute("style");
                var orient1 = style1.match(/(\d+)/)[0];
                
                callMove(pick, orient1);
                
            }
            else {
                console.log("empty");
            }
            
        }, false);
    }
}



let callMove = (pick, orient) => {
    for (let k = 0; k < 8; k++) {
        const rowTiles = row[k].querySelectorAll(".tile");
        for (let l = 0; l < 8; l++) {
                                                            //try to make :hover only on empty tiles
            rowTiles[l].onclick = () => {
                if (!rowTiles[l].firstChild) {
                    rowTiles[l].appendChild(pick);
                    audio.play();
                    counterRotate(rowTiles[l], orient);
                    let str = rowTiles[l].firstElementChild.src;
                    let res = str.substring(str.length - 6, str.length - 4);
                    console.log(res);
                    movelog(res, k, l);
                    return true;
                }
                else {
                    return false;
                }
            
            }
        }
    }
}


//------------------------------ counter rotate -------------------------------------
let counterRotate = (tile, orient) => { 
    tile.style.transform = "rotate(" + orient +"deg)";
}

//----------------------------- move logs --------------------------------------------
const pieces = { 
        white: {wK: "♔", wQ : "♕", wR : "♖", wB : "♗", wN : "♘", wP : "♙"},
        black: {bK : "♚", bQ : "♛", bR : "♜", bB : "♝", bN : "♞", bP : "♟"}};

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const blackLog = document.getElementById("black-log");
const whiteLog = document.getElementById("white-log");

let movelog = (key , r, c) => {
    if (key in pieces["white"]) {
        
        console.log(pieces["white"][key] + " row = " + (-r +8) + " col = " + letters[c]);
        let w = document.createElement("p");
        w.innerHTML = pieces["white"][key] + " " + letters[c] + (-r +8);
        whiteLog.appendChild(w);
        console.log(w);
    }

    else if (key in pieces["black"]) {
        console.log(pieces["black"][key] + " row = " + (-r +8) + " col = " + letters[c]);
        let b = document.createElement("p");
        b.innerHTML = pieces["black"][key] + " " + letters[c] + (-r +8);
        blackLog.appendChild(b);
        console.log(b);
    }

}

