'use client';
import { useState } from 'react';
import Sidebar from "../Sidebar";
import { Package, Eye, Filter, Search, Calendar, ChevronDown, X, FileText, Clock, CheckCircle, Upload, Save, Database, Link, QrCode, Download, ExternalLink, Truck } from "lucide-react";

// Sample data for demonstration
const sampleReadyLots = [
  {
    id: 'LOT-ETH-00025',
    farmer: 'Dawit Mengistu',
    region: 'Guji',
    variety: 'Bourbon',
    weight: 75,
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
    weight: 40,
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
    farmer: 'Abebe Bekele',
    region: 'Sidama',
    variety: 'Heirloom',
    weight: 65,
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
    farmer: 'Tigist Haile',
    region: 'Yirgacheffe',
    variety: 'Typica',
    weight: 50,
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
    setAssignmentData({
      exporter: '',
      expectedShipDate: '',
      notes: '',
    });
  };
  
  // Generate QR code for a lot
  const handleGenerateQR = (lot) => {
    // In a real app, you would generate a QR code with lot traceability info
    alert(`QR code generated for ${lot.id}`);
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Ready':
        return 'bg-green-100 text-green-800';
      case 'Assigned':
        return 'bg-blue-100 text-blue-800';
      case 'Awaiting Exporter':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="Ready for Export" />
      <main className="flex-1 flex flex-col p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-black">Ready for Export</h1>
          <p className="text-gray-600">Manage coffee lots ready for export and assign to exporters</p>
        </div>
        
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-medium text-black">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Lot ID</label>
              <div className="relative">
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by Lot ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {/* Variety Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variety</label>
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedVariety}
                  onChange={(e) => setSelectedVariety(e.target.value)}
                >
                  {varieties.map((variety) => (
                    <option key={variety} value={variety}>{variety}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
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
          </div>
        </div>
        
        {/* Ready Lots Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-medium text-black">Ready for Export Lots</h2>
            </div>
          </div>
          
          {filteredLots.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-black text-sm border-b">
                    <th className="px-6 py-3 font-medium">Lot ID</th>
                    <th className="px-6 py-3 font-medium">Variety</th>
                    <th className="px-6 py-3 font-medium">Weight (kg)</th>
                    <th className="px-6 py-3 font-medium">Completed On</th>
                    <th className="px-6 py-3 font-medium">Farmer</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Assigned Exporter</th>
                    <th className="px-6 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLots.map((lot) => (
                    <tr key={lot.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-black">{lot.id}</td>
                      <td className="px-6 py-4 text-black">{lot.variety}</td>
                      <td className="px-6 py-4 text-black">{lot.weight}</td>
                      <td className="px-6 py-4 text-black">{lot.completedOn}</td>
                      <td className="px-6 py-4 text-black">{lot.farmer}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(lot.status)}`}>
                          {lot.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-black">{lot.assignedExporter || '-'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(lot)}
                            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          
                          {lot.status === 'Ready' && (
                            <button
                              onClick={() => handleAssignExporter(lot)}
                              className="p-1 text-green-600 hover:text-green-800 transition-colors"
                              title="Assign Exporter"
                            >
                              <Truck className="h-4 w-4" />
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleGenerateQR(lot)}
                            className="p-1 text-purple-600 hover:text-purple-800 transition-colors"
                            title="Generate QR Code"
                          >
                            <QrCode className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No lots found matching your filters.
            </div>
          )}
        </div>
        
        {/* Blockchain Traceability Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Link className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-medium text-black">Blockchain Traceability</h2>
          </div>
          
          <p className="text-gray-600 mb-4">
            All exported lots are recorded on the Solana blockchain for permanent traceability.
            Each lot receives a unique digital certificate that can be verified by buyers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <QrCode className="h-4 w-4 text-blue-600" />
                <h3 className="font-medium text-black">QR Code Traceability</h3>
              </div>
              <p className="text-sm text-gray-600">
                Generate QR codes for each lot to enable easy access to traceability information.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                <h3 className="font-medium text-black">Blockchain Explorer</h3>
              </div>
              <p className="text-sm text-gray-600">
                View detailed transaction history and verification on the Solana blockchain explorer.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-blue-600" />
                <h3 className="font-medium text-black">Trace Token</h3>
              </div>
              <p className="text-sm text-gray-600">
                Mint NFT trace tokens for premium lots to enhance value and provide digital ownership.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Assign to Exporter Modal */}
      {(showAssignModal || showDetailsModal || showQRModal) && (
        <div className="fixed inset-0 z-40 bg-white/70 backdrop-blur-sm transition-all" />
      )}
      {showAssignModal && (
        <>
          {/* Modal content here */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-black">Assign Exporter</h3>
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmitAssignment} className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Assigning exporter for:</p>
                  <p className="font-medium text-black">{selectedLot.id} - {selectedLot.variety}</p>
                </div>
                
                {/* Select Exporter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Exporter *</label>
                  <div className="relative">
                    <select
                      name="exporter"
                      className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={assignmentData.exporter}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select an exporter</option>
                      {exporters.map((exporter) => (
                        <option key={exporter} value={exporter}>{exporter}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                {/* Expected Ship Date */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Ship Date *</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="expectedShipDate"
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={assignmentData.expectedShipDate}
                      onChange={handleInputChange}
                      required
                    />
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                {/* Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    rows="3"
                    className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any additional notes about this assignment..."
                    value={assignmentData.notes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                {/* Document Upload Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Attach Documents (Optional)</h4>
                  
                  <div className="space-y-3">
                    {/* Processing Summary */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Processing Summary PDF</label>
                      <input
                        type="file"
                        name="processingPdf"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                    </div>
                    
                    {/* Certifications */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Certification Documents</label>
                      <input
                        type="file"
                        name="certifications"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                    </div>
                    
                    {/* Packing List */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Packing List</label>
                      <input
                        type="file"
                        name="packingList"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        accept=".pdf,.xlsx,.csv"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Truck className="h-4 w-4" />
                    Assign Exporter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      
      {/* View Details Modal */}
      {showDetailsModal && selectedLot && (
        <>
          <div className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm transition-all" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-medium text-black">Lot Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-4">Lot Information</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Lot ID</p>
                      <p className="font-medium">{selectedLot.id}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Farmer</p>
                      <p className="font-medium">{selectedLot.farmer}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Region</p>
                      <p className="font-medium">{selectedLot.region}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Variety</p>
                      <p className="font-medium">{selectedLot.variety}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Weight</p>
                      <p className="font-medium">{selectedLot.weight} kg</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Grade</p>
                      <p className="font-medium">{selectedLot.grade}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Blockchain Traceability Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-500 mb-4">Blockchain Traceability</h4>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex items-start">
                    <Link className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Trace Path</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Farmer ({selectedLot.farmer}) → Processor → {selectedLot.assignedExporter || 'Pending Exporter'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <QrCode className="h-4 w-4 text-gray-500" />
                    View QR Code
                  </button>
                  
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <ExternalLink className="h-4 w-4 text-gray-500" />
                    View on Chain
                  </button>
                  
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Database className="h-4 w-4 text-gray-500" />
                    Mint Trace Token
                  </button>
                </div>
              </div>
              
              {/* Footer Actions */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                
                {selectedLot.status === 'Ready' && (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleAssignExporter(selectedLot);
                    }}
                    className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Truck className="h-4 w-4" />
                    Assign to Exporter
                  </button>
                )}
              </div>
                  <h4 className="text-sm font-medium text-gray-500 mb-4">Processing & Export Details</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Processing Method</p>
                      <p className="font-medium">{selectedLot.processingMethod}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Completed On</p>
                      <p className="font-medium">{selectedLot.completedOn}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Moisture Content</p>
                      <p className="font-medium">{selectedLot.moisture}%</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="font-medium">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(selectedLot.status)}`}>
                          {selectedLot.status}
                        </span>
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Assigned Exporter</p>
                      <p className="font-medium">{selectedLot.assignedExporter || 'Not assigned'}</p>
                    </div>
                    
                    {selectedLot.expectedShipDate && (
                      <div>
                        <p className="text-xs text-gray-500">Expected Ship Date</p>
                        <p className="font-medium">{selectedLot.expectedShipDate}</p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-xs text-gray-500">Certifications</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedLot.certifications && selectedLot.certifications.length > 0 ? (
                          selectedLot.certifications.map((cert, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                              {cert}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">None</span>
                        )}
                      </div>
                    </div>