let cart = JSON.parse(localStorage.getItem('card')) || [];

function updateCartCount() {
    const cartCount = document.querySelector('#card-count');
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0); 
    cartCount.innerText = totalQuantity;
}

function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
       
        existingProduct.quantity++;
    } else {
       
        const product = { name: productName, price: price, quantity: 1 };
        cart.push(product);
    }

    localStorage.setItem('card', JSON.stringify(cart));
    updateCartCount();
}

function toggleCart() {
    const cartPopup = document.querySelector('#card-popup');
    const cartItems = document.querySelector('#card-items');
    cartPopup.style.display = cartPopup.style.display === 'none' ? 'block' : 'none';
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('card-item');
        itemElement.innerHTML = `
            <div class="card-item-info">
                <img src="./assets/image/photo1.png">
                <p>${item.name} (x${item.quantity})</p> 
            </div>
            <p>Price: $${item.price} | Total: $${(item.price * item.quantity).toFixed(2)}</p> 
        `;
        cartItems.appendChild(itemElement);
    });
}

function clearCart() {
    cart = [];
    localStorage.removeItem('card');
    updateCartCount();
    document.querySelector('#card-popup').style.display = 'none';
}

updateCartCount();
