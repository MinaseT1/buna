'use client';
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("@solana/wallet-adapter-react-ui/styles.css");

export default function ProcessorSignup() {
  const [form, setForm] = useState({
    businessName: "",
    contactPerson: "",
    location: "",
    capacity: "",
    method: ""
  });
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect wallet and submit registration
    alert("Registration submitted! (Demo)");
  };

  return (
    <ConnectionProvider endpoint={"https://api.mainnet-beta.solana.com"}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full">
              <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[600px]">
                <Image src="/coffee-bean-concept-illustration.png" alt="Coffee Processor" fill className="object-contain rounded-l-lg" />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex flex-col items-center mb-6">
                  <Image src="/Bunachain.png" alt="BunaChain Logo" width={200} height={48} />
                  <h1 className="text-2xl font-bold mt-4 text-black">Processor Registration</h1>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <input name="businessName" value={form.businessName} onChange={handleChange} placeholder="Business Name" className="border rounded px-4 py-2 text-black" required />
                  <input name="contactPerson" value={form.contactPerson} onChange={handleChange} placeholder="Contact Person" className="border rounded px-4 py-2  text-black" required />
                  <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border rounded px-4 py-2  text-black" required />
                  <input name="capacity" value={form.capacity} onChange={handleChange} placeholder="Processing capacity (kg/day)" className="border rounded px-4 py-2  text-black" required />
                  <input name="method" value={form.method} onChange={handleChange} placeholder="Preferred processing method" className="border rounded px-4 py-2  text-black" required />
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <span className="font-semibold text-black">Solana</span>
                    <WalletMultiButton className="bg-pink-400 text-white px-4 py-1 rounded" />
                  </div>
                  <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition">Submit</button>
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