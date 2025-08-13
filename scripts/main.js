// Global interactions (nav toggle, year, forms)
document.addEventListener("DOMContentLoaded", () => {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (menuBtn && nav){
    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuBtn.textContent = isOpen ? "Close" : "Menu";
      
      // Close menu when clicking nav links
      if (isOpen) {
        nav.addEventListener("click", (e) => {
          if (e.target.matches("a")) {
            nav.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.textContent = "Menu";
          }
        });
      }
    });
    
    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "Menu";
        menuBtn.focus();
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  function observeReveals(){
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }

  window.KTL = Object.assign(window.KTL || {}, { observeReveals, handleFormSubmit, initView });
  observeReveals();
});

// Simple form handler that posts to a configurable endpoint or falls back to mailto
async function handleFormSubmit(e, {endpoint, mailto}){
  e.preventDefault();
  const form = e.target;
  const status = form.querySelector(".status");
  if (!validateForm(form, status)) return;
  const data = Object.fromEntries(new FormData(form).entries());
  status.textContent = "Submitting…";

  try{
    if (endpoint){
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Request failed");
      status.textContent = "Thanks! We’ll get back to you shortly.";
      form.reset();
    }else if (mailto){
      const q = new URLSearchParams(data).toString();
      location.href = `mailto:${mailto}?subject=Website%20Form&body=${q}`;
      status.textContent = "Opening your email client…";
      form.reset();
    }else{
      status.textContent = "No endpoint configured. Please set one in the HTML data attributes.";
    }
  }catch(err){
    console.error(err);
    status.textContent = "There was an error. Please try again later.";
  }
}

function validateForm(form, status){
  const required = form.querySelectorAll('[required]');
  for (const field of required){
    if (!field.value.trim()){
      status.textContent = "Please complete required fields.";
      return false;
    }
  }
  const emailField = form.querySelector('input[type="email"]');
  if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)){
    status.textContent = "Please enter a valid email.";
    return false;
  }
  return true;
}

function initView(route){
  if(route === '/news'){
    if(window.KTL && typeof KTL.loadNews === 'function'){
      KTL.loadNews();
    }
  }else if(route === '/contact'){
    const form = document.getElementById('contact-form');
    if(form){
      form.addEventListener('submit', e => handleFormSubmit(e, {endpoint: CONFIG.CONTACT_ENDPOINT, mailto: CONFIG.CONTACT_EMAIL}));
    }
  }else if(route === '/rfq'){
    const form = document.getElementById('rfq-form');
    if(form){
      form.addEventListener('submit', e => handleFormSubmit(e, {endpoint: CONFIG.RFQ_ENDPOINT, mailto: CONFIG.RFQ_EMAIL}));
    }
  }
}
