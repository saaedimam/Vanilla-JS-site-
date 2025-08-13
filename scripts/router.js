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

const meta = {
  "/": {
    title: "KTL — Export‑Ready Apparel Manufacturer | Bangladesh",
    description: "Bangladesh manufacturer with 12 lines and 850+ workers producing knitwear, uniforms, woven, schoolwear, sportswear for USA, Canada, UK. ISO 9001 & C‑TPAT."
  },
  "/about": {title: "About KTL | Company Profile", description: "Company profile of Kattali Textile Ltd."},
  "/sustainability": {title: "KTL Sustainability | People, Planet, Compliance", description: "Sustainability at KTL covering people, planet, and compliance."},
  "/certifications": {title: "KTL Certifications | ISO 9001, C‑TPAT", description: "Certifications including ISO 9001 and C‑TPAT."},
  "/clients": {title: "KTL Clients | Sectors & Case Highlights", description: "Client sectors and highlights."},
  "/impact": {title: "KTL Impact | Case Studies & Achievements", description: "Case studies and achievements from KTL."},
  "/careers": {title: "KTL Careers | Open Roles", description: "Current job openings at KTL."},
  "/news": {title: "KTL News | Updates", description: "Latest news and updates from KTL."},
  "/contact": {title: "Contact KTL | Chattogram, Bangladesh", description: "Contact information for KTL in Chattogram, Bangladesh."},
  "/rfq": {title: "RFQ | KTL Commercial", description: "Request a quote from KTL."},
  "/privacy": {title: "Privacy Policy | KTL", description: "KTL privacy policy."},
  "/terms": {title: "Terms of Use | KTL", description: "KTL website terms of use."}
};

async function loadView(route){
  const file = routes[route] || routes["/"];
  const target = document.getElementById("app");
  target.classList.remove("show");
  target.innerHTML = '<div class="card">Loading…</div>';
  try{
    const res = await fetch(`./partials/${file}`, {cache: "no-cache"});
    const html = await res.text();
    target.innerHTML = html;
    target.classList.remove("show");
    setMeta(route);
    window.scrollTo({top:0, behavior:"smooth"});
    if (window.KTL && typeof KTL.observeReveals === "function"){
      KTL.observeReveals();
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.classList.add("show");
      });
    });
  }catch(err){
    target.innerHTML = '<div class="card">Failed to load. Please refresh.</div>';
    console.error(err);
  }
}

function setMeta(route){
  const m = meta[route] || meta["/"];
  document.title = m.title;
  let d = document.querySelector('meta[name="description"]');
  if(!d){
    d = document.createElement('meta');
    d.name = 'description';
    document.head.appendChild(d);
  }
  d.setAttribute('content', m.description);
}

function getRoute(){
  const hash = location.hash || "#/";
  const path = hash.replace(/^#/, "");
  return routes[path] ? path : "/";
}

function onRouteChange(){
  const route = getRoute();
  loadView(route);
}

window.addEventListener("hashchange", onRouteChange);
window.addEventListener("DOMContentLoaded", onRouteChange);
