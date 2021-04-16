//receive clientKey (result of payment intent) from backend

//collect credit card info through credit card form
//send credit card info to paymongo


const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cart = document.querySelector('.cart');
const checkoutBtn = document.querySelector('.checkout-btn');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const button = e.target;
        const itemName = button.parentElement.querySelector(".item-name");
        console.log(itemName);
    })
});

//send user to payment details page, submit cart details to backend upon click
checkoutBtn.addEventListener('click', function() {
    
});












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