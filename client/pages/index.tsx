import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [message, setMessage] = useState("Loading Flask Connection")
  useEffect(() => {
    fetch("http://localhost:8000/api/home").then (
      response => response.json()
    ).then ((data) => {setMessage(data.message)})
  }, [])

  return (
    <div>{message}</div>
  );
}
