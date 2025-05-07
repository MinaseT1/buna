'use client';
import Sidebar from "./Sidebar";
import { Package, Truck, Wallet, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


export default function FarmerDashboard() {
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="Dashboard" />
      <main className="flex-1 flex flex-col items-center p-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold mt-2 mb-4 text-black">Farmer Dashboard</h1>
          <p className="text-gray-600 mb-4">Manage your coffee batches and offers</p>
        </div>
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-blue-500 transition-transform hover:scale-105 hover:shadow-2xl duration-200">
            <span className="absolute top-4 right-4 text-blue-200 text-xl animate-bounce"><Package className="w-7 h-7" /></span>
            <span className="text-4xl mb-2"><Package className="w-10 h-10 text-white" /></span>
            <span className="text-3xl font-bold text-white drop-shadow">12</span>
            <span className="text-blue-100 mt-1 text-center text-base font-medium">Total Coffee Lots Submitted</span>
          </div>
          <div className="relative bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-yellow-500 transition-transform hover:scale-105 hover:shadow-2xl duration-200">
            <span className="absolute top-4 right-4 text-yellow-200 text-xl"><Truck className="w-7 h-7" /></span>
            <span className="text-4xl mb-2"><Truck className="w-10 h-10 text-white" /></span>
            <span className="text-3xl font-bold text-white drop-shadow">3</span>
            <span className="text-yellow-100 mt-1 text-center text-base font-medium">Lots in Processing/Exported</span>
          </div>
          <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-green-500 transition-transform hover:scale-105 hover:shadow-2xl duration-200">
            <span className="absolute top-4 right-4 text-green-200 text-xl animate-pulse"><DollarSign className="w-7 h-7" /></span>
            <span className="text-4xl mb-2"><DollarSign className="w-10 h-10 text-white" /></span>
            <span className="text-3xl font-bold text-white drop-shadow">$2,500 / ◎8.2</span>
            <span className="text-green-100 mt-1 text-center text-base font-medium">Total Earnings (USD + Solana)</span>
          </div>
          <div className="relative bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-purple-500 transition-transform hover:scale-105 hover:shadow-2xl duration-200">
            <span className="absolute top-4 right-4 text-purple-200 text-xl animate-bounce"><Wallet className="w-7 h-7" /></span>
            <span className="text-4xl mb-2"><Wallet className="w-10 h-10 text-white" /></span>
            <span className="text-3xl font-bold text-white drop-shadow">◎1.5</span>
            <span className="text-purple-100 mt-1 text-center text-base font-medium">Wallet Balance</span>
          </div>
        </div>
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 mb-10">
          {/* Recent Lots Table */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 border flex flex-col justify-between min-w-[340px]">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-black">Recent Lots</h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="pb-2 font-medium">Reciever</th>
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium">Lot ID</th>
                    <th className="pb-2 font-medium">Date Submitted</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium text-right">Weight(Kg)</th>
                  </tr>
                </thead>
                <tbody className="text-black text-base">
                  <tr className="border-b last:border-b-0">
                    <td className="py-2 flex items-center gap-2"><span className="inline-block"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" fill="#888"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#ddd"/></svg></span>Abebe Bekele</td>
                    <td className="py-2">Robusta</td>
                    <td className="py-2">LOT001</td>
                    <td className="py-2">2024-06-01</td>
                    <td className="py-2"><span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">Pending</span></td>
                    <td className="py-2 text-right font-bold">8200</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="py-2 flex items-center gap-2"><span className="inline-block"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" fill="#888"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#ddd"/></svg></span>Kebede Asfaw</td>
                    <td className="py-2">Arabica</td>
                    <td className="py-2">LOT002</td>
                    <td className="py-2">2024-05-28</td>
                    <td className="py-2"><span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">Processing</span></td>
                    <td className="py-2 text-right font-bold">9000</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="py-2 flex items-center gap-2"><span className="inline-block"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" fill="#888"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#ddd"/></svg></span>Dagim  Assefa</td>
                    <td className="py-2">Excelsa</td>
                    <td className="py-2">LOT003</td>
                    <td className="py-2">2024-05-25</td>
                    <td className="py-2"><span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Exported</span></td>
                    <td className="py-2 text-right font-bold">4500.50</td>
                  </tr>
                  <tr className="border-b last:border-b-0">
                    <td className="py-2 flex items-center gap-2"><span className="inline-block"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" fill="#888"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#ddd"/></svg></span>John Mathew Kayne</td>
                    <td className="py-2">Liberica</td>
                    <td className="py-2">LOT004</td>
                    <td className="py-2">2024-05-20</td>
                    <td className="py-2"><span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Exported</span></td>
                    <td className="py-2 text-right font-bold">6700</td>
                  </tr>
                  <tr>
                    <td className="py-2 flex items-center gap-2"><span className="inline-block"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" fill="#888"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#ddd"/></svg></span>Ann Marlin</td>
                    <td className="py-2">Excelsa</td>
                    <td className="py-2">LOT005</td>
                    <td className="py-2">2024-05-18</td>
                    <td className="py-2"><span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">Pending</span></td>
                    <td className="py-2 text-right font-bold">10000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          
          </div>
          {/* Shipment Overview Card */}
          <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-lg p-6 border min-w-[340px] max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-2 text-black">Shipment Overview</h2>
            <div className="flex items-end gap-4 mb-2">
              <span className="text-3xl font-bold text-black">2.568</span>
              <span className="text-sm text-red-500 flex items-center"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 19V5M12 19l-5-5m5 5l5-5" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>2.1% <span className="text-gray-400 ml-1">vs last week</span></span>
            </div>
            <div className="text-gray-500 text-xs mb-2">Sales from 1-6 Dec, 2025</div>
            <div className="w-full h-32 mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{day:"01",val:1.8},{day:"02",val:2.1},{day:"03",val:2.5},{day:"04",val:2.3},{day:"05",val:2.2},{day:"06",val:2.9}]} margin={{top:5,right:10,left:0,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tick={{fontSize:11}} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[1.5,3]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="val" stroke="#2563eb" strokeWidth={2} dot={{r:3}} name="Last 6 days" />
                  <Line type="monotone" dataKey="val" stroke="#d1d5db" strokeWidth={2} dot={false} data={[{day:"01",val:2.2},{day:"02",val:2.4},{day:"03",val:2.1},{day:"04",val:2.6},{day:"05",val:2.3},{day:"06",val:2.5}]} name="Last Week" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span><span className="text-xs text-gray-700">Last 6 days</span></span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-300 inline-block"></span><span className="text-xs text-gray-700">Last Week</span></span>
            </div>
          </div>
        </div>
        {/* Keep the rest of the dashboard as is */}
        
      </main>
    </div>
  );
}
