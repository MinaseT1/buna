'use client';
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ConnectionProvider, WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useMemo } from "react";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("@solana/wallet-adapter-react-ui/styles.css");

function ImporterSignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    location: "",
    capacity: "",
    walletAddress: ""
  });
  const [loading, setLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const { connected, publicKey } = useWallet();

  React.useEffect(() => {
    if (connected && publicKey) {
      setConnectionError(null);
      setForm(prev => ({...prev, walletAddress: publicKey.toString()}));
    }
  }, [connected, publicKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSignupError(null);

    try {
      if (!connected || !publicKey) {
        throw new Error('Please connect your wallet before submitting.');
      }

      const response = await fetch('/api/signup/importer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          role: "IMPORTER"
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      setSignupSuccess(true);
      router.push('/dashboard/importer');
    } catch (err: any) {
      setSignupError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full">
        <div className="hidden md:block w-1/2 relative">
          <Image src="/import_10981429.png" alt="Importer" fill className="object-cover rounded-l-lg" />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6">
            <Image src="/Bunachain.png" alt="BunaChain Logo" width={48} height={48} />
            <h1 className="text-2xl font-bold mt-2 mb-4">Importer Registration</h1>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" className="border rounded px-4 py-2" required />
            <input name="contactPerson" value={form.contactPerson} onChange={handleChange} placeholder="Contact Person" className="border rounded px-4 py-2" required />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border rounded px-4 py-2" required />
            <input name="capacity" value={form.capacity} onChange={handleChange} placeholder="Max import capacity" className="border rounded px-4 py-2" required />
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="font-semibold">Solana</span>
              <WalletMultiButton className="bg-pink-400 text-white px-4 py-1 rounded" />
              {connected && publicKey && (
                <p className="text-green-500 text-sm">Connected: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}</p>
              )}
            </div>
            <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
          {signupSuccess && (
            <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg text-center">
                <svg className="mx-auto mb-4 w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Signup Successful!</h2>
                <button
                  onClick={() => router.push('/dashboard/importer')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}
          {signupError && (
            <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg text-center">
                <svg className="mx-auto mb-4 w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Signup Failed</h2>
                <p className="text-red-500 mb-4">{signupError}</p>
                <button
                  onClick={() => setSignupError(null)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-700 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ImporterSignup() {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={"https://api.mainnet-beta.solana.com"}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ImporterSignupForm />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}