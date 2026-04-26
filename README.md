# Maria Luisa Grimaldi — Luxury GTA Real Estate Portfolio

A high-performance, visually stunning portfolio website built with **Next.js 14+**, **TypeScript (strict mode)**, and **pure CSS custom properties**. Designed for Maria Luisa Grimaldi, Sales Representative at HomeLife/ROMANO Realty Ltd., Brokerage.

## Features

- **12 fully-realized sections** — Hero, Global Orientation, About, Architecture of Success, Flagship Listings, Live Market Hub, Impact Dashboard, Experience, Certifications, Ecosystem, Connect
- **7 original real-estate-themed canvas visualizers** — Property Value Pulse, Neighbourhood Connection Graph, Market Trend Diffusion, Buyer-Seller Matching Flow, GTA Heatmap Scanner, Closing Rate Optimizer, AI Property Match Agent
- **Live data feeds** — TradingView ticker tape & market overview (Canadian REITs), RSS headlines from CREA, GitHub API integration
- **RealEstateAgent JSON-LD** structured data for SEO
- **Glass-panel design** with deep navy background and gold/emerald accents
- **Mobile-first responsive** design
- **Zero TypeScript errors** in strict mode

## Tech Stack

| Technology | Version |
|---|---|
| Next.js | 14.2.x |
| React | 18.3.x |
| TypeScript | 5.6.x (strict) |
| CSS | Pure custom properties (no Tailwind) |
| Font | Inter (Google Fonts) |

## Deploy to Vercel

### From Terminal

```bash
git init
git add .
git commit -m "Initial commit: Maria Luisa Grimaldi Realty Portfolio"
git branch -M main
git remote add origin https://github.com/iceccarelli/grimaldi-realty-portfolio.git
git push -u origin main
```

### On Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `grimaldi-realty-portfolio`
3. Framework will auto-detect as **Next.js**
4. Click **Deploy**

Site will be live at `https://grimaldi-realty-portfolio.vercel.app`

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## File Structure

```
grimaldi-realty-portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── Header.tsx
├── public/
│   └── portrait.jpg
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## License

Private. All rights reserved. Maria Luisa Grimaldi.
