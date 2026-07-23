(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = value => `₹${Number(value).toLocaleString('en-IN')}`;
  const body = document.body;

  // Sticky, softly blurred navigation
  const header = $('#siteHeader');
  const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 36);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  // Reveal on scroll
  const reveals = $$('.reveal:not(.hero .reveal)');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // Mobile navigation
  const menuToggle = $('.menu-toggle');
  const mobileMenu = $('#mobileMenu');
  const closeMobileMenu = () => {
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
  };
  menuToggle.addEventListener('click', () => {
    const opening = !mobileMenu.classList.contains('open');
    menuToggle.classList.toggle('active', opening);
    menuToggle.setAttribute('aria-expanded', String(opening));
    menuToggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
    mobileMenu.classList.toggle('open', opening);
    mobileMenu.setAttribute('aria-hidden', String(!opening));
    body.classList.toggle('no-scroll', opening);
  });
  $$('#mobileMenu a').forEach(link => link.addEventListener('click', closeMobileMenu));

  // Menu data from product cards
  const products = $$('.product-card').map(card => ({
    id: card.dataset.id,
    name: card.dataset.name,
    price: Number(card.dataset.price),
    image: card.dataset.image,
    category: card.dataset.category,
    description: $('.product-info p', card)?.textContent.trim() || ''
  }));
  products.push({ id: 'monsoon-danish', name: 'Monsoon Plum & Almond Danish', price: 920, image: 'assets/images/croissant-tray.webp', category: 'pastries', description: 'Tart plums, almond cream and honeyed vanilla glaze. Box of four.' });

  // Menu filter and full menu
  const productGrid = $('#productGrid');
  const filterButtons = $$('.filter-chip');
  const viewFullMenu = $('#viewFullMenu');
  let fullMenuOpen = false;

  const setFilter = (filter, shouldScroll = false) => {
    filterButtons.forEach(button => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    $$('.product-card', productGrid).forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (filter === 'all') {
        card.classList.toggle('show', fullMenuOpen && card.classList.contains('menu-extra'));
        card.classList.remove('hidden');
      } else {
        if (card.classList.contains('menu-extra')) card.classList.toggle('show', match);
        card.classList.toggle('hidden', !match);
      }
      if (match) requestAnimationFrame(() => card.classList.add('is-visible'));
    });
    viewFullMenu.innerHTML = filter === 'all'
      ? (fullMenuOpen ? 'Show signature edit <span aria-hidden="true">↑</span>' : 'View full menu <span aria-hidden="true">↓</span>')
      : 'Show all favourites <span aria-hidden="true">↗</span>';
    if (shouldScroll) $('#signature').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  filterButtons.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
  viewFullMenu.addEventListener('click', () => {
    const activeFilter = $('.filter-chip.active').dataset.filter;
    if (activeFilter !== 'all') {
      fullMenuOpen = true;
      setFilter('all');
    } else {
      fullMenuOpen = !fullMenuOpen;
      setFilter('all');
    }
  });
  $$('.journey-card').forEach(card => card.addEventListener('click', event => {
    if (!event.target.closest('button') && event.target !== card) return;
    setFilter(card.dataset.filterTarget, true);
  }));

  // Cart
  const cartDrawer = $('#cartDrawer');
  const drawerBackdrop = $('.drawer-backdrop');
  const cartItemsEl = $('.cart-items');
  const cartEmptyEl = $('.cart-empty');
  const cartFooter = $('.cart-footer');
  const cartCounts = $$('.cart-count');
  const cartButton = $('.cart-button');
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('aurelia-cart') || '[]'); } catch (_) { cart = []; }

  const saveCart = () => {
    try { localStorage.setItem('aurelia-cart', JSON.stringify(cart)); } catch (_) { /* storage may be unavailable */ }
  };
  const cartTotalQty = () => cart.reduce((sum, item) => sum + item.qty, 0);
  const openDrawer = () => {
    closeSearch();
    closeDialog();
    cartDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
    setTimeout(() => $('.drawer-close').focus(), 200);
  };
  const closeDrawer = () => {
    cartDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
    resetCheckout();
  };

  const renderCart = () => {
    const qty = cartTotalQty();
    cartCounts.forEach(el => el.textContent = qty);
    cartButton.setAttribute('aria-label', `Open your basket, ${qty} item${qty === 1 ? '' : 's'}`);
    cartEmptyEl.style.display = cart.length ? 'none' : 'block';
    cartItemsEl.style.display = cart.length ? 'flex' : 'none';
    cartFooter.classList.toggle('visible', !!cart.length);
    $('.cart-subtotal').textContent = money(cart.reduce((sum, item) => sum + item.price * item.qty, 0));
    cartItemsEl.innerHTML = cart.map(item => `
      <article class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <div><h3>${item.name}</h3><span>${money(item.price)}</span>
          <div class="item-qty" aria-label="Quantity for ${item.name}">
            <button type="button" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button type="button" data-change="1" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="remove-item" type="button" aria-label="Remove ${item.name}">×</button>
      </article>`).join('');
    saveCart();
  };

  let toastTimer;
  const toast = $('.toast');
  const showToast = message => {
    $('p', toast).textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  const addToCart = (product, openAfter = false) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) existing.qty += 1;
    else cart.push({ ...product, qty: 1 });
    renderCart();
    showToast(`${product.name} added to your basket`);
    if (openAfter) openDrawer();
  };

  $$('.product-card').forEach(card => {
    const product = products.find(item => item.id === card.dataset.id);
    $$('.quick-add, .order-link', card).forEach(button => button.addEventListener('click', event => {
      event.stopPropagation();
      addToCart(product);
    }));
  });
  $('.add-seasonal').addEventListener('click', () => addToCart(products.find(p => p.id === 'monsoon-danish')));
  cartButton.addEventListener('click', openDrawer);
  $('.drawer-close').addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);
  $('.drawer-shop').addEventListener('click', () => { closeDrawer(); $('#signature').scrollIntoView({ behavior: 'smooth' }); });
  $('.toast button').addEventListener('click', () => { toast.classList.remove('show'); openDrawer(); });

  cartItemsEl.addEventListener('click', event => {
    const itemEl = event.target.closest('.cart-item');
    if (!itemEl) return;
    const item = cart.find(entry => entry.id === itemEl.dataset.id);
    if (event.target.closest('[data-change]')) {
      item.qty += Number(event.target.closest('[data-change]').dataset.change);
      if (item.qty <= 0) cart = cart.filter(entry => entry.id !== item.id);
    }
    if (event.target.closest('.remove-item')) cart = cart.filter(entry => entry.id !== item.id);
    renderCart();
  });

  let checkoutMode = false;
  const resetCheckout = () => {
    if (!checkoutMode) return;
    checkoutMode = false;
    const checkout = $('.checkout-panel');
    if (checkout) checkout.remove();
    cartEmptyEl.style.display = cart.length ? 'none' : 'block';
    cartItemsEl.style.display = cart.length ? 'flex' : 'none';
    cartFooter.classList.toggle('visible', !!cart.length);
    $('#cartTitle').textContent = 'A little something';
  };
  $('.checkout-button').addEventListener('click', () => {
    if (!cart.length) return;
    checkoutMode = true;
    cartEmptyEl.style.display = 'none';
    cartItemsEl.style.display = 'none';
    cartFooter.classList.remove('visible');
    $('#cartTitle').textContent = 'Checkout details';
    const panel = document.createElement('div');
    panel.className = 'checkout-panel';
    panel.innerHTML = `
      <form id="checkoutForm" style="display:flex;flex-direction:column;gap:16px">
        <fieldset style="border:0;padding:0;margin:0"><legend style="font-size:11px;font-weight:600;margin-bottom:10px">How would you like your order?</legend>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <label style="padding:12px;border:1px solid var(--caramel);border-radius:13px;background:var(--cream);font-size:12px"><input type="radio" name="fulfilment" value="Pickup" checked style="accent-color:var(--brown)"> Store pickup</label>
            <label style="padding:12px;border:1px solid var(--line);border-radius:13px;font-size:12px"><input type="radio" name="fulfilment" value="Delivery" style="accent-color:var(--brown)"> Delivery</label>
          </div>
        </fieldset>
        <label style="font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)">Name<input name="name" required style="width:100%;margin-top:6px;border:1px solid var(--line);background:var(--cream);padding:13px;border-radius:12px" placeholder="Your name"></label>
        <label style="font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)">Phone<input name="phone" type="tel" required style="width:100%;margin-top:6px;border:1px solid var(--line);background:var(--cream);padding:13px;border-radius:12px" placeholder="+91"></label>
        <label style="font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)">Preferred date<input name="date" type="date" required style="width:100%;margin-top:6px;border:1px solid var(--line);background:var(--cream);padding:13px;border-radius:12px"></label>
        <div style="display:flex;justify-content:space-between;padding-top:16px;border-top:1px solid var(--line)"><span>Total</span><strong style="font-family:var(--font-serif);font-size:22px;font-weight:400">${$('.cart-subtotal').textContent}</strong></div>
        <button class="button button-brown" type="submit">Place order request <span>→</span></button>
        <button type="button" class="text-link checkout-back" style="align-self:center">← Back to basket</button>
        <p class="form-status" role="status"></p>
      </form>`;
    $('.cart-body').append(panel);
    const dateField = $('[name="date"]', panel);
    dateField.min = new Date().toISOString().split('T')[0];
    $('.checkout-back', panel).addEventListener('click', resetCheckout);
    $('#checkoutForm', panel).addEventListener('submit', event => {
      event.preventDefault();
      if (!event.currentTarget.reportValidity()) return;
      const name = new FormData(event.currentTarget).get('name').trim().split(' ')[0];
      panel.innerHTML = `<div style="text-align:center;padding:70px 8px"><span class="empty-icon" style="color:var(--brown);font-size:28px">✓</span><h3 style="font-size:30px">Thank you, ${name}.</h3><p>We’ve received your order request and will call shortly to confirm availability and payment.</p><button class="button button-brown order-done" type="button">Done</button></div>`;
      $('.order-done', panel).addEventListener('click', () => { cart = []; renderCart(); closeDrawer(); showToast('Your order request has been received'); });
    });
  });

  // Modal utilities
  const modalBackdrop = $('#modalBackdrop');
  const consultationDialog = $('#consultationDialog');
  const searchDialog = $('#searchDialog');
  let lastFocused = null;

  function openConsultation() {
    closeDrawer(); closeSearch();
    lastFocused = document.activeElement;
    consultationDialog.classList.add('open');
    consultationDialog.setAttribute('aria-hidden', 'false');
    modalBackdrop.classList.add('open');
    body.classList.add('no-scroll');
    setTimeout(() => $('input', consultationDialog).focus(), 180);
  }
  function closeDialog() {
    consultationDialog.classList.remove('open');
    consultationDialog.setAttribute('aria-hidden', 'true');
    if (!searchDialog.classList.contains('open')) {
      modalBackdrop.classList.remove('open');
      body.classList.remove('no-scroll');
    }
  }
  $$('.consultation-trigger').forEach(button => button.addEventListener('click', openConsultation));
  $('.dialog-close').addEventListener('click', closeDialog);
  modalBackdrop.addEventListener('click', () => { closeDialog(); closeSearch(); });

  const consultationForm = $('#consultationForm');
  const consultationDate = $('[name="date"]', consultationForm);
  consultationDate.min = new Date().toISOString().split('T')[0];
  consultationForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!consultationForm.reportValidity()) return;
    const status = $('.form-status', consultationForm);
    const name = new FormData(consultationForm).get('name').trim().split(' ')[0];
    status.textContent = `Thank you, ${name}. Your cake consultation request is on its way.`;
    status.style.color = '#47744a';
    consultationForm.reset();
    setTimeout(closeDialog, 2200);
  });

  // Search
  function openSearch() {
    closeDrawer(); closeDialog();
    lastFocused = document.activeElement;
    searchDialog.classList.add('open');
    searchDialog.setAttribute('aria-hidden', 'false');
    modalBackdrop.classList.add('open');
    body.classList.add('no-scroll');
    setTimeout(() => $('#menuSearch').focus(), 180);
  }
  function closeSearch() {
    searchDialog.classList.remove('open');
    searchDialog.setAttribute('aria-hidden', 'true');
    if (!consultationDialog.classList.contains('open')) {
      modalBackdrop.classList.remove('open');
      body.classList.remove('no-scroll');
    }
  }
  $('.search-trigger').addEventListener('click', openSearch);
  $('.search-close').addEventListener('click', closeSearch);
  const menuSearch = $('#menuSearch');
  const searchResults = $('.search-results');
  const renderSearch = query => {
    const clean = query.trim().toLowerCase();
    if (!clean) {
      searchResults.innerHTML = '<p class="search-hint">Popular: <button type="button">Croissants</button> <button type="button">Celebration cakes</button> <button type="button">Sourdough</button></p>';
      bindPopular();
      return;
    }
    const words = clean.split(/\s+/);
    const matches = products.filter(product => words.every(word => `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(word))).slice(0, 5);
    searchResults.innerHTML = matches.length ? matches.map(product => `<button type="button" class="search-result" data-id="${product.id}" style="width:100%;border:0;background:none;text-align:left"><img src="${product.image}" alt=""><div><strong>${product.name}</strong><small>${product.category}</small></div><span>${money(product.price)} +</span></button>`).join('') : '<p class="search-hint">Nothing found just yet. Try “cake”, “bread” or “pastry”.</p>';
    $$('.search-result', searchResults).forEach(result => result.addEventListener('click', () => {
      addToCart(products.find(product => product.id === result.dataset.id));
      closeSearch();
    }));
  };
  const bindPopular = () => $$('.search-hint button', searchResults).forEach(button => button.addEventListener('click', () => {
    const term = button.textContent === 'Celebration cakes' ? 'cake' : button.textContent.replace(/s$/, '').toLowerCase();
    menuSearch.value = term;
    renderSearch(term);
  }));
  bindPopular();
  menuSearch.addEventListener('input', () => renderSearch(menuSearch.value));

  // Testimonial carousel
  const testimonials = $$('.testimonial');
  const testimonialProgress = $('.testimonial-progress i');
  const testimonialProgressWrap = $('.testimonial-progress');
  let testimonialIndex = 0;
  let testimonialTimer;
  const showTestimonial = index => {
    testimonialIndex = (index + testimonials.length) % testimonials.length;
    testimonials.forEach((item, i) => item.classList.toggle('active', i === testimonialIndex));
    testimonialProgress.style.transform = `translateX(${testimonialIndex * 100}%)`;
    testimonialProgressWrap.setAttribute('aria-label', `Testimonial ${testimonialIndex + 1} of ${testimonials.length}`);
  };
  const restartTestimonials = () => {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(() => showTestimonial(testimonialIndex + 1), 7000);
  };
  $$('.testimonial-controls button').forEach(button => button.addEventListener('click', () => {
    showTestimonial(testimonialIndex + (button.dataset.direction === 'next' ? 1 : -1));
    restartTestimonials();
  }));
  restartTestimonials();

  // Gallery lightbox
  const lightbox = $('#lightbox');
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
  };
  $$('.gallery-item').forEach(item => item.addEventListener('click', () => {
    const image = $('img', lightbox);
    image.src = item.dataset.full;
    image.alt = $('img', item).alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
  }));
  $('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });

  // Order option helpers
  $('.shop-trigger').addEventListener('click', () => $('#signature').scrollIntoView({ behavior: 'smooth' }));
  $('.delivery-trigger').addEventListener('click', () => { $('#postcode').scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => $('#postcode').focus(), 500); });

  // Delivery checker
  const postcode = $('#postcode');
  const deliveryResult = $('#deliveryResult');
  $('#checkDelivery').addEventListener('click', () => {
    const value = postcode.value.trim();
    deliveryResult.className = '';
    if (!/^\d{6}$/.test(value)) {
      deliveryResult.textContent = 'Please enter a valid 6-digit PIN code.';
      deliveryResult.classList.add('error');
    } else if (value.startsWith('500')) {
      deliveryResult.textContent = 'Lovely—we deliver to your neighbourhood. Order by 4 PM for same-day delivery.';
      deliveryResult.classList.add('success');
    } else {
      deliveryResult.textContent = 'This is just outside our daily route. Call us and we’ll see what we can arrange.';
      deliveryResult.classList.add('error');
    }
  });
  postcode.addEventListener('keydown', event => { if (event.key === 'Enter') $('#checkDelivery').click(); });

  // Newsletter
  $('#newsletterForm').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = $('.form-status', form);
    if (!form.reportValidity()) {
      status.textContent = 'Please add your email and tick the consent box.';
      return;
    }
    status.textContent = 'You’re on the list. Something lovely will be in your inbox soon.';
    form.reset();
  });

  // Keyboard affordances
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    closeMobileMenu();
    closeDrawer();
    closeDialog();
    closeSearch();
    closeLightbox();
    if (lastFocused) lastFocused.focus();
  });

  // Decorative parallax, only on devices where motion is welcome
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const seasonal = $('.seasonal-image');
      if (!seasonal) return;
      const rect = seasonal.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0) seasonal.style.transform = `translateY(${(rect.top - innerHeight / 2) * -.015}px)`;
    }, { passive: true });
  }

  renderCart();
})();
