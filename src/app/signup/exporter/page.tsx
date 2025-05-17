'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useMemo } from "react";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("@solana/wallet-adapter-react-ui/styles.css");

export default function ExporterSignup() {
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    license: "",
    region: "",
    capacity: "",
    walletAddress: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });
    
      // Clone the response to read it multiple times
      const responseClone = response.clone();
      let result;
      
      try {
        result = await response.json();
      } catch (jsonError) {
        // If JSON parsing fails, read the response as text
        const text = await responseClone.text();
        throw new Error(`Server returned invalid response: ${text.substring(0, 100)}`);
      }
      
      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }
  
      alert("Registration successful!");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConnectionProvider endpoint={"https://api.mainnet-beta.solana.com"}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full">
              <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[600px]">
                <Image src="/export_10981437.png" alt="Exporter" fill className="object-contain rounded-l-lg" />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex flex-col items-center mb-6">
                  <Image src="/Bunachain.png" alt="BunaChain Logo" width={200} height={48} />
                  <h1 className="text-2xl font-bold mt-4 text-black">Exporter Registration</h1>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" className="border rounded px-4 py-2 text-black" required />
                  <input name="contactPerson" value={form.contactPerson} onChange={handleChange} placeholder="Contact Person" className="border rounded px-4 py-2 text-black" required />
                  <input name="license" value={form.license} onChange={handleChange} placeholder="License" className="border rounded px-4 py-2 text-black" required />
                  <input name="region" value={form.region} onChange={handleChange} placeholder="Export region/ destination" className="border rounded px-4 py-2 text-black" required />
                  <input name="capacity" value={form.capacity} onChange={handleChange} placeholder="Max capacity" className="border rounded px-4 py-2 text-black" required />
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <span className="font-semibold text-black">Solana</span>
                    <WalletMultiButton className="bg-pink-400 text-white px-4 py-1 rounded" />
                  </div>
                  {loading && <p>Loading...</p>}
                  {error && <p className="text-red-500">{error}</p>}
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
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}