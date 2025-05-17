'use client';
import { useState, useRef, useEffect } from 'react';
import Sidebar from "../Sidebar";
import Image from 'next/image';
import { User, Wallet, Bell, Globe, Lock, HelpCircle, Check, Copy, RefreshCw, LogOut, ChevronDown, Eye, EyeOff, Camera, FileText, Settings as SettingsIcon, Shield, Sliders } from "lucide-react";
import { useWallet } from "../../../../lib/wallet-context";

export default function ProcessorSettingsPage() {
  // Profile state
  const [profileData, setProfileData] = useState({
    companyName: 'Ethiopian Coffee Processors Ltd',
    contactPerson: 'Tesfaye A'
    phoneNumber: '+251912345678',
    email: 'info@ethcoffeeprocessors.com',
    region: 'Sidama',
    facilityCapacity: '500',
    logo: '/coffee-bean-concept-illustration.png'
  });

  // Use the wallet context to get the actual connected wallet
  const { address, isConnected, walletType, isVerified, connect, disconnect } = useWallet();
  
  // Wallet data derived from context
  const walletData = {
    address: address || '8xft7UNd4oJPeTUreEfgL9QKWBKZ7Xh3FcFvTgQJKvyY', // Fallback to mock address if not connected
    type: walletType || 'Phantom',
    isConnected: isConnected,
    isVerified: isVerified
  };

  // Preferences state
  const [preferences, setPreferences] = useState({
    language: 'English',
    currency: 'USD',
    unitSystem: 'Metric (kg)',
    timezone: 'UTC+3',
    dateFormat: '24hr',
    theme: 'Light'
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsNotifications: true,
    processingUpdatesOnly: false,
    platformAnnouncements: true
  });

  // Security state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);

  // Session data state
  const [sessionData, setSessionData] = useState([]);
  
  // Fetch session data on component mount
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch('/api/user/sessions');
        if (response.ok) {
          const data = await response.json();
          setSessionData(data);
        }
      } catch (error) {
        console.error('Failed to fetch session data:', error);
        // Don't set any fallback mock data
      }
    };
    
    fetchSessionData();
  }, []);

  // Signature history state
  const [signatureHistory, setSignatureHistory] = useState([]);
  
  // Fetch signature history on component mount
  useEffect(() => {
    const fetchSignatureHistory = async () => {
      try {
        const response = await fetch('/api/user/signatures');
        if (response.ok) {
          const data = await response.json();
          setSignatureHistory(data);
        }
      } catch (error) {
        console.error('Failed to fetch signature history:', error);
        // Don't set any fallback mock data
      }
    };
    
    fetchSignatureHistory();
  }, []);

  // Ethiopian regions
  const ethiopianRegions = [
    'Sidama', 'Yirgacheffe', 'Guji', 'Harar', 'Limu', 'Jimma', 'Kaffa', 'Bench Maji', 'Oromia'
  ];

  // Languages
  const languages = ['English', 'Amharic', 'French', 'Arabic'];

  // Currencies
  const currencies = ['USD', 'ETB', 'EUR', 'GBP'];

  // Unit systems
  const unitSystems = ['Metric (kg)', 'Imperial (lbs)'];

  // Timezones
  const timezones = ['UTC+0', 'UTC+1', 'UTC+2', 'UTC+3', 'UTC+4'];

  // Date formats
  const dateFormats = ['12hr', '24hr'];

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  // Handle preferences changes
  const handlePreferencesChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value
    });
  };

  // Handle notifications changes
  const handleNotificationsChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({
      ...notifications,
      [name]: checked
    });
  };

  // Handle security form changes
  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurityData({
      ...securityData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Toggle theme
  const toggleTheme = () => {
    setPreferences({
      ...preferences,
      theme: preferences.theme === 'Light' ? 'Dark' : 'Light'
    });
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setProfileData({
        ...profileData,
        logo: imageUrl
      });
    }
  };

  // Copy wallet address to clipboard
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletData.address);
    alert('Wallet address copied to clipboard!');
  };

  // Validate profile form
  const validateProfileForm = () => {
    const errors = {};
    if (!profileData.companyName.trim()) errors.companyName = 'Company name is required';
    if (!profileData.contactPerson.trim()) errors.contactPerson = 'Contact person is required';
    if (!profileData.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
    if (!profileData.email.trim()) errors.email = 'Email is required';
    if (!profileData.email.includes('@')) errors.email = 'Invalid email format';
    if (!profileData.region) errors.region = 'Region is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate password change
  const validatePasswordChange = () => {
    const errors = {};
    if (!securityData.currentPassword) errors.currentPassword = 'Current password is required';
    if (!securityData.newPassword) errors.newPassword = 'New password is required';
    if (securityData.newPassword.length < 8) errors.newPassword = 'Password must be at least 8 characters';
    if (securityData.newPassword !== securityData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save profile changes
  const saveProfileChanges = (e) => {
    e.preventDefault();
    if (validateProfileForm()) {
      // In a real app, you would send this data to a server
      setIsEditing(false);
      alert('Profile updated successfully!');
    }
  };

  // Change password
  const changePassword = (e) => {
    e.preventDefault();
    if (validatePasswordChange()) {
      // In a real app, you would send this data to a server
      setSecurityData({
        ...securityData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Password changed successfully!');
    }
  };

  // Logout from all devices
  const logoutAllDevices = () => {
    // In a real app, you would invalidate all sessions
    alert('Logged out from all devices!');
  };

  // Reconnect wallet using the wallet context
  const reconnectWallet = () => {
    connect();
  };

  // Disconnect wallet using the wallet context
  const disconnectWallet = () => {
    disconnect();
  };

  // Enable 2FA
  const enable2FA = () => {
    // In a real app, you would start the 2FA setup process
    setSecurityData({
      ...securityData,
      twoFactorEnabled: true
    });
    alert('2FA enabled successfully!');
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="Settings" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-black">Processor Settings</h1>
          <p className="text-black">Manage your processor profile, wallet, preferences, and security settings</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Settings Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow border p-4">
            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveSection('profile')}
                className={`flex items-center gap-3 p-3 rounded-lg text-left text-black ${activeSection === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <User size={20} />
                <span>Profile Information</span>
              </button>
              <button 
                onClick={() => setActiveSection('wallet')}
                className={`flex items-center gap-3 p-3 rounded-lg text-left text-black ${activeSection === 'wallet' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <Wallet size={20} />
                <span>Wallet & Blockchain</span>
              </button>
              <button 
                onClick={() => setActiveSection('preferences')}
                className={`flex items-center gap-3 p-3 rounded-lg text-left text-black ${activeSection === 'preferences' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <Sliders size={20} />
                <span>Preferences</span>
              </button>
              <button 
                onClick={() => setActiveSection('notifications')}
                className={`flex items-center gap-3 p-3 rounded-lg text-left text-black ${activeSection === 'notifications' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <Bell size={20} />
                <span>Notifications</span>
              </button>
              <button 
                onClick={() => setActiveSection('security')}
                className={`flex items-center gap-3 p-3 rounded-lg text-left text-black ${activeSection === 'security' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <Shield size={20} />
                <span>Security & Access</span>
              </button>
              <button 
                onClick={() => setActiveSection('support')}
                className={`flex items-center gap-3 p-3 rounded-lg text-left text-black ${activeSection === 'support' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <HelpCircle size={20} />
                <span>Support & Help</span>
              </button>
            </nav>
          </div>
          
          {/* Settings Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow border p-6">
              {/* Profile Information Section */}
              {activeSection === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-black">Profile Information</h2>
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                  
                  <form onSubmit={saveProfileChanges}>
                    <div className="mb-6 flex flex-col items-center">
                      <div className="relative mb-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                          {profileData.logo ? (
                            <Image 
                              src={profileData.logo} 
                              alt="Company Logo" 
                              width={128} 
                              height={128} 
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <User size={48} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        {isEditing && (
                          <button 
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
                          >
                            <Camera size={16} />
                          </button>
                        )}
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleLogoUpload} 
                          className="hidden" 
                          accept="image/*"
                        />
                      </div>
                      <p className="text-sm text-gray-500">Upload your company logo</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input 
                          type="text" 
                          name="companyName" 
                          value={profileData.companyName} 
                          onChange={handleProfileChange} 
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border ${formErrors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                        {formErrors.companyName && <p className="mt-1 text-sm text-red-500">{formErrors.companyName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                        <input 
                          type="text" 
                          name="contactPerson" 
                          value={profileData.contactPerson} 
                          onChange={handleProfileChange} 
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border ${formErrors.contactPerson ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                        {formErrors.contactPerson && <p className="mt-1 text-sm text-red-500">{formErrors.contactPerson}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phoneNumber" 
                          value={profileData.phoneNumber} 
                          onChange={handleProfileChange} 
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                        {formErrors.phoneNumber && <p className="mt-1 text-sm text-red-500">{formErrors.phoneNumber}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={profileData.email} 
                          onChange={handleProfileChange} 
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                        {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Region / Location</label>
                        <select 
                          name="region" 
                          value={profileData.region} 
                          onChange={handleProfileChange} 
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border ${formErrors.region ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                        >
                          <option value="">Select Region</option>
                          {ethiopianRegions.map(region => (
                            <option key={region} value={region}>{region}</option>
                          ))}
                        </select>
                        {formErrors.region && <p className="mt-1 text-sm text-red-500">{formErrors.region}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Facility Capacity (kg/day)</label>
                        <input 
                          type="number" 
                          name="facilityCapacity" 
                          value={profileData.facilityCapacity} 
                          onChange={handleProfileChange} 
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                        <p className="mt-1 text-sm text-gray-500">Optional</p>
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="mt-6 flex justify-end">
                        <button 
                          type="submit" 
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}
              
              {/* Wallet & Blockchain Section */}
              {activeSection === 'wallet' && (
                <div>
                  <h2 className="text-xl font-semibold text-black mb-6">Wallet & Blockchain Settings</h2>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
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
                    <div className="text-sm text-gray-500 mb-4">
                      Wallet Type: {walletData.type}
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={reconnectWallet}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                      >
                        <RefreshCw size={16} />
                        Reconnect Wallet
                      </button>
                      <button 
                        onClick={disconnectWallet}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Disconnect Wallet
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-black mb-3">Sign-in Signature History</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {signatureHistory.map((entry, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {entry.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.message}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-yellow-800 mb-2 flex items-center gap-2">
                      <SettingsIcon size={20} />
                      Verify My Wallet
                    </h3>
                    <p className="text-sm text-yellow-700 mb-3">
                      Complete a one-time verification to enable smart contract interactions with your wallet.
                    </p>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                      Verify Wallet
                    </button>
                  </div>
                </div>
              )}
              
              {/* Preferences Section */}
              {activeSection === 'preferences' && (
                <div>
                  <h2 className="text-xl font-semibold text-black mb-6">Preferences</h2>
                  
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                        <select 
                          name="language" 
                          value={preferences.language} 
                          onChange={handlePreferencesChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {languages.map(language => (
                            <option key={language} value={language}>{language}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency Display</label>
                        <select 
                          name="currency" 
                          value={preferences.currency} 
                          onChange={handlePreferencesChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {currencies.map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unit System</label>
                        <select 
                          name="unitSystem" 
                          value={preferences.unitSystem} 
                          onChange={handlePreferencesChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {unitSystems.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                        <select 
                          name="timezone" 
                          value={preferences.timezone} 
                          onChange={handlePreferencesChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {timezones.map(timezone => (
                            <option key={timezone} value={timezone}>{timezone}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                        <select 
                          name="dateFormat" 
                          value={preferences.dateFormat} 
                          onChange={handlePreferencesChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {dateFormats.map(format => (
                            <option key={format} value={format}>{format}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                        <div className="flex items-center mt-2">
                          <button 
                            type="button" 
                            onClick={toggleTheme}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${preferences.theme === 'Dark' ? 'bg-blue-600' : 'bg-gray-200'}`}
                          >
                            <span 
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.theme === 'Dark' ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                          </button>
                          <span className="ml-2 text-sm text-gray-600">{preferences.theme} Mode</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button 
                        type="button" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={() => alert('Preferences saved!')}
                      >
                        Save Preferences
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold text-black mb-6">Notification Settings</h2>
                  
                  <form>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-black">Email Alerts</h3>
                          <p className="text-sm text-gray-500">Receive notifications about lot assignments & payments</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="emailAlerts" 
                            checked={notifications.emailAlerts} 
                            onChange={handleNotificationsChange} 
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-black">SMS Notifications</h3>
                          <p className="text-sm text-gray-500">Receive text messages for real-time updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="smsNotifications" 
                            checked={notifications.smsNotifications} 
                            onChange={handleNotificationsChange} 
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-black">Processing Updates Only</h3>
                          <p className="text-sm text-gray-500">Filter messages to only receive processing-related updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="processingUpdatesOnly" 
                            checked={notifications.processingUpdatesOnly} 
                            onChange={handleNotificationsChange} 
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-black">Platform Announcements</h3>
                          <p className="text-sm text-gray-500">Receive updates about system tips and new features</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="platformAnnouncements" 
                            checked={notifications.platformAnnouncements} 
                            onChange={handleNotificationsChange} 
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button 
                        type="button" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={() => alert('Notification settings saved!')}
                      >
                        Save Notification Settings
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Security & Access Section */}
              {activeSection === 'security' && (
                <div>
                  <h2 className="text-xl font-semibold text-black mb-6">Security & Access</h2>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-black mb-4">Password Management</h3>
                    <form onSubmit={changePassword} className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                          <div className="relative">
                            <input 
                              type={showPassword ? 'text' : 'password'} 
                              name="currentPassword" 
                              value={securityData.currentPassword} 
                              onChange={handleSecurityChange} 
                              className={`w-full px-4 py-2 border ${passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            />
                            <button 
                              type="button" 
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-2.5 text-gray-500"
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                          {passwordErrors.currentPassword && <p className="mt-1 text-sm text-red-500">{passwordErrors.currentPassword}</p>}
                        </div>
                        
                        <div className="md:col-span-2 border-t md:border-t-0 pt-4 md:pt-0 mt-4 md:mt-0"></div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                          <div className="relative">
                            <input 
                              type={showPassword ? 'text' : 'password'} 
                              name="newPassword" 
                              value={securityData.newPassword} 
                              onChange={handleSecurityChange} 
                              className={`w-full px-4 py-2 border ${passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            />
                            <button 
                              type="button" 
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-2.5 text-gray-500"
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                          {passwordErrors.newPassword && <p className="mt-1 text-sm text-red-500">{passwordErrors.newPassword}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                          <div className="relative">
                            <input 
                              type={showPassword ? 'text' : 'password'} 
                              name="confirmPassword" 
                              value={securityData.confirmPassword} 
                              onChange={handleSecurityChange} 
                              className={`w-full px-4 py-2 border ${passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            />
                            <button 
                              type="button" 
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-2.5 text-gray-500"
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                          {passwordErrors.confirmPassword && <p className="mt-1 text-sm text-red-500">{passwordErrors.confirmPassword}</p>}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <button 
                          type="submit" 
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-black">Two-Factor Authentication</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${securityData.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {securityData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <button 
                        onClick={enable2FA}
                        disabled={securityData.twoFactorEnabled}
                        className={`px-4 py-2 rounded-lg transition ${securityData.twoFactorEnabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                      >
                        {securityData.twoFactorEnabled ? 'Already Enabled' : 'Enable 2FA'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-black mb-4">Session Logs</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {sessionData.map((session, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.device}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.location}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.time}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {session.current ? (
                                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Current Session
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    Active
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4">
                      <button 
                        onClick={logoutAllDevices}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Logout from All Devices
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Support & Help Section */}
              {activeSection === 'support' && (
                <div>
                  <h2 className="text-xl font-semibold text-black mb-6">Support & Help</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                      <h3 className="text-lg font-medium text-blue-800 mb-3">Contact Support</h3>
                      <p className="text-sm text-blue-700 mb-4">
                        Need help with your processor account? Our support team is ready to assist you.
                      </p>
                      <a 
                        href="mailto:support@bunachain.com" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
                      >
                        Email Support
                      </a>
                    </div>
                    
                    <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                      <h3 className="text-lg font-medium text-green-800 mb-3">User Guide</h3>
                      <p className="text-sm text-green-700 mb-4">
                        Access our comprehensive guide for processors to learn how to use all platform features.
                      </p>
                      <a 
                        href="#" 
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition inline-block flex items-center gap-2"
                      >
                        <FileText size={16} />
                        View User Guide
                      </a>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-black mb-4">Legal Documents</h3>
                    <div className="space-y-4">
                      <a 
                        href="#" 
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="text-gray-500" />
                          <span>Terms of Service</span>
                        </div>
                        <ChevronDown className="text-gray-400" />
                      </a>
                      
                      <a 
                        href="#" 
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="text-gray-500" />
                          <span>Privacy Policy</span>
                        </div>
                        <ChevronDown className="text-gray-400" />
                      </a>
                      
                      <a 
                        href="#" 
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="text-gray-500" />
                          <span>Data Processing Agreement</span>
                        </div>
                        <ChevronDown className="text-gray-400" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-black mb-3">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-black mb-2">How do I update my processing capacity?</h4>
                        <p className="text-sm text-gray-600">You can update your facility capacity in the Profile Information section.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-black mb-2">How are payments processed on the platform?</h4>
                        <p className="text-sm text-gray-600">Payments are processed through secure blockchain transactions using your connected wallet.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-black mb-2">Can I change my connected wallet?</h4>
                        <p className="text-sm text-gray-600">Yes, you can disconnect your current wallet and connect a new one in the Wallet & Blockchain section.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}