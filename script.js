/**
 * ========================================
 * MIEL DE WAHBI - PREMIUM JAVASCRIPT
 * Ultra Professional Script with Advanced Features
 * ========================================
 */

// ============= GLOBAL STATE =============
let cart = [];
let deliveryFee = 0;
let animationFrameId = null;

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    initializeAnimations();
    initializeParticles();
    loadCartFromStorage();
    updateCartBadge();
    attachEventListeners();
});

// ============= APP INITIALIZATION =============
function initializeApp() {
    console.log('🍯 Miel de Wahbi - App initialized');
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
    initializeProductPrices();
}

// ============= ADVANCED ANIMATIONS =============
function initializeAnimations() {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            shape.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.5}px)`;
        });
    });

    // Add intersection observer for product cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}


// ============= PARTICLE SYSTEM =============
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    Object.assign(particle.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, rgba(244, 166, 35, 0.6), transparent)`,
        borderRadius: '50%',
        left: `${startX}px`,
        top: `${startY}px`,
        animation: `floatParticle ${duration}s ease-in-out ${delay}s infinite`,
        pointerEvents: 'none'
    });
    
    container.appendChild(particle);
}

// Add CSS for particle animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * -300 - 100}px) scale(1.5);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(style);

// ============= EVENT LISTENERS =============
// ============= EVENT LISTENERS =============
function attachEventListeners() {
    // Size button handlers
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', handleSizeSelection);
    });

    // Modal close on outside click
    window.addEventListener('click', handleOutsideClick);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function handleSizeSelection(event) {
    const card = event.currentTarget.closest('.product-card');
    const size = event.currentTarget.dataset.size;
    const price = parseFloat(event.currentTarget.dataset.price);
    
    // Retirer la classe active des autres boutons
    card.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // AJOUTER CETTE LIGNE :
    updateProductPrice(card, size, price);
    
    // Ajouter l'effet ripple
    createRipple(event);
}

function updateProductPrice(card, size, price) {
    const priceValue = card.querySelector('.price-value');
    const priceCurrency = card.querySelector('.price-currency');
    
    if (priceValue && priceCurrency) {
        // Animation de changement de prix
        priceValue.style.transform = 'scale(1.2)';
        priceValue.style.color = 'var(--primary-dark)';
        
        setTimeout(() => {
            priceValue.textContent = price;
            priceCurrency.textContent = `DT / ${size}`;
            
            setTimeout(() => {
                priceValue.style.transform = 'scale(1)';
                priceValue.style.color = '';
            }, 200);
        }, 150);
    }
}

// ============= INITIALIZE PRODUCT PRICES ON LOAD =============
function initializeProductPrices() {
    document.querySelectorAll('.product-card').forEach(card => {
        const activeBtn = card.querySelector('.size-btn.active');
        if (activeBtn) {
            const size = activeBtn.dataset.size;
            const price = parseFloat(activeBtn.dataset.price);
            
            // Mettre à jour le prix sans animation au chargement
            const priceValue = card.querySelector('.price-value');
            const priceCurrency = card.querySelector('.price-currency');
            
            if (priceValue && priceCurrency) {
                priceValue.textContent = price;
                priceCurrency.textContent = size === '500g' ? 'DT' : 'DT / kg';
            }
        }
    });
}

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    Object.assign(ripple.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.6)',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'scale(0)',
        animation: 'ripple 0.6s ease-out',
        pointerEvents: 'none'
    });
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============= CART MANAGEMENT =============
function saveCart() {
    try {
        localStorage.setItem('honeyCart', JSON.stringify(cart));
    } catch (e) {
        console.warn('Could not save cart to localStorage:', e);
    }
}

function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('honeyCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (e) {
        console.warn('Could not load cart from localStorage:', e);
        cart = [];
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.classList.add('show');
        
        // Bounce animation
        badge.style.animation = 'none';
        setTimeout(() => {
            badge.style.animation = 'badgePulse 2s ease-in-out infinite';
        }, 10);
    } else {
        badge.classList.remove('show');
    }
}

// ============= QUANTITY CONTROLS =============
function decreaseQty(btn) {
    const valueSpan = btn.nextElementSibling;
    let qty = parseInt(valueSpan.textContent);
    
    if (qty > 1) {
        qty--;
        animateNumber(valueSpan, qty);
        
        // Haptic feedback (if supported)
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    }
}

function increaseQty(btn) {
    const valueSpan = btn.previousElementSibling;
    let qty = parseInt(valueSpan.textContent);
    
    qty++;
    animateNumber(valueSpan, qty);
    
    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

function animateNumber(element, newValue) {
    element.style.transform = 'scale(1.3)';
    element.style.color = 'var(--primary)';
    
    setTimeout(() => {
        element.textContent = newValue;
        element.style.transform = 'scale(1)';
        setTimeout(() => {
            element.style.color = '';
        }, 200);
    }, 150);
}

// ============= ADD TO CART =============
function addToCart(btn) {
    const card = btn.closest('.product-card');
    const productName = card.dataset.product;
    const activeSize = card.querySelector('.size-btn.active');
    const size = activeSize.dataset.size;
    const price = parseFloat(activeSize.dataset.price);
    const quantity = parseInt(card.querySelector('.quantity-value').textContent);

    // Check if item exists
    const existingIndex = cart.findIndex(item => 
        item.product === productName && item.size === size
    );

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            product: productName,
            size: size,
            price: price,
            quantity: quantity
        });
    }

    // Animate button
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 200);

    saveCart();
    updateCartBadge();
    showToast(productName, size, quantity);
    
    // Reset quantity
    card.querySelector('.quantity-value').textContent = '1';
    
    // Confetti effect
    createConfetti(btn);
}

// ============= CONFETTI EFFECT =============
function createConfetti(button) {
    const colors = ['#f4a623', '#e88b0c', '#ffc14d', '#ff6b6b', '#4ecdc4'];
    const confettiCount = 15;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / confettiCount;
        const velocity = 100 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        Object.assign(confetti.style, {
            position: 'fixed',
            left: `${centerX}px`,
            top: `${centerY}px`,
            width: '8px',
            height: '8px',
            background: color,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '10000',
            animation: `confettiFall 1s ease-out forwards`
        });

        confetti.style.setProperty('--tx', `${tx}px`);
        confetti.style.setProperty('--ty', `${ty}px`);

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 1000);
    }
}

// Confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// ============= TOAST NOTIFICATION =============
function showToast(product, size, quantity) {
    const toast = document.getElementById('toast');
    const message = document.getElementById('toastMessage');
    
    if (!toast || !message) return;
    
    message.textContent = `${product} (${size}) × ${quantity}`;
    toast.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (toast.classList.contains('show')) {
            closeToast();
        }
    }, 5000);
}

function closeToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('show');
    }
}

// ============= CART MODAL =============
function openCart() {
    renderCart();
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
    }
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function renderCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItemsDiv || !cartSummary) return;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Votre panier est vide</h3>
                <p>Ajoutez des produits pour commencer vos achats</p>
            </div>
        `;
        cartSummary.innerHTML = '';
        return;
    }

    // Render cart items
    let html = '';
    cart.forEach((item, index) => {
        const total = (item.price * item.quantity).toFixed(2);
        html += `
            <div class="cart-item" style="animation-delay: ${index * 0.1}s">
                <div class="cart-item-image">🍯</div>
                <div class="cart-item-info">
                    <h4>${item.product}</h4>
                    <div class="cart-item-details">
                        Taille: ${item.size} • Prix unitaire: ${item.price} DT
                    </div>
                    <div class="cart-item-quantity">
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${index}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-price">${total} DT</div>
                    <button class="remove-item" onclick="removeFromCart(${index})">
                        🗑️ Supprimer
                    </button>
                </div>
            </div>
        `;
    });

    cartItemsDiv.innerHTML = html;

    // Render summary
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartSummary.innerHTML = `
        <div class="summary-row">
            <span>Sous-total:</span>
            <span>${subtotal.toFixed(2)} DT</span>
        </div>
        <div class="summary-row">
            <span>Livraison:</span>
            <span>À calculer</span>
        </div>
        <div class="summary-total">
            <span>TOTAL:</span>
            <span>${subtotal.toFixed(2)} DT</span>
        </div>
        <button class="checkout-btn" onclick="proceedToCheckout()">
            Passer la commande
        </button>
    `;
}

function updateCartQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            saveCart();
            renderCart();
            updateCartBadge();
        }
    }
}

function removeFromCart(index) {
    // Animate removal
    const items = document.querySelectorAll('.cart-item');
    if (items[index]) {
        items[index].style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            cart.splice(index, 1);
            saveCart();
            renderCart();
            updateCartBadge();
        }, 300);
    }
}

// Removal animation
const removalStyle = document.createElement('style');
removalStyle.textContent = `
    @keyframes slideOutRight {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(removalStyle);

// ============= CHECKOUT =============
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Votre panier est vide !');
        return;
    }

    closeCart();
    renderCheckoutSummary();
    
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 300);
    }
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function renderCheckoutSummary() {
    const summaryDiv = document.getElementById('checkoutSummary');
    if (!summaryDiv) return;

    let html = '<h3>Récapitulatif de la commande</h3>';
    
    cart.forEach(item => {
        const total = (item.price * item.quantity).toFixed(2);
        html += `
            <div class="order-item">
                <span>${item.product} (${item.size}) × ${item.quantity}</span>
                <span>${total} DT</span>
            </div>
        `;
    });

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    html += `
        <div class="order-summary-total">
            <span>TOTAL:</span>
            <span id="checkoutTotal">${subtotal.toFixed(2)} DT</span>
        </div>
        <div class="delivery-info" id="deliveryInfo" style="display: none;">
            <p id="deliveryMessage"></p>
        </div>
    `;

    summaryDiv.innerHTML = html;
}

function calculateDelivery() {
    const city = document.getElementById('customerCity')?.value;
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalElement = document.getElementById('checkoutTotal');
    const deliveryInfo = document.getElementById('deliveryInfo');
    const deliveryMessage = document.getElementById('deliveryMessage');
    
    if (!city || !totalElement || !deliveryInfo || !deliveryMessage) return;

    if (city === 'Sidi Bouzid') {
        deliveryFee = 0;
        deliveryInfo.className = 'delivery-info';
        deliveryInfo.style.display = 'block';
        deliveryMessage.innerHTML = '🎉 <strong>Livraison gratuite</strong> pour Sidi Bouzid !';
    } else {
        deliveryFee = 5;
        deliveryInfo.className = 'delivery-info paid';
        deliveryInfo.style.display = 'block';
        deliveryMessage.innerHTML = '🚚 Frais de livraison: <strong>5 DT</strong>';
    }

    const total = subtotal + deliveryFee;
    
    // Animate total change
    animateNumberChange(totalElement, total.toFixed(2) + ' DT');
}

function animateNumberChange(element, newValue) {
    element.style.transform = 'scale(1.1)';
    element.style.color = 'var(--primary-dark)';
    
    setTimeout(() => {
        element.textContent = newValue;
        element.style.transform = 'scale(1)';
        setTimeout(() => {
            element.style.color = '';
        }, 200);
    }, 150);
}

// ============= ORDER SUBMISSION =============
function getOrderData() {
    const name = document.getElementById('customerName')?.value;
    const phone = document.getElementById('customerPhone')?.value;
    const city = document.getElementById('customerCity')?.value;
    const address = document.getElementById('customerAddress')?.value;
    const message = document.getElementById('customerMessage')?.value;

    if (!name || !phone || !city || !address) {
        showError('Veuillez remplir tous les champs obligatoires (*)');
        return null;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryFee;

    return {
        name, phone, city, address, message,
        cart: cart,
        subtotal: subtotal.toFixed(2),
        deliveryFee: deliveryFee.toFixed(2),
        total: total.toFixed(2)
    };
}

function formatOrderMessage(data) {
    let message = `🍯 NOUVELLE COMMANDE - MIEL DE WAHBI\n\n`;
    message += `📦 COMMANDE:\n`;
    
    data.cart.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        message += `• ${item.product} (${item.size}) × ${item.quantity} = ${itemTotal} DT\n`;
    });

    message += `\n• Sous-total: ${data.subtotal} DT\n`;
    message += `• Livraison: ${data.deliveryFee === '0.00' ? 'GRATUITE 🎁' : data.deliveryFee + ' DT'}\n`;
    message += `💰 TOTAL: ${data.total} DT\n\n`;

    message += `👤 CLIENT:\n`;
    message += `• Nom: ${data.name}\n`;
    message += `• 📞 Téléphone: ${data.phone}\n`;
    message += `• 🏙️ Ville: ${data.city}\n`;
    message += `• 📍 Adresse: ${data.address}`;

    if (data.message) {
        message += `\n\n💬 Message: ${data.message}`;
    }

    return message;
}

function sendWhatsAppOrder() {
    const orderData = getOrderData();
    if (!orderData) return;

    const message = formatOrderMessage(orderData);
    const whatsappURL = `https://wa.me/21697244049?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
    showSuccessMessage('WhatsApp');
}

function sendFacebookOrder() {
    const orderData = getOrderData();
    if (!orderData) return;

    const message = formatOrderMessage(orderData);
    
    // Essayer de copier le message
    navigator.clipboard.writeText(message).then(() => {
        // Afficher un modal personnalisé au lieu d'une simple alerte
        showFacebookModal(message);
    }).catch(() => {
        // Fallback si le clipboard ne marche pas
        showFacebookModal(message);
    });
}

// Nouvelle fonction pour afficher un modal Facebook amélioré
function showFacebookModal(message) {
    // Créer le modal
    const modalHTML = `
        <div class="facebook-modal" id="facebookModal" style="
            display: flex;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.8);
            z-index: 99999;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-out;
        ">
            <div style="
                background: white;
                border-radius: 24px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow: hidden;
                animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            ">
                <!-- Header -->
                <div style="
                    background: linear-gradient(135deg, #1877F2, #0C63D4);
                    color: white;
                    padding: 2rem;
                    text-align: center;
                ">
                    <svg style="width: 48px; height: 48px; margin-bottom: 1rem;" viewBox="0 0 24 24" fill="white">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <h2 style="font-size: 1.75rem; font-weight: 800; margin: 0;">
                        Message copié ! ✅
                    </h2>
                    <p style="margin-top: 0.5rem; opacity: 0.9;">
                        Votre commande est prête à être envoyée
                    </p>
                </div>

                <!-- Content -->
                <div style="padding: 2rem;">
                    <div style="
                        background: #f0f2f5;
                        padding: 1.5rem;
                        border-radius: 12px;
                        margin-bottom: 1.5rem;
                        border-left: 4px solid #1877F2;
                    ">
                        <p style="
                            font-size: 1.125rem;
                            font-weight: 600;
                            color: #1877F2;
                            margin-bottom: 0.75rem;
                        ">
                            📋 Instructions :
                        </p>
                        <ol style="
                            margin: 0;
                            padding-left: 1.5rem;
                            color: #333;
                            line-height: 1.8;
                        ">
                            <li>Le message a été <strong>copié automatiquement</strong></li>
                            <li>Cliquez sur le bouton bleu ci-dessous</li>
                            <li><strong>Collez le message</strong> (Ctrl+V ou maintenir et coller)</li>
                            <li>Appuyez sur Envoyer dans Messenger</li>
                        </ol>
                    </div>

                    <!-- Message Preview -->
                    <details style="margin-bottom: 1.5rem;">
                        <summary style="
                            cursor: pointer;
                            font-weight: 600;
                            color: #1877F2;
                            padding: 0.75rem;
                            background: #f0f2f5;
                            border-radius: 8px;
                        ">
                            📄 Voir le message à envoyer
                        </summary>
                        <div style="
                            margin-top: 1rem;
                            padding: 1rem;
                            background: #f8f9fa;
                            border-radius: 8px;
                            max-height: 200px;
                            overflow-y: auto;
                            font-family: monospace;
                            font-size: 0.875rem;
                            white-space: pre-wrap;
                            border: 1px solid #e0e0e0;
                        ">${message}</div>
                    </details>

                    <!-- Actions -->
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <button onclick="openMessengerAndClose()" style="
                            padding: 1.25rem;
                            background: linear-gradient(135deg, #1877F2, #0C63D4);
                            color: white;
                            border: none;
                            border-radius: 12px;
                            font-size: 1.125rem;
                            font-weight: 700;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 0.75rem;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 24px rgba(24,119,242,0.4)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24" fill="white">
                                <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
                            </svg>
                            Ouvrir Facebook Messenger
                        </button>

                        <button onclick="copyAgainFacebook('${message.replace(/'/g, "\\'")}', this)" style="
                            padding: 1rem;
                            background: #f0f2f5;
                            color: #333;
                            border: 2px solid #e0e0e0;
                            border-radius: 12px;
                            font-size: 1rem;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.background='#e4e6e9'" onmouseout="this.style.background='#f0f2f5'">
                            📋 Copier à nouveau
                        </button>

                        <button onclick="closeFacebookModal()" style="
                            padding: 0.75rem;
                            background: transparent;
                            color: #666;
                            border: none;
                            font-size: 0.9375rem;
                            cursor: pointer;
                        ">
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Ajouter au body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// Fonction pour ouvrir Messenger et fermer le modal
function openMessengerAndClose() {
    window.open('https://m.me/abdel.gharbi.7', '_blank');
    closeFacebookModal();
    
    // Montrer message de succès après un délai
    setTimeout(() => {
        showSuccessMessage('Facebook Messenger');
    }, 500);
}

// Fonction pour copier à nouveau
function copyAgainFacebook(message, button) {
    // Décoder le message
    const decodedMessage = message.replace(/\\'/g, "'");
    
    navigator.clipboard.writeText(decodedMessage).then(() => {
        // Changer le texte du bouton temporairement
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Copié !';
        button.style.background = '#10b981';
        button.style.color = 'white';
        button.style.borderColor = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '#f0f2f5';
            button.style.color = '#333';
            button.style.borderColor = '#e0e0e0';
        }, 2000);
    }).catch(() => {
        alert('Erreur de copie. Veuillez copier manuellement.');
    });
}

// Fonction pour fermer le modal Facebook
function closeFacebookModal() {
    const modal = document.getElementById('facebookModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function callPhone() {
    const orderData = getOrderData();
    if (!orderData) return;

    if (confirm('📞 Vous allez appeler Miel de Wahbi au +216 97 244 049\n\nPréparez vos informations de commande !')) {
        window.location.href = 'tel:+21697244049';
        showSuccessMessage('Appel téléphonique');
    }
}

function showSuccessMessage(platform) {
    closeCheckout();
    
    // Custom success modal
    const successHtml = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
            <h2 style="color: var(--primary); margin-bottom: 1rem;">Commande envoyée !</h2>
            <p>Votre commande a été envoyée via ${platform}.</p>
            <p>Nous vous contacterons rapidement ! 🍯</p>
        </div>
    `;
    
    alert(`Merci ! Votre commande va être envoyée via ${platform}. Nous vous contacterons rapidement ! 🍯`);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartBadge();
}

function showError(message) {
    alert('❌ ' + message);
}

// ============= UTILITY FUNCTIONS =============
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function handleOutsideClick(event) {
    const cartModal = document.getElementById('cartModal');
    const checkoutModal = document.getElementById('checkoutModal');
    
    if (event.target.classList.contains('modal-overlay')) {
        if (cartModal && cartModal.classList.contains('active')) {
            closeCart();
        }
        if (checkoutModal && checkoutModal.classList.contains('active')) {
            closeCheckout();
        }
    }
}

function handleKeyboardNavigation(event) {
    // ESC key closes modals
    if (event.key === 'Escape') {
        closeCart();
        closeCheckout();
        closeToast();
    }
}

// ============= PERFORMANCE OPTIMIZATION =============
// Debounce function for expensive operations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============= EXPORT FOR TESTING =============
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        calculateDelivery
    };
}

console.log('🚀 Miel de Wahbi - Premium JavaScript loaded successfully!');
