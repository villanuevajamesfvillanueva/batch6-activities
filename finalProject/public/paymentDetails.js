import { updateBagIcon } from './nav.js';

const paymentTypeSelect = document.getElementById('payment-type');
const cardNumInput = document.getElementById('card-num');
const expMonthInput = document.getElementById('exp-month');
const expYearInput = document.getElementById('exp-year');
const cardHolderName = document.getElementById('cardholder-name');
const cvcInput = document.getElementById('cvc');
const verifyBtn = document.querySelector('.verify-btn');

const paymentInput = document.querySelectorAll('.payment-input');
const shippingInput = document.querySelectorAll('.shipping-input');

const closeCartButton = document.querySelector('.close-cart');
function updateOrderSummary() {
    const orderSummaryTotal = document.querySelector('.order-summary-total');
    orderSummaryTotal.innerHTML = localStorage.getItem("total");
}
updateOrderSummary();
closeCartButton.addEventListener('click', updateOrderSummary);  //updating cart total display in payment page for changes in cart


const paymentStatusDiv = document.querySelector('.payment-status');
const paymentStatusMsg = document.querySelector('.payment-status-msg');
const paymentStatusImg = document.querySelector('.payment-status-img');
const overlay2 = document.querySelector('.overlay2');

overlay2.addEventListener('click', () => {
    overlay2.style.opacity = 0;
    overlay2.style.zIndex = -10;
    paymentStatusDiv.style.transform  = 'translate(-50%, -50%) scale(0)';
});

let  paymentResult = (status = 'failed') => {
    if (status === 'success') {
        paymentStatusMsg.innerHTML = 'Payment Successful';
        paymentStatusImg.src = './images/check.svg';

        //clearing fields and cart
        localStorage.clear();
        const orderSummaryTotal = document.querySelector('.order-summary-total');
        orderSummaryTotal.innerHTML = 0;
        paymentInput.forEach(item => {
            item.value = '';
        });
        shippingInput.forEach(item => {
            item.value = '';
        });
    }
    else {
        paymentStatusMsg.innerHTML = 'Sorry. Transaction Failed';
        paymentStatusImg.src = './images/failed.svg';
    }
    overlay2.style.opacity = 0.7
    overlay2.style.zIndex = 19;
    paymentStatusDiv.style.transform  = 'translate(-50%, -50%) scale(1)';
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
        paymentIntentId = clientKey.split('_client')[0];
        console.log(`paymentIntentId: ${paymentIntentId}`)
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
        console.log('--- attaching paymentIntentID to paymentMethodID ---');
        console.log('--- sending post request to process payment ---');

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
            console.log(`response status: ${resp["status"]}`);
            console.log(`response ok: ${resp["ok"]}`);
            console.log(`response statusText: ${resp["statusText"]}`);
            if (resp["status"] === 200 || resp["ok"] === true) {
                paymentResult("success");
                updateBagIcon();
            }
            else paymentResult();
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}

//make sure this should only be clicked once bec clicking again creates new key
verifyBtn.addEventListener('click', createPaymentMethod);



