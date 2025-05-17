'use client';
import { useState } from 'react';
import Sidebar from "../Sidebar";
import { Package, Eye, Filter, Search, Calendar, ChevronDown, X, FileText, Clock, CheckCircle, Upload, Save, Database, Link, QrCode, Download, ExternalLink, Truck } from "lucide-react";

// Sample data for demonstration
const sampleReadyLots = [
  {
    id: 'LOT-ETH-00025',
    farmer: 'Abebe Bekele',
    region: 'Guji',
    variety: 'Heirloom',
    weight: 70.5,
    altitude: 2100,
    completedOn: '2025-04-28',
    status: 'Ready',
    processingMethod: 'Natural',
    moisture: 10.8,
    grade: 'Grade 1',
    certifications: ['Organic', 'Rainforest Alliance'],
    assignedExporter: '',
    expectedShipDate: '',
  },
  {
    id: 'LOT-ETH-00027',
    farmer: 'Solomon Bekele',
    region: 'Harrar',
    variety: 'Typica',
    weight: 45.2,
    altitude: 1750,
    completedOn: '2025-04-20',
    status: 'Ready',
    processingMethod: 'Natural',
    moisture: 11.5,
    grade: 'Grade 2',
    certifications: [],
    assignedExporter: '',
    expectedShipDate: '',
  },
  {
    id: 'LOT-ETH-00029',
    farmer: 'Tigist Haile',
    region: 'Sidama',
    variety: 'Heirloom',
    weight: 65.8,
    altitude: 1950,
    completedOn: '2025-04-15',
    status: 'Assigned',
    processingMethod: 'Washed',
    moisture: 10.2,
    grade: 'Grade 1',
    certifications: ['Organic'],
    assignedExporter: 'ABC Exports',
    expectedShipDate: '2025-05-10',
  },
  {
    id: 'LOT-ETH-00030',
    farmer: 'Dawit Mengistu',
    region: 'Yirgacheffe',
    variety: 'Typica',
    weight: 50.3,
    altitude: 1850,
    completedOn: '2025-04-10',
    status: 'Awaiting Exporter',
    processingMethod: 'Washed',
    moisture: 10.5,
    grade: 'Grade 1',
    certifications: ['Fair Trade'],
    assignedExporter: 'Global Coffee Traders',
    expectedShipDate: '2025-05-15',
  },
];

// Sample exporters for dropdown
const exporters = [
  'ABC Exports',
  'Global Coffee Traders',
  'Ethiopian Coffee Exporters',
  'Addis Coffee Export',
  'Yirgacheffe Exporters',
];

// Available varieties and regions for filters
const varieties = ['All Varieties', 'Heirloom', 'Typica', 'Bourbon', 'Gesha'];
const regions = ['All Regions', 'Sidama', 'Yirgacheffe', 'Guji', 'Harrar', 'Limu'];
const statuses = ['All Statuses', 'Ready', 'Assigned', 'Awaiting Exporter'];

export default function ReadyForExportPage() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVariety, setSelectedVariety] = useState('All Varieties');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  
  // State for modals
  const [selectedLot, setSelectedLot] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  
  // State for assignment form
  const [assignmentData, setAssignmentData] = useState({
    exporter: '',
    expectedShipDate: '',
    notes: '',
  });
  
  // State for document upload
  const [documents, setDocuments] = useState({
    processingPdf: null,
    certifications: null,
    photos: null,
    packingList: null,
  });
  
  // Filter lots based on selected filters
  const filteredLots = sampleReadyLots.filter(lot => {
    // Search query filter
    if (searchQuery && !lot.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Variety filter
    if (selectedVariety !== 'All Varieties' && lot.variety !== selectedVariety) {
      return false;
    }
    
    // Region filter
    if (selectedRegion !== 'All Regions' && lot.region !== selectedRegion) {
      return false;
    }
    
    // Status filter
    if (selectedStatus !== 'All Statuses' && lot.status !== selectedStatus) {
      return false;
    }
    
    return true;
  });
  
  // Handle view details
  const handleViewDetails = (lot) => {
    setSelectedLot(lot);
    setShowDetailsModal(true);
  };
  
  // Handle assign exporter
  const handleAssignExporter = (lot) => {
    setSelectedLot(lot);
    setShowAssignModal(true);
    setAssignmentData({
      exporter: lot.assignedExporter || '',
      expectedShipDate: lot.expectedShipDate || '',
      notes: '',
    });
  };
  
  // Handle generate QR code
  const handleGenerateQR = (lot) => {
    setSelectedLot(lot);
    setShowQRModal(true);
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData({
      ...assignmentData,
      [name]: value
    });
  };
  
  // Handle file upload
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setDocuments({
        ...documents,
        [name]: files[0]
      });
    }
  };
  
  // Handle submit assignment
  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend/blockchain
    // For demo, we'll just update the local state
    const updatedLots = sampleReadyLots.map(lot => {
      if (lot.id === selectedLot.id) {
        return {
          ...lot,
          status: 'Assigned',
          assignedExporter: assignmentData.exporter,
          expectedShipDate: assignmentData.expectedShipDate
        };
      }
      return lot;
    });
    
    // In a real app, you would update your state with the API response
    // For demo, we'll just show an alert
    alert(`Lot ${selectedLot.id} assigned to ${assignmentData.exporter}`);
    
    // Close modal and reset form
    setShowAssignModal(false);
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Ready':
        return 'bg-green-100 text-green-700';
      case 'Assigned':
        return 'bg-blue-100 text-blue-700';
      case 'Awaiting Exporter':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="Ready for Export" />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col mb-8">
            <h1 className="text-2xl font-bold mb-2 text-black">Ready for Export</h1>
            <p className="text-gray-600">Manage and assign processed coffee lots to exporters</p>
          </div>
          
          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="text-gray-400 w-5 h-5" />
                <h2 className="font-medium text-gray-700">Filters</h2>
              </div>
              
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Lot ID"
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Variety Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Variety</label>
                <select
                  className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedVariety}
                  onChange={(e) => setSelectedVariety(e.target.value)}
                >
                  {varieties.map((variety) => (
                    <option key={variety} value={variety}>{variety}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-8 text-gray-400 w-4 h-4" />
              </div>
              
              {/* Region Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select
                  className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-8 text-gray-400 w-4 h-4" />
              </div>
              
              {/* Status Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-8 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>
          
          {/* Ready Lots Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-8">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-semibold text-lg text-gray-800">Ready Lots</h2>
              <p className="text-sm text-gray-500 mt-1">Coffee lots that have completed processing and are ready for export</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Lot ID</th>
                    <th className="px-6 py-3">Variety</th>
                    <th className="px-6 py-3">Weight (kg)</th>
                    <th className="px-6 py-3">Completed On</th>
                    <th className="px-6 py-3">Farmer</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Assigned Exporter</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredLots.length > 0 ? (
                    filteredLots.map((lot) => (
                      <tr key={lot.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{lot.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lot.variety}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lot.weight}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lot.completedOn}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lot.farmer}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(lot.status)}`}>
                            {lot.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {lot.assignedExporter || '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleViewDetails(lot)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {lot.status === 'Ready' && (
                              <button
                                onClick={() => handleAssignExporter(lot)}
                                className="text-green-600 hover:text-green-900 p-1"
                                title="Assign Exporter"
                              >
                                <Truck className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleGenerateQR(lot)}
                              className="text-purple-600 hover:text-purple-900 p-1"
                              title="Generate QR Code"
                            >
                              <QrCode className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                        No coffee lots match your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Blockchain Traceability Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
            <h2 className="font-semibold text-lg text-gray-800 mb-4">Blockchain Traceability</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">Trace Path</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Farmer</span>
                  <ChevronDown className="rotate-270 h-4 w-4 text-gray-400" />
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Processor</span>
                  <ChevronDown className="rotate-270 h-4 w-4 text-gray-400" />
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">Pending Exporter</span>
                </div>
                <div className="mt-4 flex space-x-3">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View on Chain
                  </a>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <Database className="h-4 w-4 mr-1" />
                    Mint Trace Token
                  </a>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-medium text-purple-800 mb-2">Batch Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-white text-purple-700 border border-purple-200 hover:bg-purple-100 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <Truck className="h-4 w-4 mr-2" />
                    Batch Export Lots
                  </button>
                  <button className="bg-white text-purple-700 border border-purple-200 hover:bg-purple-100 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Codes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Assign to Exporter Modal */}
      {showAssignModal && selectedLot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Assign to Exporter</h3>
                <button onClick={() => setShowAssignModal(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmitAssignment} className="p-6">
              <div className="mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Lot ID:</span>
                  <span className="text-sm font-medium text-blue-600">{selectedLot.id}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-gray-500">Variety:</span>
                  <span className="text-sm font-medium">{selectedLot.variety}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-gray-500">Weight:</span>
                  <span className="text-sm font-medium">{selectedLot.weight} kg</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Exporter *</label>
                <div className="relative">
                  <select
                    name="exporter"
                    value={assignmentData.exporter}
                    onChange={handleInputChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select an exporter</option>
                    {exporters.map((exporter) => (
                      <option key={exporter} value={exporter}>{exporter}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Ship Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    name="expectedShipDate"
                    value={assignmentData.expectedShipDate}
                    onChange={handleInputChange}
                    required
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={assignmentData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any additional details about this assignment..."
                ></textarea>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Attach Documents (Optional)</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      Processing Summary PDF
                    </label>
                    <input
                      type="file"
                      name="processingPdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="processingPdf"
                      accept=".pdf"
                    />
                    <label htmlFor="processingPdf" className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded text-xs font-medium">
                      Upload
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      Certification Documents
                    </label>
                    <input
                      type="file"
                      name="certifications"
                      onChange={handleFileChange}
                      className="hidden"
                      id="certifications"
                      accept=".pdf,.jpg,.png"
                    />
                    <label htmlFor="certifications" className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded text-xs font-medium">
                      Upload
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      Packing List
                    </label>
                    <input
                      type="file"
                      name="packingList"
                      onChange={handleFileChange}
                      className="hidden"
                      id="packingList"
                      accept=".pdf,.xlsx,.csv"
                    />
                    <label htmlFor="packingList" className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded text-xs font-medium">
                      Upload
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* View Details Modal */}
      {showDetailsModal && selectedLot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Lot Details</h3>
                <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Basic Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Lot ID:</span>
                      <span className="text-sm font-medium text-blue-600">{selectedLot.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Farmer:</span>
                      <span className="text-sm font-medium">{selectedLot.farmer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Region:</span>
                      <span className="text-sm font-medium">{selectedLot.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Variety:</span>
                      <span className="text-sm font-medium">{selectedLot.variety}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Weight:</span>
                      <span className="text-sm font-medium">{selectedLot.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Completed On:</span>
                      <span className="text-sm font-medium">{selectedLot.completedOn}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Processing Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Method:</span>
                      <span className="text-sm font-medium">{selectedLot.processingMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Moisture:</span>
                      <span className="text-sm font-medium">{selectedLot.moisture}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Grade:</span>
                      <span className="text-sm font-medium">{selectedLot.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Altitude:</span>
                      <span className="text-sm font-medium">{selectedLot.altitude} masl</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Certifications:</span>
                      <span className="text-sm font-medium">
                        {selectedLot.certifications.length > 0 
                          ? selectedLot.certifications.join(', ') 
                          : 'None'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-medium text-gray-700 mb-3">Export Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusBadgeColor(selectedLot.status)}`}>
                      {selectedLot.status}
                    </span>
                  </div>
                  {selectedLot.assignedExporter && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Assigned Exporter:</span>
                        <span className="text-sm font-medium">{selectedLot.assignedExporter}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Expected Ship Date:</span>
                        <span className="text-sm font-medium">{selectedLot.expectedShipDate}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
                {selectedLot.status === 'Ready' && (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleAssignExporter(selectedLot);
                    }}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Assign to Exporter
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* QR Code Modal */}
      {showQRModal && selectedLot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Traceability QR Code</h3>
                <button onClick={() => setShowQRModal(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 flex flex-col items-center">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500">Scan this QR code to view the complete traceability information for:</p>
                <p className="text-blue-600 font-medium mt-1">{selectedLot.id}</p>
              </div>
              
              {/* Placeholder for QR code - in a real app, this would be generated */}
              <div className="w-48 h-48 bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
                <QrCode className="h-24 w-24 text-gray-400" />
              </div>
              
              <div className="flex space-x-3 mt-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download QR
                </button>
                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Chain
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}