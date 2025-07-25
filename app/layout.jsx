import './globals.css'

export const metadata = {
  title: '🪙 Coinflip',
  description: 'Flip a coin on-chain with wallet connect!'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white flex items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  )
}
