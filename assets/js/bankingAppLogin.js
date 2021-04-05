
const loginButton = document.querySelector(".login");
const loginErrorMsg = document.querySelector(".failed-login");
const forgotPassButton = document.querySelector(".forgot-password");
const createAcctButton = document.querySelector(".create-account");
const loginPageMain = document.querySelector(".login-page-main");
const loginPageFooter = document.querySelector(".login-page-footer");

//creating validLoginDetails entry in localStorage
if (localStorage.getItem("validLoginDetails") === null) {
    localStorage.setItem("validLoginDetails", "[]");
}


var loginAttempts = 0;
loginButton.addEventListener("click", () => {
    const user = document.querySelector(".user").value;
    const password = document.querySelector(".password").value;
    const loginKey = document.querySelector(".login-key").value;

    const users = JSON.parse(localStorage.getItem("validLoginDetails"));

    for (var validUser of users) {
        if (user === Object.keys(validUser)[0]) { break; }
    }

    if (password === validUser[user]) {
        console.log("Login successful.");
        console.log(`Account: ${user} is logged in.`);
        window.location.href = "mainPage.html";
    }

    else {
        console.log("Login error. User or Password is incorrect.");
        loginErrorMsg.style.opacity = 1;
        loginAttempts += 1;
        console.log(`Incorrect login attempts: ${loginAttempts}`);

        if (loginAttempts > 3) {
            console.log(`Sus`);
            //disable login
        }
    }
});


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


const notAvail = document.querySelectorAll(".not-avail-yet");
const notAvailMsg = document.querySelector(".not-avail");
const notAvailMsgX = document.querySelector(".not-avail-x");
const createAccountX = document.querySelector(".create-account-x");
const bgOverlay = document.querySelector(".bg-overlay");
const bgOverlay2 = document.querySelector(".bg-overlay2");

notAvail.forEach(button => {
    button.addEventListener("click", () => {
        notAvailMsg.style.transform = "translateX(-50%) translateY(-50%) scale(1)";
        bgOverlay.style.transform = "scale(1)";
    });
});

let clearModals = () => {
    notAvailMsg.style.transform = "translateX(-50%) translateY(-50%) scale(0)";
    createAccountDiv.style.transform = "translateX(-50%) translateY(-50%) scale(0)";
    forgotPassDiv.style.transform = "translateX(-50%) translateY(-50%) scale(0)";
    bgOverlay.style.transform = "scale(0)";
    bgOverlay2.style.transform = "scale(0)";
} 

notAvailMsgX.addEventListener("click", clearModals);
createAccountX.addEventListener("click", clearModals);
bgOverlay.addEventListener("click", clearModals);


//--------------------------------------- for forgot password ---------------------------------------
const forgotPassDiv = document.querySelector(".forgot-pass-div");
const forgotPassCancel = document.querySelector(".forgot-pass-cancel");
let forgotPassForm = () => {
    forgotPassDiv.style.transform = "translateX(-50%) translateY(-50%) scale(1)";
    bgOverlay2.style.transform = "scale(1)";
}
forgotPassButton.addEventListener("click", forgotPassForm);
forgotPassCancel.addEventListener("click", clearModals);


//--------------------------------------- for creating new account ---------------------------------------
const createAccountDiv = document.querySelector(".create-account-div");
const firstname = document.getElementById("create-firstname");
const lastname = document.getElementById("create-lastname");
const email = document.getElementById("create-email");
const contactNum = document.getElementById("create-contact-num");
const password = document.getElementById("create-password");
const date = document.getElementById("date");
const gender = document.getElementById("gender");

const errMsg = document.querySelector(".create-account-err");

let createAccountForm = () => {
    createAccountDiv.style.transform = "translateX(-50%) translateY(-50%) scale(1)";
    bgOverlay2.style.transform = "scale(1)";
}
//displaying create account form
createAcctButton.addEventListener("click", createAccountForm);
//--------------------------------------- checking name
function validateName() {
    firstname.oninput = firstnameCheck;
    lastname.oninput = lastnameCheck;
}
validateName();

    function firstnameCheck() {
        const nameFormat = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
        var test = nameFormat.test(firstname.value);
        return test;
    }

    function lastnameCheck() {
        const nameFormat = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
        var test = nameFormat.test(lastname.value);
        return test;
    }

//--------------------------------------- checking email
function validateEmail() {
    email.oninput = emailCheck;
    
}
validateEmail();

    function emailCheck() {
        errMsg.innerHTML = "";
        const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var test1 = emailFormat.test(email.value);

        //parse emails in localStorage if already exists
        var test2 = true;
        var arrLoginDetails = JSON.parse(localStorage.getItem("validLoginDetails"));
        for (var entry of arrLoginDetails) {
            if (email.value === Object.keys(entry)[0]) {
                test2 = false;
                errMsg.innerHTML = "Email is already in use. "
                console.log("\tEmail is already in use.");
                break;
            }
        }
        return (test1 || test2);
    }


//--------------------------------------- checking phone number
function validatePhoneNumber() {
    contactNum.oninput = numberCheck;
}
validatePhoneNumber();

    function numberCheck() {
        const numFormat = /^(?:[0][9]\d{9}|[0][9]\d{2} \d{3} \d{4})$/gm;
        var test = numFormat.test(contactNum.value);
        return test;
    }

//--------------------------------------- checking created password
function validateNewPass() {
    password.oninput = passwordCheck;
}
validateNewPass();

    function passwordCheck() {
        const passFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;
        //minimum eight characters, at least one letter and one number
        var test = passFormat.test(password.value);
        if (!test) { console.log("\tInvalid password. Min of 8 characters, with at least 1 letter and 1 num"); }
        return test;
    }



function inputFieldsCheck() {
    console.log("----------- checking input fields ----------");
    let test1 = firstnameCheck();
    let test2 = lastnameCheck();
    let test3 = emailCheck();
    let test4 = numberCheck();
    let test5 = passwordCheck();

    console.log("firstname valid = " + test1);
    console.log("lastname valid = " + test2);
    console.log("email valid = " + test3);
    console.log("phone-number valid = " + test4);
    console.log("password valid = " + test5);

    if (test1 && test2 && test3 && test4 && test5) {
        createAccount();
        errMsg.innerHTML = "";
        errMsg.style.color = "green";
        errMsg.innerHTML = "Account successfully created.";
        console.log("Account successfully created.");
        return true;
    }
    else {
        errMsg.innerHTML = "";
        errMsg.style.color = "red";
        errMsg.innerHTML = "Please accomplish all fields. ";
        //need more comprehensive error message
        console.log("Signup failed. Please try again.");
    }
}


const signUpButton = document.querySelector(".sign-up");
let createAccount = () => {
    //storing data in localstorage
    let account = {};
    account[email.value] = password.value;

    let loginDetails = JSON.parse(localStorage.getItem("validLoginDetails"));
    loginDetails.push(account);
    localStorage.setItem("validLoginDetails", JSON.stringify(loginDetails))

    //clearing inputs upon successful account creation
    firstname.value = "";
    lastname.value = "";
    email.value = "";
    contactNum.value = "";
    password.value = "";
    date.value = "";
    gender.value = "";

}

//actual creation of account
signUpButton.addEventListener("click", inputFieldsCheck);




//----------------------------------------------- for darkmode -----------------------------------------------
//creating darkmode entry in localStorage
if (localStorage.getItem("darkmode") === null) {
    localStorage.setItem("darkmode", "false");
}

const companyNameDiv = document.querySelector(".company-name");

let darkmode = JSON.parse(localStorage.getItem("darkmode"));
let runDarkmode = () => {
    if (darkmode === true) {
        loginPageMain.classList.add('dark');
        loginPageFooter.classList.add('dark');
        companyNameDiv.classList.add('dark');
    }
    else {
        loginPageMain.classList.remove('dark');
        loginPageFooter.classList.remove('dark');
        companyNameDiv.classList.remove('dark');
    }
}
runDarkmode();

