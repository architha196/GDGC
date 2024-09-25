const apiUrl = 'https://fakestoreapi.com/products';
let products = [];
let cart = [];

async function fetchProducts() {
  const response = await fetch(apiUrl);
  const allProducts = await response.json();
  products = allProducts.slice(5, 9); // Limit to 2 products
  displayProducts(products);
}

// Display products
function displayProducts(productsToDisplay) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  productsToDisplay.forEach(product => {
    const productCard = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.title}" width="100">
        <h3>${product.title}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    productList.innerHTML += productCard;
  });
}

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  displayCart();
}

// Display cart items
function displayCart() {
  const cartItems = document.getElementById('cart-items');
  const totalMrp = document.getElementById('total-mrp');
  const totalAmount = document.getElementById('total-amount');
  
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = `
      <div class="cart-item">
        <p>${item.title} - ₹${item.price} x ${item.quantity}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
    `;
    cartItems.innerHTML += cartItem;
  });

  totalMrp.textContent = `₹${total}`;
  totalAmount.textContent = `₹${total - 50 + 10 + 20}`; // Example calculation: ₹total - ₹50 discount + ₹10 shipping + ₹20 tax
}

// Update cart item quantity
function updateQuantity(productId, delta) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity += delta;
    if (cartItem.quantity === 0) {
      cart = cart.filter(item => item.id !== productId);
    }
    displayCart();
  }
}

// Remove product from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  displayCart();
}

// Search functionality
function searchProducts() {
  const searchBar = document.getElementById('search-bar');
  const searchText = searchBar.value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchText)
  );
  displayProducts(filteredProducts);
}

// Place Order function
function placeOrder() {
  alert('Order Placed!');
  cart = [];
  displayCart();
}

// Fetch and display products on load
fetchProducts();
