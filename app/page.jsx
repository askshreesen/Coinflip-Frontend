'use client';

import { useState } from 'react';

export default function Home() {
  const [choice, setChoice] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [result, setResult] = useState(null);

  const handleFlip = (userChoice) => {
    setChoice(userChoice);
    const flip = Math.random() < 0.5 ? 'Heads' : 'Tails';
    setResult(flip);
    setFlipped(true);
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #2c3e50, #3498db)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🪙 Coin Flip</h1>
      <p style={{ fontSize: '1.2rem' }}>Choose Heads or Tails. Pay 0.00001 ETH to flip.</p>

      <div style={{ margin: '2rem' }}>
        <button onClick={() => handleFlip('Heads')} style={buttonStyle}>Heads</button>
        <button onClick={() => handleFlip('Tails')} style={buttonStyle}>Tails</button>
      </div>

      {flipped && (
        <div style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
          <p>You chose: <strong>{choice}</strong></p>
          <p>Result: <strong>{result}</strong></p>
          {choice === result ? (
            <p style={{ color: '#2ecc71' }}>🎉 You guessed right!</p>
          ) : (
            <p style={{ color: '#e74c3c' }}>😢 You guessed wrong.</p>
          )}
        </div>
      )}

      <p style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#ccc' }}>
        Wallet Connect & Smart Contract Integration Coming Soon 🚀
      </p>
    </main>
  );
}

const buttonStyle = {
  background: '#f1c40f',
  color: '#2c3e50',
  border: 'none',
  padding: '1rem 2rem',
  margin: '0 1rem',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: '0.2s ease'
};
