const paymentTypeSelect = document.getElementById('payment-type');
const cardNumInput = document.getElementById('card-num');
const expMonthInput = document.getElementById('exp-month');
const expYearInput = document.getElementById('exp-year');
const cvcInput = document.getElementById('cvc');
const verifyBtn = document.querySelector('.verify-btn');


let createPaymentMethod = (event) => {
    //to keep page from reloading while waiting for the paymongo data
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
                    type: paymentTypeSelect.value
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
        // console.log(resp);
        console.log(`paymentMethod id: ${resp.data.id}`);
        console.log('----- payment details verified -----');
        console.log(`clientKey (from BE): ${clientKey}`);


        // Get the payment intent id from the client key
        // var paymentIntentId = clientKey.split('_client')[0];


    }).catch(err => console.error(err));
}

//make sure this should only be clicked once bec clicking again creates new key
verifyBtn.addEventListener('click', createPaymentMethod);