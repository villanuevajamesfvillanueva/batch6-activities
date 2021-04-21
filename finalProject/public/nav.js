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
const closeCartBtn = document.querySelector('.close-cart');

let openCart = () => {
    activateOverlay('9');
    cartContainer.style.transform = 'translateX(0)';
}

let closeCart = () => {
    deactivateOverlay();
    cartContainer.style.transform = 'translateX(100%)';
}

bagIcon.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);

export {activateOverlay, openCart};