KTL — Vanilla JS Website Starter
================================

Quick start
-----------
1) Open `index.html` directly in your browser, or serve the folder with a static server.
   On macOS/Linux: `python3 -m http.server 8080` then visit http://localhost:8080
2) Edit text inside `partials/*.html` to update pages.
3) Set form endpoints:
   - Add a real endpoint URL in each form's `data-endpoint` attribute (e.g., https://api.example.com/contact)
   - Or leave it blank to fall back to `mailto:` defined in `data-mailto`

Project structure
-----------------
index.html
styles/
  main.css
scripts/
  router.js
  main.js
partials/
  home.html, about.html, sustainability.html, certifications.html,
  clients.html, impact.html, careers.html, news.html, contact.html,
  rfq.html, privacy.html, terms.html
assets/
  images/
  icons/ (put your favicon as favicon.png)

Notes
-----
- 100% vanilla JS, no build step.
- Hash-based routing (e.g., #/about). Great for static hosting.
- Accessible and mobile-first. Passes core Lighthouse checks.
- Easy to migrate later to a backend (replace form endpoints).
- Update colors in CSS variables at the top of styles/main.css.

Go-Live Checklist
-----------------
- Add images
- Upload certification PDFs
- Choose deploy host (e.g., Netlify, Vercel static, S3)
- Set custom domain and HTTPS
- Add analytics and goal conversions
- Replace sitemap [DEPLOY_URL]
- Add backend endpoints for forms
