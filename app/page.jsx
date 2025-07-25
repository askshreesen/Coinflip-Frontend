'use client';

import { useState } from 'react';

export default function Page() {
  const [result, setResult] = useState('');
  const [flipping, setFlipping] = useState(false);

  const flipCoin = () => {
    setFlipping(true);
    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setResult(outcome);
      setFlipping(false);
    }, 1000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>🪙 Coinflip</h1>
      <button onClick={flipCoin} disabled={flipping}>
        {flipping ? 'Flipping...' : 'Flip Coin'}
      </button>
      {result && <h2>Result: {result}</h2>}
    </div>
  );
}
