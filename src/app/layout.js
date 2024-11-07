import { Outfit } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
