'use client';
import React, { useState } from "react";
import Image from "next/image";
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
    capacity: ""
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
              {/* Removed left image for cleaner look */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center mx-auto">
                <div className="flex flex-col items-center mb-6">
                  <Image src="/Bunachain.png" alt="BunaChain Logo" width={200} height={48} />
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
                  <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}