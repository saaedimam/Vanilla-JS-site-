# KTL Vanilla JS Website

Assumption: demo API and form endpoints use public services (`jsonplaceholder.typicode.com` and `httpbin.org`). Replace with real services for production.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Create `.env`** by copying `.env.example` and update values as needed.
3. **Run the development server** (config generated automatically):
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```
5. Visit [http://localhost:3000](http://localhost:3000) in development.

## Environment Variables

| Variable | Description |
| --- | --- |
| `NEWS_API_URL` | Endpoint returning JSON news data |
| `CONTACT_ENDPOINT` | POST endpoint for contact form |
| `CONTACT_EMAIL` | Fallback email for contact form |
| `RFQ_ENDPOINT` | POST endpoint for RFQ form |
| `RFQ_EMAIL` | Fallback email for RFQ form |

## Deployment

1. Run `npm run build` to generate `scripts/config.js` and build the app.
2. Deploy the `.next` output using a platform like Vercel or any Node.js host.
3. Ensure `.env` is **not** committed; only the generated `scripts/config.js` is served.

## Notes

- Accessible, responsive design meeting WCAG 2.1 AA guidelines.
- Forms gracefully fall back to `mailto:` when endpoints are not set.
- API errors are logged to the console and surfaced in the UI.
