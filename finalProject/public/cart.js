const cartContainer = document.querySelector('.cart-container');

if (localStorage.length <= 0) console.log('No items in cart');
else {
    for (var i = 0; i < localStorage.length; i++) {
        var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
        var cartItem = document.createElement('div');
        var nameSpan = document.createElement('span');
        nameSpan.innerHTML = item.name;
        var priceSpan = document.createElement('span');
        priceSpan.innerHTML = item.price;
        var quantitySpan = document.createElement('span');
        quantitySpan.innerHTML = item.quantity;
        cartItem.append(nameSpan);
        cartItem.append(priceSpan);
        cartItem.append(quantitySpan);
        cartContainer.append(cartItem);
    }
}
