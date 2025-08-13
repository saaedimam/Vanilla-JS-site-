// Enhanced menu toggle functionality
function toggleMenu() {
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.menu-toggle');
  const isOpen = nav.classList.contains('open');

  if (isOpen) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
    document.body.style.overflow = '';
  } else {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.textContent = 'Close';
    document.body.style.overflow = 'hidden';
  }
}

// Enhanced form handler with better UX
async function handleFormSubmit(e, {endpoint, mailto}){
  e.preventDefault();
  const form = e.target;
  const status = form.querySelector(".status");
  const submitBtn = form.querySelector('button[type="submit"], button:not([type])');

  if (!validateForm(form, status)) return;

  const data = Object.fromEntries(new FormData(form).entries());

  // Enhanced loading state
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";
  }
  status.textContent = "Submitting your request…";
  status.style.background = "linear-gradient(135deg, #FEF3C7, #FDE68A)";
  status.style.color = "#92400E";
  status.style.border = "1px solid #F59E0B";

  try{
    if (endpoint){
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Request failed");

      status.textContent = "✓ Success! We'll get back to you shortly.";
      status.style.background = "linear-gradient(135deg, #D1FAE5, #A7F3D0)";
      status.style.color = "#065F46";
      status.style.border = "1px solid #10B981";
      form.reset();
    }else if (mailto){
      const subject = encodeURIComponent(`Website Form Submission - ${data.company || 'Contact'}`);
      const body = encodeURIComponent(Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n'));
      location.href = `mailto:${mailto}?subject=${subject}&body=${body}`;

      status.textContent = "✓ Opening your email client…";
      status.style.background = "linear-gradient(135deg, #DBEAFE, #BFDBFE)";
      status.style.color = "#1E40AF";
      status.style.border = "1px solid #3B82F6";
      form.reset();
    }else{
      throw new Error("No endpoint configured");
    }
  }catch(err){
    console.error(err);
    status.textContent = "⚠ Error submitting form. Please try again or contact us directly.";
    status.style.background = "linear-gradient(135deg, #FEE2E2, #FECACA)";
    status.style.color = "#991B1B";
    status.style.border = "1px solid #EF4444";
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  }
}

function validateForm(form, status){
  const requiredFields = form.querySelectorAll("[required]");
  for (const field of requiredFields){
    if (!field.value.trim()){
      const fieldName = field.name || field.getAttribute('placeholder') || 'required field';
      status.textContent = `⚠ Please fill in ${fieldName}.`;
      status.style.background = "linear-gradient(135deg, #FEE2E2, #FECACA)";
      status.style.color = "#991B1B";
      status.style.border = "1px solid #EF4444";
      field.focus();
      return false;
    }
    if (field.type === "email" && !field.value.includes("@")){
      status.textContent = "⚠ Please enter a valid email address.";
      status.style.background = "linear-gradient(135deg, #FEE2E2, #FECACA)";
      status.style.color = "#991B1B";
      status.style.border = "1px solid #EF4444";
      field.focus();
      return false;
    }
  }
  return true;
}

function initView(route){
  // Initialize forms for the current view
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    // Remove existing listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    if(newForm.id === "rfq-form"){
      newForm.addEventListener("submit", (e) => {
        const endpoint = window.CONFIG?.RFQ_ENDPOINT;
        const mailto = window.CONFIG?.RFQ_EMAIL || "info@ktlbd.com";
        handleFormSubmit(e, {endpoint, mailto});
      });
    } else if(newForm.id === "contact-form"){
      newForm.addEventListener("submit", (e) => {
        const endpoint = window.CONFIG?.CONTACT_ENDPOINT;
        const mailto = window.CONFIG?.CONTACT_EMAIL || "info@ktlbd.com";
        handleFormSubmit(e, {endpoint, mailto});
      });
    } else if(newForm.id === "careers-form"){
      newForm.addEventListener("submit", (e) => {
        const endpoint = newForm.dataset.endpoint;
        const mailto = newForm.dataset.mailto || "hr@ktlbd.com";
        handleFormSubmit(e, {endpoint, mailto});
      });
    }
  });

  // Load news if on news page
  if(route === "/news" && typeof window.KTL.loadNews === "function"){
    window.KTL.loadNews();
  }
}

// Enhanced scroll animations and interactions
document.addEventListener("DOMContentLoaded", function(){
  // Enhanced intersection observer with stagger effect
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100); // Stagger animations
      }
    });
  }, {threshold: 0.1, rootMargin: '0px 0px -50px 0px'});

  function observeReveals(){
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');

  const toggleNav = () => {
    const open = mobileNav.hasAttribute('hidden') ? false : true;
    if(open){
      mobileNav.setAttribute('hidden','');
      menuBtn.setAttribute('aria-expanded','false');
      menuBtn.setAttribute('aria-label','Open menu');
    }else{
      mobileNav.removeAttribute('hidden');
      menuBtn.setAttribute('aria-expanded','true');
      menuBtn.setAttribute('aria-label','Close menu');
    }
  };

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', toggleNav);

    // Close on escape
    document.addEventListener('keydown', e => {
      if(e.key === 'Escape' && !mobileNav.hasAttribute('hidden')) toggleNav();
    });

    // Close menu when clicking nav links
    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        if (!mobileNav.hasAttribute('hidden')) {
          toggleNav();
        }
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('open') && 
        !nav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      toggleMenu();
    }
  });

  // Enhanced keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) {
      toggleMenu();
    }
  });

  // Smooth scrolling for anchor links
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#/')) {
      e.preventDefault();
      const hash = e.target.getAttribute('href');
      window.location.hash = hash;
    }
  });

  // Initialize
  window.KTL = Object.assign(window.KTL || {}, { 
    observeReveals, 
    handleFormSubmit, 
    initView, 
    toggleMenu 
  });

  observeReveals();
});