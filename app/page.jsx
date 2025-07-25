'use client'

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import abi from '../abi/Coinflip.json'

const CONTRACT_ADDRESS = '0x7E975355951AF3afe1Dc7449bF891107bC85b54d'

export default function Home() {
  const [wallet, setWallet] = useState(null)
  const [status, setStatus] = useState('')
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipResult, setFlipResult] = useState('')
  const [coinClass, setCoinClass] = useState('coin')
  const [guess, setGuess] = useState(null)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setWallet(accounts[0])
        setStatus('🟢 Wallet connected')
      } catch (err) {
        console.error(err)
        setStatus('❌ Connection failed')
      }
    } else {
      setStatus('😞 MetaMask not found')
    }
  }

  const flipCoin = async () => {
    if (!guess) {
      setStatus('Please choose Heads or Tails')
      return
    }

    try {
      setIsFlipping(true)
      setStatus('🪙 Flipping the coin...')
      setFlipResult('')
      setCoinClass('coin flipping')

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
      const tx = await contract.flip()

      await tx.wait()
      setStatus('🎉 Flip confirmed!')

      setTimeout(() => {
        const wonFlip = Math.random() >= 0.5
        const resultSide = wonFlip ? 'Heads' : 'Tails'
        const userWon = guess === resultSide

        setCoinClass('coin')
        setFlipResult(userWon ? `🎯 ${resultSide} — You Won!` : `❌ ${resultSide} — You Lost!`)
        setIsFlipping(false)
        setGuess(null)
      }, 5000)
    } catch (error) {
      console.error(error)
      setStatus('⚠️ Flip failed')
      setCoinClass('coin')
      setIsFlipping(false)
    }
  }

  return (
    <main>
      <h1>🎮 Coin Flip Game</h1>

      {wallet ? (
        <>
          <p className="connected">🟢 {wallet.slice(0, 6)}...{wallet.slice(-4)}</p>

          <div className="guess-buttons">
            <button
              className={guess === 'Heads' ? 'selected' : ''}
              onClick={() => setGuess('Heads')}
              disabled={isFlipping}
            >
              Heads
            </button>
            <button
              className={guess === 'Tails' ? 'selected' : ''}
              onClick={() => setGuess('Tails')}
              disabled={isFlipping}
            >
              Tails
            </button>
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
      <div className="status">{status}</div>
    </main>
  )
}
