'use client';
import React, { useState } from "react";
import Image from "next/image";
import {ConnectionProvider,WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider,WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useMemo } from "react";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("@solana/wallet-adapter-react-ui/styles.css");
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function FarmerSignup() {
  const [form, setForm] = useState({
    name: "",
    email: '',
    phone: "",
    region: "",
    farmInfo: ""
  });
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlePhoneChange = (value: string) => {
    setForm({ ...form, phone: value });
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
              <div className="hidden md:block w-1/2 relative">
                <Image src="/colombian-farmer-inspecting-coffee-beans-with-great-care_1106493-151303.jpg" alt="Farmer" fill className="object-cover rounded-l-lg" />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex flex-col items-center mb-6">
                  <Image src="/bunachain.png" alt="BunaChain Logo" width={200} height={48} />
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="border rounded px-4 py-2 text-gray-600" required />
                  <input name="email" value={form.email} onChange={handleChange} placeholder="e-mail" className="border rounded px-4 py-2 text-gray-600" required />
                  <PhoneInput
                    international
                    defaultCountry="ET"
                    value={form.phone}
                    onChange={handlePhoneChange}
                    className="border rounded px-4 py-2 text-gray-600"
                    required
                  />
                  <input name="region" value={form.region} onChange={handleChange} placeholder="Region/zone" className="border rounded px-4 py-2 text-gray-600" required />
                  <input name="farmInfo" value={form.farmInfo} onChange={handleChange} placeholder="Farm Size, altitude" className="border rounded px-4 py-2 text-gray-600" required />
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <span className="font-semibold">Solana</span>
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