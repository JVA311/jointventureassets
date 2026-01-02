import HomeClient from "@/components/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joint Venture Assets | #1 Real Estate Joint Venture Platform in Nigeria",
  description: "Joint Venture Assets connects landowners, investors, cooperatives, and government entities for profitable real estate joint ventures and property development across Nigeria. Find JV partners, secure funding, and grow your real estate portfolio.",
  keywords: [
    "joint venture assets",
    "real estate joint venture",
    "property development Nigeria",
    "land investment Nigeria",
    "real estate JV partners",
    "landowners and investors",
    "property funding Nigeria",
    "real estate collaboration",
    "joint venture opportunities",
    "Nigeria real estate investment"
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.jointventureassets.com/",
  },
  openGraph: {
    title: "Joint Venture Assets | #1 Real Estate Joint Venture Platform in Nigeria",
    description: "Connect with verified partners for profitable real estate joint ventures. Landowners, investors, and developers find your perfect match for property development in Nigeria.",
    url: "https://www.jointventureassets.com/",
    siteName: "Joint Venture Assets",
    images: [
      {
        url: "/jva_2-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "Joint Venture Assets - Real Estate Collaboration Platform"
      }
    ],
    locale: "en_NG",
    type: "website",
  },

};

export default function Home() {
  return (
    <>
      <HomeClient />
    </>
  );
}