if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const paymongoPublicKey = Buffer.from(process.env.PAYMONGO_PUBLIC_KEY).toString('base64');
const paymongoSecretKey = Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64');

const fetch = require("node-fetch");
const express = require('express');
const fs = require('fs');
const debug = require('debug')('app_debug');
const morgan = require('morgan');
// const { response } = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
//custom middleware; explore third party middlewares
app.use(morgan('dev'));

app.get('/', (req, res) => {
    fs.readFile('items.json', (err, data) => {
        if (err) res.status(500).end();
        else res.render('index', {
            title: "Champs-Élysées",
            items: JSON.parse(data)
        });
    });
});

//response acts as like a return but for the entire program
//once the server sends a response, code below it doesn't get executed


app.get('/payment_details', (req, res) => {
    res.render('payment_details', {
        title: "Payment Details",
        psk: paymongoSecretKey,
        clientKey: clientKey
    });
});


//app.use(func) runs for all type of request for all routes so should be put at the end
//so order matters

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


async function resp() {
    let url = "https://api.paymongo.com/v1/payment_intents";
    let response = await fetch(url, options);
    let json = await response.json();
    return json;
}

var clientKey = undefined;
resp().then(resp => {
    
    console.log(resp);
    clientKey = resp.data.attributes.client_key;
    console.log(clientKey);
    //export clientKey to frontend
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