'use client'

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import abi from '../abi/Coinflip.json'

const CONTRACTS = {
  8453: '0x7E975355951AF3afe1Dc7449bF891107bC85b54d',     // 🟡 Base Mainnet
  11155111: '0x7E975355951AF3afe1Dc7449bF891107bC85b54d',  // 🔵 Sepolia Testnet
  10143: '0x022d508718De458c69bc0B4D43ecDC61E10D8d61',     // 🧿 Monad Testnet
  50312: '0x7E975355951AF3afe1Dc7449bF891107bC85b54d',     // 🟣 Somnia Testnet
  1: '0x7E975355951AF3afe1Dc7449bF891107bC85b54d',         // ⚫ Ethereum Mainnet
  10: '0x7E975355951AF3afe1Dc7449bF891107bC85b54d',        // 🔴 Optimism
  59144: '0x7E975355951AF3afe1Dc7449bF891107bC85b54d',     // 🟢 Linea
  42161: '0x7E975355951AF3afe1Dc7449bF891107bC85b54d',     // 🔷 Arbitrum One
  137: '0x7E975355951AF3afe1Dc7449bF891107bC85b54d',       // 🔶 Polygon Mainnet
  43114: '0x7E975355951AF3afe1Dc7449bF891107bC85b54d',     // 🔺 Avalanche C-Chain
}


  const CHAINS = [
  {
    id: 10143,
    name: '🚀 Monad Testnet',
    chainIdHex: '0x279f',
    rpcUrl: 'https://node.monad.xyz',
    explorer: 'https://explorer.monad.xyz',
  },
  {
    id: 50312,
    name: '🌌 Somnia Testnet',
    chainIdHex: '0xc488',
    rpcUrl: 'https://rpc.testnet.somnia.network',
    explorer: 'https://explorer.testnet.somnia.network',
  },
  {
    id: 11155111,
    name: '🧪 Sepolia Testnet',
    chainIdHex: '0xaa36a7',
    rpcUrl: 'https://rpc.sepolia.org',
    explorer: 'https://sepolia.etherscan.io',
  },
  {
    id: 8453,
    name: '🟡 Base Mainnet',
    chainIdHex: '0x2105',
    rpcUrl: 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
  },
  {
    id: 1,
    name: '🟣 Ethereum Mainnet',
    chainIdHex: '0x1',
    rpcUrl: 'https://rpc.ankr.com/eth',
    explorer: 'https://etherscan.io',
  },
  {
    id: 10,
    name: '🔴 Optimism Mainnet',
    chainIdHex: '0xa',
    rpcUrl: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
  },
  {
    id: 59144,
    name: '🔵 Linea Mainnet',
    chainIdHex: '0xe708',
    rpcUrl: 'https://rpc.linea.build',
    explorer: 'https://lineascan.build',
  },
  {
    id: 534352,
    name: '🌀 Scroll Mainnet',
    chainIdHex: '0x82750',
    rpcUrl: 'https://rpc.scroll.io',
    explorer: 'https://scrollscan.com',
  },
  {
    id: 42161,
    name: '🧊 Arbitrum One',
    chainIdHex: '0xa4b1',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io',
  },
  {
    id: 137,
    name: '🟪 Polygon Mainnet',
    chainIdHex: '0x89',
    rpcUrl: 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com',
  }
]



export default function Home() {
  const [wallet, setWallet] = useState(null)
  const [status, setStatus] = useState('')
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipResult, setFlipResult] = useState('')
  const [coinClass, setCoinClass] = useState('coin')
  const [selectedSide, setSelectedSide] = useState('Heads')
  const [selectedChain, setSelectedChain] = useState(CHAINS[0])
  const [currentChainId, setCurrentChainId] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', () => connectWallet())
      window.ethereum.on('chainChanged', async (chainId) => {
        const decimalId = parseInt(chainId, 16)
        setCurrentChainId(decimalId)
        const found = CHAINS.find(c => c.id === decimalId)
        if (found) setSelectedChain(found)
      })
    }
  }, [])

  const connectWallet = async () => {
    if (!window.ethereum) return setStatus('MetaMask not found 😞')
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const network = await provider.getNetwork()
      setWallet(await signer.getAddress())
      setCurrentChainId(Number(network.chainId))
      const chain = CHAINS.find(c => c.id === Number(network.chainId))
      if (chain) setSelectedChain(chain)
      setStatus('Wallet connected ✅')
    } catch (err) {
      setStatus('Connection failed ❌')
    }
  }

  const switchChain = async (chain) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chain.chainIdHex }],
      })
      setSelectedChain(chain)
      setCurrentChainId(chain.id)
      setStatus(`Switched to ${chain.name}`)
    } catch (err) {
      if (err.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: chain.chainIdHex,
              chainName: chain.name,
              rpcUrls: [chain.rpcUrl],
              nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
              blockExplorerUrls: [chain.explorer],
            }],
          })
          setSelectedChain(chain)
          setCurrentChainId(chain.id)
        } catch (addErr) {
          console.error(addErr)
        }
      }
    }
  }

  const flipCoin = async () => {
    if (!wallet) return setStatus('Connect wallet first 🦊')

    try {
      setIsFlipping(true)
      setFlipResult('')
      setCoinClass('coin flipping')
      setStatus('Flipping...')

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const network = await provider.getNetwork()
      const chainId = Number(network.chainId)

      if (!CONTRACTS[chainId]) {
        setStatus('Unsupported network ❌')
        setCoinClass('coin')
        setIsFlipping(false)
        return
      }

      const contract = new ethers.Contract(CONTRACTS[chainId], abi, signer)
      const tx = await contract.flip()
      setStatus('Waiting for confirmation...')

      await tx.wait()
      setStatus('Flip confirmed ✅')

      setTimeout(() => {
        const isHeads = Math.random() < 0.5
        const userWon = (selectedSide === 'Heads' && isHeads) || (selectedSide === 'Tails' && !isHeads)
        const resultSide = isHeads ? 'Heads' : 'Tails'
        setFlipResult(userWon ? `🎯 ${resultSide} — You Won!` : `❌ ${resultSide} — You Lost!`)
        setCoinClass('coin')
        setIsFlipping(false)
      }, 5000)
    } catch (err) {
      console.error(err)
      setStatus('Flip failed ❌')
      setCoinClass('coin')
      setIsFlipping(false)
    }
  }

  return (
    <main>
      <h1>🪙 Coin Flip Game</h1>

      <div className="network-select">
        <select
          onChange={(e) =>
            switchChain(CHAINS.find((c) => c.id === Number(e.target.value)))
          }
          value={selectedChain?.id}
        >
          {CHAINS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {wallet ? (
        <>
          <p className="wallet">Connected: {wallet.slice(0, 6)}...{wallet.slice(-4)}</p>

          <div className="choose-side">
            <button
              onClick={() => setSelectedSide('Heads')}
              className={selectedSide === 'Heads' ? 'active' : ''}
            >Heads</button>
            <button
              onClick={() => setSelectedSide('Tails')}
              className={selectedSide === 'Tails' ? 'active' : ''}
            >Tails</button>
          </div>

          <button onClick={flipCoin} disabled={isFlipping}>
            {isFlipping ? 'Flipping...' : 'Flip Coin'}
          </button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect MetaMask</button>
      )}

      <div className={coinClass}>
        {flipResult ? (flipResult.includes('Heads') ? 'H' : 'T') : '🪙'}
      </div>

      {flipResult && <div className="result-text">{flipResult}</div>}
      {status && <div className="status">{status}</div>}
    </main>
  )
}
