import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function OnboardingLanding() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center mb-8">
        <Image src="/Bunachain.png" alt="BunaChain Logo" width={60} height={60} />
        <h1 className="text-3xl font-bold mt-2 mb-4 font-black">BunaChain</h1>
        <h2 className="text-xl font-semibold mb-6">Join the traceable coffee supply chain</h2>
      </div>
      <Link href="/onboarding" className="bg-blue-600 text-white px-8 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition">Get Started</Link>
      <div className="absolute bottom-8 right-8 flex flex-col items-end">
        <Image src="/coffee-bean-concept-illustration.png" alt="Coffee Beans" width={120} height={120} />
        <span className="text-xs text-gray-400 mt-2">Powered by Solana</span>
      </div>
    </div>
  );
}