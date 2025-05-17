'use client';
import { useState } from 'react';
import Sidebar from "../Sidebar";
import { Package, Eye, Filter, Search, Calendar, ChevronDown, X, DollarSign, MapPin, Coffee, Clock } from "lucide-react";
import dynamic from "next/dynamic";

// Sample data for demonstration
const sampleLots = [
  {
    id: 'LOT-ETH-00023',
    farmer: 'Tesfaye Abebe',
    region: 'Yirgacheffe',
    variety: 'Heirloom',
    weight: 65,
    altitude: 1900,
    harvestDate: '2025-05-06',
    status: 'Available',
    submittedOn: '2025-05-17',
    moisture: 10.5,
    grade: 'Grade 1',
    certifications: ['Organic'],
    description: 'High-quality coffee beans from the Sidama region, grown at high altitude with traditional methods.',
    images: ['/coffee-bean-concept-illustration.png'],
    gpsLocation: '6.7724° N, 38.4674° E'
  },
  {
    id: 'LOT-ETH-00024',
    farmer: 'Tigist Haile',
    region: 'Yirgacheffe',
    variety: 'Typica',
    weight: 45,
    altitude: 1850,
    harvestDate: '2025-04-15',
    status: 'Available',
    submittedOn: '2025-04-22',
    moisture: 11.2,
    grade: 'Grade 2',
    certifications: ['Fair Trade'],
    description: 'Medium-bodied coffee with floral notes, characteristic of the Yirgacheffe region.',
    images: ['/coffee-bean-concept-illustration.png'],
    gpsLocation: '6.1294° N, 38.2270° E'
  },
  {
    id: 'LOT-ETH-00025',
    farmer: 'Dawit Mengistu',
    region: 'Guji',
    variety: 'Bourbon',
    weight: 75,
    altitude: 2100,
    harvestDate: '2025-04-10',
    status: 'Available',
    submittedOn: '2025-04-18',
    moisture: 10.8,
    grade: 'Grade 1',
    certifications: ['Organic', 'Rainforest Alliance'],
    description: 'Exceptional coffee from the Guji zone with bright acidity and fruity notes.',
    images: ['/coffee-bean-concept-illustration.png'],
    gpsLocation: '5.8234° N, 38.3125° E'
  },
  {
    id: 'LOT-ETH-00026',
    farmer: 'Meron Tadesse',
    region: 'Sidama',
    variety: 'Heirloom',
    weight: 50,
    altitude: 1950,
    harvestDate: '2025-04-05',
    status: 'Available',
    submittedOn: '2025-04-12',
    moisture: 10.3,
    grade: 'Grade 1',
    certifications: ['Organic'],
    description: 'Premium Sidama coffee with complex flavor profile and sweet finish.',
    images: ['/coffee-bean-concept-illustration.png'],
    gpsLocation: '6.7100° N, 38.3700° E'
  },
  {
    id: 'LOT-ETH-00027',
    farmer: 'Solomon Bekele',
    region: 'Harrar',
    variety: 'Typica',
    weight: 40,
    altitude: 1750,
    harvestDate: '2025-03-28',
    status: 'Available',
    submittedOn: '2025-04-05',
    moisture: 11.5,
    grade: 'Grade 2',
    certifications: [],
    description: 'Traditional Harrar coffee with wine-like and fruity characteristics.',
    images: ['/coffee-bean-concept-illustration.png'],
    gpsLocation: '9.3100° N, 42.1200° E'
  },
  {
    id: 'LOT-ETH-00028',
    farmer: 'Hanna Girma',
    region: 'Yirgacheffe',
    variety: 'Gesha',
    weight: 35,
    altitude: 2000,
    harvestDate: '2025-03-25',
    status: 'Available',
    submittedOn: '2025-04-02',
    moisture: 10.1,
    grade: 'Grade 1',
    certifications: ['Organic', 'Fair Trade'],
    description: 'Rare Gesha variety from Yirgacheffe with exceptional floral and tea-like qualities.',
    images: ['/coffee-bean-concept-illustration.png'],
    gpsLocation: '6.1500° N, 38.2000° E'
  },
];

// Available regions, varieties, and processing methods for filters
const regions = ['All Regions', 'Sidama', 'Yirgacheffe', 'Guji', 'Harrar', 'Limu'];
const varieties = ['All Varieties', 'Heirloom', 'Typica', 'Bourbon', 'Gesha'];
const processingMethods = ['All Methods', 'Washed', 'Natural', 'Honey'];

export default function IncomingLotsPage() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedVariety, setSelectedVariety] = useState('All Varieties');
  const [selectedMethod, setSelectedMethod] = useState('All Methods');
  const [weightRange, setWeightRange] = useState([0, 100]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  
  // State for modals
  const [selectedLot, setSelectedLot] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  
  // State for offer form
  const [offerData, setOfferData] = useState({
    pricePerKg: '',
    deliveryDate: '',
    message: '',
    expiryDate: ''
  });
  
  // Filter lots based on selected filters
  const filteredLots = sampleLots.filter(lot => {
    // Search query filter
    if (searchQuery && !lot.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Region filter
    if (selectedRegion !== 'All Regions' && lot.region !== selectedRegion) {
      return false;
    }
    
    // Variety filter
    if (selectedVariety !== 'All Varieties' && lot.variety !== selectedVariety) {
      return false;
    }
    
    // Weight range filter
    if (lot.weight < weightRange[0] || lot.weight > weightRange[1]) {
      return false;
    }
    
    // Date range filter
    if (dateRange.start && new Date(lot.harvestDate) < new Date(dateRange.start)) {
      return false;
    }
    if (dateRange.end && new Date(lot.harvestDate) > new Date(dateRange.end)) {
      return false;
    }
    
    return true;
  });
  
  // Handle view details
  const handleViewDetails = (lot) => {
    setSelectedLot(lot);
    setShowDetailsModal(true);
  };
  
  // Handle make offer
  const handleMakeOffer = () => {
    setShowDetailsModal(false);
    setShowOfferModal(true);
  };
  
  // Handle submit offer
  const handleSubmitOffer = (e) => {
    e.preventDefault();
    // Here you would typically send the offer to your backend/smart contract
    alert(`Offer submitted for ${selectedLot.id}!`);
    setShowOfferModal(false);
    setOfferData({
      pricePerKg: '',
      deliveryDate: '',
      message: '',
      expiryDate: ''
    });
  };
  
  // Handle close modals
  const handleCloseModals = () => {
    setShowDetailsModal(false);
    setShowOfferModal(false);
  };
  
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="Incoming Lots" />
      <main className="flex-1 flex flex-col p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-black">Incoming Coffee Lots</h1>
          <p className="text-gray-600">Browse available coffee lots from farmers and make offers</p>
        </div>
        
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-medium text-black">Filters & Search</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
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
            
            {/* Variety Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coffee Variety</label>
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
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Weight Range Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight Range (kg): {weightRange[0]} - {weightRange[1]}</label>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={weightRange[1]}
                  onChange={(e) => setWeightRange([weightRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            {/* Harvest Date Range */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harvest From</label>
                <div className="relative">
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  />
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harvest To</label>
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
              <h2 className="text-lg font-medium text-black">Available Coffee Lots</h2>
              <span className="text-sm text-gray-500">{filteredLots.length} lots found</span>
            </div>
          </div>
          
          {/* Table View (Desktop) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-black text-sm border-b">
                  <th className="px-6 py-3 font-medium">Lot ID</th>
                  <th className="px-6 py-3 font-medium">Farmer</th>
                  <th className="px-6 py-3 font-medium">Region</th>
                  <th className="px-6 py-3 font-medium">Variety</th>
                  <th className="px-6 py-3 font-medium">Weight (kg)</th>
                  <th className="px-6 py-3 font-medium">Altitude</th>
                  <th className="px-6 py-3 font-medium">Harvest Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Submitted On</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLots.length > 0 ? (
                  filteredLots.map((lot) => (
                    <tr key={lot.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-blue-600">{lot.id}</td>
                      <td className="px-6 py-4 text-black">{lot.farmer}</td>
                      <td className="px-6 py-4 text-black">{lot.region}</td>
                      <td className="px-6 py-4 text-black">{lot.variety}</td>
                      <td className="px-6 py-4 text-black">{lot.weight}</td>
                      <td className="px-6 py-4 text-black">{lot.altitude} m</td>
                      <td className="px-6 py-4 text-black">{lot.harvestDate}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          {lot.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-black">{lot.submittedOn}</td>
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
                    <td colSpan="10" className="px-6 py-8 text-center text-gray-500">
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
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      {lot.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <h3 className="font-medium text-black">{lot.farmer}</h3>
                    <div className="text-sm text-gray-600">{lot.region} • {lot.variety}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Weight:</span> {lot.weight} kg
                    </div>
                    <div>
                      <span className="text-gray-500">Altitude:</span> {lot.altitude} m
                    </div>
                    <div>
                      <span className="text-gray-500">Harvested:</span> {lot.harvestDate}
                    </div>
                    <div>
                      <span className="text-gray-500">Submitted:</span> {lot.submittedOn}
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
              Showing {filteredLots.length} of {sampleLots.length} lots
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
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-auto">
            <div className="absolute inset-0 backdrop-blur-sm transition-all duration-300" style={{zIndex:1}} />
            <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10">
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
                      <MapWithNoSSR
                        lat={parseGpsLocation(selectedLot.gpsLocation)[0]}
                        lng={parseGpsLocation(selectedLot.gpsLocation)[1]}
                        lotId={selectedLot.id}
                      />
                    </div>
                  </div>
                  {/* Right Column - Details */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-black mb-2">Lot Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Coffee className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700">Variety:</span>
                          <span className="text-sm font-medium text-gray-500">{selectedLot.variety}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700">Region:</span>
                          <span className="text-sm font-medium text-gray-500">{selectedLot.region}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700">Weight:</span>
                          <span className="text-sm font-medium text-gray-500">{selectedLot.weight} kg</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700">Altitude:</span>
                          <span className="text-sm font-medium text-gray-500">{selectedLot.altitude} m</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700">Harvested:</span>
                          <span className="text-sm font-medium text-gray-500">{selectedLot.harvestDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-gray-700">Submitted:</span>
                          <span className="text-sm font-medium text-gray-500">{selectedLot.submittedOn}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-black mb-2">Quality Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">Moisture:</span>
                          <span className="text-sm font-medium text-gray-500">{selectedLot.moisture}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">Grade:</span>
                          <span className="text-sm font-medium text-gray-500">{selectedLot.grade}</span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedLot.certifications && selectedLot.certifications.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-black mb-2">Certifications</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedLot.certifications.map((cert, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-black mb-2">Description</h3>
                      <p className="text-sm text-gray-700">{selectedLot.description}</p>
                    </div>
                    
                    <div className="mt-8">
                      <button
                        onClick={handleMakeOffer}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                      >
                        <DollarSign className="h-5 w-5" />
                        <span>Make an Offer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Make Offer Modal */}
        {showOfferModal && selectedLot && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-auto">
            <div className="absolute inset-0 backdrop-blur-sm transition-all duration-300" style={{zIndex:1}} />
            <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto z-10">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-xl font-semibold text-black">Make an Offer for {selectedLot.id}</h2>
                <button onClick={handleCloseModals} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form className="p-6 space-y-4" onSubmit={handleSubmitOffer}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Kg (USD)</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter price per kg"
                      value={offerData.pricePerKg}
                      onChange={e => setOfferData({...offerData, pricePerKg: e.target.value})}
                      required
                    />
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={offerData.deliveryDate}
                      onChange={e => setOfferData({...offerData, deliveryDate: e.target.value})}
                      required
                    />
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Offer Expiry Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={offerData.expiryDate}
                      onChange={e => setOfferData({...offerData, expiryDate: e.target.value})}
                      required
                    />
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                  <textarea
                    className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add a message to the farmer (optional)"
                    value={offerData.message}
                    onChange={e => setOfferData({...offerData, message: e.target.value})}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    onClick={handleCloseModals}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Submit Offer
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

// Helper to parse GPS string to [lat, lng]
function parseGpsLocation(gpsString) {
  if (!gpsString) return [0, 0];
  const match = gpsString.match(/([\d.]+)°\s*([NS]),\s*([\d.]+)°\s*([EW])/);
  if (!match) return [0, 0];
  let lat = parseFloat(match[1]);
  let lng = parseFloat(match[3]);
  if (match[2] === 'S') lat = -lat;
  if (match[4] === 'W') lng = -lng;
  return [lat, lng];
}

const MapWithNoSSR = dynamic(() => import("./MapComponent"), { ssr: false });