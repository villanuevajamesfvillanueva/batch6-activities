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
                console.log("dropdown = " + selectedRadio.checked);
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
        alert("Please accomplish all fields.")
        console.log("form2 = UNFINISHED")
    }
}

//====================================================================================




//=============================== FORM1 =============================================

var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var ageInput = document.getElementById("age");
var phoneNumberInput = document.getElementById("number");
var form1_button = document.getElementById("form1_next");
// form1_button.disabled = true;

//checking name
function validateName() {
    nameInput.oninput = nameCheck;
    
}
validateName();

    function nameCheck() {
        const nameFormat = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
        var input_name = document.getElementById("name").value;
        var test = nameFormat.test(input_name);
        console.log("name valid = " + test);
        if (!test) {
            document.getElementById("name-error").classList.remove('hidden');
            
        }
        else {
            document.getElementById("name-error").classList.add('hidden');
        }
        return test;
    }



//checking email
function validateEmail() {
    emailInput.oninput = emailCheck;
    
}
validateEmail();

    function emailCheck() {
        const email = document.getElementById("email");
        const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const test = emailFormat.test(email.value);
        console.log("email valid = " + test);
        if (!test) {
            document.getElementById('email-error').classList.remove('hidden');
        }
        else {
            document.getElementById('email-error').classList.add('hidden');
        }
        return test;
    }


//checking age
function validateAge() {
    ageInput.oninput = ageCheck;
    
}
validateAge();

    function ageCheck() {
        const ageFormat = /^(^$|1[8-9]|[2-5][0-9]|60)$/;
        var input_age = document.getElementById("age").value;
        const test = ageFormat.test(input_age);
        console.log("age valid = " + test);
        if (!test) {
            document.getElementById('age-error').classList.remove('hidden');
        }
        else {
            document.getElementById('age-error').classList.add('hidden');
        }
        return test;
    }


//checking phone number
function validatePhoneNumber() {
    phoneNumberInput.oninput = numberCheck;
}
validatePhoneNumber();

    function numberCheck() {
        const numFormat = /^(?:[0][9]\d{9}|[0][9]\d{2} \d{3} \d{4})$/gm;
        var input_number = document.getElementById("number").value;
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


function form1Check() {
    console.log("-----------checking----------");
    if (nameCheck() && emailCheck() && ageCheck() && numberCheck()) {
        form1_button.disabled = false;
        console.log("form1 = CLEAR");
        return true;
    }
    else {
        alert("Please accomplish all fields.");
        console.log("form1 = UNFINISHED");
    }
}


// form1_button.onpointerenter = form1Check;        //this was .onpointerernter before kasi type="submit" siya nung una
form1_button.onclick = form1Check;



//=======================================================================================



//---------------------------- form3 validation --------------------------------------
function textareaCheck() {
    return true;
}

const form3_button = document.getElementById("submit");
var form3_clear = false;
form3_button.addEventListener("click", () => {
    if (textareaCheck()) {
        form3_clear = true;
        console.log("form3 = CLEAR")
    }
    else {
        console.log("form3 = UNFINISHED");
    }
});







/*--------------------------- transition between forms ---------------------------*/
const buttons = document.querySelectorAll(".form-button");
function animatedForm() {
    // const buttons = document.querySelectorAll(".form-button");          //get all buttons

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const parentForm = button.parentElement;
            const parentDiv = parentForm.parentElement;
            const nextForm = parentDiv.nextElementSibling;
            
            if (button.id === "form1_next" && nameCheck() && emailCheck() && numberCheck()) {
                console.log("----- SHIFTING. FORM1 TO FORM2 -----");
                console.log("FROM: " + parentDiv.id + " TO: " + nextForm.id);
                console.log("STATES: " + parentDiv.classList + " STATES: " + nextForm.classList);
                nextSlide(parentDiv, nextForm);
                console.log("STATES: " + parentDiv.classList + " STATES: " + nextForm.classList);
            }
            else if (button.id === "form2_next" && requireRadio("radio") && requireRadio("radio-input") && deRequireCb("checkboxx")) {
                console.log("----- SHIFTING. FORM2 TO FORM3 -----");
                console.log("FROM: " + parentDiv.id + " TO: " + nextForm.id);
                nextSlide(parentDiv, nextForm);
            }
            else if (button.id === "submit" && textareaCheck()) {
                console.log("----- SHIFTING. FORM3 TO END -----");
                console.log("FROM: " + parentDiv.id + " TO: " + nextForm.id);
                nextSlide(parentDiv, nextForm);
            }
            else if (button.id === "take-survey") {
                console.log("----- STARTING SURVEY -----");
                console.log("FROM: " + parentDiv.id + " TO: " + nextForm.id);
                nextSlide(parentDiv, nextForm);
            }
            progressBar();
        });
    });   
}

animatedForm();


function nextSlide(current, next) {
    current.classList.toggle("active");
    // current.classList.toggle("inactive");
    current.classList.add("done");
    next.classList.toggle("active");
    next.classList.toggle("inactive");
}



//------------------------------ page progress bar ---------------------------------
// function scrollprogress() {
//     var winscroll = document.body.scrollTop || document.documentElement.scrollTop;
//     var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//     var scrolled = (winscroll/height)*100;
//     document.getElementById("scroll-indicator").style.width = scrolled + "%";
// }

// window.onscroll = function() {
//     scrollprogress();
// };

//--------------------------------------------------------------------------------



//------------------------------ alternative page progress bar ---------------------------------
function progressBar() {
    const numberOfForms = document.querySelectorAll(".form-div").length;
    
    const form1 = document.getElementById("personal-details")
    const form2 = document.getElementById("survey-questions")
    const form3 = document.getElementById("comments-and-suggestions")
    const form4 = document.getElementById("thank-you")

    var prog = 1;
    if (form1.classList.contains("active")) {
        prog = 2;
    }
    else if (form2.classList.contains("active")) {
        prog = 3;
    }
    else if (form3.classList.contains("active")) {
        prog = 4;
    }
    else if (form4.classList.contains("active")) {
        prog = 5;
    } else {
        prog = 1;   //this is the landing page
    }
    var progress = (prog/numberOfForms)*100;
    document.getElementById("scroll-indicator").style.width = progress + "%";
}   

    //future update: smooth animation for progress bar