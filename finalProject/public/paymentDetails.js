const paymentTypeSelect = document.getElementById('payment-type');
const cardNumInput = document.getElementById('card-num');
const expMonthInput = document.getElementById('exp-month');
const expYearInput = document.getElementById('exp-year');
const cvcInput = document.getElementById('cvc');
const psk = document.querySelector('.psk');
const verifyBtn = document.querySelector('.verify-btn');

//make sure this should only be clicked once bec clicking again creates new key
verifyBtn.addEventListener('click', function(event) {
    event.preventDefault(); //to keep page from reloading while waiting for the paymongo data
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${psk.dataset.itemId}}`
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
        console.log(resp);
        console.log(resp.data.id);
        console.log("payment details verified");
    }).catch(err => console.error(err));

});
