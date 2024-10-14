let cart = JSON.parse(localStorage.getItem('card')) || [];
function updateCartCount() {
    const cartCount = document.querySelector('#card-count');
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0); 
    cartCount.innerText = totalQuantity;
}
function addToCart(productName, price, image) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        const product = { name: productName, price: price, image: image, quantity: 1 };
        cart.push(product);
    }

    localStorage.setItem('card', JSON.stringify(cart));
    updateCartCount();
    updateCart();
}
function updateCart() {
    const cartItems = document.querySelector('#card-items');
    cartItems.innerHTML = ''; 
let totalPrice = 0; 
cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('card-item');
    itemElement.innerHTML = `
        <div class="card-item-info">
            <img src="${item.image}">
            <p>${item.name} (x${item.quantity})</p> 
        </div>
        <p>Price: $${item.price} | Total: $${(item.price * item.quantity)}</p> 
    `;

    totalPrice += item.price * item.quantity;
    cartItems.appendChild(itemElement);
});

    const totalElement = document.createElement('div');
    totalElement.classList.add('total-price');
    totalElement.innerHTML = `<h4>Total Price: $${totalPrice}</h4>`;
    cartItems.appendChild(totalElement);
}
function showPopup() {
    const cartPopup = document.querySelector('#card-popup');
    cartPopup.style.display = 'block'; 
    updateCart(); 
}
function hidePopup() {
    const cartPopup = document.querySelector('#card-popup');
    cartPopup.style.display = 'none'; 
}
function clearCart() {
    cart = [];
    localStorage.removeItem('card');
    updateCartCount();
    updateCart(); 
}
updateCartCount();
