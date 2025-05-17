'use client';
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { Package, Search, Filter, ChevronDown, Calendar, X, Upload, FileText, CheckCircle, Eye, ExternalLink, Download } from "lucide-react";

// Sample data for assigned lots
const sampleAssignedLots = [
  { 
    id: "LOT-ETH-0039", 
    variety: "Heirloom", 
    weight: 64.2, 
    processor: "Oromia Coffee Co.", 
    status: "Ready", 
    docsStatus: "Missing", 
    assignedDate: "2024-05-12", 
    region: "Sidama",
    estimatedDelivery: "",
    containerNumber: ""
  },
  { 
    id: "LOT-ETH-0036", 
    variety: "Yirgacheffe", 
    weight: 78.5, 
    processor: "Yirgacheffe Coffee Farmers Cooperative", 
    status: "Docs Uploaded", 
    docsStatus: "Complete", 
    assignedDate: "2024-05-08", 
    region: "Yirgacheffe",
    estimatedDelivery: "2024-06-15",
    containerNumber: "MSCU-7452198"
  },
  { 
    id: "LOT-ETH-0033", 
    variety: "Heirloom", 
    weight: 92.1, 
    processor: "Sidama Coffee Union", 
    status: "In Transit", 
    docsStatus: "Complete", 
    assignedDate: "2024-05-01", 
    region: "Sidama",
    estimatedDelivery: "2024-06-10",
    containerNumber: "CMAU-8521479"
  },
  { 
    id: "LOT-ETH-0029", 
    variety: "Limu", 
    weight: 56.8, 
    processor: "Limu Coffee Cooperative", 
    status: "Ready", 
    docsStatus: "Missing", 
    assignedDate: "2024-04-28", 
    region: "Limu",
    estimatedDelivery: "",
    containerNumber: ""
  },
  { 
    id: "LOT-ETH-0025", 
    variety: "Guji", 
    weight: 85.3, 
    processor: "Guji Highland Coffee", 
    status: "Exported", 
    docsStatus: "Complete", 
    assignedDate: "2024-04-15", 
    region: "Guji",
    estimatedDelivery: "2024-05-20",
    containerNumber: "TCLU-6325874"
  },
];

// Filter options
const regions = ["All Regions", "Sidama", "Yirgacheffe", "Guji", "Limu", "Harar"];
const statuses = ["All Statuses", "Ready", "Docs Uploaded", "In Transit", "Exported"];
const processors = ["All Processors", "Oromia Coffee Co.", "Yirgacheffe Coffee Farmers Cooperative", "Sidama Coffee Union", "Limu Coffee Cooperative", "Guji Highland Coffee"];

export default function AssignedLotsPage() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedProcessor, setSelectedProcessor] = useState('All Processors');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);
  
  // State for modals
  const [selectedLot, setSelectedLot] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // State for document upload
  const [documents, setDocuments] = useState({
    exportCertificate: null,
    billOfLading: null,
    containerNumber: '',
    estimatedDelivery: '',
    notes: ''
  });
  
  // Filter lots based on selected filters
  const filteredLots = sampleAssignedLots.filter(lot => {
    // Search query filter
    if (searchQuery && !lot.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Region filter
    if (selectedRegion !== 'All Regions' && lot.region !== selectedRegion) {
      return false;
    }
    
    // Processor filter
    if (selectedProcessor !== 'All Processors' && lot.processor !== selectedProcessor) {
      return false;
    }
    
    // Status filter
    if (selectedStatus !== 'All Statuses' && lot.status !== selectedStatus) {
      return false;
    }
    
    // Date range filter
    if (dateRange.start && new Date(lot.assignedDate) < new Date(dateRange.start)) {
      return false;
    }
    if (dateRange.end && new Date(lot.assignedDate) > new Date(dateRange.end)) {
      return false;
    }
    
    return true;
  });
  
  // Handle view details
  const handleViewDetails = (lot) => {
    setSelectedLot(lot);
    setShowDetailsModal(true);
  };
  
  // Handle upload documents
  const handleUploadDocs = (lot) => {
    setSelectedLot(lot);
    setShowUploadModal(true);
    // Reset form
    setDocuments({
      exportCertificate: null,
      billOfLading: null,
      containerNumber: lot.containerNumber || '',
      estimatedDelivery: lot.estimatedDelivery || '',
      notes: ''
    });
  };
  
  // Handle mark as exported
  const handleMarkAsExported = (lot) => {
    // In a real app, you would update the database and possibly log to blockchain
    alert(`Lot ${lot.id} marked as exported!`);
  };
  
  // Handle file change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setDocuments({
        ...documents,
        [name]: files[0]
      });
    }
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocuments({
      ...documents,
      [name]: value
    });
  };
  
  // Handle submit documents
  const handleSubmitDocuments = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!documents.exportCertificate || !documents.billOfLading || !documents.containerNumber || !documents.estimatedDelivery) {
      alert('Please fill all required fields');
      return;
    }
    
    // In a real app, you would upload files to storage and update the database
    alert(`Documents uploaded for ${selectedLot.id}!`);
    
    // Close modal
    setShowUploadModal(false);
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Ready':
        return 'bg-blue-100 text-blue-700';
      case 'Docs Uploaded':
        return 'bg-yellow-100 text-yellow-700';
      case 'In Transit':
        return 'bg-purple-100 text-purple-700';
      case 'Exported':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  // Get docs status badge color
  const getDocsStatusBadgeColor = (status) => {
    return status === 'Complete' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="Assigned Lots" />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col mb-8">
            <h1 className="text-2xl font-bold mb-2 text-black">Assigned Lots</h1>
            <p className="text-gray-600">Manage coffee lots assigned to you for export</p>
          </div>
          
          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="text-gray-400 w-5 h-5" />
                <h2 className="font-medium text-gray-700">Filters</h2>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="ml-2 text-blue-600 text-sm font-medium"
                >
                  {showFilters ? 'Hide' : 'Show'} Advanced
                </button>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
              
              {/* Processor Filter */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Processor</label>
                <select
                  className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedProcessor}
                  onChange={(e) => setSelectedProcessor(e.target.value)}
                >
                  {processors.map((processor) => (
                    <option key={processor} value={processor}>{processor}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-8 text-gray-400 w-4 h-4" />
              </div>
            </div>
            
            {/* Advanced Filters */}
            {showFilters && (
              <div className="pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Date Range</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="date"
                          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={dateRange.start}
                          onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                        />
                      </div>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="date"
                          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={dateRange.end}
                          onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedRegion('All Regions');
                        setSelectedProcessor('All Processors');
                        setSelectedStatus('All Statuses');
                        setDateRange({ start: '', end: '' });
                      }}
                      className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Clear All Filters</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Lots Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lot ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variety</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processor</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Docs Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Date</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLots.length > 0 ? (
                    filteredLots.map((lot) => (
                      <tr key={lot.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{lot.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lot.variety}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lot.weight}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lot.processor}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(lot.status)}`}>
                            {lot.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDocsStatusBadgeColor(lot.docsStatus)}`}>
                            {lot.docsStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lot.assignedDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleViewDetails(lot)}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </button>
                            
                            {lot.status === 'Ready' && (
                              <button
                                onClick={() => handleUploadDocs(lot)}
                                className="text-yellow-600 hover:text-yellow-900 flex items-center"
                              >
                                <Upload className="w-4 h-4 mr-1" />
                                Upload Docs
                              </button>
                            )}
                            
                            {lot.status === 'Docs Uploaded' && (
                              <button
                                onClick={() => handleMarkAsExported(lot)}
                                className="text-green-600 hover:text-green-900 flex items-center"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Mark Exported
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                        No lots found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      {/* View Details Modal */}
      {showDetailsModal && selectedLot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Lot Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Lot Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Lot ID</p>
                      <p className="font-medium">{selectedLot.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Coffee Variety</p>
                      <p className="font-medium">{selectedLot.variety}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-medium">{selectedLot.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Region</p>
                      <p className="font-medium">{selectedLot.region}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Export Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(selectedLot.status)}`}>
                        {selectedLot.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Processor</p>
                      <p className="font-medium">{selectedLot.processor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Assigned Date</p>
                      <p className="font-medium">{selectedLot.assignedDate}</p>
                    </div>
                    {selectedLot.containerNumber && (
                      <div>
                        <p className="text-sm text-gray-500">Container Number</p>
                        <p className="font-medium">{selectedLot.containerNumber}</p>
                      </div>
                    )}
                    {selectedLot.estimatedDelivery && (
                      <div>
                        <p className="text-sm text-gray-500">Estimated Delivery</p>
                        <p className="font-medium">{selectedLot.estimatedDelivery}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Documents Section */}
              {selectedLot.status !== 'Ready' && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Documents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-blue-500 mr-2" />
                          <span>Export Certificate</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-blue-500 mr-2" />
                          <span>Bill of Lading</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Blockchain Trace */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-4">Blockchain Trace</h4>
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View on Blockchain Explorer
                </button>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              
              {selectedLot.status === 'Ready' && (
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleUploadDocs(selectedLot);
                  }}
                  className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Upload Documents
                </button>
              )}
              
              {selectedLot.status === 'Docs Uploaded' && (
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleMarkAsExported(selectedLot);
                  }}
                  className="ml-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Mark as Exported
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Upload Documents Modal */}
      {showUploadModal && selectedLot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Upload Export Documents</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmitDocuments}>
              <div className="p-6">
                <p className="mb-4 text-gray-600">Please upload the required documents for lot {selectedLot.id}</p>
                
                {/* Export Certificate Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Export Certificate *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      name="exportCertificate"
                      id="exportCertificate"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="exportCertificate" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF or image files only</p>
                    </label>
                    {documents.exportCertificate && (
                      <p className="mt-2 text-sm text-green-600">
                        File selected: {documents.exportCertificate.name}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Bill of Lading Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill of Lading *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      name="billOfLading"
                      id="billOfLading"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="billOfLading" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF or image files only</p>
                    </label>
                    {documents.billOfLading && (
                      <p className="mt-2 text-sm text-green-600">
                        File selected: {documents.billOfLading.name}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Container Number */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Container Number *</label>
                  <input
                    type="text"
                    name="containerNumber"
                    value={documents.containerNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. MSCU-7452198"
                    required
                  />
                </div>
                
                {/* Estimated Delivery */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="date"
                      name="estimatedDelivery"
                      value={documents.estimatedDelivery}
                      onChange={handleInputChange}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                {/* Notes */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes / Comments (Optional)</label>
                  <textarea
                    name="notes"
                    value={documents.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any additional information for the importer or internal notes"
                  ></textarea>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Upload Documents
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}