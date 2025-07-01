// scripts/cart.js

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

async function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const allProducts = await fetchProducts();
  const cartContainer = document.getElementById('cart-items');
  const summaryContainer = document.getElementById('cart-summary');

  cartContainer.innerHTML = '';
  summaryContainer.innerHTML = '';

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
    return;
  }

  let total = 0;

  cartItems.forEach(item => {
    const product = allProducts.find(p => p.id === item.id);
    const itemTotal = product.price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'col-md-12 mb-4';

    div.innerHTML = `
      <div class="card p-3 d-flex flex-row justify-content-between align-items-center">
        <img src="${product.image}" alt="${product.title}" style="height: 80px; width: auto;">
        <div class="flex-grow-1 mx-3">
          <h5>${product.title}</h5>
          <p>Price: $${product.price} × ${item.quantity} = <strong>$${itemTotal.toFixed(2)}</strong></p>
        </div>
        <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartContainer.appendChild(div);
  });

  summaryContainer.innerHTML = `
    <h4>Total: $${total.toFixed(2)}</h4>
    <button class="btn btn-success">Checkout</button>
  `;
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart(); // Refresh cart display
}
