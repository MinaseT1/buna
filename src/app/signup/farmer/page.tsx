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
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Inner component that uses the wallet context
function FarmerSignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    email: '',
    phone: "",
    region: "",
    country: "Ethiopia",
    farmInfo: "",
    password: "",
    confirmPassword: ""
  });
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const { connected, publicKey } = useWallet();

  // Monitor wallet connection status
  React.useEffect(() => {
    if (connected && publicKey) {
      setConnectionError(null);
      console.log('Wallet connected with address:', publicKey.toString());
    }
  }, [connected, publicKey]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlePhoneChange = (value: string) => {
    setForm({ ...form, phone: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    setSignupError(null);
    
    if (!connected || !publicKey) {
      setSignupError('Please connect your wallet before submitting.');
      return;
    }
    
    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      setSignupError('Passwords do not match.');
      return;
    }
    
    try {
      // Get the actual wallet address from the connected wallet
      const wallet_address = publicKey.toString();
      
      if (!wallet_address) {
        setSignupError('Unable to get wallet address. Please reconnect your wallet.');
        return;
      }
      
      console.log('Submitting form data:', { ...form, wallet_address });
      
      // Save user to database
      const response = await fetch('/api/signup/farmer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          region: form.region,
          country: form.country,
          farmInfo: form.farmInfo,
          password: form.password,
          wallet_address
        }),
      });

      const result = await response.json();
      console.log('API response:', result);
      
      if (response.ok) {
        setSignupSuccess(true);
        console.log('Signup successful');
      } else {
        setSignupError(result.error || 'Signup failed. Please try again.');
        console.error('Signup failed:', result.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setSignupError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full">
        <div className="hidden md:block w-1/2 relative">
          <Image src="/colombian-farmer-inspecting-coffee-beans-with-great-care_1106493-151303.jpg" alt="Farmer" fill className="object-cover rounded-l-lg" />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6">
            <Image src="/bunachain.png" alt="BunaChain Logo" width={200} height={48} />
            <h1 className="text-2xl font-bold mt-4 text-black">Farmer Registration</h1>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Full Name" className="border rounded px-4 py-2 text-gray-600" required />
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
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="border rounded px-4 py-2 text-gray-600" required />
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="border rounded px-4 py-2 text-gray-600" required />
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="font-semibold text-black">Solana</span>
              <WalletMultiButton 
                className="bg-pink-400 text-white px-4 py-1 rounded"
              />
              {connected && publicKey && (
                <p className="text-green-500 text-sm">Connected: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}</p>
              )}
              {connectionError && (
                <p className="text-red-500 text-sm">{connectionError}</p>
              )}
            </div>
            <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition">Submit</button>
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
                    onClick={() => router.push('/dashboard/farmer')}
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
          </form>
        </div>
      </div>
    </div>
  );
}

// Wrapper component that provides the wallet context
export default function FarmerSignup() {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  
  return (
    <ConnectionProvider endpoint={"https://api.mainnet-beta.solana.com"}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <FarmerSignupForm />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
