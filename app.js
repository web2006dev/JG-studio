/**
 * JG STUDIO & ACADEMY PATNA — INTERACTIVE JAVASCRIPT ENGINE
 * Fast, lightweight, photo lightbox, category filtering, WhatsApp booking
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '918789290075'; // JG Studio Patna WhatsApp

  // =========================================================================
  // 1. MOBILE DRAWER NAVIGATION
  // =========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // =========================================================================
  // 2. HEADER SCROLL STATE
  // =========================================================================
  const studioHeader = document.getElementById('studioHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      studioHeader.style.borderBottomColor = 'rgba(212, 175, 55, 0.4)';
      studioHeader.style.backgroundColor = 'rgba(13, 11, 10, 0.98)';
    } else {
      studioHeader.style.borderBottomColor = 'var(--border-subtle)';
      studioHeader.style.backgroundColor = 'rgba(13, 11, 10, 0.94)';
    }
  }, { passive: true });

  // =========================================================================
  // 3. PHOTO PORTFOLIO CATEGORY FILTERING
  // =========================================================================
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const photoCards = document.querySelectorAll('.photo-card');

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      photoCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 15);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
        }
      });
    });
  });

  // =========================================================================
  // 4. FULLSCREEN PHOTO LIGHTBOX MODAL
  // =========================================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxWaBtn = document.getElementById('lightboxWaBtn');
  const lightboxClose = document.getElementById('lightboxClose');

  photoCards.forEach(card => {
    card.addEventListener('click', () => {
      const fullSrc = card.getAttribute('data-src') || card.querySelector('img').src;
      const title = card.getAttribute('data-title') || 'JG Studio Look';

      lightboxImg.src = fullSrc;
      lightboxTitle.textContent = title;

      const waMessage = `Hi JG Studio! ✨ I saw "${title}" in your website portfolio and would love to book/inquire about this look.`;
      lightboxWaBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

      lightboxModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // =========================================================================
  // 5. QUICK DIRECT SERVICE BOOKING BUTTONS
  // =========================================================================
  const quickBookBtns = document.querySelectorAll('.js-quick-book');
  quickBookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || 'Salon Service';
      const message = `Hello JG Studio! 👋 I would like to book an appointment for: "${service}". Please share earliest available slots.`;
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    });
  });

  // =========================================================================
  // 6. APPOINTMENT RESERVATION MODAL
  // =========================================================================
  const bookingModal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const bookingForm = document.getElementById('bookingForm');
  const bookServiceSelect = document.getElementById('bookService');
  const openBookingBtns = document.querySelectorAll('.js-open-booking');

  function openBookingModal(preSelectedService = '') {
    if (preSelectedService && bookServiceSelect) {
      bookServiceSelect.value = preSelectedService;
    }
    bookingModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const dateInput = document.getElementById('bookDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      if (!dateInput.value) dateInput.value = today;
    }
  }

  function closeBookingModal() {
    bookingModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const s = btn.getAttribute('data-service') || '';
      openBookingModal(s);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeBookingModal);
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeBookingModal();
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookName').value.trim();
      const phone = document.getElementById('bookPhone').value.trim();
      const service = document.getElementById('bookService').value;
      const date = document.getElementById('bookDate').value;
      const time = document.getElementById('bookTime').value;

      let msg = `Hi JG Studio & Academy (Patna)! 👋\nI'd like to reserve an appointment:\n\n`;
      msg += `👤 Name: ${name}\n`;
      msg += `📞 Phone: ${phone}\n`;
      msg += `💄 Service: ${service}\n`;
      msg += `📅 Preferred Date: ${date}\n`;
      msg += `⏰ Preferred Time: ${time}\n\n`;
      msg += `Please confirm slot availability. Thank you!`;

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      closeBookingModal();
      window.open(waUrl, '_blank');
    });
  }
});
