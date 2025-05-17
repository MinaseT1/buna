'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <div className="max-w-5xl w-full text-center">
        <div className="mb-8">
          <Image 
            src="/Bunachain.png" 
            alt="BunaChain Logo" 
            width={300} 
            height={72} 
            className="mx-auto"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-black mb-4">Welcome to BunaChain</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transforming the coffee supply chain with blockchain technology for transparency, traceability, and trust.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            href="/login" 
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
          <Link 
            href="/signup" 
            className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition"
          >
            Sign Up
          </Link>
        </div>
        
        
      </div>
    </main>
  );
}
