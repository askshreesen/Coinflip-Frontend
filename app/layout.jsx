export const metadata = {
  title: 'Coinflip',
  description: 'Simple coin flipping app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
