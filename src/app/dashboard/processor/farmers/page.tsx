'use client';
import { useState } from 'react';
import Sidebar from "../Sidebar";
import { Users, Eye, Filter, Search, Calendar, ChevronDown, X, MessageCircle, Star, Phone, MapPin, Coffee, Clock, CheckCircle, QrCode, Send, Heart, FileText, Plus, ExternalLink } from "lucide-react";

// Sample data for demonstration
const sampleFarmers = [
  {
    id: 'FARM-ETH-00023',
    name: 'Abebe Bekele',
    region: 'Sidama, Ethiopia',
    phone: '+251912345678',
    totalLots: 5,
    avgLotWeight: 45,
    lastLotDate: '2025-04-28',
    certifications: ['Organic'],
    walletAddress: '0x1a2b3c4d5e6f7g8h9i0j',
    farmSize: '2.5 hectares',
    altitude: '1900m',
    varieties: ['Heirloom', 'Bourbon'],
    profileImage: '/colombian-farmer-inspecting-coffee-beans-with-great-care_1106493-151303.jpg',
    trustScore: 92,
    notes: 'Reliable farmer with consistent quality',
    isFavorite: true
  },
  {
    id: 'FARM-ETH-00024',
    name: 'Tigist Haile',
    region: 'Yirgacheffe, Ethiopia',
    phone: '+251923456789',
    totalLots: 3,
    avgLotWeight: 38,
    lastLotDate: '2025-04-15',
    certifications: ['Fair Trade'],
    walletAddress: '0x2b3c4d5e6f7g8h9i0j1k',
    farmSize: '1.8 hectares',
    altitude: '1850m',
    varieties: ['Typica'],
    profileImage: '',
    trustScore: 88,
    notes: '',
    isFavorite: false
  },
  {
    id: 'FARM-ETH-00025',
    name: 'Dawit Mengistu',
    region: 'Guji, Ethiopia',
    phone: '+251934567890',
    totalLots: 7,
    avgLotWeight: 52,
    lastLotDate: '2025-04-10',
    certifications: ['Organic', 'Rainforest Alliance'],
    walletAddress: '0x3c4d5e6f7g8h9i0j1k2l',
    farmSize: '3.2 hectares',
    altitude: '2100m',
    varieties: ['Bourbon', 'Typica'],
    profileImage: '',
    trustScore: 95,
    notes: 'Premium quality coffee, excellent communication',
    isFavorite: true
  },
  {
    id: 'FARM-ETH-00026',
    name: 'Meron Tadesse',
    region: 'Sidama, Ethiopia',
    phone: '+251945678901',
    totalLots: 4,
    avgLotWeight: 41,
    lastLotDate: '2025-04-05',
    certifications: ['Organic'],
    walletAddress: '0x4d5e6f7g8h9i0j1k2l3m',
    farmSize: '2.1 hectares',
    altitude: '1950m',
    varieties: ['Heirloom'],
    profileImage: '',
    trustScore: 90,
    notes: '',
    isFavorite: false
  },
  {
    id: 'FARM-ETH-00027',
    name: 'Solomon Bekele',
    region: 'Harrar, Ethiopia',
    phone: '+251956789012',
    totalLots: 2,
    avgLotWeight: 35,
    lastLotDate: '2025-03-28',
    certifications: [],
    walletAddress: '0x5e6f7g8h9i0j1k2l3m4n',
    farmSize: '1.5 hectares',
    altitude: '1750m',
    varieties: ['Typica'],
    profileImage: '',
    trustScore: 82,
    notes: 'New partnership, showing promise',
    isFavorite: false
  },
  {
    id: 'FARM-ETH-00028',
    name: 'Hanna Girma',
    region: 'Yirgacheffe, Ethiopia',
    phone: '+251967890123',
    totalLots: 6,
    avgLotWeight: 48,
    lastLotDate: '2025-03-25',
    certifications: ['Organic', 'Fair Trade'],
    walletAddress: '0x6f7g8h9i0j1k2l3m4n5o',
    farmSize: '2.8 hectares',
    altitude: '2000m',
    varieties: ['Gesha', 'Heirloom'],
    profileImage: '',
    trustScore: 94,
    notes: 'Exceptional quality, specialty coffee producer',
    isFavorite: true
  },
  {
    id: 'FARM-ETH-00029',
    name: 'Lemma Kebede',
    region: 'Guji, Ethiopia',
    phone: '+251978901234',
    totalLots: 8,
    avgLotWeight: 55,
    lastLotDate: '2025-03-20',
    certifications: ['Organic'],
    walletAddress: '0x7g8h9i0j1k2l3m4n5o6p',
    farmSize: '3.5 hectares',
    altitude: '2050m',
    varieties: ['Bourbon', 'Typica', 'Heirloom'],
    profileImage: '',
    trustScore: 96,
    notes: 'Highest volume supplier, consistently excellent quality',
    isFavorite: true
  },
];

// Available regions and varieties for filters
const regions = ['All Regions', 'Sidama', 'Yirgacheffe', 'Guji', 'Harrar'];
const varieties = ['All Varieties', 'Heirloom', 'Bourbon', 'Typica', 'Gesha'];
const activityPeriods = ['All Time', 'Last 30 Days', 'Last 90 Days', 'Last Harvest Season'];

export default function LinkedFarmersPage() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedVariety, setSelectedVariety] = useState('All Varieties');
  const [selectedActivity, setSelectedActivity] = useState('All Time');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  
  // State for modals
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  
  // State for message form
  const [messageData, setMessageData] = useState({
    recipient: '',
    subject: '',
    message: ''
  });
  
  // State for note form
  const [noteData, setNoteData] = useState({
    farmerId: '',
    note: ''
  });
  
  // Filter farmers based on selected filters
  const filteredFarmers = sampleFarmers.filter(farmer => {
    // Search query filter
    if (searchQuery && !farmer.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Region filter
    if (selectedRegion !== 'All Regions' && !farmer.region.includes(selectedRegion)) {
      return false;
    }
    
    // Variety filter
    if (selectedVariety !== 'All Varieties' && !farmer.varieties.includes(selectedVariety)) {
      return false;
    }
    
    // Activity period filter (simplified for demo)
    if (selectedActivity === 'Last 30 Days') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(farmer.lastLotDate) >= thirtyDaysAgo;
    }
    
    return true;
  });
  
  // Handle view profile
  const handleViewProfile = (farmer) => {
    setSelectedFarmer(farmer);
    setShowProfileModal(true);
  };
  
  // Handle send message
  const handleSendMessage = (farmer) => {
    setSelectedFarmer(farmer);
    setMessageData({
      recipient: farmer.name,
      subject: '',
      message: ''
    });
    setShowMessageModal(true);
  };
  
  // Handle send offer
  const handleSendOffer = (farmer) => {
    setSelectedFarmer(farmer);
    setShowOfferModal(true);
  };
  
  // Handle add note
  const handleAddNote = (farmer) => {
    setSelectedFarmer(farmer);
    setNoteData({
      farmerId: farmer.id,
      note: farmer.notes || ''
    });
    setShowAddNoteModal(true);
  };
  
  // Handle toggle favorite
  const handleToggleFavorite = (farmerId) => {
    // In a real app, you would update this in your database
    console.log(`Toggled favorite status for farmer ${farmerId}`);
  };
  
  // Handle submit message
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    alert(`Message sent to ${selectedFarmer.name}`);
    setShowMessageModal(false);
    setMessageData({
      recipient: '',
      subject: '',
      message: ''
    });
  };
  
  // Handle submit note
  const handleSubmitNote = (e) => {
    e.preventDefault();
    // Here you would typically update the note in your database
    alert(`Note updated for ${selectedFarmer.name}`);
    setShowAddNoteModal(false);
    setNoteData({
      farmerId: '',
      note: ''
    });
  };
  
  // Handle close modals
  const handleCloseModals = () => {
    setShowProfileModal(false);
    setShowMessageModal(false);
    setShowOfferModal(false);
    setShowAddNoteModal(false);
  };
  
  // Get certification badges
  const getCertificationBadge = (certification) => {
    switch(certification) {
      case 'Organic': return 'bg-green-100 text-green-700';
      case 'Fair Trade': return 'bg-blue-100 text-blue-700';
      case 'Rainforest Alliance': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  // Calculate statistics
  const totalLinkedFarmers = sampleFarmers.length;
  const topSupplyingRegion = 'Guji';
  const highestVolumeFarmer = 'Lemma Kebede';
  const averageQualityScore = 91.0;
  
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="Linked Farmers" />
      <main className="flex-1 flex flex-col p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-black">Linked Farmers</h1>
          <p className="text-gray-600">Manage relationships with farmers who supply your coffee</p>
        </div>
        
        {/* Statistics Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Total Linked Farmers</h3>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-black">{totalLinkedFarmers}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Top Supplying Region</h3>
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-black">{topSupplyingRegion}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Highest Volume Farmer</h3>
              <Star className="h-5 w-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-black">{highestVolumeFarmer}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Avg. Quality Score</h3>
              <CheckCircle className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-black">{averageQualityScore}</p>
          </div>
        </div>
        
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-medium text-black">Filters & Search</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('table')} 
                className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              >
                <FileText className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setViewMode('card')} 
                className={`p-2 rounded ${viewMode === 'card' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              >
                <Users className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search by Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search by Name</label>
              <div className="relative">
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter farmer name"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Variety Supplied</label>
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
            
            {/* Recent Activity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recent Activity</label>
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedActivity}
                  onChange={(e) => setSelectedActivity(e.target.value)}
                >
                  {activityPeriods.map((period) => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Farmers Table/Card View */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-black text-sm border-b">
                    <th className="px-4 py-3 font-medium">Farmer Name</th>
                    <th className="px-4 py-3 font-medium">Region</th>
                    <th className="px-4 py-3 font-medium">Phone</th>
                    <th className="px-4 py-3 font-medium">Total Lots</th>
                    <th className="px-4 py-3 font-medium">Avg. Lot Weight</th>
                    <th className="px-4 py-3 font-medium">Last Lot Date</th>
                    <th className="px-4 py-3 font-medium">Certifications</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredFarmers.map((farmer) => (
                    <tr key={farmer.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {farmer.isFavorite && <Star className="h-4 w-4 text-yellow-500" fill="#eab308" />}
                          <span className="font-medium text-blue-600">{farmer.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-black">{farmer.region}</td>
                      <td className="px-4 py-3 text-black">{farmer.phone}</td>
                      <td className="px-4 py-3 text-black">{farmer.totalLots}</td>
                      <td className="px-4 py-3 text-black">{farmer.avgLotWeight} kg</td>
                      <td className="px-4 py-3 text-black">{farmer.lastLotDate}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {farmer.certifications.map((cert, index) => (
                            <span key={index} className={`px-2 py-1 rounded-full text-xs font-semibold ${getCertificationBadge(cert)}`}>
                              {cert}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleViewProfile(farmer)} 
                            className="p-1 text-blue-600 hover:text-blue-800 transition-colors" 
                            title="View Profile"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleSendMessage(farmer)} 
                            className="p-1 text-green-600 hover:text-green-800 transition-colors" 
                            title="Send Message"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleToggleFavorite(farmer.id)} 
                            className={`p-1 ${farmer.isFavorite ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-600 transition-colors`} 
                            title={farmer.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                          >
                            <Star className="h-4 w-4" fill={farmer.isFavorite ? '#eab308' : 'none'} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredFarmers.map((farmer) => (
              <div key={farmer.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                        {farmer.profileImage ? (
                          <img src={farmer.profileImage} alt={farmer.name} className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                          farmer.name.charAt(0) + (farmer.name.split(' ')[1] ? farmer.name.split(' ')[1].charAt(0) : '')
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-blue-600 flex items-center gap-2">
                          {farmer.name}
                          {farmer.isFavorite && <Star className="h-4 w-4 text-yellow-500" fill="#eab308" />}
                        </h3>
                        <p className="text-gray-600 text-sm">{farmer.region}</p>
                      </div>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                        Trust Score: {farmer.trustScore}/100
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Phone</p>
                      <p className="text-black font-medium">{farmer.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Total Lots</p>
                      <p className="text-black font-medium">{farmer.totalLots}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Avg. Lot Weight</p>
                      <p className="text-black font-medium">{farmer.avgLotWeight} kg</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Last Lot Date</p>
                      <p className="text-black font-medium">{farmer.lastLotDate}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-500 text-xs mb-1">Certifications</p>
                    <div className="flex flex-wrap gap-1">
                      {farmer.certifications.length > 0 ? farmer.certifications.map((cert, index) => (
                        <span key={index} className={`px-2 py-1 rounded-full text-xs font-semibold ${getCertificationBadge(cert)}`}>
                          {cert}
                        </span>
                      )) : (
                        <span className="text-gray-400 text-sm">None</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => handleViewProfile(farmer)} 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Profile</span>
                    </button>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleSendMessage(farmer)} 
                        className="p-1 text-green-600 hover:text-green-800 transition-colors" 
                        title="Send Message"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleSendOffer(farmer)} 
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors" 
                        title="Send Offer"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleToggleFavorite(farmer.id)} 
                        className={`p-1 ${farmer.isFavorite ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-600 transition-colors`} 
                        title={farmer.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                      >
                        <Star className="h-4 w-4" fill={farmer.isFavorite ? '#eab308' : 'none'} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Farmer Profile Modal */}
        {showProfileModal && selectedFarmer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-black">Farmer Profile</h2>
                  <button onClick={handleCloseModals} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 mb-6">
                  <div className="md:w-1/3">
                    <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center mb-4">
                      <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-4xl mb-4">
                        {selectedFarmer.profileImage ? (
                          <img src={selectedFarmer.profileImage} alt={selectedFarmer.name} className="w-32 h-32 rounded-full object-cover" />
                        ) : (
                          selectedFarmer.name.charAt(0) + (selectedFarmer.name.split(' ')[1] ? selectedFarmer.name.split(' ')[1].charAt(0) : '')
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-black mb-1">{selectedFarmer.name}</h3>
                      <p className="text-gray-600 mb-2">{selectedFarmer.region}</p>
                      <div className="flex gap-2 mb-4">
                        {selectedFarmer.certifications.map((cert, index) => (
                          <span key={index} className={`px-2 py-1 rounded-full text-xs font-semibold ${getCertificationBadge(cert)}`}>
                            {cert}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 w-full">
                        <button 
                          onClick={() => handleSendMessage(selectedFarmer)} 
                          className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Message</span>
                        </button>
                        <button 
                          onClick={() => handleSendOffer(selectedFarmer)} 
                          className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition-colors"
                        >
                          <Send className="h-4 w-4" />
                          <span>Offer</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-xl p-4 mb-4">
                      <h4 className="font-medium text-black mb-2">Contact Information</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-black">{selectedFarmer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-gray-500" />
                        <span className="text-black text-sm break-all">{selectedFarmer.walletAddress}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-black">Notes</h4>
                        <button 
                          onClick={() => handleAddNote(selectedFarmer)} 
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Edit Notes"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-gray-700 text-sm">
                        {selectedFarmer.notes || 'No notes added yet.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="bg-gray-100 rounded-xl p-4 mb-4">
                      <h4 className="font-medium text-black mb-3">Farm Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Farm Size</p>
                          <p className="text-black font-medium">{selectedFarmer.farmSize}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Altitude</p>
                          <p className="text-black font-medium">{selectedFarmer.altitude}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Coffee Varieties</p>
                          <p className="text-black font-medium">{selectedFarmer.varieties.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Trust Score</p>
                          <p className="text-black font-medium">{selectedFarmer.trustScore}/100</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-xl p-4 mb-4">
                      <h4 className="font-medium text-black mb-3">Lot History</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-black text-sm border-b border-gray-300">
                              <th className="px-2 py-2 font-medium">Lot ID</th>
                              <th className="px-2 py-2 font-medium">Date</th>
                              <th className="px-2 py-2 font-medium">Weight</th>
                              <th className="px-2 py-2 font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {/* Sample lot history data */}
                            <tr>
                              <td className="px-2 py-2 text-blue-600 font-medium">LOT-ETH-00023</td>
                              <td className="px-2 py-2 text-black">2025-04-28</td>
                              <td className="px-2 py-2 text-black">45 kg</td>
                              <td className="px-2 py-2">
                                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">Processing</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 text-blue-600 font-medium">LOT-ETH-00019</td>
                              <td className="px-2 py-2 text-black">2025-03-15</td>
                              <td className="px-2 py-2 text-black">38 kg</td>
                              <td className="px-2 py-2">
                                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Exported</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 text-blue-600 font-medium">LOT-ETH-00014</td>
                              <td className="px-2 py-2 text-black">2025-02-10</td>
                              <td className="px-2 py-2 text-black">42 kg</td>
                              <td className="px-2 py-2">
                                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Exported</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center">
                      <h4 className="font-medium text-black mb-3 self-start">Traceability</h4>
                      <div className="bg-white p-4 rounded-lg mb-3">
                        <QrCode className="h-32 w-32 mx-auto" />
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        <span>View on Blockchain Explorer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Message Modal */}
        {showMessageModal && selectedFarmer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-black">Send Message</h2>
                  <button onClick={handleCloseModals} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmitMessage}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input
                      type="text"
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                      value={messageData.recipient}
                      readOnly
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter subject"
                      value={messageData.subject}
                      onChange={(e) => setMessageData({...messageData, subject: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                      placeholder="Type your message here..."
                      value={messageData.message}
                      onChange={(e) => setMessageData({...messageData, message: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleCloseModals}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
        {/* Offer Modal */}
        {showOfferModal && selectedFarmer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-black">Send Offer</h2>
                  <button onClick={handleCloseModals} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Farmer</label>
                    <input
                      type="text"
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                      value={selectedFarmer.name}
                      readOnly
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coffee Variety</label>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      {selectedFarmer.varieties.map((variety, index) => (
                        <option key={index} value={variety}>{variety}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (kg)</label>
                      <input
                        type="number"
                        className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter quantity"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price per kg (USD)</label>
                      <input
                        type="number"
                        className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter price"
                        min="0.01"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                    <textarea
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                      placeholder="Specify any additional requirements..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleCloseModals}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        alert(`Offer sent to ${selectedFarmer.name}`);
                        handleCloseModals();
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Send Offer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
        {/* Add Note Modal */}
        {showAddNoteModal && selectedFarmer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-black">Farmer Notes</h2>
                  <button onClick={handleCloseModals} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmitNote}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes for {selectedFarmer.name}</label>
                    <textarea
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
                      placeholder="Add your private notes about this farmer..."
                      value={noteData.note}
                      onChange={(e) => setNoteData({...noteData, note: e.target.value})}
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">These notes are private and only visible to you.</p>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleCloseModals}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Notes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}