import "./globals.css";
import RootLayout from "./rootlayout";
import { Metadata } from 'next';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
  
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "FoodLoop",
  description: "Bridging the gap between volunteers, leftover food, and those in need!",
}

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <RootLayout children={children}/>
  );
}

