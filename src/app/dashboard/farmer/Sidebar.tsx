'use client';
import React, { useState } from "react";
import Image from "next/image";
import { Home, Coffee, PlusCircle, MessageCircle, Link2, Settings } from "lucide-react";

interface SidebarProps {
  active?: string;
}

const menu = [
  { label: "Dashboard", icon: Home, href: "/dashboard/farmer" },
  { label: "My Coffee Lots", icon: Coffee, href: "/dashboard/farmer/lots" },
  { label: "Add New Lot", icon: PlusCircle, href: "/dashboard/farmer/add-lot" },
  { label: "Messages", icon: MessageCircle, href: "/dashboard/farmer/messages" },
  { label: "Transactions", icon: Link2, href: "/dashboard/farmer/transactions" },
  { label: "Settings", icon: Settings, href: "/dashboard/farmer/settings" },
];

export default function Sidebar({ active }: SidebarProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  return (
    <aside
      className={`bg-indigo-100 text-black flex flex-col py-8 px-4 min-h-screen transition-all duration-300 ${sidebarExpanded ? "w-64" : "w-20"}`}
      onMouseEnter={() => setSidebarExpanded(true)}
      onMouseLeave={() => setSidebarExpanded(false)}
      style={{ zIndex: 10 }}
    >
      <div className="flex flex-col items-center mb-10 transition-opacity duration-300">
        {sidebarExpanded ? (
          <Image src="/Bunachain.png" alt="BunaChain Logo" width={200} height={48} />
        ) : (
          <Image src="/sm.png" alt="BunaChain Small Logo" width={48} height={48} />
        )}
      </div>
      <nav className="flex flex-col gap-4 items-center">
        {menu.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            className={`hover:bg-blue-200 hover:text-white rounded px-3 py-2 transition flex items-center w-full justify-center text-black ${active === label ? "bg-blue-200 text-white" : ""}`}
          >
            <span className={`transition-all duration-300 ${sidebarExpanded ? "inline" : "hidden"}`}>{label}</span>
            {!sidebarExpanded && <Icon className="w-6 h-6 text-black" />}
          </a>
        ))}
      </nav>
    </aside>
  );
}