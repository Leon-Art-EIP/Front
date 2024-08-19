import Session from "../components/session";
import "./globals.css";
import tabs from "./tabs";
import { Syne, Inter } from 'next/font/google'

export const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
})

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${syne.variable} ${inter.variable}`}>
      <body>
        <div className="flex flex-col h-screen bg-background font-sans">
          <Session tabs={tabs}>{children}</Session>
        </div>
      </body>
    </html>
  );
}
