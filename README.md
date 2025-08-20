
# KTL Vanilla JS Website

A professional website for Kattali Textile Ltd., showcasing our export-oriented apparel manufacturing capabilities.

**Note:** Demo API and form endpoints use public services (`jsonplaceholder.typicode.com` and `httpbin.org`). Replace with real services for production.

## Setup

1. **Install dependencies** – none required.
2. **Create `.env`** by copying `.env.example` and update values as needed.
3. **Build config**:
   ```bash
   npm run build
   ```
4. **Serve** the project folder with any static server:
   ```bash
   npx http-server -p 5000 -a 0.0.0.0
   # or
   python3 -m http.server 5000
   ```
5. Visit [http://localhost:5000](http://localhost:5000).

## Environment Variables

| Variable | Description |
| --- | --- |
| `NEWS_API_URL` | Endpoint returning JSON news data |
| `CONTACT_ENDPOINT` | POST endpoint for contact form |
| `CONTACT_EMAIL` | Fallback email for contact form |
| `RFQ_ENDPOINT` | POST endpoint for RFQ form |
| `RFQ_EMAIL` | Fallback email for RFQ form |

## Deployment

1. Run `npm run build` to generate `scripts/config.js` with production values.
2. Upload the directory to a static host (e.g., Replit Static Deployments).
3. Ensure `.env` is **not** uploaded; only the generated `scripts/config.js` is served.

## Notes

- Accessible, responsive design meeting WCAG 2.1 AA guidelines.
- Forms gracefully fall back to mailto: when endpoints are not set.
- API errors are logged to the console and surfaced in the UI.
- Hash-based routing for single-page application experience.
