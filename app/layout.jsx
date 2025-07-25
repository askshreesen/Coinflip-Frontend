// app/layout.jsx
import '../styles/globals.css'

export const metadata = {
  title: 'Coin Flip',
  description: 'Flip a coin onchain with MetaMask',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
