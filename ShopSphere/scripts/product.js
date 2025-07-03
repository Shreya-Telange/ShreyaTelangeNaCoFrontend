

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  const product = await fetchProductById(id);
  renderProduct(product);
});

async function fetchProductById(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  return await res.json();
}

function renderProduct(product) {
  const container = document.getElementById('product-details');

  container.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <img src="${product.image}" class="img-fluid" alt="${product.title}" />
      </div>
      <div class="col-md-6">
        <h2>${product.title}</h2>
        <p class="text-muted">${product.category}</p>
        <h4 class="text-success">$${product.price}</h4>
        <p>${product.description}</p>
        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `;
}

// Reuse from main.js
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productIndex = cart.findIndex(item => item.id === productId);

  if (productIndex !== -1) {
    cart[productIndex].quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
}

