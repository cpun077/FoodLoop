"use client";
import { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google'
import NavBar from '@/components/NavBar';

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
  })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState(false)
  
    useEffect(() => {
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
      <html lang="en" className={montserrat.className} >
        <head></head>
        <body className="bg-background text-foreground">
        <NavBar auth={auth} method={logout}/>
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
        </body>
      </html>
    );
  }