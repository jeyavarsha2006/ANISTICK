// script.js
const products = [
  { id: 1, name: "Luffy", category: "One Piece", price: 100, img: "images/luffy.jpeg" },
  { id: 2, name: "Gojo Satoru", category: "JJK", price: 129, img: "images/gojo.jpeg" },
  { id: 3, name: "Nezuko Kamado", category: "Demon Slayer", price: 89, img: "images/nezuko.jpeg" },
  { id: 4, name: "Luffy Wanted poster", category: "OnePiece", price: 149, img: "images/luffy2.jpeg" }
];

let cart = [];
let wishlist = [];

const gallery = document.getElementById("gallery");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const cartSidebar = document.getElementById("cart");
const wishlistSidebar = document.getElementById("wishlist");
const wishlistItems = document.getElementById("wishlistItems");
const searchBar = document.getElementById("searchBar");

function renderProducts(list = products) {
  gallery.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="addToWishlist(${p.id})">❤️ Wishlist</button>
    `;
    gallery.appendChild(card);
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">❌</button>`;
    cartItems.appendChild(li);
  });
  cartCount.textContent = cart.length;
  totalPrice.textContent = total;
}

function addToWishlist(id) {
  const item = products.find(p => p.id === id);
  if (!wishlist.find(p => p.id === id)) {
    wishlist.push(item);
    updateWishlist();
  }
}

function updateWishlist() {
  wishlistItems.innerHTML = "";
  wishlist.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    wishlistItems.appendChild(li);
  });
}

function filterCategory(category) {
  if (category === 'all') renderProducts();
  else renderProducts(products.filter(p => p.category === category));
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Cart saved!");
}

function clearCart() {
  cart = [];
  updateCart();
}

function checkout() {
  if (cart.length === 0) return alert("Cart is empty!");
  
  // 🔗 Redirect to your project gateway
  window.location.href = "https://your-project-gateway-link.com";
  
  cart = [];
  updateCart();
}

function closeCart() {
  cartSidebar.classList.remove("open");
}

function closeWishlist() {
  wishlistSidebar.classList.remove("open");
}

function toggleWishlist() {
  wishlistSidebar.classList.toggle("open");
}

document.getElementById("cartBtn").addEventListener("click", () => {
  cartSidebar.classList.toggle("open");
});

searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

// Load saved cart if any
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
  updateCart();
}

renderProducts();


searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

// Load saved cart if any
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
  updateCart();
}

renderProducts();
