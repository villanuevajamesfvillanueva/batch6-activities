if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const paymongoPublicKey = Buffer.from(process.env.PAYMONGO_PUBLIC_KEY).toString('base64');
const paymongoSecretKey = Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64');

const fetch = require("node-fetch");
const express = require('express');
const fs = require('fs');
const debug = require('debug')('app_debug');
const morgan = require('morgan');
const { json } = require('express');
// const { response } = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
//custom middleware; explore third party middlewares
app.use(morgan('dev'));

app.get('/', (req, res) => {
    fs.readFile('items.json', (err, data) => {
        if (err) res.status(500).end();
        else res.render('index', {
            title: "Montaigne-Élysées",
            items: JSON.parse(data)
        });
    });
});

//response acts as like a return but for the entire program
//once the server sends a response, code below it doesn't get executed


app.get('/payment_details', (req, res) => {
    res.render('payment_details', {
        title: "Payment Details",
        psk: paymongoSecretKey
    });
});




fs.readFile('items.json', (err, data) => {
    if (err) res.status(500).end();
    else {
        var contents = JSON.parse(data);
        contents.products.forEach(product => {
            app.get(product.route, (req, res) => {
                res.render('item', {
                    title: "Products",
                    item: product
                });
            });
        });
    }
});


app.post('/checkout', (req, res) => {
    fs.readFile('items.json', (err, data) => {
        if (err) res.status(500).end();
        else {
            const fromItemsDotJSON = JSON.parse(data);
            const itemsArr = fromItemsDotJSON.products;
            //computing checkout total again in the backend
            var total = 0;
            req.body.shoppingList.forEach(item => {
                console.log(item);
                //finding price of purchased items in the ''database'
                const purchasedJSON = itemsArr.find(i => { return i.id == item.id; });
                total +=  purchasedJSON.price * item.quantity;
            });
            total = total/100;

            console.log(`cart total: ${total}`);

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${paymongoSecretKey}`
                },
                body: JSON.stringify({
                    data: {
                        attributes: {
                            amount: total,
                            payment_method_allowed: ['card'],
                            payment_method_options: {card: {request_three_d_secure: 'any'}},
                            currency: 'PHP',
                            description: 'for test create PaymentIntent'
                        }
                    }
                })
            };

            // console.log('options: ', options);

            async function resp() {
                let url = "https://api.paymongo.com/v1/payment_intents";
                let response = await fetch(url, options);
                let json = await response.json();
                return json;
            }
    
            resp().then(resp => {
                // console.log(resp);
                var clientKey = resp.data.attributes.client_key;
                console.log(`clientKey: ${clientKey}`);
                res.json({ clientKey: clientKey });
            }).catch(err => console.error(err));
        }
    });
});





//app.use(func) runs for all type of request for all routes so should be put at the end
//so order matters







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