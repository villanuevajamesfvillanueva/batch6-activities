function nameCheck(input) {
    const nameFormat = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    var test = nameFormat.test(input);
    return test;
}


function emailCheck(input) {
    // errMsg.innerHTML = "";
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var test = emailFormat.test(input);
    return test;
}


function emailCheckWithDup(input) {
    // errMsg.innerHTML = "";
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var test1 = emailFormat.test(input);

    //parse emails in localStorage if already exists
    var test2 = true;
    var arrLoginDetails = JSON.parse(localStorage.getItem("validLoginDetails"));
    for (var entry of arrLoginDetails) {
        if (input === Object.keys(entry)[0]) {
            test2 = false;
            // errMsg.innerHTML = "Email is already in use. "
            console.log("\tEmail is already in use.");
            break;
        }
    }
    return (test1 || test2);
}


function numberCheck(input) {
    const numFormat = /^(?:[0][9]\d{9}|[0][9]\d{2} \d{3} \d{4})$/gm;
    var test = numFormat.test(input);
    return test;
}


function passwordCheck(input) {
    const passFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;
    //minimum eight characters, at least one letter and one number
    var test = passFormat.test(input);
    if (!test) { console.log("\tInvalid password. Min of 8 characters, with at least 1 letter and 1 num"); }
    return test;
}


export {nameCheck, emailCheck, emailCheckWithDup, numberCheck, passwordCheck};