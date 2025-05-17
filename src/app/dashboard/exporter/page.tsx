'use client';
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Package, Upload, Truck, CheckCircle, Users, ArrowRight, Calendar, DollarSign, BarChart2, Clock } from "lucide-react";

export default function ExporterDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for dashboard
  const dashboardStats = [
    { label: "Assigned Lots", value: 12, icon: Package, color: "bg-blue-100 text-blue-600" },
    { label: "In Transit", value: 5, icon: Truck, color: "bg-amber-100 text-amber-600" },
    { label: "Completed Exports", value: 28, icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Active Importers", value: 8, icon: Users, color: "bg-purple-100 text-purple-600" },
  ];

  const recentLots = [
    { id: "LOT-2024-0342", origin: "Sidama, Ethiopia", weight: "2,500 kg", status: "Ready for Export", date: "Jun 15, 2024" },
    { id: "LOT-2024-0339", origin: "Yirgacheffe, Ethiopia", weight: "1,800 kg", status: "Documents Pending", date: "Jun 14, 2024" },
    { id: "LOT-2024-0336", origin: "Guji, Ethiopia", weight: "3,200 kg", status: "In Transit", date: "Jun 12, 2024" },
    { id: "LOT-2024-0330", origin: "Harar, Ethiopia", weight: "2,100 kg", status: "In Transit", date: "Jun 10, 2024" },
  ];

  const upcomingTasks = [
    { task: "Upload Bill of Lading for LOT-2024-0342", deadline: "Jun 18, 2024", priority: "High" },
    { task: "Confirm shipping details with Addis Shipping Co.", deadline: "Jun 20, 2024", priority: "Medium" },
    { task: "Review export documentation for LOT-2024-0339", deadline: "Jun 19, 2024", priority: "High" },
    { task: "Schedule pickup for LOT-2024-0345", deadline: "Jun 22, 2024", priority: "Medium" },
  ];

  const recentTransactions = [
    { id: "TRX-8765", description: "Payment for LOT-2024-0330", amount: "$12,600", date: "Jun 10, 2024", status: "Completed" },
    { id: "TRX-8752", description: "Shipping fee for LOT-2024-0328", amount: "$1,850", date: "Jun 8, 2024", status: "Completed" },
    { id: "TRX-8741", description: "Insurance for LOT-2024-0336", amount: "$950", date: "Jun 7, 2024", status: "Pending" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active="Dashboard" />
      
      <main className="flex-1 p-6 md:p-8 ml-0 md:ml-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Exporter Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your exports.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center">
                <Upload size={18} className="mr-2" />
                Upload Documents
              </button>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-4 px-1 ${activeTab === 'overview' ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('lots')}
                className={`pb-4 px-1 ${activeTab === 'lots' ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Assigned Lots
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`pb-4 px-1 ${activeTab === 'documents' ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Documents
              </button>
            </div>
          </div>

          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dashboardStats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-6 flex items-start">
                    <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Lots */}
              <div className="bg-white rounded-lg shadow mb-8">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-medium">Recent Lots</h2>
                  <a href="/dashboard/exporter/assigned-lots" className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center">
                    View All <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Lot ID</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentLots.map((lot, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{lot.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lot.origin}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lot.weight}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${lot.status === 'In Transit' ? 'bg-amber-100 text-amber-800' : lot.status === 'Ready for Export' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                              {lot.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lot.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upcoming Tasks */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-medium">Upcoming Tasks</h2>
                    <div className="bg-indigo-100 text-indigo-600 rounded-full p-2">
                      <Calendar size={20} />
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="divide-y divide-gray-200">
                      {upcomingTasks.map((task, index) => (
                        <li key={index} className="py-3">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">{task.task}</p>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock size={14} className="text-gray-400 mr-1" />
                            <p className="text-xs text-gray-500">{task.deadline}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-medium">Recent Transactions</h2>
                    <div className="bg-green-100 text-green-600 rounded-full p-2">
                      <DollarSign size={20} />
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="divide-y divide-gray-200">
                      {recentTransactions.map((transaction, index) => (
                        <li key={index} className="py-3">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">{transaction.description}</p>
                            <span className="text-sm font-bold text-gray-900">{transaction.amount}</span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center">
                              <p className="text-xs text-gray-500 mr-2">{transaction.id}</p>
                              <p className="text-xs text-gray-500">{transaction.date}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {transaction.status}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'lots' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-medium mb-4">Assigned Lots</h2>
              <p className="text-gray-500 mb-4">View and manage all coffee lots assigned to you for export.</p>
              <div className="text-center py-8">
                <BarChart2 size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">Visit the Assigned Lots page for detailed information.</p>
                <a href="/dashboard/exporter/assigned-lots" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                  Go to Assigned Lots
                </a>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-medium mb-4">Export Documents</h2>
              <p className="text-gray-500 mb-4">Upload and manage export documentation for your coffee lots.</p>
              <div className="text-center py-8">
                <Upload size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">Visit the Upload Documents page to manage your export documentation.</p>
                <a href="/dashboard/exporter/upload-documents" className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                  Go to Upload Documents
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}