'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Home, Coffee, PlusCircle, MessageCircle, Link2, Settings, Menu, X } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-100 p-2 rounded-md"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      <aside
        className={`bg-indigo-100 text-black flex flex-col py-8 px-4 transition-all duration-300 md:relative
          ${mobileMenuOpen ? "left-0" : "-left-full md:left-0"} 
          ${sidebarExpanded ? "md:w-64" : "md:w-20"}
          w-64 md:min-h-screen h-full top-0 z-40`}
        onMouseEnter={() => window.innerWidth >= 768 && setSidebarExpanded(true)}
        onMouseLeave={() => window.innerWidth >= 768 && setSidebarExpanded(false)}
      >
      <div className="flex flex-col items-center mb-10 transition-opacity duration-300">
        {(sidebarExpanded || mobileMenuOpen) ? (
          <Image src="/Bunachain.png" alt="BunaChain Logo" width={200} height={48} />
        ) : (
          <Image src="/sm.png" alt="BunaChain Small Logo" width={48} height={48} className="hidden md:block" />
        )}
      </div>
      <nav className="flex flex-col gap-4 items-center">
        {menu.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            className={`hover:bg-blue-200 hover:text-white rounded px-3 py-2 transition flex items-center w-full 
              ${mobileMenuOpen ? "justify-start" : sidebarExpanded ? "justify-start" : "justify-center"} 
              text-black ${active === label ? "bg-blue-200 text-white" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Icon className="w-6 h-6 text-black min-w-6" />
            <span className={`ml-3 transition-all duration-300 ${(sidebarExpanded || mobileMenuOpen) ? "inline" : "hidden"}`}>{label}</span>
          </a>
        ))}
      </nav>
      
      {/* Overlay to close mobile menu when clicking outside */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </aside>
    </>

  );
}