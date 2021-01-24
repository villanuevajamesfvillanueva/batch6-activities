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
    } else {
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
    form2_check();
});

function form2_check() {
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


//---------------------------- email validation ---------------------------------
// function validateEmail(email) {
//     var form = document.getElementById("survey-form");
//     var email = document.getElementById("email").value;

//     var text = document.getElementById()
//     const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
//     return re.test(String(email).toLowerCase());
// }