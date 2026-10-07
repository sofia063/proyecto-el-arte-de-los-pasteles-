/* ==========================================================
   ARTE DE LOS PASTELES — script.js
   Catálogo + Carrito + Pedido + Pago (simulado, front-end only)
   ========================================================== */

/* ---------- 1. CATÁLOGO DE PRODUCTOS ---------- */
/* Imágenes reales enlazadas directamente desde Unsplash (hotlink) */
const PRODUCTS = [
  {
    id: "p1",
    name: "Red Velvet Clásico",
    desc: "Bizcocho aterciopelado con betún de queso crema.",
    price: 180,
    tag: "Best seller",
    category: "cumpleanos",
    stock: 10,
    img: "https://images.unsplash.com/photo-1602351447937-745cb720612f?fm=jpg&q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p2",
    name: "Chocolate Fudge",
    desc: "Tres capas de chocolate belga con ganache intenso.",
    price: 195,
    tag: "Chocolate",
    category: "chocolate",
    stock: 10,
    img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?fm=jpg&q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p3",
    name: "Fresas con Crema",
    desc: "Genovesa suave, crema chantilly y fresas frescas.",
    price: 175,
    tag: "Frutal",
    category: "cumpleanos",
    stock: 10,
    img: "https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?fm=jpg&q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p4",
    name: "Fondant Elegance",
    desc: "Diseño en fondant liso, ideal para ocasiones especiales.",
    price: 320,
    tag: "Premium",
    category: "boda",
    stock: 10,
    img: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?fm=jpg&q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p5",
    name: "Pastel de Boda Floral",
    desc: "Tres pisos decorados con flores comestibles.",
    price: 890,
    tag: "Bodas",
    category: "boda",
    stock: 10,
    img: "https://images.unsplash.com/photo-1542007920-992d2c424d09?fm=jpg&q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p6",
    name: "Rebanada Individual",
    desc: "Porción individual de chocolate con fresa.",
    price: 35,
    tag: "Individual",
    category: "individual",
    stock: 10,
    img: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?fm=jpg&q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p7",
    name: "Cupcakes Surtidos (x6)",
    desc: "Caja de 6 cupcakes decorados a mano.",
    price: 90,
    tag: "Individual",
    category: "individual",
    stock: 10,
    img: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?fm=jpg&q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p8",
    name: "Capas de Chocolate y Frutos Rojos",
    desc: "Bizcocho de cacao, mermelada de berries y crema.",
    price: 210,
    tag: "Chocolate",
    category: "chocolate",
    stock: 10,
    img: "https://images.unsplash.com/photo-1508737804141-4c3b688e2546?fm=jpg&q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p9",
    name: "Vainilla y Macarrón",
    desc: "Bizcocho de vainilla coronado con macarrones franceses.",
    price: 200,
    tag: "Especial",
    category: "cumpleanos",
    stock: 10,
    img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?fm=jpg&q=80&w=800&auto=format&fit=crop"
  }
];

/* Stock disponible por producto (máx. 10 unidades cada uno).
   Se reduce al agregar al carrito y se restaura al quitar. */
const stockLeft = {};
PRODUCTS.forEach(p => { stockLeft[p.id] = p.stock; });

/* ---------- 2. ESTADO DEL CARRITO (en memoria) ---------- */
let cart = []; // { id, name, price, img, qty }

/* ---------- 3. RENDER DEL CATÁLOGO ---------- */
const grid = document.getElementById("product-grid");
const noResultsEl = document.getElementById("no-results");
const searchInput = document.getElementById("search-input");

let currentFilter = "todos";
let currentSearch = "";

function renderProducts(){
  grid.innerHTML = "";

  let list = currentFilter === "todos" ? PRODUCTS : PRODUCTS.filter(p => p.category === currentFilter);
  if(currentSearch.trim() !== ""){
    const q = currentSearch.trim().toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }

  noResultsEl.hidden = list.length !== 0;

  list.forEach(p => {
    const left = stockLeft[p.id];
    const outOfStock = left <= 0;
    let badgeClass = "ok", badgeText = `Quedan ${left}`;
    if(outOfStock){ badgeClass = "out"; badgeText = "Agotado"; }
    else if(left <= 3){ badgeClass = "low"; badgeText = `¡Últimas ${left}!`; }

    const card = document.createElement("div");
    card.className = "card" + (outOfStock ? " agotado" : "");
    card.innerHTML = `
      <div class="card-img"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
      <div class="card-body">
        <span class="card-tag">${p.tag}</span>
        <span class="stock-badge ${badgeClass}">${badgeText}</span>
        <h3 class="card-title">${p.name}</h3>
        <p class="card-desc">${p.desc}</p>
        <div class="card-footer">
          <span class="card-price">Bs. ${p.price}</span>
          <button class="add-btn" data-id="${p.id}" ${outOfStock ? "disabled" : ""}>
            ${outOfStock ? "Agotado" : "Agregar"}
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}
renderProducts();

document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if(!btn) return;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.dataset.filter;
  renderProducts();
});

searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value;
  renderProducts();
});

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-btn");
  if(!btn) return;
  addToCart(btn.dataset.id);
});

/* ---------- 4. LÓGICA DEL CARRITO ---------- */
function addToCart(id){
  const product = PRODUCTS.find(p => p.id === id);
  if(!product) return;

  if(stockLeft[id] <= 0){
    showToast("Ese pastel ya está agotado");
    return;
  }

  const existing = cart.find(item => item.id === id);
  if(existing){
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, qty: 1 });
  }
  stockLeft[id] -= 1;

  renderCart();
  renderProducts();
  showToast(`${product.name} agregado al carrito`);
  openCart();
}

function changeQty(id, delta){
  const item = cart.find(i => i.id === id);
  if(!item) return;

  if(delta > 0 && stockLeft[id] <= 0){
    showToast("No hay más stock disponible de este pastel");
    return;
  }

  item.qty += delta;
  stockLeft[id] -= delta;

  if(item.qty <= 0){
    cart = cart.filter(i => i.id !== id);
  }
  renderCart();
  renderProducts();
}

function removeItem(id){
  const item = cart.find(i => i.id === id);
  if(item){ stockLeft[id] += item.qty; }
  cart = cart.filter(i => i.id !== id);
  renderCart();
  renderProducts();
}

function cartTotal(){
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function renderCart(){
  const itemsEl = document.getElementById("cart-items");
  const countEl = document.getElementById("cart-count");
  const totalEl = document.getElementById("cart-total");

  const totalQty = cart.reduce((s,i) => s + i.qty, 0);
  countEl.textContent = totalQty;

  if(cart.length === 0){
    itemsEl.innerHTML = `<p class="cart-empty" id="cart-empty">Tu carrito está vacío. Agrega un pastel del catálogo 🍰</p>`;
  } else {
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">Bs. ${item.price} c/u</div>
          <div class="qty-controls">
            <button data-action="dec" data-id="${item.id}">−</button>
            <span>${item.qty}</span>
            <button data-action="inc" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="remove-item" data-action="remove" data-id="${item.id}">Quitar</button>
      </div>
    `).join("");
  }
  totalEl.textContent = `Bs. ${cartTotal()}`;
}

document.getElementById("cart-items").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if(!btn) return;
  const { action, id } = btn.dataset;
  if(action === "inc") changeQty(id, 1);
  if(action === "dec") changeQty(id, -1);
  if(action === "remove") removeItem(id);
});

/* ---------- 5. ABRIR / CERRAR CARRITO ---------- */
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");

function openCart(){
  cartPanel.classList.add("active");
  cartOverlay.classList.add("active");
}
function closeCart(){
  cartPanel.classList.remove("active");
  cartOverlay.classList.remove("active");
}
document.getElementById("cart-toggle").addEventListener("click", openCart);
document.getElementById("cart-close").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

/* ---------- 6. MODALES GENÉRICOS ---------- */
function openModal(id){
  document.getElementById(id).classList.add("active");
}
function closeModal(id){
  document.getElementById(id).classList.remove("active");
}
document.querySelectorAll("[data-close-modal]").forEach(btn => {
  btn.addEventListener("click", () => closeModal(btn.dataset.closeModal));
});
document.querySelectorAll(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", (e) => {
    if(e.target === overlay) overlay.classList.remove("active");
  });
});

/* ---------- 7. CHECKOUT: PASO 1 — DATOS DE PEDIDO ---------- */
let orderData = {};

document.getElementById("checkout-btn").addEventListener("click", () => {
  if(cart.length === 0){
    showToast("Tu carrito está vacío");
    return;
  }
  closeCart();
  openModal("order-overlay");
});

document.getElementById("order-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  orderData = Object.fromEntries(form.entries());
  closeModal("order-overlay");
  renderOrderSummary();
  openModal("payment-overlay");
});

/* ---------- 8. CHECKOUT: PASO 2 — MÉTODO DE PAGO ---------- */
const payMethods = document.querySelectorAll(".pay-method");
const payPanels = document.querySelectorAll(".pay-panel");

payMethods.forEach(btn => {
  btn.addEventListener("click", () => {
    payMethods.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const method = btn.dataset.method;
    payPanels.forEach(panel => {
      panel.hidden = panel.dataset.panel !== method;
    });
  });
});

function renderOrderSummary(){
  document.getElementById("order-summary").innerHTML = `
    <span>${cart.reduce((s,i)=>s+i.qty,0)} producto(s)</span>
    <strong>Bs. ${cartTotal()}</strong>
  `;
  document.getElementById("cash-total").textContent = `Bs. ${cartTotal()}`;
}

/* ---------- 9. CHECKOUT: PASO 3 — CONFIRMAR PAGO (simulado) ---------- */
document.getElementById("payment-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const activeMethod = document.querySelector(".pay-method.active").dataset.method;

  // Validación básica solo para el método tarjeta
  if(activeMethod === "tarjeta"){
    const form = new FormData(e.target);
    const num = (form.get("cardNumber") || "").replace(/\s/g, "");
    if(num.length < 12){
      showToast("Verifica el número de tarjeta");
      return;
    }
  }

  /* Aquí es donde se conectaría una pasarela de pago real,
     por ejemplo Stripe, PayPal o Mercado Pago:

     fetch("https://tu-backend.com/api/crear-pago", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ metodo: activeMethod, total: cartTotal(), pedido: orderData, carrito: cart })
     })
     .then(res => res.json())
     .then(data => { ... })

     Por ahora, el pago se simula localmente. */

  const orderId = "#" + Math.floor(10000 + Math.random() * 89999);

  closeModal("payment-overlay");
  document.getElementById("success-name").textContent = orderData.nombre || "cliente";
  document.getElementById("success-order-id").textContent = orderId;
  openModal("success-overlay");

  // Reiniciar carrito tras el pedido
  cart = [];
  renderCart();
  e.target.reset();
});

document.getElementById("success-close").addEventListener("click", () => {
  closeModal("success-overlay");
});

/* ---------- 10. TOAST ---------- */
let toastTimer;
function showToast(msg){
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- 11. MENÚ MÓVIL ---------- */
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
hamburger.addEventListener("click", () => {
  nav.classList.toggle("mobile-open");
  nav.style.display = nav.classList.contains("mobile-open") ? "flex" : "";
});

/* ---------- 12. MODO CLARO / OSCURO (personalización) ---------- */
const themeToggle = document.getElementById("theme-toggle");
let darkMode = false;

themeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.setAttribute("data-theme", darkMode ? "oscuro" : "claro");
  themeToggle.textContent = darkMode ? "☀️" : "🌙";
});

/* Inicializar carrito vacío al cargar */
renderCart();
