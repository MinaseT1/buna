'use client';
import { useState, useEffect } from 'react';
import Sidebar from "../Sidebar";
import { Wallet, DollarSign, ExternalLink, Copy, RefreshCw, LogOut, ChevronDown, Calendar, Filter, Download, AlertTriangle, Info, TrendingUp, BarChart2, PieChart, Check } from "lucide-react";
import { useWallet } from "../../../../lib/wallet-context";

export default function WalletPage() {
  // Use the wallet context to get the actual connected wallet
  const { address, isConnected, walletType, isVerified, connect, disconnect } = useWallet();
  
  // Wallet data derived from context
  const walletData = {
    address: isConnected ? address : 'Not connected', // Only show address when actually connected
    type: walletType || 'Phantom',
    isConnected: isConnected,
    isVerified: isVerified
  };

  // Earnings state
  const [earningsData, setEarningsData] = useState({
    totalEarned: 0,
    totalEarnedSOL: 0,
    earningsThisMonth: 0,
    averagePerLot: 0,
    numberOfLotsPaid: 0
  });
  
  // Fetch earnings data on component mount
  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        const response = await fetch('/api/wallet/earnings');
        if (response.ok) {
          const data = await response.json();
          setEarningsData(data);
        }
      } catch (error) {
        console.error('Failed to fetch earnings data:', error);
        // Initialize with zeros instead of mock data
        setEarningsData({
          totalEarned: 0,
          totalEarnedSOL: 0,
          earningsThisMonth: 0,
          averagePerLot: 0,
          numberOfLotsPaid: 0
        });
      }
    };
    
    if (isConnected) {
      fetchEarningsData();
    }
  }, [isConnected]);

  // Chart view state
  const [chartView, setChartView] = useState('monthly'); // 'daily', 'weekly', 'monthly'
  const [chartType, setChartType] = useState('earnings'); // 'earnings', 'lots', 'payment'

  // Transaction history state
  const [transactionHistory, setTransactionHistory] = useState([]);
  
  // Fetch transaction history on component mount
  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await fetch('/api/wallet/transactions');
        if (response.ok) {
          const data = await response.json();
          setTransactionHistory(data);
        }
      } catch (error) {
        console.error('Failed to fetch transaction history:', error);
        // Initialize with empty array instead of mock data
        setTransactionHistory([]);
      }
    };
    
    if (isConnected) {
      fetchTransactionHistory();
    }
  }, [isConnected]);

  // Filter state
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'month', 'quarter', 'year'
  const [currencyFilter, setCurrencyFilter] = useState('all'); // 'all', 'SOL', 'USDC'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'paid', 'pending'

  // Copy wallet address to clipboard
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletData.address);
    alert('Wallet address copied to clipboard!');
  };

  // Reconnect wallet using the wallet context
  const reconnectWallet = () => {
    connect();
  };

  // Disconnect wallet using the wallet context
  const disconnectWallet = () => {
    disconnect();
  };

  // View transaction on Solana Explorer
  const viewOnExplorer = (hash) => {
    window.open(`https://explorer.solana.com/tx/${hash}`, '_blank');
  };

  // Filter transactions
  const filteredTransactions = transactionHistory.filter(tx => {
    // Date filter
    if (dateFilter !== 'all') {
      const txDate = new Date(tx.date);
      const now = new Date();
      
      if (dateFilter === 'month' && (now.getMonth() !== txDate.getMonth() || now.getFullYear() !== txDate.getFullYear())) {
        return false;
      }
      
      if (dateFilter === 'quarter') {
        const txQuarter = Math.floor(txDate.getMonth() / 3);
        const currentQuarter = Math.floor(now.getMonth() / 3);
        
        if (txQuarter !== currentQuarter || now.getFullYear() !== txDate.getFullYear()) {
          return false;
        }
      }
      
      if (dateFilter === 'year' && now.getFullYear() !== txDate.getFullYear()) {
        return false;
      }
    }
    
    // Currency filter
    if (currencyFilter !== 'all' && tx.currency !== currencyFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && tx.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    
    return true;
  });

  // Download transaction history
  const downloadTransactionHistory = () => {
    // Create CSV content
    const headers = ['Transaction ID', 'Date', 'Lot ID', 'Amount', 'Currency', 'Status', 'Transaction Hash'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(tx => [
        tx.id,
        tx.date,
        tx.lotId,
        tx.amount,
        tx.currency,
        tx.status,
        tx.hash
      ].join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `transaction-history-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="Wallet & Earnings" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-black">Wallet & Earnings</h1>
          <p className="text-black">Manage your wallet, view earnings, and track transaction history</p>
        </div>
        
        {/* Wallet Overview Section */}
        <div className="bg-white rounded-lg shadow border p-6 mb-8">
          <h2 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Overview
          </h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Wallet Address</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${walletData.isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {walletData.isConnected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <code className="bg-gray-100 p-2 rounded text-sm flex-1 overflow-x-auto">
                    {walletData.address}
                  </code>
                  <button 
                    onClick={copyWalletAddress}
                    className="p-2 text-gray-500 hover:text-gray-700 transition"
                    title="Copy to clipboard"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <div className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                  Wallet Type: {walletData.type}
                  {walletData.isVerified && (
                    <span className="inline-flex items-center ml-2">
                      <Check size={14} className="text-green-500" />
                      <span className="text-xs text-green-500 ml-1">Verified</span>
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={reconnectWallet}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <RefreshCw size={16} />
                    Reconnect
                  </button>
                  <button 
                    onClick={disconnectWallet}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Disconnect
                  </button>
                </div>
              </div>
              
              <div>
                <a 
                  href={`https://explorer.solana.com/address/${walletData.address}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1 text-sm"
                >
                  View on Solana Explorer
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="bg-blue-50 rounded-lg p-4 h-full">
                <h3 className="text-md font-medium text-blue-800 mb-3">Security Tips</h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Never share your seed phrase with anyone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Use Phantom with password protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Bookmark BunaChain to avoid phishing sites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Always verify transaction details before signing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Earnings Summary Section */}
        <div className="bg-white rounded-lg shadow border p-6 mb-8">
          <h2 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Earnings Summary
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-green-600 mb-1">Total Earned</div>
              <div className="text-2xl font-bold text-green-700">${earningsData.totalEarned.toLocaleString()}</div>
              <div className="text-sm text-green-600">{earningsData.totalEarnedSOL} SOL</div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 mb-1">Earnings This Month</div>
              <div className="text-2xl font-bold text-blue-700">${earningsData.earningsThisMonth.toLocaleString()}</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-purple-600 mb-1">Average per Lot</div>
              <div className="text-2xl font-bold text-purple-700">${earningsData.averagePerLot.toLocaleString()}</div>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="text-sm text-amber-600 mb-1">Lots Paid</div>
              <div className="text-2xl font-bold text-amber-700">{earningsData.numberOfLotsPaid}</div>
            </div>
          </div>
          
          {/* Earnings Chart */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setChartType('earnings')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${chartType === 'earnings' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <TrendingUp size={14} className="inline mr-1" />
                  Earnings
                </button>
                <button 
                  onClick={() => setChartType('lots')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${chartType === 'lots' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <BarChart2 size={14} className="inline mr-1" />
                  Lot Count
                </button>
                <button 
                  onClick={() => setChartType('payment')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${chartType === 'payment' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <PieChart size={14} className="inline mr-1" />
                  Payment Method
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setChartView('daily')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${chartView === 'daily' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Daily
                </button>
                <button 
                  onClick={() => setChartView('weekly')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${chartView === 'weekly' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Weekly
                </button>
                <button 
                  onClick={() => setChartView('monthly')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${chartView === 'monthly' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Monthly
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
              <div className="text-gray-500 text-center">
                <p>Chart visualization would appear here</p>
                <p className="text-sm">Showing {chartType} data ({chartView})</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Transaction History Section */}
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Transaction History
            </h2>
            
            <button 
              onClick={downloadTransactionHistory}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-1 text-sm"
            >
              <Download size={14} />
              Export CSV
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-gray-500" />
              <select 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <div className="flex items-center gap-1">
              <Filter size={14} className="text-gray-500" />
              <select 
                value={currencyFilter}
                onChange={(e) => setCurrencyFilter(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="all">All Currencies</option>
                <option value="SOL">SOL</option>
                <option value="USDC">USDC</option>
              </select>
            </div>
            
            <div className="flex items-center gap-1">
              <Filter size={14} className="text-gray-500" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          
          {/* Transaction Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lot ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={`/dashboard/processor/processing-lots?id=${tx.lotId}`} className="text-blue-600 hover:text-blue-800 transition text-sm">
                          {tx.lotId}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{tx.amount} {tx.currency}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${tx.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="font-mono">{tx.hash.substring(0, 6)}...{tx.hash.substring(tx.hash.length - 4)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => viewOnExplorer(tx.hash)}
                          className="text-blue-600 hover:text-blue-900 transition flex items-center gap-1 ml-auto"
                        >
                          View
                          <ExternalLink size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No transactions found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}