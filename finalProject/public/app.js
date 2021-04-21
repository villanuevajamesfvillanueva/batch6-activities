
import { openCart } from './nav.js';

const addToCartBtn = document.querySelector('.add-to-cart');
const decQuantity = document.querySelector('.input-prev');
const incQuantity = document.querySelector('.input-next');
const cart = document.querySelector('.cart');
const checkoutBtn = document.querySelector('.checkout-btn');



function addToCartClicked(event) {
    event.preventDefault(); 
    var itemName = document.getElementsByClassName('item-name')[0].innerText;
    var itemPrice = document.getElementsByClassName('item-price')[0].innerText;
    var quantity = document.getElementsByClassName('item-quantity')[0].value;
    var imageSrc = document.getElementsByClassName('item-image')[0].src;

    var itemId = document.getElementsByClassName('item-name')[0].dataset.itemId;
    addItemToCart(itemName, itemPrice, quantity, imageSrc, itemId);

    openCart();
}


function addItemToCart(itemName, itemPrice, quantity, imageSrc, itemId) {
    var cartItem = {}
    cartItem.name = itemName;
    cartItem.price = itemPrice;
    cartItem.quantity = quantity;
    cartItem.imageSrc = imageSrc;
    cartItem.id = itemId;

    localStorage.setItem(itemId, JSON.stringify(cartItem));
}

function addOneQuantity() {
    var inputQuantity = document.getElementsByClassName('item-quantity')[0];
    var newquantity = parseInt(inputQuantity.value);
    newquantity += 1;
    if (newquantity >= 99) newquantity = 99;
    inputQuantity.value = newquantity;
}

function subtOneQuantity() {
    var inputQuantity = document.getElementsByClassName('item-quantity')[0];
    var newquantity = parseInt(inputQuantity.value);
    newquantity -= 1;
    if (newquantity <= 0) newquantity = 1;
    inputQuantity.value = newquantity;
}

incQuantity.addEventListener('click', addOneQuantity);
decQuantity.addEventListener('click', subtOneQuantity);

addToCartBtn.addEventListener('click', addToCartClicked)



//add animation when adding to cart
//show cart after each addition of item











//------------------------------------ FLOWCHART ------------------------------------
//send order info to backend
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