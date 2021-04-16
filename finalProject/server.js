if (process.env.NODE_ENV !== 'production') require('dotenv').config();


const paymongoPublicKey = Buffer.from(process.env.PAYMONGO_PUBLIC_KEY).toString('base64')
const paymongoSecretKey = Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')

const fetch = require("node-fetch");
const express = require('express');
const fs = require('fs');
const debug = require('debug')('app_debug');
// const { response } = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));


debug('init /shop render');
app.get('/shop', function(req, res) {
    //using this routing, server can now send variable items to the bills_payment page
    fs.readFile('items.json', function(err, data) {
        if (err) res.status(500).end();
        else res.render('shop.ejs', {
            items: JSON.parse(data)
        })
    })
})
debug('end /shop render');


debug('init /payment_details render');
app.get('/payment_details', function(req, res) {
    //using this routing, server can now send variable psk to the payment_details page
    res.render('payment_details.ejs', {
        psk: paymongoSecretKey,
    })
})
debug('end /payment_details render');


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

var clientKey = undefined
async function resp() {
    let url = "https://api.paymongo.com/v1/payment_intents"
    let response = await fetch(url, options)
    let json = await response.json()
    return json
}

debug('init payment intent post');
resp().then(resp => {
    console.log(resp);
    clientKey = resp.data.attributes.client_key;
    console.log(clientKey);
    //send clientKey to frontend
}).catch(err => console.error(err));
debug('end payment intent post');



app.listen(3000)



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