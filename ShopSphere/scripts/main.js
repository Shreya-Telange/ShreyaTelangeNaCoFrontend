document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  renderProducts(products);
  initializeCart();
  updateCartCount();
  greetUser();
  renderCategoryDropdown(products); // ✅ moved here safely
});

function renderProducts(products) {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  products.forEach(product => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch mb-4';

    col.innerHTML = `
      <div class="card h-100 position-relative">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
        </a>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text text-truncate">${product.description}</p>
          <h6 class="text-success">$${product.price}</h6>
          <button class="btn btn-primary mt-auto" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
        <button class="btn btn-light wishlist-btn" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">❤️</button>
      </div>
    `;

    container.appendChild(col);
  });
}

// Cart logic
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productIndex = cart.findIndex(item => item.id === productId);

  if (productIndex !== -1) {
    cart[productIndex].quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Product added to cart!');
}

function initializeCart() {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.innerText = total;
  }
}

function toggleWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
    alert("Removed from wishlist");
  } else {
    wishlist.push(productId);
    alert("Added to wishlist!");
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function greetUser() {
  const user = localStorage.getItem("loggedInUser");
  const greet = document.getElementById("user-greeting");
  if (user && greet) {
    greet.textContent = `👋 Welcome, ${user}`;
  }
}

function renderCategoryDropdown(products) {
  const categories = [...new Set(products.map(p => p.category))];
  const select = document.getElementById("category-filter");

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    select.appendChild(option);
  });

  select.addEventListener("change", (e) => {
    const selected = e.target.value;
    const filtered = selected === "all"
      ? products
      : products.filter(p => p.category === selected);
    renderProducts(filtered);
  });
}
