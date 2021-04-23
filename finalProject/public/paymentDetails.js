const paymentTypeSelect = document.getElementById('payment-type');
const cardNumInput = document.getElementById('card-num');
const expMonthInput = document.getElementById('exp-month');
const expYearInput = document.getElementById('exp-year');
const cvcInput = document.getElementById('cvc');
const verifyBtn = document.querySelector('.verify-btn');


const closeCartButton = document.querySelector('.close-cart');
function updateOrderSummary() {
    const orderSummaryTotal = document.querySelector('.order-summary-total');
    console.log(localStorage.getItem("total"));
    orderSummaryTotal.innerHTML = localStorage.getItem("total");
}
updateOrderSummary();
closeCartButton.addEventListener('click', updateOrderSummary);  //updating cart total display in payment page for changes in cart



let  paymentResult = (status = "failed") => {
    if (status === "success") {
        
    }
    else {

    }
    
}





var clientKey = '';
var paymentIntentId = '';
let sendCartDetailsToBE = (event) => {
    event.preventDefault();
    var shoppingList = [];
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === "total") continue;
        var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
        var purchased = {};
        purchased.id = item.id;
        purchased.quantity = item.quantity;
        shoppingList.push(purchased);
    }

    fetch('/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            shoppingList: shoppingList
        })
    })
    .then(res => { return res.json() })
    .then(data => {
        console.log(data);
        clientKey = data.clientKey;
        console.log(clientKey);
        paymentIntentId = clientKey.split('_client')[0];
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

window.onload = sendCartDetailsToBE;
closeCartButton.addEventListener('click', sendCartDetailsToBE);     //updating post request for changes in cart



var paymentMethodID = 'yow';
let createPaymentMethod = (event) => {
    event.preventDefault(); 
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${psk}`
        },
        body: JSON.stringify({
            data: {
                attributes: {
                    details: {
                        card_number: cardNumInput.value,
                        exp_month: parseInt(expMonthInput.value),
                        exp_year: parseInt(expYearInput.value),
                        cvc: cvcInput.value
                    },
                    type: paymentTypeSelect.innerHTML.toLowerCase()
                }
            }
        })
    }

    async function resp() {
        let url = "https://api.paymongo.com/v1/payment_methods"
        let response = await fetch(url, options)
        let json = await response.json()
        return json
    }

    resp().then(resp => {
        paymentMethodID = resp.data.id;
        console.log(`paymentMethod id: ${paymentMethodID}`);
        console.log('----- payment details verified -----');
        return paymentMethodID;
    })
    .then(data => {
        console.log(data);

        console.log('--- attaching paymentIntentID to paymentMethodID ---');

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Basic ${psk}`
            },
            body: JSON.stringify({
                data: {
                    attributes: {
                        payment_method: data,
                    }
                }
            })
        };

        fetch(`https://api.paymongo.com/v1/payment_intents/${paymentIntentId}/attach`, options)
        .then(resp => {
            // for (var item in resp) {
            //     console.log(item, JSON.stringify(resp[item]));
            // }
            console.log(resp["status"]);
            console.log(resp["ok"]);
            console.log(resp["statusText"]);
            if (resp["status"] === 200 || resp["ok"] === true) paymentResult("success");
            else paymentResult();
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}

//make sure this should only be clicked once bec clicking again creates new key
verifyBtn.addEventListener('click', createPaymentMethod);



