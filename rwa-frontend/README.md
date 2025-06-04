# SpaceToken Orbital Exchange – Frontend

A modern web platform for tokenizing and trading space technology assets (CubeSat, NanoSat, Ground Stations, R&D Projects) on the Stellar blockchain testnet.

## Project Overview
This project aims to democratize investment in space technologies by tokenizing space assets and providing a marketplace for investors. The platform leverages the Stellar blockchain for secure, transparent, and efficient asset tokenization.

## Features
- **Tokenization of Space Assets**: Convert CubeSat, NanoSat, Ground Station, and R&D Projects into tradable tokens.
- **Marketplace**: Discover and invest in tokenized space assets with real-time statistics.
- **Dashboard**: Monitor portfolio performance and asset statistics.
- **Stellar Testnet Integration**: Deploy and manage tokens on the Stellar testnet.
- **Modern UI**: Built with Next.js, React, and Tailwind CSS for a responsive and user-friendly experience.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation
```bash
# Clone the repository
$ git clone <your-repo-url>
$ cd rwa-temp/rwa-frontend

# Install dependencies
$ npm install
```

### Running the Development Server
```bash
$ npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Deploying to Stellar Testnet
This project includes a script to create a Stellar testnet account and (optionally) deploy a token contract.

```bash
$ npm run deploy:testnet
```
- This will generate a new Stellar testnet account and request test XLM from Friendbot.
- You can modify the script at `scripts/deploy-testnet.js` for advanced tokenization scenarios.

## Project Structure
- `app/` – Next.js application pages (dashboard, marketplace, tokenize, etc.)
- `components/` – Reusable React components
- `lib/` – Stellar and contract utility functions
- `scripts/` – Deployment and blockchain scripts

## Customization
- All UI and marketplace logic is tailored for space technology and satellite systems.
- You can extend asset types, add new features, or connect to the Stellar mainnet.

## Technologies Used
- Next.js
- React
- Tailwind CSS
- Stellar SDK
- Zustand (state management)

## License
MIT

---

**SpaceToken Orbital Exchange** is an open-source project for democratizing investment in space technologies.
