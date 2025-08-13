// Built by Saaed Imam — Vanilla JS only

// Mobile menu toggle with ARIA updates
const menuBtn   = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

if (menuBtn && mobileNav) {
  function toggleNav() {
    const isOpen = !mobileNav.hasAttribute('hidden');
    if (isOpen) {
      mobileNav.setAttribute('hidden', '');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = ''; // re-enable scroll
    } else {
      mobileNav.removeAttribute('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden'; // lock scroll when open
    }
  }
  menuBtn.addEventListener('click', toggleNav);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileNav.hasAttribute('hidden')) toggleNav();
  });
}

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
