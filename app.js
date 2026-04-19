// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Parallax hero effect
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (scrollPos < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollPos * 0.4}px) scale(1.05)`;
    }
});

// Scroll Reveal Intersection Observer
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve to trigger only once
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));

// Magnetic Button Effect
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const position = btn.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        btn.style.transition = 'transform 0.1s ease-out';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// Flatpickr initialization
flatpickr("#datePicker", {
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "j M, Y",
    locale: "es",
    showMonths: 1
});

// Dropdown Destino Logic
const destinoInput = document.getElementById('destinoInput');
const destinoDropdown = document.getElementById('destinoDropdown');

if(destinoInput && destinoDropdown) {
    destinoInput.addEventListener('click', (e) => {
        e.stopPropagation();
        destinoDropdown.classList.toggle('active');
    });

    destinoDropdown.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            destinoInput.value = item.textContent;
            destinoDropdown.classList.remove('active');
        });
    });

    document.addEventListener('click', () => {
        destinoDropdown.classList.remove('active');
    });
}

// Search Routing
const searchTripBtn = document.getElementById('searchTripBtn');
if (searchTripBtn) {
    searchTripBtn.addEventListener('click', () => {
        const destino = destinoInput ? destinoInput.value : '';
        if (destino.includes('Bali')) {
            window.location.href = 'bali.html';
        } else if (destino.includes('París') || destino.includes('Paris')) {
            window.location.href = 'paris.html';
        } else if (destino.includes('Santorini')) {
            window.location.href = 'santorini.html';
        } else {
            alert('Por favor selecciona un destino del desplegable para buscar el itinerario.');
        }
    });
}

// Mobile menu logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Auto dynamic floating effects
document.querySelectorAll('.feature-icon').forEach(icon => icon.classList.add('floating'));

// ==========================================
// E-commerce Cart Logic
// ==========================================
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const addToCartBtns = document.querySelectorAll('.add-to-cart');

let cart = JSON.parse(localStorage.getItem('freeTravelCart')) || [];

function saveCart() {
    localStorage.setItem('freeTravelCart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update red unread counts
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = totalItems);
    
    if (!cartItemsContainer) return;
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if(cartTotalEl) cartTotalEl.textContent = `$${total.toLocaleString()} USD`;
    
    // Render items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:var(--text-muted); margin-top:2rem;">Tu mochila está vacía. Añade destinos VIP para comenzar.</p>';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map((item, i) => `
        <div class="cart-item" style="display:flex; align-items:center; gap:1rem; padding:1rem; background:rgba(255,255,255,0.03); border-radius:12px; margin-bottom:1rem; animation: fadeUp 0.3s ease forwards; animation-delay: ${i*0.05}s; opacity:0; transform:translateY(10px);">
            <div style="flex:1;">
                <h4 style="margin:0; font-size:1rem; color:var(--accent-1);">${item.name}</h4>
                <p style="margin:0; color:var(--text-muted); font-size:0.9rem;">$${item.price.toLocaleString()} x ${item.quantity}</p>
            </div>
            <button class="remove-item" data-id="${item.id}" style="background:transparent; border:none; color:#f87171; font-size:1.5rem; cursor:pointer;">&times;</button>
        </div>
    `).join('');
    
    // Attach remove listeners
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            cart = cart.filter(item => item.id !== id);
            saveCart();
            updateCartUI();
        });
    });
}

// Sidebar toggles
function toggleCart() {
    if(cartSidebar) cartSidebar.classList.toggle('active');
    if(cartOverlay) cartOverlay.classList.toggle('active');
}
if (cartToggle) cartToggle.addEventListener('click', toggleCart);
if (closeCart) closeCart.addEventListener('click', toggleCart);
if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);
// Listen to multiple floating cart triggers
document.querySelectorAll('#cartToggle').forEach(btn => {
    btn.addEventListener('click', toggleCart);
});

// Add to cart buttons
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price);
        
        const existing = cart.find(i => i.id === id);
        if(existing) {
            existing.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        
        saveCart();
        updateCartUI();
        toggleCart(); // Auto open cart to show visual confirmation
        
        // Button feedback
        const originalText = btn.innerHTML;
        btn.innerHTML = "¡Añadido! ✓";
        btn.style.background = "#22c55e"; // Success green
        btn.style.color = "#fff";
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = "";
            btn.style.color = "";
        }, 3000);
    });
});

// Initial UI pass
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});

const checkoutBtn = document.getElementById('checkoutBtn');
if(checkoutBtn) {
    checkoutBtn.addEventListener('click', () => { window.location.href = 'checkout.html'; });
}
