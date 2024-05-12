import "./globals.css";
import { Montserrat } from 'next/font/google'
import NavBar from '@/components/NavBar';
import { Metadata } from 'next';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "FoodLoop",
  description: "Bridging the gap between volunteers, leftover food, and those in need!",
}

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className={montserrat.className} >
      <head></head>
      <body className="bg-background text-foreground">
        <NavBar />
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}

