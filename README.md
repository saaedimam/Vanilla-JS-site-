# KTL Vanilla JS Website

Assumption: demo API and form endpoints use public services (`jsonplaceholder.typicode.com` and `httpbin.org`). Replace with real services for production.

## Setup

1. **Install dependencies** – none required for the Vanilla JS site.
2. **Create `.env`** by copying `.env.example` and update values as needed (used only if you run a build step that generates `scripts/config.js`).
3. **Serve locally** with any static server:
   ```bash
   npx http-server -p 8080
   # or
   python3 -m http.server 8080
