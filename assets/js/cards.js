let deck = []; 

//making deck easier to read and display
let display = (array) => {
    let container = [], cardData; //an array holding 2 values: 1 for suite, 1 for card value
    let suite, face;
    for (let i = 0; i < array.length; i++) {
        cardData = array[i].match(/\d+/g).map(Number);

        //if else block for suite assignment
        if (cardData[0] === 3) { suite = "\u2662"; }                //diamonds
        else if (cardData[0] === 2) { suite = "\u2661"; }           //hearts
        else if (cardData[0] === 1) { suite = "\u2660"; }           //spades
        else { suite = "\u2663"; }                                  //clubs
        
        //if else block for face assignment
        //*this function considers Ace as a face card
        if (cardData[1] === 0) { face = "Ace"; }
        else if (cardData[1] === 10) { face = "Jack"; }
        else if (cardData[1] === 11) { face = "Queen"; }
        else if (cardData[1] === 12) { face = "King"; }
        else { face = cardData[1] + 1; }

        container[i] = `${suite}-${face}`;
    }
    console.log(container);
}



//deck creating function
let initDeck = () => {
    console.log("Creating deck: ");
    var suite = 4, value;
    for (let i = 0; i < 52; i++) {
        value = i % 13;
        if (value === 0) {
            suite--;
        }
        deck[i] = `${suite}-${value}`;
    }
    display(deck);
    return deck;
}

console.log("Available functions: ");
console.log("\tinitDeck()");
console.log("\tshuffle(array)");
console.log("\tarrangeBySuit(array)");
console.log("\tarrangeByFaceValue(array, order='ascending')");
console.log("\tdealCards(array, num=1, identify=false)");
console.log("\t\t*printName(array)");
console.log("\t\t*identifyHand(array)\n\n");

initDeck();



let shuffle = (array) => {
    console.log("\n\nShuffling deck: ");
    var currentIndex = array.length, temporaryValue, randomIndex;
    // while there are elements to shuffle
    while (0 !== currentIndex) {
  
      // picking from remaining elements
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // swapping picked element with current element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    display(array);
    return array;
}



let arrangeBySuit = (array) => {
    console.log("\n\nSorting by suite: ");
    let container = [[],[],[],[]], sorted = [], cardData;
    //sorting by suite
    for (let i = 0; i < 52; i++) {
        cardData = array[i].match(/\d+/g).map(Number);
        container[Math.abs(cardData[0]-3)].push(array[i]);
    }

    //appending suites to 1d array
    for (let i = 0; i < 4; i++) {
        sorted = sorted.concat(container[i].sort());
    }
    display(sorted);
    return sorted;
}



let arrangeByFaceValue = (array, order = "ascending") => {
    console.log(`\n\nSorting by face value: ${order}`);
    let container = [[],[],[],[],[],[],[],[],[],[],[],[],[]], sorted = [];
    //sorting by value
    for (let i = 0; i < 52; i++) {
        cardData = array[i].match(/\d+/g).map(Number);
        container[cardData[1]].push(array[i]);
    }

    //appending values to 1d array depending on order
    if (order === "descending") {
        for (let i = 12; i >= 0; i--) {
            sorted = sorted.concat(container[i].sort().reverse());
        }
    }
    else {
        for (let i = 0; i < 13; i++) {
            sorted = sorted.concat(container[i].sort().reverse());
        }
    }
    display(sorted);
    return sorted;
}
// arrangeByFaceValue(deck, "descending");
// arrangeByFaceValue(deck, "ascending");



let printName = (array) => {
    printed = [];
    var cardData, suite, value;
    var digits = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
    if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            cardData = array[i].match(/\d+/g).map(Number);

            //if else block for suite assignment
            if (cardData[0] === 3) { suite = "Diamonds"; }               
            else if (cardData[0] === 2) { suite = "Hearts"; }           
            else if (cardData[0] === 1) { suite = "Spades"; }           
            else { suite = "Clubs"; }

            //value assignment
            value = digits[cardData[1]];
            printed[i] = `${value} of ${suite}`;
        }
    }
    // console.log(printed);
    return printed;
}



let identifyHand = (array) => {
    var cardData, cards = [], royal = false, straight = false, hand;

    for (let i = 0; i < array.length; i++) {
        cardData = array[i].match(/\d+/g).map(Number);
        cards.push(cardData.reverse());
    }

    function sortByFaceValue(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    //sorting cards array by face value
    cards.sort(sortByFaceValue);
   
    //making a tally according to suite and face value
    suiteTally = {};
    faceValueTally = {}; 
    for (let i = 0; i < cards.length; i++) {
        if (!(cards[i][1] in suiteTally)) {
            suiteTally[cards[i][1]] = 1;
        }
        else {
            suiteTally[cards[i][1]] = suiteTally[cards[i][1]] + 1;
        }

        if (!(cards[i][0] in faceValueTally)) {
            faceValueTally[cards[i][0]] = 1;
        }
        else {
            faceValueTally[cards[i][0]] = faceValueTally[cards[i][0]] + 1;
        }
    }
 
    //test for four of a kind
    faceValueTally_arr = Object.values(faceValueTally);
    if (faceValueTally_arr.indexOf(4) > -1) {
        hand = "Four of a kind";
    }

    //test for full house and three of a kind
    else if (faceValueTally_arr.indexOf(3) > -1) {
        if (faceValueTally_arr.indexOf(2) > -1) {
            hand = "Full House";
        }
        else { hand = "Three of a kind"; }
    }

    //test for pair and two pair
    else if (faceValueTally_arr.indexOf(2) > -1) {
        //checking for two pairs
        var isDoubleDouble = faceValueTally_arr.some((value, idx) => {
            if (value > 1) {
                return faceValueTally_arr.indexOf(value) != idx;
            }
            else { return false; }
        });
        if (isDoubleDouble) { hand = "Two Pair"; }
        else { hand = "Pair"; }
    }

    //test for straight
    //No quad, triple, nor pair
    else { 
        for (let i = 0; i < 1; i++) {
            if ((cards[i][0] === 0) &&
                (cards[i+1][0] === 9) &&
                (cards[i+2][0] === 10) &&
                (cards[i+3][0] === 11) &&
                (cards[i+4][0] === 12)) {
                    royal = true;
            }
            else if ((cards[i+1][0] === cards[i][0] + 1) &&
                (cards[i+2][0] === cards[i+1][0] + 1) &&
                (cards[i+3][0] === cards[i+2][0] + 1) &&
                (cards[i+4][0] === cards[i+3][0] + 1)) {
                    straight = true;
                }
        }

        //test for flushes
        //is this correct? suites only matter when checking for flushes?
        if (Object.values(suiteTally).indexOf(5) > -1) {
            if (royal) { hand = "Royal Flush"; }
            else if (straight) { hand = "Straight Flush"; }
            else { hand = "Flush"; }
        }
        else if (straight) { hand = "Straight"; }
        else { hand = "High Card"; }
    }
    console.log(hand);
    return hand;
}


takenCards = [];
let dealCards = (array, num = 1, identify = false) => {
    dealtCards = [];
    console.log(`\n\nDealing ${num} cards: `);
    if (num >= array.length) {
        num = array.length;
    }
    if (array.length > 0) {
        let indeces = [];
        for (let i = 0; i < num; i++) {
            indeces[i] = Math.floor(Math.random() * array.length);
            dealtCards[i] = array[indeces[i]];
            takenCards[takenCards.length] = array[indeces[i]];
            array.splice(indeces[i], 1);
        }
        // console.log(indeces);
    }
    display(dealtCards);
    console.log(printName(dealtCards));
    display(takenCards);

    if ((num === 5) && (identify === true)) {
        identifyHand(dealtCards);
    }
    display(deck);
    return array;
}
// dealCards(deck, 5, true);





// console.log("\n\ntesting identify hand function: ")
// display(["0-0", "0-12", "0-11", "0-10", "0-9"]);
// identifyHand(["0-0", "0-12", "0-11", "0-10", "0-9"]);

// display(["3-2", "3-3", "3-4", "3-5", "3-6"]);
// identifyHand(["3-2", "3-3", "3-4", "3-5", "3-6"]);

// display(["3-2", "3-5", "3-10", "3-9", "3-7"]);
// identifyHand(["3-2", "3-5", "3-10", "3-9", "3-7"]);

// display(["2-2", "2-3", "2-4", "4-5", "4-6"]);
// identifyHand(["2-2", "2-3", "2-4", "4-5", "4-6"]);

// display(["0-6", "1-6", "2-6", "0-5", "3-7"]);
// identifyHand(["0-6", "1-6", "2-6", "0-5", "1-7"]);

// display(["0-0", "1-0", "2-11", "0-11", "3-7"]);
// identifyHand(["0-0", "1-0", "2-11", "0-11", "3-7"]);

// display(["0-6", "1-6", "2-6", "0-7", "3-7"]);
// identifyHand(["0-6", "1-6", "2-6", "0-7", "3-7"]);

// display(["0-2", "1-7", "3-10", "3-9", "3-7"]);
// identifyHand(["0-2", "1-7", "3-10", "3-9", "3-7"]);

// display(["0-2", "1-2", "2-2", "3-2", "2-9"]);
// identifyHand(["0-2", "1-2", "2-2", "3-2", "2-9"]);


//===================================================================================
//------------------------------- DOM related functions -----------------------------

const table = document.querySelector(".table");
const displayDiv = document.querySelector(".display");
const deck_DOM = document.querySelector(".deck");
const cards = document.querySelectorAll(".card");
const instruct = document.querySelector(".init-message");
const drawOneAudio = document.getElementById("draw-one");
const shuffleAudio = document.getElementById("shuffle-audio");

let playAudio = (audio) => {
    audio.currentTime = 0;
    audio.play();
}

const shuffleBtn = document.getElementById("shuffle");
const sortBySuitBtn = document.getElementById("arrangeBySuit");
const sortByValueBtn = document.getElementById("arrangeByValue");
const ascending = document.getElementById("ascending");
const descending = document.getElementById("descending");

const deal1CardBtn = document.getElementById("deal1Card");
const deal5CardsBtn = document.getElementById("deal5Cards");


const diamonds = `<img src="images/cards/006-diamond.png" alt="diamond">`;
const hearts = `<img src="images/cards/008-heart.png" alt="heart">`;
const spades = `<img src="images/cards/005-spade.png" alt="spade">`;
const clubs = `<img src="images/cards/004-clover.png" alt="club">`;

const overlay = document.querySelector(".overlay");
const hand_DOM = document.querySelector(".hand");

let display_DOM = (array) => {
    let suite, face, color, cardData; //an array holding 2 values: 1 for suite, 1 for card value
    for (let i = 0; i < array.length; i++) {
        cardData = array[i].match(/\d+/g).map(Number);

        //if else block for suite assignment
        if (cardData[0] === 3) {
            suite = diamonds;               //diamonds
            color = "red";
        }                
        else if (cardData[0] === 2) {
            suite = hearts;               //hearts
            color = "red";
        }           
        else if (cardData[0] === 1) {
            suite = spades;               //spades
            color = "black";
        }           
        else {
            suite = clubs;               //clubs
            color = "black";
        }                                  
        
        //if else block for face assignment
        //*this function considers Ace as a face card
        if (cardData[1] === 0) { face = "A"; }
        else if (cardData[1] === 10) { face = "J"; }
        else if (cardData[1] === 11) { face = "Q"; }
        else if (cardData[1] === 12) { face = "K"; }
        else { face = cardData[1] + 1; }

        cards[i].setAttribute("class", `card ${color}`);
        cards[i].setAttribute("onmouseenter", `up(this, ${i});`);
        cards[i].setAttribute("onmouseleave", `down(this, ${i});`);
        cards[i].innerHTML =    `<div class="cardTopLeft"><p>${face}</p>${suite}</div>
                            <div class="cardContent"><p>${face}</p>${suite}</div>`;
        
    }
    return array;
}
display_DOM(deck);



let displayDeal_DOM = (array) => {
    let suite, face, color, cardData; //an array holding 2 values: 1 for suite, 1 for card value
    for (let i = 0; i < 52; i++) {
        //clearing old cardData
        cards[i].innerHTML = "";
    }

    for (let i = 0; i < array.length; i++) {
        cardData = array[i].match(/\d+/g).map(Number);

        //if else block for suite assignment
        if (cardData[0] === 3) {
            suite = diamonds;               //diamonds
            color = "red";
        }                
        else if (cardData[0] === 2) {
            suite = hearts;               //hearts
            color = "red";
        }           
        else if (cardData[0] === 1) {
            suite = spades;               //spades
            color = "black";
        }           
        else {
            suite = clubs;               //clubs
            color = "black";
        }                                  
        
        //if else block for face assignment
        //*this function considers Ace as a face card
        if (cardData[1] === 0) { face = "A"; }
        else if (cardData[1] === 10) { face = "J"; }
        else if (cardData[1] === 11) { face = "Q"; }
        else if (cardData[1] === 12) { face = "K"; }
        else { face = cardData[1] + 1; }

        //highlight class makes the latest draw of cards standout
        cards[i].setAttribute("class", `card ${color} highlight`);
        cards[i].setAttribute("onmouseenter", `up(this, ${i});`);
        cards[i].setAttribute("onmouseleave", `down(this, ${i});`);
        cards[i].innerHTML =    `<div class="cardTopLeft"><p>${face}</p>${suite}<span>${printName(array)[i]}</span></div>
                                <div class="cardContent"><p>${face}</p>${suite}</div>`;
    }
    return array;
}




let presentCards = anime({
    targets: cards,
    translateX: function(target, index, targetsLength) {
        return -1720 + 128*(index % 13);
    },
    translateY: function(target, index, targetsLength) {
        if (index < 13) { return -655; }
        else if (index < 26) { return -447; }
        else if (index <39) { return -239; }
        else { return -31; }
    },
    delay: anime.stagger(30),
    autoplay: false
});



shuffleBtn.addEventListener("click", () => {
    playAudio(shuffleAudio);
    shuffle(deck);
    display_DOM(deck);

    //clearing unintended addition of easings
    cards.forEach(card => {
        card.style.transition = ``;
    });
    instruct.style.display = "none";
    presentCards.restart();
});

deck_DOM.addEventListener("click", () => {
    playAudio(shuffleAudio);
    //clearing unintended addition of easings
    cards.forEach(card => {
        card.style.transition = ``;
    })
    instruct.style.display = "none";
    presentCards.restart();
});

sortBySuitBtn.addEventListener("click", () => {
    playAudio(shuffleAudio);
    cards.forEach(card => {
        card.style.transition = ``;
    });
    instruct.style.display = "none";
    display_DOM(arrangeBySuit(deck));
    presentCards.restart();
});

ascending.addEventListener("click", () => {
    playAudio(shuffleAudio);
    cards.forEach(card => {
        card.style.transition = ``;
    });
    instruct.style.display = "none";
    display_DOM(arrangeByFaceValue(deck));
    presentCards.restart();
});

descending.addEventListener("click", () => {
    playAudio(shuffleAudio);
    cards.forEach(card => {
        card.style.transition = ``;
    });
    instruct.style.display = "none";
    display_DOM(arrangeByFaceValue(deck, "descending"));
    presentCards.restart();
});

//removing highlights for old draws
let removeHighlights = (num, array1 = takenCards, array2 = dealtCards) => {
    if (num > dealtCards.length) { num = dealtCards.length; }
    for (let i = 0; i < takenCards.length - num; i++) {
        cards[i].classList.remove("highlight");
    }
}

deal1CardBtn.addEventListener("click", () => {
    playAudio(drawOneAudio);
    shuffleBtn.style.transform = "scale(0)";
    sortBySuitBtn.style.transform = "scale(0)";
    sortByValueBtn.style.transform = "scale(0)";

    instruct.style.display = "none";
    dealCards(deck, 1);
    displayDeal_DOM(takenCards);
    removeHighlights(1);
});

deal5CardsBtn.addEventListener("click", () => { 
    playAudio(drawOneAudio);
    shuffleBtn.style.transform = "scale(0)";
    sortBySuitBtn.style.transform = "scale(0)";
    sortByValueBtn.style.transform = "scale(0)";

    instruct.style.display = "none";
    dealCards(deck, 5, true);
    displayDeal_DOM(takenCards);
    displayHand(identifyHand(dealtCards));
    removeHighlights(5);
});

overlay.addEventListener("click", () => {
    overlay.style.transform = "scale(0)";
    hand_DOM.style.transform = "translate(100%, 40%)";
});

hand_DOM.addEventListener("click", () => {
    overlay.style.transform = "scale(0)";
    hand_DOM.style.transform = "translate(100%, 40%)";
});

let displayHand = (hand) => {
    if (hand !== "High Card") {
        overlay.style.transform = "scale(1)";
        hand_DOM.innerHTML = hand;
        hand_DOM.style.transform = "translate(0, 40%)";
    }
}


//manual :hover selector; encountered conflict with transform property in css
function up(target, index) {
    let xTranslate = -1720 + 128*(index % 13);
    if (index < 13) {
        target.style.transform = `translateY(-675px) translateX(${xTranslate}px)`;
    }
    else if (index < 26) {
        target.style.transform = `translateY(-467px) translateX(${xTranslate}px)`;
    }
    else if (index < 39) {
        target.style.transform = `translateY(-259px) translateX(${xTranslate}px)`;
    }
    else {
        target.style.transform = `translateY(-51px) translateX(${xTranslate}px)`;
    }
    target.style.transition = `all 0.2s ease`;
}

function down(target, index) {
    let xTranslate = -1720 + 128*(index % 13);
    if (index < 13) {
        target.style.transform = `translateY(-655px) translateX(${xTranslate}px)`;
    }
    else if (index < 26) {
        target.style.transform = `translateY(-447px) translateX(${xTranslate}px)`;
    }
    else if (index < 39) {
        target.style.transform = `translateY(-239px) translateX(${xTranslate}px)`;
    }
    else {
        target.style.transform = `translateY(-31px) translateX(${xTranslate}px)`;  
    }
    target.style.transition = `all 0.2s ease`;
}


//to improve:
    //need to detect animation ends before initiating new animations
