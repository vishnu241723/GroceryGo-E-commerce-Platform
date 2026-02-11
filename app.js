let isLoggedIn = false
let cart = []
let recentPurchases = []
let loginHistory = []

const products = [
  { name: "Apple", price: 100 },
  { name: "Banana", price: 50 },
  { name: "Milk", price: 60 },
  { name: "Bread", price: 40 },
  { name: "Rice", price: 200 },
  { name: "Eggs", price: 120 }
]

function renderProducts(filter = "", sort = "") {
  let list = document.getElementById("product-list")
  list.innerHTML = ""

  let filtered = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  if (sort === "price-asc") filtered.sort((a,b)=>a.price-b.price)
  if (sort === "price-desc") filtered.sort((a,b)=>b.price-a.price)
  if (sort === "name-asc") filtered.sort((a,b)=>a.name.localeCompare(b.name))
  if (sort === "name-desc") filtered.sort((a,b)=>b.name.localeCompare(a.name))

  filtered.forEach(p => {
    let div = document.createElement("div")
    div.className = "product"
    div.innerHTML = `<h4>${p.name}</h4><p>₹${p.price}</p><button onclick='addToCart("${p.name}",${p.price})'>Add</button>`
    list.appendChild(div)
  })
}

function addToCart(name, price) {
  cart.push({ name, price })
  updateCart()
}

function updateCart() {
  let items = document.getElementById("cart-items")
  let total = document.getElementById("cart-total")
  let count = document.getElementById("cart-count")
  items.innerHTML = ""
  let sum = 0
  cart.forEach(i => {
    items.innerHTML += `<li>${i.name} ₹${i.price}</li>`
    sum += i.price
  })
  total.textContent = sum
  count.textContent = cart.length
}

function clearCart() {
  cart = []
  updateCart()
}

function toggleCartPopup() {
  let p = document.getElementById("cart-popup")
  p.style.display = p.style.display === "block" ? "none" : "block"
}

function showCardInfo() {
  document.getElementById("card-info").style.display = "block"
}

function proceedToPurchase() {
  recentPurchases.push(...cart)
  clearCart()
  document.getElementById("card-info").style.display = "none"
  updateRecentPurchases()
}

function updateRecentPurchases() {
  let list = document.getElementById("recent-purchases-list")
  list.innerHTML = ""
  recentPurchases.forEach(p => {
    list.innerHTML += `<li>${p.name} ₹${p.price}</li>`
  })
}

function toggleSettingsPopup() {}

function logoutUser() {
  isLoggedIn = false
  document.getElementById("login-box").style.display = "block"
}

document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault()
  isLoggedIn = true
  document.getElementById("login-box").style.display = "none"
  loginHistory.push(new Date().toLocaleString())
  renderProducts()
})

document.getElementById("search-input").addEventListener("input", e => {
  renderProducts(e.target.value, document.getElementById("sort-select").value)
})

document.getElementById("sort-select").addEventListener("change", e => {
  renderProducts(document.getElementById("search-input").value, e.target.value)
})

renderProducts()
