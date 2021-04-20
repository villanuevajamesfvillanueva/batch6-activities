const hamburger = document.querySelector('.hamburger');
const extHamburget = document.querySelector('.ext-hamburger');
const closeNav = document.querySelector('.close-nav');
const navitems1 = document.querySelectorAll('.nav-items a');
const navitems2 = document.querySelectorAll('.nav-items2 a');

const searchIcon = document.querySelector('.search-icon');
const searchbar = document.querySelector('.searchbar');
const closesearchbarBtn = document.querySelector('.close-searchbar');


let displayExtHamburger  = () => {
    navitems1.forEach(item => {
        item.style.transform = 'translateX(0)';
        item.style.opacity = '100%';
    });
    navitems2.forEach(item => {
        item.style.transform = 'translateX(0)';
        item.style.opacity = '100%';
    });
    extHamburget.style.transform = 'translateX(0)';

    //add gray overlay
}

let closeExtHamburger  = () => {
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
    searchbar.style.transform = 'translateY(0)';
    searchbar.style.opacity = '1';
    //add gray overlay
}

let closeSearchbar = () => {
    searchbar.style.transform = 'translateY(-100%)';
    searchbar.style.opacity = '0';
}

searchIcon.addEventListener('click', displaySearchbar);
closesearchbarBtn.addEventListener('click', closeSearchbar);