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
    var suite = 4, value;
    for (let i = 0; i < 52; i++) {
        value = i % 13;
        if (value === 0) {
            suite--;
        }
        deck[i] = `${suite}-${value}`;
    }
    return deck;
}
initDeck();
console.log("Creating deck: ");
display(deck);



let shuffle = (array) => {
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
    return array;
}
console.log("\n\nShuffling deck: ");
display(shuffle(deck));
console.log(deck);


let arrangeBySuit = (array) => {
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

    return sorted;
}
console.log("\n\nSorting by suite: ");
display(arrangeBySuit(deck));
console.log(deck);


let arrangByFaceValue = (array, order = "ascending") => {
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
   
    // console.log(sorted);
    return sorted;
}
console.log("\n\nSorting by face value: ");
display(arrangByFaceValue(deck, "descending"));
display(arrangByFaceValue(deck, "ascending"));



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
    console.log(printed);
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



let dealCards = (array, num = 1, identify = false) => {
    dealtCards = [];
    if (array.length > 0) {
        let indeces = [];
        for (let i = 0; i < num; i++) {
            indeces[i] = Math.floor(Math.random() * array.length);
            dealtCards[i] = array[indeces[i]];
            array.splice(indeces[i], 1);
        }
        // console.log(indeces);
    }
    display(dealtCards);
    printName(dealtCards);

    if ((num === 5) && (identify === true)) {
        identifyHand(dealtCards);
    }
    
    return array;
}

console.log("\n\nDealing N cards: ");
dealCards(deck, 5, true);
display(deck);





console.log("\n\ntesting identify hand function: ")
display(["0-0", "0-12", "0-11", "0-10", "0-9"]);
identifyHand(["0-0", "0-12", "0-11", "0-10", "0-9"]);

display(["3-2", "3-3", "3-4", "3-5", "3-6"]);
identifyHand(["3-2", "3-3", "3-4", "3-5", "3-6"]);

display(["3-2", "3-5", "3-10", "3-9", "3-7"]);
identifyHand(["3-2", "3-5", "3-10", "3-9", "3-7"]);

display(["2-2", "2-3", "2-4", "4-5", "4-6"]);
identifyHand(["2-2", "2-3", "2-4", "4-5", "4-6"]);

display(["0-6", "1-6", "2-6", "0-5", "3-7"]);
identifyHand(["0-6", "1-6", "2-6", "0-5", "1-7"]);

display(["0-0", "1-0", "2-11", "0-11", "3-7"]);
identifyHand(["0-0", "1-0", "2-11", "0-11", "3-7"]);

display(["0-6", "1-6", "2-6", "0-7", "3-7"]);
identifyHand(["0-6", "1-6", "2-6", "0-7", "3-7"]);

display(["0-2", "1-7", "3-10", "3-9", "3-7"]);
identifyHand(["0-2", "1-7", "3-10", "3-9", "3-7"]);

display(["0-2", "1-2", "2-2", "3-2", "2-9"]);
identifyHand(["0-2", "1-2", "2-2", "3-2", "2-9"]);



//------------------------------- DOM related functions -----------------------------

const table = document.querySelector(".table");
const displayDiv = document.querySelector(".display");

let display_DOM = (array) => {
    let output = "", suite, face, color, cardData; //an array holding 2 values: 1 for suite, 1 for card value
    for (let i = 0; i < array.length; i++) {
        cardData = array[i].match(/\d+/g).map(Number);

        //if else block for suite assignment
        if (cardData[0] === 3) {
            suite = "\u2662";               //diamonds
            color = "red";
        }                
        else if (cardData[0] === 2) {
            suite = "\u2661";               //hearts
            color = "red";
        }           
        else if (cardData[0] === 1) {
            suite = "\u2660";               //spades
            color = "black";
        }           
        else {
            suite = "\u2663";               //clubs
            color = "black";
        }                                  
        
        //if else block for face assignment
        //*this function considers Ace as a face card
        if (cardData[1] === 0) { face = "A"; }
        else if (cardData[1] === 10) { face = "J"; }
        else if (cardData[1] === 11) { face = "Q"; }
        else if (cardData[1] === 12) { face = "K"; }
        else { face = cardData[1] + 1; }


        output += `<div class="card ${color}">${face}${suite}</div>`;
    }
    displayDiv.innerHTML = output;
}

display_DOM(deck);
