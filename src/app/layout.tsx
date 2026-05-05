import type { ReactNode } from 'react';
import Logo from '../components/logo';
import Navigation from '../components/navigation';
import './global.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          {/* <Logo /> */}
          <main className="page-frame">
            <section className="hero-panel">
              <div className="hero-title">
                <h1>Users List</h1>
              </div>
              <div className="hero-nav">
                <Navigation />
              </div>
            </section>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
