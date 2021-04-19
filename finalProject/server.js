if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const paymongoPublicKey = Buffer.from(process.env.PAYMONGO_PUBLIC_KEY).toString('base64');
const paymongoSecretKey = Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64');

const fetch = require("node-fetch");
const express = require('express');
const fs = require('fs');
const debug = require('debug')('app_debug');
// const { response } = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index', {
        title: "Home"
    });
});

app.get('/shop', (req, res) => {
    fs.readFile('items.json', (err, data) => {
        if (err) res.status(500).end();
        else res.render('shop', {
            title: "Shop",
            items: JSON.parse(data)
        });
    });
});


app.get('/payment_details', (req, res) => {
    res.render('payment_details', {
        title: "Payment Details",
        psk: paymongoSecretKey,
    });
});

app.get('/cart', (req, res) => {
    res.render('cart', {
        title: "Cart"
    });
});


//this part should come from the front end as a result of cart checkout
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${paymongoSecretKey}`
    },
    body: JSON.stringify({
        data: {
            attributes: {
                amount: 10000,
                payment_method_allowed: ['card'],
                payment_method_options: {card: {request_three_d_secure: 'any'}},
                currency: 'PHP',
                description: 'for test create PaymentIntent'
            }
        }
    })
};

var clientKey = undefined;
async function resp() {
    let url = "https://api.paymongo.com/v1/payment_intents";
    let response = await fetch(url, options);
    let json = await response.json();
    return json;
}

resp().then(resp => {
    console.log(resp);
    clientKey = resp.data.attributes.client_key;
    console.log(clientKey);
    //send clientKey to frontend
}).catch(err => console.error(err));


app.listen(3000, 'localhost', () => {
    console.log('listening on port 3000...');
})


//send order info to backend (coming from /cart)
//backend posts a payment intent to paymongo [PAYMENT INTENT]
//paymongo returns a client key to backend
//backend sends client key to frontend
    //client key will be used to attach a payment method to the payment intent
//customer provides payment info
//front end posts payment method to paymongo    [PAYMENT METHOD]
//paymongo returns payment method id to front end
//front end posts payment intent attach to paymongo [ATTACH TO PAYMENT INTENT]
        //paymongo processes payment attempt
//if non 3DS: paymongo returns payment status