'use client';
import { useState, useEffect } from 'react';
import Sidebar from "../Sidebar";
import { Search, Filter, Calendar, PlusCircle, Eye, Edit, Trash2, X, ChevronDown, ChevronUp, Download } from "lucide-react";
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';

export default function LotsPage() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [showLotDetails, setShowLotDetails] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);
  const [coffeeLots, setCoffeeLots] = useState([]);
  
  // Load coffee lots from localStorage on component mount
  useEffect(() => {
    const storedLots = JSON.parse(localStorage.getItem('coffeeLots') || '[]');
    // Combine stored lots with mock data if needed
    const mockLots = [
      
     
    ];
    
    // Combine stored lots with mock data, avoiding duplicates by ID
    const existingIds = storedLots.map(lot => lot.id);
    const filteredMockLots = mockLots.filter(lot => !existingIds.includes(lot.id));
    setCoffeeLots([...storedLots, ...filteredMockLots]);
  }, []);

  // Filter lots based on search, status, and date
  const filteredLots = coffeeLots.filter(lot => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      lot.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lot.variety.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'All' || lot.status === statusFilter;
    
    // Date filter
    const matchesDate = !dateRange.start || !dateRange.end || 
      (new Date(lot.submittedDate) >= new Date(dateRange.start) && 
       new Date(lot.submittedDate) <= new Date(dateRange.end));
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Handle view lot details
  const handleViewLot = (lot) => {
    setSelectedLot(lot);
    setShowLotDetails(true);
  };

  // Get status badge color
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Exported': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="My Coffee Lots" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-black">My Coffee Lots</h1>
          <p className="text-black">Manage and track your coffee batches from creation to export</p>
        </div>
        
        {/* Filters and Controls */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search by Lot ID or variety"
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
            </div>
            
            {/* Filter Toggle */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          
          {/* Add New Lot Button */}
          <a 
            href="/dashboard/farmer/add-lot"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add New Lot</span>
          </a>
        </div>
        
        {/* Expanded Filters */}
        {showFilters && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              {/* Status Filter */}
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-black mb-1">Status</label>
                <select 
                  className="w-full md:w-40 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Exported">Exported</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              
              {/* Date Range */}
              <div className="w-full md:w-auto flex flex-col">
                <label className="block text-sm font-medium text-black mb-1">Submission Date</label>
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <input
                      type="date"
                      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    />
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-black" />
                  </div>
                  <span className="text-black">to</span>
                  <div className="relative">
                    <input
                      type="date"
                      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    />
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-black" />
                  </div>
                </div>
              </div>
              
              {/* Clear Filters */}
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('All');
                  setDateRange({ start: '', end: '' });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                <span>Clear Filters</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Coffee Lots Table */}
        <div className="bg-white rounded-lg border shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-black text-sm">
                  <th className="px-6 py-3 font-medium">Lot ID</th>
                  <th className="px-6 py-3 font-medium">Coffee Variety</th>
                  <th className="px-6 py-3 font-medium">Weight (kg)</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Processor</th>
                  <th className="px-6 py-3 font-medium">Submitted Date</th>
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
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(lot.status)}`}>
                          {lot.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-black">{lot.processor || '—'}</td>
                      <td className="px-6 py-4 text-black">{lot.submittedDate}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleViewLot(lot)}
                            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          {lot.status === 'Pending' && (
                            <>
                              <button 
                                className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
                                title="Edit Lot"
                              >
                                <Edit className="h-5 w-5" />
                              </button>
                              <button 
                                className="p-1 text-red-600 hover:text-red-800 transition-colors"
                                title="Delete Lot"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-black">
                      No coffee lots found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Lot Details Modal */}
        {showLotDetails && selectedLot && (
          <div className="fixed inset-0 backdrop-blur bg-white/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b p-6">
                <h2 className="text-xl font-bold text-black">Lot Details: {selectedLot.id}</h2>
                <button 
                  onClick={() => setShowLotDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column - Lot Metadata */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-black">Batch Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-black">Coffee Variety:</span>
                        <span className="font-medium text-black">{selectedLot.variety}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Weight:</span>
                        <span className="font-medium text-black">{selectedLot.weight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(selectedLot.status)}`}>
                          {selectedLot.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Region:</span>
                        <span className="font-medium text-black">{selectedLot.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Altitude:</span>
                        <span className="font-medium text-black">{selectedLot.altitude}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Harvest Date:</span>
                        <span className="font-medium text-black">{selectedLot.harvestDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Processing Method:</span>
                        <span className="font-medium text-black">{selectedLot.processingMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Submitted Date:</span>
                        <span className="font-medium text-black">{selectedLot.submittedDate}</span>
                      </div>
                      {selectedLot.processor && (
                        <div className="flex justify-between">
                          <span className="text-black">Processor:</span>
                          <span className="font-medium text-black">{selectedLot.processor}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Attached Images */}
                    <h3 className="text-lg font-semibold mt-6 mb-4 text-black">Attached Images</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedLot.images.map((image, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden h-40 relative">
                          <Image 
                            src={image} 
                            alt={`Coffee lot ${selectedLot.id} image ${index + 1}`} 
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right Column - Traceability Timeline and QR Code */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-black">Traceability Timeline</h3>
                      <button 
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          try {
                            // Create a new QR code directly as a data URL
                            const qrCodeData = JSON.stringify({
                              id: selectedLot.id,
                              variety: selectedLot.variety,
                              region: selectedLot.region,
                              processingMethod: selectedLot.processingMethod,
                              status: selectedLot.status,
                              timeline: selectedLot.timeline
                            });
                            
                            // Create a temporary canvas element
                            const canvas = document.createElement('canvas');
                            const size = 200; // Slightly larger than the displayed QR code
                            canvas.width = size;
                            canvas.height = size;
                            const ctx = canvas.getContext('2d');
                            
                            // Fill with white background
                            ctx.fillStyle = '#ffffff';
                            ctx.fillRect(0, 0, size, size);
                            
                            // Get the SVG element
                            const svgElement = document.querySelector('.qr-code-container svg');
                            if (!svgElement) {
                              throw new Error('QR code SVG not found');
                            }
                            
                            // Create a new image element
                            const img = new Image();
                            
                            // Convert SVG to a data URL
                            const svgData = new XMLSerializer().serializeToString(svgElement);
                            const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
                            const reader = new FileReader();
                            
                            reader.onload = function(e) {
                              img.onload = function() {
                                // Draw the image onto the canvas with padding
                                const padding = 10;
                                ctx.drawImage(img, padding, padding, size - (padding * 2), size - (padding * 2));
                                
                                // Convert canvas to data URL
                                try {
                                  const dataUrl = canvas.toDataURL('image/png');
                                  
                                  // Create download link
                                  const a = document.createElement('a');
                                  a.href = dataUrl;
                                  a.download = `${selectedLot.id}-QR-Code.png`;
                                  
                                  // Trigger download
                                  document.body.appendChild(a);
                                  a.click();
                                  
                                  // Clean up
                                  setTimeout(() => {
                                    document.body.removeChild(a);
                                  }, 100);
                                } catch (err) {
                                  console.error('Error creating data URL:', err);
                                  alert('Failed to download QR code. Please try again.');
                                }
                              };
                              
                              img.onerror = function() {
                                console.error('Error loading SVG image');
                                alert('Failed to download QR code. Please try again.');
                              };
                              
                              img.src = e.target.result;
                            };
                            
                            reader.onerror = function() {
                              console.error('Error reading SVG blob');
                              alert('Failed to download QR code. Please try again.');
                            };
                            
                            reader.readAsDataURL(svgBlob);
                          } catch (error) {
                            console.error('Error downloading QR code:', error);
                            alert('Failed to download QR code. Please try again.');
                          }
                        }}
                      >
                        <Download className="h-4 w-4" />
                        <span>Download QR</span>
                      </button>
                    </div>
                    
                    {/* QR Code */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg flex flex-col items-center">
                      <h4 className="text-md font-medium mb-3 text-black">Lot Traceability QR Code</h4>
                      <div className="bg-white p-3 rounded-lg shadow-sm qr-code-container">
                        <QRCodeSVG 
                          value={JSON.stringify({
                            id: selectedLot.id,
                            variety: selectedLot.variety,
                            region: selectedLot.region,
                            processingMethod: selectedLot.processingMethod,
                            status: selectedLot.status,
                            timeline: selectedLot.timeline
                          })} 
                          size={180}
                          bgColor={"#ffffff"}
                          fgColor={"#000000"}
                          level={"H"}
                          includeMargin={true}
                        />
                      </div>
                      <p className="text-sm text-black mt-3 text-center">Scan this QR code to verify the authenticity and trace the journey of this coffee lot.</p>
                    </div>
                    
                    <div className="relative pl-8 border-l-2 border-gray-200 space-y-6">
                      {selectedLot.timeline.map((event, index) => (
                        <div key={index} className="relative">
                          <div className={`absolute -left-[41px] w-8 h-8 rounded-full flex items-center justify-center ${getStatusBadgeClass(event.status)}`}>
                            {index + 1}
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-sm text-black">{event.date}</div>
                            <div className="font-medium text-black">{event.event}</div>
                            <div className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeClass(event.status)}`}>
                              {event.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t p-6 flex justify-end">
                <button 
                  onClick={() => setShowLotDetails(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}