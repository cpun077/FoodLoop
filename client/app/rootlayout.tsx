import { Montserrat } from 'next/font/google'
import NavBar from '@/components/NavBar';

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
  })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
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