# KTL Vanilla JS Website

Assumption: demo API and form endpoints use public services (`jsonplaceholder.typicode.com` and `httpbin.org`). Replace with real services for production.

## Setup

1. **Install dependencies** – none required.
2. **Create `.env`** by copying `.env.example` and update values as needed.
3. **Build config**:
   ```bash
   npm run build
   ```
4. **Serve** the `Vanilla-JS-site-` folder with any static server:
   ```bash
   npx http-server -p 8080
   # or
   python3 -m http.server 8080
   ```
5. Visit [http://localhost:8080](http://localhost:8080).

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
2. Upload the directory to a static host (e.g., Netlify, Vercel, S3).
3. Ensure `.env` is **not** uploaded; only the generated `scripts/config.js` is served.

## Notes

- Accessible, responsive design meeting WCAG 2.1 AA guidelines.
- Forms gracefully fall back to `mailto:` when endpoints are not set.
- API errors are logged to the console and surfaced in the UI.