'use client';
import { useState } from 'react';
import Sidebar from "../Sidebar";
import { Package, Eye, Filter, Search, Calendar, ChevronDown, X, FileText, MapPin, Coffee, Truck, Clock, CheckCircle, AlertCircle, Download, Link } from "lucide-react";

// Sample data for demonstration
const sampleProcessingLots = [
  {
    id: 'LOT-ETH-00023',
    farmer: 'Abebe Bekele',
    region: 'Sidama',
    variety: 'Heirloom',
    weight: 60,
    altitude: 1900,
    receivedDate: '2025-04-27',
    status: 'Drying',
    processingMethod: 'Natural',
    expectedCompletion: '2025-05-10',
    moisture: 10.5,
    grade: 'Grade 1',
    certifications: ['Organic'],
    description: 'High-quality coffee beans from the Sidama region, grown at high altitude with traditional methods.',
    images: ['/images.jpg'],
    gpsLocation: '6.7724° N, 38.4674° E',
    timeline: [
      { date: '2025-04-27', status: 'Received', notes: 'Lot received from farmer' },
      { date: '2025-04-28', status: 'Drying', notes: 'Started natural drying process' }
    ]
  },
  {
    id: 'LOT-ETH-00024',
    farmer: 'Tigist Haile',
    region: 'Yirgacheffe',
    variety: 'Typica',
    weight: 45,
    altitude: 1850,
    receivedDate: '2025-04-22',
    status: 'Washing',
    processingMethod: 'Washed',
    expectedCompletion: '2025-05-05',
    moisture: 11.2,
    grade: 'Grade 2',
    certifications: ['Fair Trade'],
    description: 'Medium-bodied coffee with floral notes, characteristic of the Yirgacheffe region.',
    images: ['/coffee-bean-concept-illustration.png'],
    gpsLocation: '6.1294° N, 38.2270° E',
    timeline: [
      { date: '2025-04-22', status: 'Received', notes: 'Lot received from farmer' },
      { date: '2025-04-23', status: 'Sorting', notes: 'Initial sorting completed' },
      { date: '2025-04-25', status: 'Washing', notes: 'Started washing process' }
    ]
  },
  {
    id: 'LOT-ETH-00025',
    farmer: 'Dawit Mengistu',
    region: 'Guji',
    variety: 'Bourbon',
    weight: 75,
    altitude: 2100,
    receivedDate: '2025-04-18',
    status: 'Ready',
    processingMethod: 'Natural',
    expectedCompletion: '2025-05-01',
    moisture: 10.8,
    grade: 'Grade 1',
    certifications: ['Organic', 'Rainforest Alliance'],
    description: 'Exceptional coffee from the Guji zone with bright acidity and fruity notes.',
    images: ['/coffee-bean-concept-illustration.png'],
    gpsLocation: '5.8234° N, 38.3125° E',
    timeline: [
      { date: '2025-04-18', status: 'Received', notes: 'Lot received from farmer' },
      { date: '2025-04-19', status: 'Drying', notes: 'Started natural drying process' },
      { date: '2025-04-28', status: 'Ready', notes: 'Processing completed, ready for export' }
    ]
  },
  {
    id: 'LOT-ETH-00026',
    farmer: 'Meron Tadesse',
    region: 'Sidama',
    variety: 'Heirloom',
    weight: 50,
    altitude: 1950,
    receivedDate: '2025-04-12',
    status: 'Drying',
    processingMethod: 'Honey',
    expectedCompletion: '2025-05-03',
    moisture: 10.3,
    grade: 'Grade 1',
    certifications: ['Organic'],
    description: 'Premium Sidama coffee with complex flavor profile and sweet finish.',
    images: ['/coffee-bean-concept-illustration.png'],
    gpsLocation: '6.7100° N, 38.3700° E',
    timeline: [
      { date: '2025-04-12', status: 'Received', notes: 'Lot received from farmer' },
      { date: '2025-04-14', status: 'Pulping', notes: 'Pulping completed' },
      { date: '2025-04-15', status: 'Drying', notes: 'Started honey process drying' }
    ]
  },
  {
    id: 'LOT-ETH-00027',
    farmer: 'Solomon Bekele',
    region: 'Harrar',
    variety: 'Typica',
    weight: 40,
    altitude: 1750,
    receivedDate: '2025-04-05',
    status: 'Ready',
    processingMethod: 'Natural',
    expectedCompletion: '2025-04-25',
    moisture: 11.5,
    grade: 'Grade 2',
    certifications: [],
    description: 'Traditional Harrar coffee with wine-like and fruity characteristics.',
    images: ['/coffee-bean-concept-illustration.png'],
    gpsLocation: '9.3100° N, 42.1200° E',
    timeline: [
      { date: '2025-04-05', status: 'Received', notes: 'Lot received from farmer' },
      { date: '2025-04-06', status: 'Drying', notes: 'Started natural drying process' },
      { date: '2025-04-20', status: 'Ready', notes: 'Processing completed, ready for export' }
    ]
  },
  {
    id: 'LOT-ETH-00028',
    farmer: 'Hanna Girma',
    region: 'Yirgacheffe',
    variety: 'Gesha',
    weight: 35,
    altitude: 2000,
    receivedDate: '2025-04-02',
    status: 'Washing',
    processingMethod: 'Washed',
    expectedCompletion: '2025-05-07',
    moisture: 10.1,
    grade: 'Grade 1',
    certifications: ['Organic', 'Fair Trade'],
    description: 'Rare Gesha variety from Yirgacheffe with exceptional floral and tea-like qualities.',
    images: ['/coffee-bean-concept-illustration.png'],
    gpsLocation: '6.1500° N, 38.2000° E',
    timeline: [
      { date: '2025-04-02', status: 'Received', notes: 'Lot received from farmer' },
      { date: '2025-04-03', status: 'Sorting', notes: 'Initial sorting completed' },
      { date: '2025-04-05', status: 'Washing', notes: 'Started washing process' }
    ]
  },
];

// Available statuses and processing methods for filters
const statuses = ['All', 'Drying', 'Washing', 'Ready'];
const processingMethods = ['All Methods', 'Washed', 'Natural', 'Honey'];

export default function ProcessingLotsPage() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedMethod, setSelectedMethod] = useState('All Methods');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  
  // State for modals
  const [selectedLot, setSelectedLot] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  
  // State for status update form
  const [statusUpdateData, setStatusUpdateData] = useState({
    currentStatus: '',
    newStatus: '',
    remarks: '',
    timestamp: new Date().toISOString().split('T')[0]
  });
  
  // Filter lots based on selected filters
  const filteredLots = sampleProcessingLots.filter(lot => {
    // Search query filter
    if (searchQuery && !lot.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (selectedStatus !== 'All' && lot.status !== selectedStatus) {
      return false;
    }
    
    // Processing method filter
    if (selectedMethod !== 'All Methods' && lot.processingMethod !== selectedMethod) {
      return false;
    }
    
    // Date range filter (for expected completion)
    if (dateRange.start && new Date(lot.expectedCompletion) < new Date(dateRange.start)) {
      return false;
    }
    if (dateRange.end && new Date(lot.expectedCompletion) > new Date(dateRange.end)) {
      return false;
    }
    
    return true;
  });
  
  // Handle view details
  const handleViewDetails = (lot) => {
    setSelectedLot(lot);
    setShowDetailsModal(true);
  };
  
  // Handle update status
  const handleUpdateStatus = () => {
    setShowDetailsModal(false);
    setStatusUpdateData({
      ...statusUpdateData,
      currentStatus: selectedLot.status,
      timestamp: new Date().toISOString().split('T')[0]
    });
    setShowUpdateStatusModal(true);
  };
  
  // Handle submit status update
  const handleSubmitStatusUpdate = (e) => {
    e.preventDefault();
    // Here you would typically send the status update to your backend/smart contract
    alert(`Status updated for ${selectedLot.id} from ${statusUpdateData.currentStatus} to ${statusUpdateData.newStatus}`);
    setShowUpdateStatusModal(false);
    setStatusUpdateData({
      currentStatus: '',
      newStatus: '',
      remarks: '',
      timestamp: new Date().toISOString().split('T')[0]
    });
  };
  
  // Handle close modals
  const handleCloseModals = () => {
    setShowDetailsModal(false);
    setShowUpdateStatusModal(false);
  };
  
  // Get status badge color
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Drying': return 'bg-yellow-100 text-yellow-700';
      case 'Washing': return 'bg-blue-100 text-blue-700';
      case 'Ready': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Drying': return <Coffee className="h-4 w-4" />;
      case 'Washing': return <Truck className="h-4 w-4" />;
      case 'Ready': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="My Processing Lots" />
      <main className="flex-1 flex flex-col p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-black">My Processing Lots</h1>
          <p className="text-gray-600">Manage and track coffee lots in processing</p>
        </div>
        
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-medium text-black">Filters & Search</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search by Lot ID */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search by Lot ID</label>
              <div className="relative">
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Lot ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {/* Processing Method Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Processing Method</label>
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                >
                  {processingMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {/* Expected Completion Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Completion</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  />
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <div className="relative">
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  />
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Lots Table/Card View */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-black">Processing Coffee Lots</h2>
              <span className="text-sm text-gray-500">{filteredLots.length} lots found</span>
            </div>
          </div>
          
          {/* Table View (Desktop) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-black text-sm border-b">
                  <th className="px-6 py-3 font-medium">Lot ID</th>
                  <th className="px-6 py-3 font-medium">Variety</th>
                  <th className="px-6 py-3 font-medium">Weight (kg)</th>
                  <th className="px-6 py-3 font-medium">Farmer</th>
                  <th className="px-6 py-3 font-medium">Received Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Processing Method</th>
                  <th className="px-6 py-3 font-medium">Expected Completion</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLots.length > 0 ? (
                  filteredLots.map((lot) => (
                    <tr key={lot.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-blue-600">{lot.id}</td>
                      <td className="px-6 py-4 text-black">{lot.variety}</td>
                      <td className="px-6 py-4 text-black">{lot.weight}</td>
                      <td className="px-6 py-4 text-black">{lot.farmer}</td>
                      <td className="px-6 py-4 text-black">{lot.receivedDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full ${getStatusBadgeClass(lot.status)} text-xs font-semibold flex items-center gap-1 w-fit`}>
                          {getStatusIcon(lot.status)}
                          {lot.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-black">{lot.processingMethod}</td>
                      <td className="px-6 py-4 text-black">{lot.expectedCompletion}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleViewDetails(lot)}
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                      No lots available matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Card View (Mobile) */}
          <div className="md:hidden p-4 grid grid-cols-1 gap-4">
            {filteredLots.length > 0 ? (
              filteredLots.map((lot) => (
                <div key={lot.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-blue-600">{lot.id}</span>
                    <span className={`px-2 py-1 rounded-full ${getStatusBadgeClass(lot.status)} text-xs font-semibold flex items-center gap-1`}>
                      {getStatusIcon(lot.status)}
                      {lot.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <h3 className="font-medium text-black">{lot.farmer}</h3>
                    <div className="text-sm text-gray-600">{lot.variety} • {lot.processingMethod}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Weight:</span> {lot.weight} kg
                    </div>
                    <div>
                      <span className="text-gray-500">Received:</span> {lot.receivedDate}
                    </div>
                    <div>
                      <span className="text-gray-500">Expected:</span> {lot.expectedCompletion}
                    </div>
                    <div>
                      <span className="text-gray-500">Region:</span> {lot.region}
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewDetails(lot)}
                    className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No lots available matching your filters
              </div>
            )}
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {filteredLots.length} of {sampleProcessingLots.length} lots
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
        
        {/* Lot Details Modal */}
        {showDetailsModal && selectedLot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-xl font-semibold text-black">Lot Details: {selectedLot.id}</h2>
                <button onClick={handleCloseModals} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column - Images and Map */}
                  <div>
                    <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4 overflow-hidden">
                      {selectedLot.images && selectedLot.images.length > 0 ? (
                        <img 
                          src={selectedLot.images[0]} 
                          alt={`Coffee lot ${selectedLot.id}`} 
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Package className="h-16 w-16 text-gray-400" />
                      )}
                    </div>
                    <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-red-500" />
                      </div>
                      <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-md text-sm">
                        {selectedLot.gpsLocation}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Lot Details */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 text-black">Lot Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Farmer</p>
                          <p className="font-medium text-black">{selectedLot.farmer}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Region</p>
                          <p className="font-medium text-black">{selectedLot.region}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Variety</p>
                          <p className="font-medium text-black">{selectedLot.variety}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Weight</p>
                          <p className="font-medium text-black">{selectedLot.weight} kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Altitude</p>
                          <p className="font-medium text-black">{selectedLot.altitude} m</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Grade</p>
                          <p className="font-medium text-black">{selectedLot.grade}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Moisture</p>
                          <p className="font-medium text-black">{selectedLot.moisture}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Certifications</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedLot.certifications && selectedLot.certifications.length > 0 ? (
                              selectedLot.certifications.map((cert, index) => (
                                <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                  {cert}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 text-sm">None</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 text-black">Processing Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Current Status</p>
                          <p className="font-medium">
                            <span className={`px-2 py-1 rounded-full ${getStatusBadgeClass(selectedLot.status)} text-xs font-semibold inline-flex items-center gap-1`}>
                              {getStatusIcon(selectedLot.status)}
                              {selectedLot.status}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Processing Method</p>
                          <p className="font-medium text-black">{selectedLot.processingMethod}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Received Date</p>
                          <p className="font-medium text-black">{selectedLot.receivedDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Expected Completion</p>
                          <p className="font-medium text-black">{selectedLot.expectedCompletion}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2 text-black">Processing Timeline</h3>
                      <div className="relative">
                        {/* Timeline visualization */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                        
                        {selectedLot.timeline.map((event, index) => (
                          <div key={index} className="mb-4 pl-10 relative">
                            {/* Timeline dot */}
                            <div className={`absolute left-2 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center
                              ${index === selectedLot.timeline.length - 1 ? 'bg-blue-500 border-blue-500' : 'bg-white border-blue-300'}`}>
                              {index === selectedLot.timeline.length - 1 && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                            
                            <div className="text-sm">
                              <div className="font-medium text-black">{event.status}</div>
                              <div className="text-gray-500">{event.date}</div>
                              <div className="text-gray-600 mt-1">{event.notes}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-6">
                      <button
                        onClick={handleUpdateStatus}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Clock className="h-4 w-4" />
                        <span>Update Status</span>
                      </button>
                      
                      <button
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                      </button>
                      
                      <button
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                      >
                        <Link className="h-4 w-4" />
                        <span>View on Chain</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-black">Description</h3>
                  <p className="text-gray-700">{selectedLot.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Update Status Modal */}
        {showUpdateStatusModal && selectedLot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-black">Update Processing Status</h2>
                <button onClick={handleCloseModals} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmitStatusUpdate} className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                  <input
                    type="text"
                    className="px-4 py-2 border border-gray-300 rounded-lg w-full bg-gray-50"
                    value={statusUpdateData.currentStatus}
                    disabled
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Status</label>
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={statusUpdateData.newStatus}
                    onChange={(e) => setStatusUpdateData({...statusUpdateData, newStatus: e.target.value})}
                    required
                  >
                    <option value="">Select new status</option>
                    <option value="Drying">Drying</option>
                    <option value="Washing">Washing</option>
                    <option value="Ready">Ready for Export</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Remarks (Optional)</label>
                  <textarea
                    className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Add any notes about this status change"
                    value={statusUpdateData.remarks}
                    onChange={(e) => setStatusUpdateData({...statusUpdateData, remarks: e.target.value})}
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={statusUpdateData.timestamp}
                    onChange={(e) => setStatusUpdateData({...statusUpdateData, timestamp: e.target.value})}
                    required
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModals}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Update Status</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}