Here's a polished and professional `README.md` file for your **Coinflip-Frontend** project. This will help users understand what your app does, how to run it, and how to contribute or deploy it.

---

## 🪙 Coinflip Game DApp

> A sleek, multi-chain on-chain **Coin Flip Game** built with **Next.js**, **Ethers.js**, and full **wallet/chain integration**. Supports networks like **Base, Sepolia, Monad, Somnia, Ethereum, Optimism, Linea, and more**.

### 🌐 Live App

👉 [https://evmflip.netlify.app](https://evmflip.netlify.app)

---

### ✨ Features

* 🎯 Flip a coin on-chain — 100% verifiable randomness
* 🔗 Supports **multiple EVM networks**
* 🔄 Auto chain switching and adding unsupported chains
* 📱 Fully responsive mobile + desktop UI
* 💥 Real-time animated coin flip
* ⚡ Superfast UX — optimized for speed

---

### 🖼️ Preview

| Desktop View                           | Mobile View                          |
| -------------------------------------- | ------------------------------------ |
| ![Desktop](public/preview-desktop.png) | ![Mobile](public/preview-mobile.png) |

---

### 🛠️ Tech Stack

* **Next.js 14**
* **Ethers.js v6**
* **Tailwind CSS**
* **RainbowKit + Wagmi** (for wallet connection & chain management)
* Deployed on **Netlify**

---

### ⚙️ Supported Chains

| Chain             | Chain ID | Status  |
| ----------------- | -------- | ------- |
| Base Mainnet      | 8453     | ✅ Live  |
| Sepolia Testnet   | 11155111 | ✅ Live  |
| Monad Testnet     | 10143    | ✅ Live  |
| Somnia Testnet    | 50312    | ✅ Live  |
| Ethereum Mainnet  | 1        | ✅ Ready |
| Optimism          | 10       | ✅ Ready |
| Linea             | 59144    | ✅ Ready |
| Arbitrum One      | 42161    | ✅ Ready |
| Polygon Mainnet   | 137      | ✅ Ready |
| Avalanche C-Chain | 43114    | ✅ Ready |

All chains use the **same deployed contract address**:

```solidity
0x7E975355951AF3afe1Dc7449bF891107bC85b54d
```

---

### 🧑‍💻 Local Development

#### 1. Clone the repo

```bash
git clone https://github.com/askshreesen/Coinflip-Frontend.git
cd Coinflip-Frontend
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Start dev server

```bash
npm run dev
```

App will run on: [http://localhost:3000](http://localhost:3000)

---

### 🚀 Deployment (Netlify)

1. Push your code to GitHub.
2. Go to [Netlify](https://netlify.com)
3. Link your GitHub repo.
4. Set build command: `npm run build`
5. Publish directory: `.next`
6. Click "Deploy"

---

### 🤝 Contributing

Pull requests are welcome! If you'd like to suggest new features, chains, or improve the UI, feel free to fork and contribute.

---

### 📄 License

MIT © [askshreesen](https://github.com/askshreesen)

---

Let me know if you want a Hindi/Urdu version or emojis removed for minimal style.
