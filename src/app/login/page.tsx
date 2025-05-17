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

function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { connected, publicKey } = useWallet();

  React.useEffect(() => {
    if (connected && publicKey) {
      // If wallet is connected, we can use this for authentication
      console.log("Wallet connected:", publicKey.toString());
    }
  }, [connected, publicKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Implement actual authentication logic
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          walletAddress: connected && publicKey ? publicKey.toString() : undefined
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const userData = await response.json();
      
      // Check if wallet is connected for additional security
      if (connected && publicKey) {
        console.log("Authenticating with wallet:", publicKey.toString());
      }
      
      // Redirect to appropriate dashboard based on user role from the response
      const userRole = userData.role.toLowerCase();
      router.push(`/dashboard/${userRole}`);
      
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full">
        <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[600px]">
          <Image src="/coffee-bean-concept-illustration.png" alt="BunaChain" fill className="object-contain rounded-l-lg" />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6">
            <Image src="/Bunachain.png" alt="BunaChain Logo" width={200} height={48} />
            <h1 className="text-2xl font-bold mt-4 text-black">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your BunaChain account</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input 
              name="email" 
              type="email"
              value={form.email} 
              onChange={handleChange} 
              placeholder="Email Address" 
              className="border rounded px-4 py-2 text-black" 
              required 
            />
            <input 
              name="password" 
              type="password"
              value={form.password} 
              onChange={handleChange} 
              placeholder="Password" 
              className="border rounded px-4 py-2 text-black" 
              required 
            />
            
            <div className="flex justify-between items-center mt-2">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="font-semibold text-black">Solana</span>
              <WalletMultiButton className="bg-pink-400 text-white px-4 py-1 rounded" />
              {connected && publicKey && (
                <p className="text-green-500 text-sm">Connected: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}</p>
              )}
            </div>
            
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-8 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition mt-4"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup/farmer" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={"https://api.mainnet-beta.solana.com"}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <LoginForm />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}