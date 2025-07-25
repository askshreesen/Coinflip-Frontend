import { useState } from "react";
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const CONTRACT_ADDRESS = "0xCEA510d1D3d13B15C228fB9eaCa6C70bA138E28E";
const ABI = [
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_guess",
        "type": "bool"
      }
    ],
    "name": "flipCoin",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

export default function CoinFlipGame() {
  const { isConnected } = useAccount();
  const [guess, setGuess] = useState(true);
  const [result, setResult] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "flipCoin",
    args: [guess],
    overrides: {
      value: ethers.utils.parseEther("0.00001"),
    },
  });

  const { write } = useContractWrite({
    ...config,
    onSettled: (data) => {
      setIsFlipping(false);
      if (data?.hash) {
        setResult("Flip submitted! Wait for confirmation ✨");
      }
    },
    onError: () => {
      setIsFlipping(false);
      setResult("Flip failed 😓");
    },
  });

  const handleFlip = () => {
    setIsFlipping(true);
    setResult(null);
    write?.();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-yellow-400 flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-5xl font-bold drop-shadow-md text-center mb-6 animate-bounce">🪙 CoinFlip Gen-Z</h1>
      <Card className="w-full max-w-md bg-black/70 backdrop-blur-md border-white border-opacity-20">
        <CardContent className="p-6 space-y-4">
          <ConnectButton />

          {isConnected && (
            <>
              <div className="flex justify-between items-center">
                <Button
                  variant={guess ? "secondary" : "outline"}
                  onClick={() => setGuess(true)}
                >
                  Heads 🔵
                </Button>
                <Button
                  variant={!guess ? "secondary" : "outline"}
                  onClick={() => setGuess(false)}
                >
                  Tails 🟣
                </Button>
              </div>

              <Button
                onClick={handleFlip}
                disabled={isFlipping || !write}
                className="w-full text-lg font-semibold bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 mt-4"
              >
                {isFlipping ? (
                  <><Loader2 className="animate-spin mr-2" /> Flipping...</>
                ) : (
                  "Flip Coin for 0.00001 ETH 💸"
                )}
              </Button>

              {result && (
                <div className="text-center text-sm text-yellow-200 mt-2">{result}</div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <footer className="text-sm mt-6 opacity-70">Built for Gen-Z ⚡ by you</footer>
    </main>
  );
}