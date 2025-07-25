export default function Home() {
  return (
    <main style={{ textAlign: "center", paddingTop: "100px", fontFamily: "Arial" }}>
      <h1>🪙 Coin Flip Game</h1>
      <p>Choose Head or Tail — Pay 0.00001 ETH to flip.</p>
      <button style={{ margin: "10px" }}>Heads</button>
      <button style={{ margin: "10px" }}>Tails</button>
      <p>Connect your wallet to begin</p>
    </main>
  );
}
