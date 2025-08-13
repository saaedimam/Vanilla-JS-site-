// Global interactions (nav toggle, year, forms)
document.addEventListener("DOMContentLoaded", () => {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (btn && nav){
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
});

// Simple form handler that posts to a configurable endpoint or falls back to mailto
async function handleFormSubmit(e, {endpoint, mailto}){
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  const status = form.querySelector(".status");
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
    }else{
      status.textContent = "No endpoint configured. Please set one in the HTML data attributes.";
    }
  }catch(err){
    console.error(err);
    status.textContent = "There was an error. Please try again later.";
  }
}

// Expose helper
window.KTL = { handleFormSubmit };
