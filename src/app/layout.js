import { Outfit } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import "./globals.css";

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  title: "Alpha Charter",
  description: "Alpha Charter is an interactive newsletter for financial insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body className="min-h-screen bg-[#0f1116]">
        <div className="relative bg-gradient-to-b from-black to-gray-900">
          <Header />
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
