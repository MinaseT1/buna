'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RoleCardProps {
  title: string;
  description: string;
  icon: string;
  path: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon, path }) => {
  const router = useRouter();
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => router.push(path)}
    >
      <div className="w-24 h-24 relative mb-4">
        <Image src={icon} alt={title} fill className="object-contain" />
      </div>
      <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
      <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
        Sign Up
      </button>
    </div>
  );
};

export default function SignupRoleSelection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image src="/Bunachain.png" alt="BunaChain Logo" width={200} height={48} />
          </div>
          <h1 className="text-3xl font-bold text-black mb-4">Join BunaChain</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select your role in the coffee supply chain to get started with your registration.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RoleCard 
            title="Farmer"
            description="Register as a coffee farmer to track and sell your coffee beans."
            icon="/farmer_16882972.png"
            path="/signup/farmer"
          />
          <RoleCard 
            title="Processor"
            description="Register as a processor to manage coffee processing operations."
            icon="/building_16040802.png"
            path="/signup/processor"
          />
          <RoleCard 
            title="Exporter"
            description="Register as an exporter to manage coffee exports."
            icon="/export_10981437.png"
            path="/signup/exporter"
          />
          <RoleCard 
            title="Importer"
            description="Register as an importer to purchase and import coffee."
            icon="/import_10981429.png"
            path="/signup/importer"
          />
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}