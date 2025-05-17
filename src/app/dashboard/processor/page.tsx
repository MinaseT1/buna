'use client';
import { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import { Package, Truck, Wallet, DollarSign, Eye, Clipboard, ChevronDown, Users, BarChart4, Bell, PlusCircle, Link } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useWallet } from "../../../lib/wallet-context";

export default function ProcessorDashboard() {
  const { address, isConnected } = useWallet();
  const [dashboardData, setDashboardData] = useState({
    totalLotsAccepted: 0,
    lotsInProcessing: 0,
    readyForExport: 0,
    totalVolumeProcessed: 0,
    incomingLots: [],
    processingLots: [],
    exportReadyLots: [],
    notifications: [],
    processingAnalytics: []
  });
  
  // Fetch dashboard data when component mounts
  useEffect(() => {
    if (isConnected && address) {
      fetchDashboardData();
    }
  }, [isConnected, address]);
  
  const fetchDashboardData = async () => {
    try {
      // In a real application, this would be an API call to fetch user's data
      // const response = await fetch('/api/processor/dashboard');
      // const data = await response.json();
      // setDashboardData(data);
      
      // For now, we're just setting empty data
      setDashboardData({
        totalLotsAccepted: 0,
        lotsInProcessing: 0,
        readyForExport: 0,
        totalVolumeProcessed: 0,
        incomingLots: [],
        processingLots: [],
        exportReadyLots: [],
        notifications: [],
        processingAnalytics: []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="Dashboard" />
      <main className="flex-1 flex flex-col items-center p-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold mt-2 mb-4 text-black">Processor Dashboard</h1>
          <p className="text-gray-600 mb-4">Manage coffee processing and exports</p>
        </div>
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-blue-500 transition-transform hover:scale-105 hover:shadow-2xl duration-200">
            <span className="absolute top-4 right-4 text-blue-200 text-xl animate-bounce"><Package className="w-7 h-7" /></span>
            <span className="text-4xl mb-2"><Package className="w-10 h-10 text-white" /></span>
            <span className="text-3xl font-bold text-white drop-shadow">{dashboardData.totalLotsAccepted}</span>
            <span className="text-blue-100 mt-1 text-center text-base font-medium">Total Lots Accepted</span>
          </div>
          <div className="relative bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-yellow-500 transition-transform hover:scale-105 hover:shadow-2xl duration-200">
            <span className="absolute top-4 right-4 text-yellow-200 text-xl"><Truck className="w-7 h-7" /></span>
            <span className="text-4xl mb-2"><Truck className="w-10 h-10 text-white" /></span>
            <span className="text-3xl font-bold text-white drop-shadow">{dashboardData.lotsInProcessing}</span>
            <span className="text-yellow-100 mt-1 text-center text-base font-medium">Lots In Processing</span>
          </div>
          <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-green-500 transition-transform hover:scale-105 hover:shadow-2xl duration-200">
            <span className="absolute top-4 right-4 text-green-200 text-xl animate-pulse"><Truck className="w-7 h-7" /></span>
            <span className="text-4xl mb-2"><Truck className="w-10 h-10 text-white" /></span>
            <span className="text-3xl font-bold text-white drop-shadow">{dashboardData.readyForExport}</span>
            <span className="text-green-100 mt-1 text-center text-base font-medium">Ready for Export</span>
          </div>
          <div className="relative bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-purple-500 transition-transform hover:scale-105 hover:shadow-2xl duration-200">
            <span className="absolute top-4 right-4 text-purple-200 text-xl animate-bounce"><Package className="w-7 h-7" /></span>
            <span className="text-4xl mb-2"><Package className="w-10 h-10 text-white" /></span>
            <span className="text-3xl font-bold text-white drop-shadow">{dashboardData.totalVolumeProcessed} kg</span>
            <span className="text-purple-100 mt-1 text-center text-base font-medium">Total Volume Processed</span>
          </div>
        </div>
        
        {/* Incoming Lots Table */}
        <div className="w-full max-w-6xl mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Incoming Lots</h2>
              <a href="/dashboard/processor/incoming-lots" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                <span>View All</span>
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-black text-sm border-b">
                    <th className="px-4 py-3 font-medium">Lot ID</th>
                    <th className="px-4 py-3 font-medium">Farmer</th>
                    <th className="px-4 py-3 font-medium">Coffee Variety</th>
                    <th className="px-4 py-3 font-medium">Weight (kg)</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Arrival Date</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dashboardData.incomingLots && dashboardData.incomingLots.length > 0 ? (
                    dashboardData.incomingLots.map((lot, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{lot.id}</td>
                        <td className="px-4 py-3 text-sm">{lot.farmer}</td>
                        <td className="px-4 py-3 text-sm">{lot.variety}</td>
                        <td className="px-4 py-3 text-sm">{lot.weight}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{lot.status}</span>
                        </td>
                        <td className="px-4 py-3 text-sm">{lot.arrivalDate}</td>
                        <td className="px-4 py-3 text-right">
                          <a href={`/dashboard/processor/incoming-lots/${lot.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                        No incoming lots available. Lots will appear here when farmers submit them.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Quick Action Buttons */}
        <div className="w-full max-w-6xl mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/dashboard/processor/record" className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Clipboard className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-black font-medium">Record Processing</span>
            </a>
            
            <a href="/dashboard/processor/export" className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-black font-medium">Ready for Export</span>
            </a>
            
            <a href="/dashboard/processor/farmers" className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-black font-medium">Linked Farmers</span>
            </a>
            
            <a href="/dashboard/processor/wallet" className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
              <div className="bg-yellow-100 p-3 rounded-full mb-3">
                <Wallet className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-black font-medium">Wallet & Earnings</span>
            </a>
          </div>
        </div>
        {/* Lots in Processing */}
        <div className="w-full max-w-6xl mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Lots in Processing</h2>
              <a href="/dashboard/processor/processing-lots" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                <span>View All</span>
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-black text-sm border-b">
                    <th className="px-4 py-3 font-medium">Lot ID</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Start Date</th>
                    <th className="px-4 py-3 font-medium">Method</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dashboardData.processingLots && dashboardData.processingLots.length > 0 ? (
                    dashboardData.processingLots.map((lot, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{lot.id}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">{lot.status}</span>
                        </td>
                        <td className="px-4 py-3 text-sm">{lot.startDate}</td>
                        <td className="px-4 py-3 text-sm">{lot.method}</td>
                        <td className="px-4 py-3 text-right">
                          <a href={`/dashboard/processor/processing-lots/${lot.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                        No lots currently in processing. Lots will appear here when you start processing.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Lots Ready for Export */}
        <div className="w-full max-w-6xl mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Lots Ready for Export</h2>
              <a href="/dashboard/processor/export" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                <span>View All</span>
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-black text-sm border-b">
                    <th className="px-4 py-3 font-medium">Lot ID</th>
                    <th className="px-4 py-3 font-medium">Total Weight</th>
                    <th className="px-4 py-3 font-medium">Processing</th>
                    <th className="px-4 py-3 font-medium">Completed On</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dashboardData.exportReadyLots && dashboardData.exportReadyLots.length > 0 ? (
                    dashboardData.exportReadyLots.map((lot, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{lot.id}</td>
                        <td className="px-4 py-3 text-sm">{lot.weight}</td>
                        <td className="px-4 py-3 text-sm">{lot.processing}</td>
                        <td className="px-4 py-3 text-sm">{lot.completedOn}</td>
                        <td className="px-4 py-3 text-right">
                          <a href={`/dashboard/processor/export/${lot.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                        No lots ready for export. Processed lots will appear here when they're ready to be exported.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Notifications and Analytics Section */}
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 mb-8">
          {/* Notifications Panel */}
          <div className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Recent Notifications</h2>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</a>
            </div>
            <div className="space-y-4">
              {dashboardData.notifications && dashboardData.notifications.length > 0 ? (
                dashboardData.notifications.map((notification, index) => (
                  <div key={index} className="flex items-start p-3 border-b border-gray-100">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Bell className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-xs text-gray-500">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center p-6 text-gray-500">
                  <p>No notifications yet. Activity will appear here as you use the platform.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Analytics Chart */}
          <div className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Processing Analytics</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Last 6 months</span>
                <BarChart4 className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { month: 'Jan', natural: 120, washed: 80 },
                    { month: 'Feb', natural: 100, washed: 130 },
                    { month: 'Mar', natural: 80, washed: 100 },
                    { month: 'Apr', natural: 150, washed: 120 },
                    { month: 'May', natural: 170, washed: 160 },
                    { month: 'Jun', natural: 140, washed: 180 },
                  ]}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="natural" fill="#3b82f6" name="Natural Processing" />
                  <Bar dataKey="washed" fill="#10b981" name="Washed Processing" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-700">Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-700">Washed</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}