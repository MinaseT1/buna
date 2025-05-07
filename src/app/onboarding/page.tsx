import React from "react";
import Image from "next/image";
import Link from "next/link";

const roles = [
  {
    name: "Farmer",
    description: "Grow and harvest coffee beans, initiating the journey of quality coffee.",
    icon: "/farmer_16882972.png",
    href: "/signup/farmer"
  },
  {
    name: "Processor",
    description: "Transform harvested beans through methods like washing or drying, enhancing their quality.",
    icon: "/building_16040802.png",
    href: "/signup/processor"
  },
  {
    name: "Exporter",
    description: "Manage the logistics of moving processed beans to international markets, ensuring compliance and quality.",
    icon: "/export_10981437.png",
    href: "/signup/exporter"
  },
  {
    name: "Importer",
    description: "Import and purchase traceable, high-quality coffee from verified sources for global distribution or roasting.",
    icon: "/import_10981429.png",
    href: "/signup/importer"
  }
];

export default function Onboarding() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center mb-8">
        <Image src="/bunachain.png" alt="BunaChain Logo" width={200} height={60} />
        <h1 className="text-3xl font-bold mt-2 mb-4"></h1>
        <h2 className="text-xl font-semibold mb-6 text-black">Select Your Role</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8">
        {roles.map((role) => (
          <Link href={role.href} key={role.name} className="flex flex-col items-center p-6 rounded-lg border border-blue-200 hover:shadow-lg transition bg-blue-50">
            <Image src={role.icon} alt={role.name} width={64} height={64} className="mb-2" />
            <span className="font-bold text-lg mb-1 text-black">{role.name}</span>
            <span className="text-sm text-gray-600 text-center">{role.description}</span>
          </Link>
        ))}
      </div>
      <button className="bg-blue-600 text-white px-8 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition">Next</button>
    </div>
  );
}