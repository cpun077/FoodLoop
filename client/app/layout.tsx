import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Montserrat } from 'next/font/google'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Food Loop",
  description: "Bridging volunteers, leftover food, and those in need!",
};

const mont = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mont.className}>
      <head>
        <link rel="icon" href="https://drive.google.com/thumbnail?id=1nqead4zKVwK5dLZE3k3ylAEJGQnbNemu" />
      </head>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
