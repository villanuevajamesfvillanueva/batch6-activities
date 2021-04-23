if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const paymongoPublicKey = Buffer.from(process.env.PAYMONGO_PUBLIC_KEY).toString('base64');
const paymongoSecretKey = Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64');
const mongodbUser = process.env.MONGODB_USER;
const mongodbPass = process.env.MONGODB_PW;

const fetch = require('node-fetch');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { json } = require('express');

const Item = require('./models/item');

const app = express();

const dbName = 'OnlineShopProj1';
const dbURI = `mongodb+srv://${mongodbUser}:${mongodbPass}@onlineshopproj1.2iew8.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })   //async task
    .then(result => {
        //connect to db before listening on port
        console.log('connected to db...');
        app.listen(3000, 'localhost', () => {
            console.log('listening on port 3000...');
        });
    })
    .catch(err => console.error(err));


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));


//for creating new user account
// app.get('', (req, res) => {
//     const user = new User({
//         username: 'userName',		
// 		pass: 'userPass',		
// 		email: 'userEmail',		
// 		address: 'userAddress',	
// 		contact: 'userContact'	
//         //replace values	
//     });

//     user.save()
//         .then(result => res.send(result))
//         .catch(err => console.error(err));
// });


//for retrieving items from db
app.get('/all_products', (req, res) => {
    Item.find()
        .then(result => {
            res.render('all_products', {
                title: 'All Products',
                allProducts: result
            });
        })
        .catch(err => console.error(err))
});

app.get('/one_product', (req, res) => {
    Item.findById('6082d6dec07ee9c55523f73d')
        .then(result => {
            res.send(result);
        })
        .catch(err => console.error(err))
});


app.get('/', (req, res) => {
    Item.find()
    .then(result => {
        res.render('index', {
            title: "Montaigne-Élysées",
            items: result.slice(0, 4)
        });
    })
    .catch(err => console.error(err));
});


app.get('/payment_details', (req, res) => {
    res.render('payment_details', {
        title: "Payment Details",
        psk: paymongoSecretKey
    });
});


Item.find()
    .then(result => {
        result.forEach(item => {
            app.get(item.route, (req, res) => {
                res.render('item', {
                    title: "Products",
                    item: item
                });
            });
        });
    })
    .catch(err => console.error(err))



app.post('/checkout', (req, res) => {
    Item.find()
        .then(result => {
            //computing checkout total again in the backend
            var total = 0;
            req.body.shoppingList.forEach(item => {
                console.log(item);
                //finding price of purchased items in the ''database'
                const purchasedJSON = result.find(i => { return i.id == item.id; });
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

            async function resp() {
                let url = "https://api.paymongo.com/v1/payment_intents";
                let response = await fetch(url, options);
                let json = await response.json();
                return json;
            }
    
            resp().then(resp => {
                console.log(resp);
                var clientKey = resp.data.attributes.client_key;
                console.log(`clientKey: ${clientKey}`);
                res.json({ clientKey: clientKey });
            }).catch(err => console.error(err));
        })
        .catch();
});









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