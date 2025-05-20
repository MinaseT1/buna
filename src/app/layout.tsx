import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Image from 'next/image';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BunaChain",
  description: "Blockchain-based coffee supply chain management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Determine if the current route is a dashboard route
  const isDashboard = typeof window !== "undefined" && window.location.pathname.startsWith("/dashboard");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!isDashboard && (
          <header className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <Link href="/" className="flex items-center">
                <Image src="/Bunachain.png" alt="BunaChain Logo" width={150} height={36} />
              </Link>
            </div>
          </header>
        )}
        {children}
      </body>
    </html>
  );
}
