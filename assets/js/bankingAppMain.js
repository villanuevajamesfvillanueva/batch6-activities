
const homeButton = document.querySelector(".home");
const clientsButton = document.querySelector(".clients");
const addNewClientButton = document.querySelector(".add-new-client");
const deleteClientButton = document.querySelector(".delete-client"); 
const fundTransferButton = document.querySelector(".fund-transfer");
const withdrawDepositButton = document.querySelector(".withdrawdeposit");
const transactHistButton = document.querySelector(".transact-histories");
const analyticsButton = document.querySelector(".analytics");

const enrollClient = document.querySelector(".enroll-client");
const deleteClientActual = document.querySelector(".delete-client-actual"); 
const tbody = document.querySelector(".tbody-clients");
const tbodyComplete = document.querySelector(".tbody-clients-complete");
const tbodyHistory = document.querySelector(".history-tbody");

const withdraw = document.querySelector(".withdraw");
const deposit = document.querySelector(".deposit");

const amountTransfer = document.querySelector(".amount-transfer"); 

const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
    window.location.href = "Activity15_BankingApp.html";
});

const mainDivs = document.querySelectorAll(".main-div");
const navItems = document.querySelectorAll(".nav-item");

//default data => localStorage => clientListCompleteData
//when adding: add to clientListCompleteData, add to localStorage
//when deleting: remove from clientListCompleteData, remove from localStorage
//               add to archive (obj in localStorage) e.x. archive : { contents }
//when displaying data in html table: display clientListCompleteData 
//                                    hypothesis: accessing clientListCompleteData is faster than accessing ls



//creating history entry in localStorage
if (localStorage.getItem("history") === null) {
    localStorage.setItem("history", "[]");
}



//--------------------------------- loading default data to localStorage ---------------------------------
defaultData = [];
let loadToLocalStorage = () => {
    for (var data of defaultData) {
        localStorage.setItem(data.accountNum, JSON.stringify(data));
    }
}
loadToLocalStorage();


//--------------------------------- loading localStorage to clientListCompleteData ---------------------------------
let clientListCompleteData = [];
let loadFromLsToObjectlist = () => {
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === "history" || localStorage.key(i) === "validLoginDetails" || localStorage.key(i) === "darkmode") {
            continue;
        }   
        var acctString = localStorage.getItem(localStorage.key(i));
        var acctObject = JSON.parse(acctString);
        clientListCompleteData.push(acctObject);
    }
}
loadFromLsToObjectlist();


//--------------------------------- loading data to html table from localStorage --------------------------------- 
// let loadData = () => {
//     tbody.innerHTML = "";
//     for (var i = 0; i < localStorage.length; i++) {
//         var acctString = localStorage.getItem(localStorage.key(i));
//         var acctObject = JSON.parse(acctString);
//         // console.log(acctObject);

//         var tr = document.createElement("tr");

//         var tdClient = document.createElement("td");
//         var clientName = document.createTextNode(acctObject.accountName);
//         tdClient.appendChild(clientName);

//         var tdAcctNum = document.createElement("td");
//         tdAcctNum.classList.add(acctObject.accountNum);
//         var acctNum = document.createTextNode(acctObject.accountNum);
//         tdAcctNum.appendChild(acctNum);

//         var tdRemainingBal = document.createElement("td");
//         var remainingBal = document.createTextNode(acctObject.accountBal);
//         tdRemainingBal.appendChild(remainingBal);

//         tr.appendChild(tdClient);
//         tr.appendChild(tdAcctNum);
//         tr.appendChild(tdRemainingBal);
//         tbody.appendChild(tr);
//     }
// }
// loadData();

//--------------------------------- loading data to html table from clientListCompleteData--------------------------------- 
let loadData = () => {
    tbody.innerHTML = "";
    for (var client of clientListCompleteData) {
        var tr = document.createElement("tr");

        var tdClient = document.createElement("td");
        var clientName = document.createTextNode(client.accountName);
        tdClient.appendChild(clientName);

        var tdAcctNum = document.createElement("td");
        var acctNum = document.createTextNode(client.accountNum);
        tdAcctNum.appendChild(acctNum);

        var tdRemainingBal = document.createElement("td");
        var remainingBal = document.createTextNode(client.accountBal);
        tdRemainingBal.appendChild(remainingBal);

        tr.classList.add(client.accountNum);
        tr.appendChild(tdClient);
        tr.appendChild(tdAcctNum);
        tr.appendChild(tdRemainingBal);
        tbody.appendChild(tr);
        //same as creating new tr, maybe can transform this into a separate function
    }
}
loadData();


//--------------------------------- loading partial data to html table (home div) ---------------------------------
const homeDiv = document.querySelector(".home-div");
const clientsDiv = document.querySelector(".clients-div");
const historyDiv = document.querySelector(".history-div");
const analyticsDiv = document.querySelector(".analytics-div");


homeButton.addEventListener("click", () => {
    loadData();
    homeDiv.style.visibility = "visible";
    clientsDiv.style.visibility = "hidden";
    historyDiv.style.visibility = "hidden";
    analyticsDiv.style.visibility = "hidden";
});



//--------------------------------- loading complete data to html table (clients div) ---------------------------------
clientsButton.addEventListener("click", () => {
    loadCompleteData();
    homeDiv.style.visibility = "hidden";
    clientsDiv.style.visibility = "visible";
    historyDiv.style.visibility = "hidden";
    analyticsDiv.style.visibility = "hidden";
    
});

let loadCompleteData = () => {
    tbodyComplete.innerHTML = "";
    for (var client of clientListCompleteData) {
        var tr = document.createElement("tr");

        var tdClient = document.createElement("td");
        var clientName = document.createTextNode(client.accountName);
        tdClient.appendChild(clientName);

        var tdAcctNum = document.createElement("td");
        var acctNum = document.createTextNode(client.accountNum);
        tdAcctNum.appendChild(acctNum);

        var tdMobileNum = document.createElement("td");
        var mobileNum = document.createTextNode(client.mobileNumber);
        tdMobileNum.appendChild(mobileNum);

        var tdAddress = document.createElement("td");
        var address = document.createTextNode(client.address);
        tdAddress.appendChild(address);

        var tdRemainingBal = document.createElement("td");
        var remainingBal = document.createTextNode(client.accountBal);
        tdRemainingBal.appendChild(remainingBal);

        var tddateCreated = document.createElement("td");
        var dateCreated = document.createTextNode(client.dateCreated);
        tddateCreated.appendChild(dateCreated);

        tr.classList.add(client.accountNum);
        tr.appendChild(tdClient);
        tr.appendChild(tdAcctNum);
        tr.appendChild(tdMobileNum);
        tr.appendChild(tdAddress);
        tr.appendChild(tdRemainingBal);
        tr.appendChild(tddateCreated);
        tbodyComplete.appendChild(tr);
    }
}


//--------------------------------- for generating unique account number ---------------------------------
let uniqueAccntNum = () => {
    var unique = false;
    while(!unique) {
        var rand = "00" + Math.random().toString().slice(2,10);
        for (let client in clientListCompleteData) {
            if (client.accountNum === rand) {
                break;
            }
        }
        unique = true;
    }
    return rand;
}


// //-------------------------------------- for enrolling new client --------------------------------------
const enrollDiv = document.querySelector(".enroll-div");
const enrollX = document.querySelector(".enroll-x");
const enrollErrMsg = document.querySelector(".enroll-err");

enrollX.addEventListener("click", () => {
    enrollDiv.classList.toggle("active");
    enrollDiv.classList.toggle("inactive");
});
addNewClientButton.addEventListener("click", () => {
    enrollErrMsg.innerHTML = "";
    enrollDiv.classList.toggle("active");
    enrollDiv.classList.toggle("inactive");
});

enrollClient.addEventListener("click", () => {
    addNewClient();
    loadData();
    loadCompleteData();
});
//reloading entire data from clientListCompleteData; can be optimized

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const accountName = firstname.value + " " + lastname.value;
const contactNum = document.getElementById("contact-num");
const address = document.getElementById("address");
const startingBal = document.getElementById("starting-bal");



        //-------------------------------------- input field tests
        function firstnameCheck() {
            const nameFormat = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
            var test = nameFormat.test(firstname.value);
            return test;
        }
        firstname.oninput = firstnameCheck;

        function lastnameCheck() {
            const nameFormat = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
            var test = nameFormat.test(lastname.value);
            return test;
        }
        lastname.oninput = lastnameCheck;

        // function emailCheck() {
        //     const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        //     var test = emailFormat.test(email.value);
        //     return test;
        // }

        function numberCheck() {
            const numFormat = /^(?:[0][9]\d{9}|[0][9]\d{2} \d{3} \d{4})$/gm;
            var test = numFormat.test(contactNum.value);
            return test;
        }
        contactNum.oninput = numberCheck;

        function balCheck() {
            const numFormat = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/gm
            var test = numFormat.test(startingBal.value);
            return test;
        }
        startingBal.oninput = balCheck;


let addNewClient = () => {
    enrollErrMsg.innerHTML = "";
    enrollErrMsg.style.color = "red";
    console.log("----------- checking create account input fields ----------");
    let test1 = firstnameCheck();
    let test2 = lastnameCheck();
    // let test3 = emailCheck();
    
    let test4 = numberCheck();
    let test5 = balCheck();
    let test6 = address.value.length;

    console.log("firstname valid = " + test1);
    console.log("lastname valid = " + test2);
    // console.log("email valid = " + test3);
    console.log("phone-number valid = " + test4);
    console.log("starting balance valid = " + test5);

    if (test1 && test2 && test4 && test5 && test6) {
        var rand = uniqueAccntNum();

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        //adding new client data to clientListCompleteData array
        let newClient = {};
        newClient.accountName = firstname.value + " " + lastname.value;
        newClient.mobileNumber = contactNum.value;
        newClient.address = address.value;
        newClient.accountNum = rand;
        newClient.accountBal = parseFloat(startingBal.value).toFixed(2);
        newClient.dateCreated = today;
        clientListCompleteData.push(newClient);

        //adding new client data to localStorage
        localStorage.setItem(rand, JSON.stringify(newClient));
        enrollErrMsg.style.color = "#88c148";
        enrollErrMsg.innerHTML += "Client successfully enrolled. ";
        console.log("Client successfully enrolled.");

        //clearing input fields
        firstname.value = "";
        lastname.value = "";
        contactNum.value = "";
        address.value = "";
        startingBal.value = "";

        return true;
    }

    if (!test1 || !test2) {
        console.log("\tInvalid name.");
        enrollErrMsg.innerHTML += "Invalid name. ";
        return;
    }

    if (!test4) {
        console.log("\tInvalid contact number.");
        enrollErrMsg.innerHTML += "Invalid contact number. ";
        return;
    }

    if (!test5) {
        console.log("\tInvalid amount.");
        enrollErrMsg.innerHTML += "Invalid amount. ";
        return;
    }

    if (!test6) {
        console.log("\tInvalid address.");
        enrollErrMsg.innerHTML += "Invalid address. ";
        return;
    }

    else {
        console.log("\tClient enrollment failed. Please try again");
        enrollErrMsg.innerHTML = "Client enrollment failed. Please try again";
        return false;
    }
}


//----------------------------------------------- for deleting client -----------------------------------------------
const deleteDiv = document.querySelector(".delete-div");
const deleteX = document.querySelector(".delete-x");
deleteX.addEventListener("click", () => {
    deleteDiv.classList.toggle("active");
    deleteDiv.classList.toggle("inactive");
});
deleteClientButton.addEventListener("click", () => {
    //display enroll new client div
    deleteDiv.classList.toggle("active");
    deleteDiv.classList.toggle("inactive");
});


deleteClientActual.addEventListener("click", () => {  
    deleteClient();
    loadData();
    loadCompleteData();  
});

let deleteClient = () => {
    const deletingAcctNum = document.getElementById("deleting-acct");
    const failed = document.querySelector(".failed-delete");
    const success = document.querySelector(".success-delete");
    success.innerHTML = "";
    failed.innerHTML = "";
    var validAccnt = false;
    
    //checking in clientListCompleteData if acct number exists
    let len = clientListCompleteData.length;
    for (let i = 0; i < len; i++) {
        if (clientListCompleteData[i].accountNum === deletingAcctNum.value) {
            //removing from clientListCompleteData
            clientListCompleteData.splice(i, 1);
            success.innerHTML += `Account number ${deletingAcctNum.value} is successfully deleted.`;
            validAccnt = true;

            //removing from localStorage
            localStorage.removeItem(deletingAcctNum.value);
            console.log(`Account number ${deletingAcctNum.value} deleted`);
            break;
        }
    }

    if (!validAccnt) { failed.innerHTML = "Deletion failed. Account number does not exist."; }

    //clearing input field
    deletingAcctNum.value = "";
    //store in an array first (deleted client list) before removing  
}



//-------------------------------------------- withdraw/deposit -------------------------------------------
const withdrawDepositDiv = document.querySelector(".withdrawdeposit-div");
const withdrawDepositX = document.querySelector(".withdrawdeposit-x");
const failedChangeBal = document.querySelector(".failed-withdrawdeposit");
const successChangeBal = document.querySelector(".success-withdrawdeposit");

withdrawDepositX.addEventListener("click", () => {
    successChangeBal.innerHTML = "";
    failedChangeBal.innerHTML = "";
    withdrawDepositDiv.classList.toggle("active");
    withdrawDepositDiv.classList.toggle("inactive");
});
withdrawDepositButton.addEventListener("click", () => {
    successChangeBal.innerHTML = "";
    failedChangeBal.innerHTML = "";
    withdrawDepositDiv.classList.toggle("active");
    withdrawDepositDiv.classList.toggle("inactive");
});
withdraw.addEventListener("click", () => {
    changeBal(0);
    // addToHistory();
    loadData();
    loadCompleteData();
    loadHistory();
});
deposit.addEventListener("click", () => {
    changeBal(1);
    // addToHistory();
    loadData();
    loadCompleteData();
    loadHistory();
});


let changeBal = (param) => {
    // param === 0: withdraw, param ==== 1:deposit
    failedChangeBal.innerHTML = "";
    const account = document.getElementById("withdrawdeposit-acct");
    const amount = document.getElementById("amount");
    var amt = Number(amount.value);
    
    var validAccount = false;
    var sufficientBal = false;

    for (var accnt of clientListCompleteData) {
        if (accnt.accountNum === account.value) {
            validAccount = true;

            //for withdrawal
            if (param === 0) {
                if (accnt.accountBal >= amt) { sufficientBal = true; }
                else {
                    console.log("Withdraw failed. Insufficient amount");
                    failedChangeBal.innerHTML += "Withdraw failed. Insufficient amount";
                    amount.value = "";
                    return;
                }
            }
            break;
        }
    }

    if (!validAccount) {
        console.log("Transaction failed. Invalid account number.");
        failedChangeBal.innerHTML += "Transaction failed. Invalid account number.";
        account.value = "";
        // amount.value = "";
        return;
    }

    //logging to history
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    let bal = Number(accnt.accountBal);
    if (param === 0 && validAccount && sufficientBal) {
        bal -= amt;
        successChangeBal.innerHTML += `Withdrawn Php ${amt} from ${accnt.accountNum}`;
        accnt.accountBal = bal.toFixed(2);
        //fix rounding errors (e.x. transferring 0.99, transferring 0.1 then 0.01)
        var trasaction = [account.value, "withdraw", amt, today];
    }

    else if (param === 1 && validAccount) {
        bal += amt;
        successChangeBal.innerHTML += `Deposited Php ${amt} to ${accnt.accountNum}`;
        accnt.accountBal = bal.toFixed(2);
        //fix rounding errors (e.x. transferring 0.99, transferring 0.1 then 0.01)
        var trasaction = ["deposit", account.value, amt, today];
    }

    //updating clientListCompleteData

    var history = JSON.parse(localStorage.getItem("history"));
    //what happens if history is empty?
    history.push(trasaction);
    localStorage.setItem("history", JSON.stringify(history));

    //updating localStorage
    localStorage.setItem(account.value, JSON.stringify(accnt));

    account.value = "";
    amount.value = "";
}

//----------------------------------------------- for fund transfer -----------------------------------------------
const fundTransferDiv = document.querySelector(".fund-transfer-div");
const transferX = document.querySelector(".transfer-x");
transferX.addEventListener("click", () => {
    fundTransferDiv.classList.toggle("active");
    fundTransferDiv.classList.toggle("inactive");
});
fundTransferButton.addEventListener("click", () => {
    //display enroll new client div
    fundTransferDiv.classList.toggle("active");
    fundTransferDiv.classList.toggle("inactive");
});

amountTransfer.addEventListener("click", () => {
    fundTrasfer();
    // addToHistory();
    loadData();
    loadCompleteData();
    loadHistory();
});
//reloading entire data from clientListCompleteData; can be optimized

let fundTrasfer = () => {
    const transferFrom = document.getElementById("transfer-from");
    const transferTo = document.getElementById("transfer-to");
    const transferAmount = document.getElementById("transfer-amount");
    var amt = Number(transferAmount.value);

    const failed = document.querySelector(".failed-transfer");
    const success = document.querySelector(".success-transfer");
    success.innerHTML = "";
    failed.innerHTML = "";
   
    var validAccntFrom = false;
    var validAccntTo = false;
    
    var validAccnts = false;
    var sufficientBal = false;

    for (var acctFrom of clientListCompleteData) {
        if (acctFrom.accountNum === transferFrom.value) {
            validAccntFrom = true;
            if (acctFrom.accountBal >= amt) { sufficientBal = true; }
            else {
                console.log("Transfer failed. Insufficient amount");
                failed.innerHTML += "Transfer failed. Insufficient amount";
                transferAmount.value = "";
                return;
            }
            break;
        }
    }
    if (!validAccntFrom) {
        console.log("Transfer failed. Invalid sender account number");
        failed.innerHTML += "Transfer failed. Invalid sender account number";
        transferFrom.value = "";
        return;
    }

    for (var acctTo of clientListCompleteData) {
        if (acctTo.accountNum === transferTo.value) {
            validAccntTo = true;
            break;
        }
    }
    if (!validAccntTo) {
        console.log("Transfer failed. Invalid receiver account number");
        failed.innerHTML += "Transfer failed. Invalid receiver account number";
        transferTo.value = "";
        return;
    }

    if (transferFrom.value !== transferTo.value) { validAccnts = true; }
    else {
        console.log("Transfer failed. Sender and Receiver accounts can't be the same.");
        failed.innerHTML += "Transfer failed. Sender and Receiver accounts can't be the same.";
        transferFrom.value = "";
        transferTo.value = "";
        return;
    }

    if (validAccntFrom && validAccntTo && sufficientBal && validAccnts) {
        let balFrom = Number(acctFrom.accountBal);
        let balTo = Number(acctTo.accountBal);
        balFrom -= amt;
        balTo += amt;
        success.innerHTML += `Transfer successful. Transferred Php ${amt} from ${acctFrom.accountNum} to ${acctTo.accountNum}`;
        acctFrom.accountBal = balFrom.toFixed(2);
        acctTo.accountBal = balTo.toFixed(2);
        //fix rounding errors (e.x. transferring 0.99, transferring 0.1 then 0.01)
        
        //updating clientListCompleteData

        //logging to history
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        var trasaction = [transferFrom.value, transferTo.value, amt, today]
        var history = JSON.parse(localStorage.getItem("history"));
        //what happens if history is empty?
        history.push(trasaction);
        localStorage.setItem("history", JSON.stringify(history));

        //updating localStorage
        localStorage.setItem(transferFrom.value, JSON.stringify(acctFrom));
        localStorage.setItem(transferTo.value, JSON.stringify(acctTo));
    }
    



    //clearing input fields
    transferFrom.value = "";
    transferTo.value = "";
    transferAmount.value = "";
}



//----------------------------------------------- for transaction histories -----------------------------------------------
transactHistButton.addEventListener("click", () => {
    loadHistory();
    homeDiv.style.visibility = "hidden";
    clientsDiv.style.visibility = "hidden";
    historyDiv.style.visibility = "visible";
    analyticsDiv.style.visibility = "hidden";
});


//loading history to html table
let loadHistory = () => {
    tbodyHistory.innerHTML = "";
    var history = JSON.parse(localStorage.getItem("history"));

    for (var transact of history) {
        var tr = document.createElement("tr");

        var tdSender = document.createElement("td");
        var sender = document.createTextNode(transact[0]);
        tdSender.appendChild(sender);

        var tdReceiver = document.createElement("td");
        var receiver = document.createTextNode(transact[1]);
        tdReceiver.appendChild(receiver);

        var tdAmount = document.createElement("td");
        var amount = document.createTextNode(transact[2]);
        tdAmount.appendChild(amount);

        var tdDate = document.createElement("td");
        var date = document.createTextNode(transact[3]);
        tdDate.appendChild(date);

        tr.appendChild(tdSender);
        tr.appendChild(tdReceiver);
        tr.appendChild(tdAmount);
        tr.appendChild(tdDate);
        tbodyHistory.appendChild(tr);
    }
}



var tl = anime.timeline({
    autoplay: true,
    delay: 200,
});

tl.add({
    targets: "#logo",
    translateY: [-100, 0],
    opacity: [0, 1],
    elasticity: 600,
    duration: 1500,
}).add({
    targets: "#logo-hexagon",
    rotate: [-90, 0],
    duration: 1200,
    elasticity: 600,
}, "100").add({
    targets: "#logo-circle",
    scale: [0, 1],
    duration: 1200,
    elasticity: 600,
}, "500").add({
    targets: "#logo-mask",
    scale: [0, 1],
    duration: 1000,
    elasticity: 600,
}, "550").add({
    targets: "#logo-text",
    translateX: ['-100%', 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeOutExpo",
}, 1000).add({
    targets: ".tagline",
    opacity: [0, 1],
    duration: 5000,
}, 2000);

const title = document.querySelector(".site-title");
const hexagonLogo = document.querySelector("#logo-hexagon");
const circleLogo = document.querySelector("#logo-circle");
title.addEventListener("click", () => tl.restart());
hexagonLogo.addEventListener("click", () => tl.restart());
circleLogo.addEventListener("click", () => tl.restart());


// mainDivs.forEach(mainDiv => {

// });


//checkbox for multiple select => delete



//----------------------------------------------- for darkmode -----------------------------------------------
//creating darkmode entry in localStorage
if (localStorage.getItem("darkmode") === null) {
    localStorage.setItem("darkmode", "false");
}

const chk = document.getElementById('chk');
const tableOverflowCover = document.querySelector('.overflow-cover');
let darkmode = JSON.parse(localStorage.getItem("darkmode"));
chk.checked = darkmode;
let runDarkmode = () => {
    if (darkmode === true) {
        document.body.classList.add('dark');
        tableOverflowCover.classList.add('dark');
    }
    else {
        document.body.classList.remove('dark');
        tableOverflowCover.classList.remove('dark');
    }
}
runDarkmode();

chk.addEventListener('change', () => {
    darkmode = !darkmode;
    localStorage.setItem("darkmode", darkmode);
    runDarkmode();
});



//----------------------------------------------- for analytics -----------------------------------------------
let chart1 = document.getElementById("chart1").getContext("2d");
let chart2 = document.getElementById("chart2").getContext("2d");
let chart3 = document.getElementById("chart3").getContext("2d");

//settings
Chart.defaults.font.family = "Varela Round";
Chart.defaults.font.size = "14";
Chart.defaults.color = "#8081ad";

let months = ["Jan", "Feb", "March", "April"];
let colors = ["#1e64e4", "#88c148", "#FF7B7B", "#fe9b07"];

let config1 = {
    type: "bar",
    data: {
        labels: months,
        datasets: [{
            label: "Php",
            data: [517594, 401045, 303060, 206519],
            backgroundColor: colors,
            borderWidth: 1,
            borderColor: "gray",
            hoverBorderWidth: 4,
            hoverBorderColor: "red"
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: "Q1 Monthly Total",
                font: {
                    size: 24
                } 
            },
            legend: {
                display: false
            }
        },
        animation: {
            duration: 1000,
            easing: "easeInOutQuad"
        }
    }
}


let config2 = {
    type: "line",
    data: {
        labels: months,
        datasets: [{
            label: "Php",
            data: [17594, -116549, -97985, -96549],
            backgroundColor: colors,
            borderWidth: 1,
            borderColor: "gray",
            hoverBorderWidth: 4,
            hoverBorderColor: "red"
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: "Q1 Monthly Cashflow",
                font: {
                    size: 24
                }
            },
            legend: {
                display: false
            }
        },
        animation: {
            duration: 1000,
            easing: "easeInOutQuad"
        }
    }
}

let config3 = {
    type: "doughnut",  
    data: {
        labels: ["Platinum", "Gold", "Pro", "Basic"],
        datasets: [{
            label: "",
            data: [7594, 14045, 21060, 40659],
            backgroundColor: ["#C0C0C0", "#FFD700", "#1e64e4", "#88c148"],
            borderWidth: 1,
            borderColor: "gray",
            hoverBorderWidth: 4,
            hoverBorderColor: "red"
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: "Membership Proportions",
                font: {
                    size: 30
                }
            },
        },
        animation: {
            duration: 1200,
            easing: "easeInOutQuad"
        }   
    }
}


let firstChart = new Chart(chart1, config1);
let secondChart = new Chart(chart2, config2);
let thirdChart = new Chart(chart3, config3);


analyticsButton.addEventListener("click", () => {
    // function to load data goes here
    homeDiv.style.visibility = "hidden";
    clientsDiv.style.visibility = "hidden";
    historyDiv.style.visibility = "hidden";
    analyticsDiv.style.visibility = "visible";

    firstChart.destroy();
    secondChart.destroy();
    thirdChart.destroy();

    firstChart = new Chart(chart1, config1);
    secondChart = new Chart(chart2, config2);
    thirdChart = new Chart(chart3, config3);
});


const notAvail = document.querySelectorAll(".not-avail-yet");
const notAvailMsg = document.querySelector(".not-avail");
const notAvailMsgX = document.querySelector(".not-avail-x");
const bgOverlay = document.querySelector(".bg-overlay");
// const bgOverlay2 = document.querySelector(".bg-overlay2");

notAvail.forEach(button => {
    button.addEventListener("click", () => {
        notAvailMsg.style.transform = "translateX(-50%) translateY(-50%) scale(1)";
        bgOverlay.style.transform = "scale(1)";
    });
});

notAvailMsgX.addEventListener("click", () => {
    notAvailMsg.style.transform = "translateX(-50%) translateY(-50%) scale(0)";
    bgOverlay.style.transform = "scale(0)";
});

bgOverlay.addEventListener("click", () => {
    notAvailMsg.style.transform = "translateX(-50%) translateY(-50%) scale(0)";
    bgOverlay.style.transform = "scale(0)";
});