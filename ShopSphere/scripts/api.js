// scripts/api.js
const API_URL = 'https://fakestoreapi.com';

// GET: All Products
async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}
