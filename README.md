# Little Spark Wireless ⚡

Little Spark Wireless is a front-end prototype for an AI-assisted wireless and future eSIM concierge platform.

It is built as a static HTML/CSS/JavaScript demo so it can be deployed quickly to GitHub Pages, Netlify, Vercel, or any static host.

## Current Demo Features

- Responsive landing page
- Plan cards for Spark Start, Spark Plus, and Spark Max
- Local demo signup form
- Local AI-style chat assistant
- Support ticket capture
- Owner panel with PIN unlock
- Demo revenue tracking
- House fee calculation
- Cash-out request tracking
- Security team panel with PIN unlock
- Security notes and threat alert simulator
- localStorage persistence for prototype testing

## Demo PINs

Owner PIN:

```txt
123456
```

Security PIN:

```txt
999000
```

These PINs are for demo use only. They are visible in front-end code and must be replaced with real backend authentication before launch.

## Smoke Test Checklist

Open `index.html` and test:

1. Choose a plan.
2. Send a chat message.
3. Create a demo account.
4. Create a support ticket.
5. Unlock the Owner Panel with `123456`.
6. Simulate a plan sale.
7. Request a cash-out.
8. Unlock the Security Panel with `999000`.
9. Add a security note.
10. Simulate a threat alert.
11. Confirm owner stats update.
12. Use Factory Reset Demo to clear local test data.

## Deployment

This app is static. You can deploy the repo directly.

### GitHub Pages

1. Go to repository Settings.
2. Open Pages.
3. Set source to `Deploy from a branch`.
4. Select branch `main` and folder `/root`.
5. Save.

### Netlify

1. Import the GitHub repo.
2. Build command: leave blank.
3. Publish directory: `/`.
4. Deploy.

### Vercel

1. Import the GitHub repo.
2. Framework preset: Other.
3. Build command: leave blank.
4. Output directory: leave blank or use `/`.
5. Deploy.

## What It Still Needs Before Real Launch

- Backend database
- Real user authentication
- Real owner/admin authentication
- Payment processing through Stripe, Square, PayPal, or another provider
- eSIM/wireless provider API integration
- Fraud prevention and chargeback workflows
- Terms of service and privacy policy
- Secure server-side secret management
- Real support inbox or ticket backend

## Important Safety Note

This app cannot control a user's whole phone. iOS and Android restrict that for privacy and security. The safe production version can manage app features, account settings, support flows, plan purchases, eSIM activation steps, and provider API actions that users authorize.
