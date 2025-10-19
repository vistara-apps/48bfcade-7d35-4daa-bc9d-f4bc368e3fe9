# Cement Canvas - Artisan Marketplace

A Farcaster mini-app designed to help artisans selling cement decorative pieces create an engaging online presence and streamline sales.

## Features

### 🎨 Instant Product Listing Frame
- Quick product creation with name, price, and description
- Category organization (planters, sculptures, tiles, furniture)
- Image upload and management
- Inventory tracking

### 🏪 Social Storefront Frame
- Beautiful, customizable storefront layouts
- Grid, list, and featured views
- Easy sharing on Farcaster
- QR code generation for offline promotion
- Direct wallet-based transactions

### 📖 Brand Story Prompt Wizard
- Guided storytelling interface
- Craft your unique artisan journey
- Highlight your process and values
- Build authentic connections with customers

## Theme System

Cement Canvas features a warm, community-focused theme with:
- Dark teal background (#1a3a3a)
- Coral accents (#ff6b6b)
- Soft rounded borders
- Cozy, inviting atmosphere

Additional blockchain themes available:
- Celo (bold yellow)
- Solana (purple gradient)
- Base (classic blue)
- Coinbase (professional navy)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Tech Stack

- Next.js 15 with App Router
- React 19
- OnchainKit for blockchain integration
- MiniKit for Farcaster integration
- Tailwind CSS for styling
- TypeScript for type safety

## Project Structure

```
cement-canvas/
├── app/
│   ├── components/
│   │   ├── Providers.tsx
│   │   └── ThemeProvider.tsx
│   ├── theme-preview/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── types.ts
│   └── constants.ts
└── .well-known/
    └── farcaster.json
```

## Deployment

Deploy to Vercel or any Next.js-compatible platform:

```bash
npm run build
npm start
```

## License

MIT
