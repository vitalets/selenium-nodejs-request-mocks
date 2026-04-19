export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ padding: '8px' }}>{children}</body>
    </html>
  );
}
