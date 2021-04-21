

const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cart = document.querySelector('.cart');
const checkoutBtn = document.querySelector('.checkout-btn');



function addToCartClicked(event) {
    var btn = event.target;
    var item = btn.parentElement;
    var itemName = item.getElementsByClassName('item-name')[0].innerText;
    var itemPrice = item.getElementsByClassName('item-price')[0].innerText;
    var quantity = item.getElementsByClassName('item-quantity')[0].value;
    var imageSrc = item.getElementsByClassName('item-image')[0].src;
    var itemId = item.dataset.itemId;
    addItemToCart(itemName, itemPrice, quantity, imageSrc, itemId);
    alert(`${itemName} added to cart`);
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


addToCartBtns.forEach(btn => {
    btn.addEventListener('click', addToCartClicked)
});


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