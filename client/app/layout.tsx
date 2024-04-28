"use client";
import { useEffect, useState } from 'react';
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Montserrat } from 'next/font/google'
import NavBar from '@/components/NavBar';
import { redirect } from 'next/navigation';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// export const metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: "Food Loop",
//   description: "Bridging volunteers, leftover food, and those in need!",
// }; Needs to be not client

const mont = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    // Check if the user is signed in using localStorage
    const email = localStorage.getItem('Email');
    if (email) {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [auth]);

  const logout = () => {
    localStorage.removeItem("Email")
    setAuth(false)
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://drive.google.com/thumbnail?id=1nqead4zKVwK5dLZE3k3ylAEJGQnbNemu" />
      </head>
      <body className="bg-background text-foreground">
      <NavBar auth={auth} method={logout}/>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}

