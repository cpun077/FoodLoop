const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
  
export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Food Loop",
  description: "Bridging volunteers, leftover food, and those in need!",
}