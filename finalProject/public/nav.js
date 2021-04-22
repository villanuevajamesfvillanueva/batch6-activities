const documentBody = document.querySelector('body');

const overlay = document.querySelector('.overlay');

const hamburger = document.querySelector('.hamburger');
const extHamburget = document.querySelector('.ext-hamburger');
const closeNav = document.querySelector('.close-nav');
const navitems1 = document.querySelectorAll('.nav-items a');
const navitems2 = document.querySelectorAll('.nav-items2 a');

const searchIcon = document.querySelector('.search-icon');
const searchbar = document.querySelector('.searchbar');
const closesearchbarBtn = document.querySelector('.close-searchbar');

let activateOverlay = (zIndex) => {
    overlay.style.zIndex = zIndex;
    overlay.style.opacity = 0.7
    documentBody.style.overflowY = 'hidden';
}

let deactivateOverlay = () => {
    overlay.style.zIndex = -10;
    overlay.style.opacity = 0;
    documentBody.style.overflowY = 'scroll';
}

let displayExtHamburger  = () => {
    activateOverlay('9');
    navitems1.forEach(item => {
        item.style.transform = 'translateX(0)';
        item.style.opacity = '100%';
    });
    navitems2.forEach(item => {
        item.style.transform = 'translateX(0)';
        item.style.opacity = '100%';
    });
    extHamburget.style.transform = 'translateX(0)';
}

let closeExtHamburger  = () => {
    deactivateOverlay();
    extHamburget.style.transform = 'translateX(-100%)';
    navitems1.forEach(item => {
        item.style.transform = 'translateX(-20%)';
        item.style.opacity = '100%';
    });
    navitems2.forEach(item => {
        item.style.transform = 'translateX(-20%)';
        item.style.opacity = '0';
    });
}

hamburger.addEventListener('click', displayExtHamburger);
closeNav.addEventListener('click', closeExtHamburger);



let displaySearchbar = () => {
    activateOverlay('3');
    searchbar.style.transform = 'translateY(0)';
    searchbar.style.opacity = '1';
    //add gray overlay
}

let closeSearchbar = () => {
    deactivateOverlay();
    searchbar.style.transform = 'translateY(-100%)';
    searchbar.style.opacity = '0';
}

searchIcon.addEventListener('click', displaySearchbar);
closesearchbarBtn.addEventListener('click', closeSearchbar);



const bagIcon = document.querySelector('.bag-icon');
const cartContainer = document.querySelector('.cart-container');
const cart = document.querySelector('.cart');
const closeCartBtn = document.querySelector('.close-cart');


function addOneQuantity(event) {
    var targetBtn = event.target;
    var cartItemQuantity = targetBtn.parentElement;
    var inputQuantity = cartItemQuantity.querySelector('.cart-item-quantity');
    var newquantity = parseInt(inputQuantity.value);
    newquantity = newquantity + 1;
    if (newquantity >= 99) newquantity = 99;
    inputQuantity.value = newquantity;

    var cartItem = cartItemQuantity.parentElement.parentElement.parentElement;
    var itemId = cartItem.className.split(' ')[1];
    var currentData = JSON.parse(localStorage.getItem(itemId));
    currentData.quantity = newquantity.toString();
    localStorage.setItem(itemId, JSON.stringify(currentData));

    updateTotal();
}

function subtOneQuantity(event) {
    var targetBtn = event.target;
    var cartItemQuantity = targetBtn.parentElement;
    var inputQuantity = cartItemQuantity.getElementsByClassName('cart-item-quantity')[0];
    var newquantity = parseInt(inputQuantity.value);
    newquantity = newquantity - 1;
    if (newquantity <= 0) newquantity = 1;
    inputQuantity.value = newquantity;

    var cartItem = cartItemQuantity.parentElement.parentElement.parentElement;
    var itemId = cartItem.className.split(' ')[1];
    var currentData = JSON.parse(localStorage.getItem(itemId));
    currentData.quantity = newquantity.toString();
    localStorage.setItem(itemId, JSON.stringify(currentData));

    updateTotal();
}



let updateCart = () => {
    if (localStorage.length <= 0) cart.innerHTML = 'Your cart is empty';
    else {
        cart.innerHTML = "";

        for (var i = 0; i < localStorage.length; i++) {
            var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
            
            var cartItem = document.createElement('div');
            cartItem.classList.add("cartItem");
            cartItem.classList.add(item.id);
            let string = `
                <div class="cartItem-image-container">
                    <img class="cartItem-image" src="${item.imageSrc}">
                </div>
                <div class="cartItem-details">
                    <div class="cartItem-details1">
                        <p class="cartItem-name">${item.name}</p>
                        <p class="cartItem-price">${item.price}</p>
                    </div>
                    <div class="cartItem-details2">
                        <div class="cartItem-quantity">
                            <span class="cart-input-prev">&#8211;</span>
                            <input class="cart-item-quantity" type="number" value="${item.quantity}">
                            <span class="cart-input-next">+</span>
                        </div>
                        <span class="remove-from-cart">REMOVE</span>
                    </div>
                </div>
            `;
            cartItem.innerHTML = string;
            cart.append(cartItem);
        }

        //updating localStorage
        const decQuantityBtns = document.querySelectorAll('.cart-input-prev');
        const incQuantityBtns = document.querySelectorAll('.cart-input-next');
        
        incQuantityBtns.forEach(btn => {
            btn.addEventListener('click', addOneQuantity);
            
        });
        decQuantityBtns.forEach(btn => {
            btn.addEventListener('click', subtOneQuantity);
        });
    }
}

let updateTotal = () => {
    let sum = 0;
    for (var i = 0; i < localStorage.length; i++) {
        var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
        var num = /\d+/g;
        sum += item.price.match(num)[0] * parseInt(item.quantity);
    }
    const spanTotal = document.querySelector('.total');
    spanTotal.innerHTML = sum;
}


let openCart = () => {
    activateOverlay('9');
    cartContainer.style.transform = 'translateX(0)';

    //updating cart before displaying
    updateCart();
    updateTotal();
}

let closeCart = () => {
    deactivateOverlay();
    cartContainer.style.transform = 'translateX(100%)';
}

bagIcon.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);




// const checkoutBtn = document.querySelector('.checkout-btn');
// checkoutBtn.addEventListener('click', sendTotaltoBE);





export {activateOverlay, openCart};