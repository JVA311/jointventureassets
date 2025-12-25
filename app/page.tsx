import HomeClient from "@/components/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joint Venture Assets - Connect Landowners & Investors for Profitable Real Estate Ventures",
  description: "Connect landowners, individual & group investors, cooperatives, government entities, and mandates for profitable real estate joint ventures. We manage the process, you reap the rewards.",
  keywords: ["Joint Venture Assets", "JVA", "real estate joint ventures", "landowners", "investors", "property development", "land investment", "real estate"],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
    }
  }
};

export default function Home() {

  return (
    <>
      <HomeClient />
    </>
  );
}