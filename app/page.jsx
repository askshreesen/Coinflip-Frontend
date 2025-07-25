'use client'

import { useState } from 'react'
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const { chains, publicClient } = configureChains([mainnet], [publicProvider()])
const { connectors } = getDefaultWallets({
  appName: 'Coinflip DApp',
  projectId: '03385bd079a45ed21fad740c3705d17e', // <-- here
  chains
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function Page() {
  const [result, setResult] = useState(null)

  const flip = () => {
    setResult(Math.random() > 0.5 ? 'Heads' : 'Tails')
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <main className="text-center space-y-6">
          <h1 className="text-4xl font-bold">🪙 Coinflip</h1>
          <ConnectButton />
          <button
            onClick={flip}
            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-black rounded-xl font-semibold"
          >
            Flip Coin
          </button>
          {result && (
            <p className="text-2xl">
              Result: <strong>{result}</strong>
            </p>
          )}
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
