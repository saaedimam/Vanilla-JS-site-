// Lightweight hash router that loads HTML partials into #app
const routes = {
  "/": "home.html",
  "/about": "about.html",
  "/sustainability": "sustainability.html",
  "/certifications": "certifications.html",
  "/clients": "clients.html",
  "/impact": "impact.html",
  "/careers": "careers.html",
  "/news": "news.html",
  "/contact": "contact.html",
  "/rfq": "rfq.html",
  "/privacy": "privacy.html",
  "/terms": "terms.html"
};

async function loadView(route){
  const file = routes[route] || routes["/"];
  const target = document.getElementById("app");
  target.innerHTML = '<div class="card">Loading…</div>';
  try{
    const res = await fetch(`./partials/${file}`, {cache: "no-cache"});
    const html = await res.text();
    target.innerHTML = html;
    window.scrollTo({top:0, behavior:"smooth"});
  }catch(err){
    target.innerHTML = '<div class="card">Failed to load. Please refresh.</div>';
    console.error(err);
  }
}

function getRoute(){
  const hash = location.hash || "#/";
  const path = hash.replace(/^#/, "");
  return routes[path] ? path : "/";
}

function onRouteChange(){
  loadView(getRoute());
}

window.addEventListener("hashchange", onRouteChange);
window.addEventListener("DOMContentLoaded", onRouteChange);
