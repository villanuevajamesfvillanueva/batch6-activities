//------------------- checking states of form2 required fields when clicking next -------------------














// -----------------custom dropdown menu-----------------
function requireDropDown() {
    const selected = document.querySelector(".selected");
    const optionsContainer = document.querySelector(".options-container");

    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");            //toggle active upon click to activate/deactivate conditions
    });     

    function dropDownSelect() {
        optionsList.forEach(option => {
            option.addEventListener("click", () => {
                selected.innerHTML = option.querySelector("label").innerHTML;    //change html to selected option
                optionsContainer.classList.remove("active");
            //bug fix
                var selectedRadio = option.firstElementChild;
                selectedRadio.checked = true;
                // console.log("dropdown = " + selectedRadio.checked);
                return true;               
            });
        });
    }

    dropDownSelect();
}
requireDropDown();



// ----------------------  required radio check (used for both radio and dropdown) ----------------------------------
function requireRadio(elementClass) {
    var radioOptions = document.getElementsByClassName(elementClass);
    var oneIsChecked = false;
        for (i = 0; i < radioOptions.length; i++) {
            if (radioOptions[i].checked === true) {
                oneIsChecked = true
            }
        }
        return oneIsChecked;
}


// -----------------required checkbox check -----------------
function deRequireCb(elementClass) {
    var checkbox = document.getElementsByClassName(elementClass);

    var atLeastOneChecked = false;        //at least one checkbox is checked
    for (i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked === true) {
            atLeastOneChecked = true;
        }
    }

    if (atLeastOneChecked) {
        for (i = 0; i < checkbox.length; i++) {
            checkbox[i].required = false;
        }
    }
    else {
        for (i = 0; i < checkbox.length; i++) {
            checkbox[i].required = true;
        }
    }
    return atLeastOneChecked;
}

//------------------- checking states of form2 required fields when clicking next -------------------
const form2_button = document.getElementById("form2_next");
form2_button.addEventListener("click", () => {
    console.log("dropdown = " + requireRadio("radio"));                 //can use requireRadio for dropdown since it's custom and is radio underneath
    console.log("radio = " + requireRadio("radio-input"));
    console.log("checkbox = " + deRequireCb("checkboxx"));
    form2Check();
});

var form2_clear = false;
function form2Check() {
    if (deRequireCb("checkboxx") && requireRadio("radio-input") && requireRadio("radio")) {
        form2_clear = true;
        console.log("form2 = CLEAR");
    }
    else {
        console.log("form2 = UNFINISHED")
    }
}

/*--------------------------- transition between forms ---------------------------*/
// function animatedForm() {
//     const buttons = document.querySelectorAll(".form-button");          //get all buttons

//     buttons.forEach(button => {
//         button.addEventListener("click", () => {
            
//         });
//     });   
// }

// animatedForm();

// CONTINUE TRANSITION EFFECT SOME OTHER TIME!!!!



//------------------------------ page progress ---------------------------------
function scrollprogress() {
    var winscroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winscroll/height)*100;
    document.getElementById("scroll-indicator").style.width = scrolled + "%";
}

window.onscroll = function() {
    scrollprogress();
};




var phoneNumberInput = document.getElementById("number");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");




//continuous checking of phone number using .oninput
function validatePhoneNumber() {
    //const phoneNumberInput = document.getElementById("number");
    phoneNumberInput.oninput = numberCheck;
}

    function numberCheck() {
        const numFormat = /^(?:[0][9]\d{9}|[0][9]\d{2} \d{3} \d{4})$/gm;
        var input_number = document.getElementById('number').value;
        var test = numFormat.test(input_number);
        console.log("phone-number valid = " + test);

        if (!test) {
            document.getElementById('phone-error').classList.remove('hidden');
        }
        else {
            document.getElementById('phone-error').classList.add('hidden');
        }
        return test;
        // return test;                input field is disabled if there's a return value WWWWHHHHYYYYYY
    }


validatePhoneNumber();
//numberCheck(); //call also numberCheck when clicking submit




//checking name
function validateName() {
    //const nameInput = document.getElementById("name");
    nameInput.oninput = nameCheck;
}


    function nameCheck() {
        const name = document.getElementById("name").value;

        if (name) {
            console.log("name valid = true");
            return true;
        }
        else {
            console.log("name valid = false")
            return false;
        }

        //test is not that thorough since it's name
    }

validateName();



function validateEmail() {
    //const emailInput = document.getElementById("email");
    emailInput.oninput = emailCheck;
}

    function emailCheck() {
        const email = document.getElementById("email");
        const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const test = emailFormat.test(email.value);
        console.log("email valid = " + test);
        return test;

        // email.oninvalid = invalidEmail;
        // console.log("email.invalid = " + email.invalid);
        // function invalidEmail() {
        //     //return true;
        // }                                            //STUDY MORE ABOUT  oninvalid
        
    
    }

validateEmail();

function form1Check() {
    nameCheck();
    emailCheck();
    numberCheck();
}



//-------------------------------- form1 validation ----------------------------------
const form1_button = document.getElementById("form1_next");
// form1_button.disabled = true;           //button disabled initially
var form1_clear = false;
form1_button.addEventListener("click", () => {
    
    
    if (nameCheck() && emailCheck() && numberCheck()) {
        // form1_button.disabled = false;
        //should be able to submit
        form1_clear = true;
        console.log("form1 = CLEAR");
    }
    else {
        alert("Please accomplish all fields.");
        console.log("form1 = UNFINISHED");
    }
});

// document.getElementById('survey-form').addEventListener('submit', numberCheck);

document.getElementById('survey-form').addEventListener('submit', form1Check);

