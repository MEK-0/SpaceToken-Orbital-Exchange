# SpaceToken Orbital Exchange

A professional Next.js application for investing in Space Technologies and Satellite Systems tokens on the Stellar blockchain. This platform enables investors to access tokenized satellites (CubeSat, NanoSat), launch rights, ground stations, space data services, and deep space R&D projects through compliant blockchain technology.

---

## 🚀 Project Overview

SpaceToken Orbital Exchange democratizes access to space projects by tokenizing real-world space assets on the Stellar blockchain. Investors can purchase fractional ownership of satellites, invest in launch rights, and participate in the future of space technology.

### Key Features
- **Professional Dashboard**: Portfolio overview with asset statistics
- **Space Asset Marketplace**: Discover and filter tokenized satellites, ground stations, and R&D projects
- **Tokenization Wizard**: 5-step process to tokenize space assets
- **Secure Transfers**: Send/receive tokens with compliance validation
- **Wallet Integration**: Freighter wallet connectivity
- **Compliance Tracking**: KYC and whitelist status monitoring
- **Smart Contract Integration**: Stellar testnet contract client
- **Real-time Updates**: Automatic wallet state monitoring

---

## 🛰️ Supported Space Asset Types
- **CubeSat**: Small satellite systems for LEO/MEO missions
- **NanoSat**: Miniaturized satellites for research and communication
- **Ground Station**: Earth-based communication and data relay facilities
- **Launch Rights**: Access to rocket platforms and launch windows
- **Space Data Services**: Remote sensing, EO/IR, and communication payloads
- **Deep Space R&D**: Research and development projects for deep space

---

## 🏗️ Project Architecture

### Technology Stack
| Component      | Technology                |
|---------------|---------------------------|
| Frontend      | Next.js 15 + TypeScript   |
| Styling       | Tailwind CSS + shadcn/ui  |
| State         | Zustand                   |
| Blockchain    | Stellar SDK               |
| Wallet        | Freighter API             |
| Icons         | Lucide React              |

### Directory Structure
```
rwa-frontend/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main dashboard
│   ├── marketplace/       # Space asset marketplace
│   ├── tokenize/          # Tokenization wizard
│   ├── transfer/          # Token transfer
│   ├── dashboard/         # Dashboard redirect
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   └── layout/            # Layout components
├── lib/
│   ├── types.ts           # TypeScript definitions
│   ├── stellar.ts         # Stellar SDK utilities
│   ├── contract.ts        # Smart contract client
│   └── utils.ts           # Helper functions
├── stores/
│   ├── wallet.ts          # Wallet state
│   └── contract.ts        # Contract state
└── public/                # Static assets
```

---

## ⚙️ Installation & Quick Start

### Prerequisites
- Node.js 18+
- [Freighter Wallet](https://freighter.app/) browser extension
- Access to Stellar Testnet

### Installation
```bash
# Clone the repository
git clone <https://github.com/MEK-0/SpaceToken-Orbital-Exchange.git>
cd rwa-temp/rwa-frontend
npm install

# Start development server
npm run dev
```
Visit `http://localhost:3000` to access the platform.

### Production Build
```bash
npm run build
npm start
```

---

## 🔐 Deployment Configuration

The deployment process requires a **Stellar public key** to interact with the Stellar blockchain network securely and transparently.

This public key is used for:

- ✅ **Token Issuance**: Minting and distributing tokenized representations of space assets  
- 🔁 **Contract Invocation**: Calling smart contracts on the Stellar testnet for asset operations  
- 🔒 **Transaction Validation**: Signing and verifying blockchain transactions tied to your deployment identity

```env
STELLAR_PUBLIC_KEY=GAAEZG5OXLICEE5FPFVUOPNQRMIRNADJ3MEZIBVTZQGM2H5AFX333TMH
```

## 💡 Tokenization Process (Space Assets)
1. **Satellite Details**: Enter basic satellite/project information (type, orbit, mission duration)
2. **Technical Specs**: Add technical details (payload, sensors, communication)
3. **Legal & Security**: Upload launch licenses, frequency allocations, certifications
4. **Financial Model**: Define costs, revenue projections, and token economics
5. **Tokenization**: Set up token structure, distribution, and governance

---

## 🛡️ Security & Compliance
- **Non-custodial Wallet**: Users control their private keys
- **KYC & Whitelist**: Compliance checks for all investors
- **Multi-step Validation**: Address, compliance, and balance checks
- **Audit Trail**: Transaction history and compliance logs

---

## 📈 Roadmap
- [x] Space asset marketplace with filtering and search
- [x] Tokenization wizard for satellites and ground stations
- [x] Freighter wallet integration
- [x] Real-time portfolio dashboard
- [ ] Advanced analytics and reporting
- [ ] Multi-asset portfolio management
- [ ] Automated compliance monitoring
- [ ] Mobile application (React Native)

---

## 📚 Resources
- [Stellar Documentation](https://developers.stellar.org/)
- [Freighter Wallet](https://freighter.app/)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🤝 Contributing
We welcome contributions! Please see our [Contributing Guide](docs/contributing.md) for details.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the future of tokenized space assets**
