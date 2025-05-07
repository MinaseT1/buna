import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-16">
      <div className="flex flex-col items-center mb-10">
        <Image src="/bunachain.png" alt="BunaChain Logo" width={500} height={200} />
        <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
          Empowering traceable, transparent, and fair coffee supply chains on the blockchain.
        </p>
        <Link href="/onboarding" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg">
          Get Started
        </Link>
      </div>
      <footer className="mt-16 flex gap-8 flex-wrap items-center justify-center text-gray-500 text-sm">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
        <a href="https://solana.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Powered by Solana</a>
      </footer>
    </div>
  );
}
