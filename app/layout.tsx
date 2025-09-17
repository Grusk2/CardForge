import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CardForge – Kortspelsbyggare",
  description:
    "Bygg, hantera och validera kort för egna kortspel med CardForge."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className="bg-slate-950">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
