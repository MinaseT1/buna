'use client';
import { useState, useRef, useEffect } from 'react';
import Sidebar from "../Sidebar";
import Image from 'next/image';
import { User, Wallet, Globe, Lock, HelpCircle, Check, Copy, RefreshCw, LogOut, ChevronDown, Eye, EyeOff, Camera, FileText } from "lucide-react";
import { useWallet } from "../../../../lib/wallet-context";

export default function SettingsPage() {
  // Profile state
  const [profileData, setProfileData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    region: '',
    language: 'English',
    profilePicture: '/colombian-farmer-inspecting-coffee-beans-with-great-care_1106493-151303.jpg'
  });
  
  // Fetch user data on component mount
  useState(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const userData = await response.json();
          setProfileData({
            fullName: userData.full_name || '',
            phoneNumber: userData.phone || '',
            email: userData.email || '',
            region: userData.region || '',
            language: 'English',
            profilePicture: '/colombian-farmer-inspecting-coffee-beans-with-great-care_1106493-151303.jpg'
          });
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
    
    fetchUserData();
  }, []);

  // Preferences state
  const [preferences, setPreferences] = useState({
    language: 'English',
    currency: 'USD',
    unitSystem: 'Kilograms',
    theme: 'Light'
  });

  // Security state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);

  // Use the wallet context to get the actual connected wallet
  const { address, isConnected, walletType, isVerified, connect, disconnect } = useWallet();
  
  // Wallet data derived from context
  const walletData = {
    address: address || '', // No fallback to mock address
    type: walletType || 'Phantom',
    isConnected: isConnected,
    isVerified: isVerified
  };

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

  // Ethiopian regions
  const ethiopianRegions = [
    'Sidama', 'Yirgacheffe', 'Guji', 'Harar', 'Limu', 'Jimma', 'Kaffa', 'Bench Maji', 'Oromia'
  ];

  // Languages
  const languages = ['English', 'Amharic', 'French', 'Arabic'];

  // Currencies
  const currencies = ['USD', 'ETB', 'EUR', 'GBP'];

  // Unit systems
  const unitSystems = ['Kilograms', 'Pounds'];

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

  // Handle security form changes
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData({
      ...securityData,
      [name]: value
    });
  };

  // Toggle theme
  const toggleTheme = () => {
    setPreferences({
      ...preferences,
      theme: preferences.theme === 'Light' ? 'Dark' : 'Light'
    });
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setProfileData({
        ...profileData,
        profilePicture: imageUrl
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
    if (!profileData.fullName.trim()) errors.fullName = 'Full name is required';
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

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="Settings" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-black">Account Settings</h1>
          <p className="text-black">Manage your profile, preferences, and security settings</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Settings Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow border p-4">
            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveSection('profile')}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors text-black ${activeSection === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </button>
              
              <button 
                onClick={() => setActiveSection('wallet')}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors text-black ${activeSection === 'wallet' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <Wallet className="h-5 w-5 text-black" />
                <span>Wallet Connection</span>
              </button>
              
              <button 
                onClick={() => setActiveSection('preferences')}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors text-black ${activeSection === 'preferences' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <Globe className="h-5 w-5" />
                <span>Preferences</span>
              </button>
              
              <button 
                onClick={() => setActiveSection('security')}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors text-black ${activeSection === 'security' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <Lock className="h-5 w-5" />
                <span>Security</span>
              </button>
              
              <button 
                onClick={() => setActiveSection('support')}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors text-black ${activeSection === 'support' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                <HelpCircle className="h-5 w-5" />
                <span>Support / Help</span>
              </button>
            </nav>
          </div>
          
          {/* Settings Content */}
          <div className="flex-1 bg-white rounded-lg shadow border p-6">
            {/* Profile Information Section */}
            {activeSection === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-3">
                      <Image 
                        src={profileData.profilePicture || '/user-placeholder.jpg'} 
                        alt="Profile Picture"
                        fill
                        className="object-cover rounded-full"
                      />
                      {isEditing && (
                        <button 
                          onClick={() => fileInputRef.current.click()}
                          className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                        >
                          <Camera className="h-5 w-5" />
                        </button>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleProfilePictureUpload} 
                        className="hidden" 
                        accept="image/*"
                      />
                    </div>
                    <p className="text-sm text-gray-500">Profile Picture</p>
                  </div>
                  
                  {/* Profile Form */}
                  <form className="flex-1" onSubmit={saveProfileChanges}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={profileData.fullName}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.fullName ? 'border-red-500' : ''} ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                        {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={profileData.phoneNumber}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.phoneNumber ? 'border-red-500' : ''} ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                        {formErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.email ? 'border-red-500' : ''} ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Region / Location</label>
                        <select
                          name="region"
                          value={profileData.region}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.region ? 'border-red-500' : ''} ${!isEditing ? 'bg-gray-50' : ''}`}
                        >
                          <option value="">Select region</option>
                          {ethiopianRegions.map(region => (
                            <option key={region} value={region}>{region}</option>
                          ))}
                        </select>
                        {formErrors.region && <p className="text-red-500 text-xs mt-1">{formErrors.region}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Language Preference</label>
                        <select
                          name="language"
                          value={profileData.language}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing ? 'bg-gray-50' : ''}`}
                        >
                          {languages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="mt-6 flex justify-end">
                        <button 
                          type="submit"
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            )}
            
            {/* Wallet Connection Section */}
            {activeSection === 'wallet' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 text-gray-700">Wallet Connection</h2>
                
                <div className="bg-gray-50 p-6 rounded-lg border mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium mb-1 text-gray-600">Connected Wallet</h3>
                      <div className="flex items-center gap-2">
                        <div className="font-mono text-sm bg-white p-2 rounded border truncate max-w-xs text-gray-500">
                          {walletData.address}
                        </div>
                        <button 
                          onClick={copyWalletAddress}
                          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                          title="Copy address"
                        >
                          <Copy className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center mb-2">
                        <Check className="h-3 w-3 mr-1" />
                        {walletData.isConnected ? 'Connected' : 'Disconnected'}
                      </div>
                      {walletData.isVerified && (
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Wallet Type: {walletData.type}</p>
                    </div>
                    
                    <button 
                      onClick={reconnectWallet}
                      className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Reconnect
                    </button>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    <strong>Note:</strong> Your wallet is used to sign transactions and verify your identity on the blockchain. 
                    Keep your recovery phrase safe and never share it with anyone.
                  </p>
                </div>
              </div>
            )}
            
            {/* Preferences Section */}
            {activeSection === 'preferences' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Preferences</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      name="language"
                      value={preferences.language}
                      onChange={handlePreferencesChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Interface language for the application</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency Display</label>
                    <select
                      name="currency"
                      value={preferences.currency}
                      onChange={handlePreferencesChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Currency for displaying prices and values</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit System</label>
                    <select
                      name="unitSystem"
                      value={preferences.unitSystem}
                      onChange={handlePreferencesChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {unitSystems.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Measurement units for weight</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{preferences.theme} Mode</span>
                      <button 
                        onClick={toggleTheme}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.theme === 'Dark' ? 'bg-blue-600' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.theme === 'Dark' ? 'translate-x-6' : 'translate-x-1'}`} 
                        />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Toggle between light and dark mode</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button 
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
            
            {/* Security Section */}
            {activeSection === 'security' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Security</h2>
                
                {/* Change Password */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <form onSubmit={changePassword} className="grid grid-cols-1 gap-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={securityData.currentPassword}
                          onChange={handleSecurityChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${passwordErrors.currentPassword ? 'border-red-500' : ''}`}
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {passwordErrors.currentPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={securityData.newPassword}
                        onChange={handleSecurityChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${passwordErrors.newPassword ? 'border-red-500' : ''}`}
                      />
                      {passwordErrors.newPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={securityData.confirmPassword}
                        onChange={handleSecurityChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${passwordErrors.confirmPassword ? 'border-red-500' : ''}`}
                      />
                      {passwordErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword}</p>}
                    </div>
                    
                    <div className="mt-2">
                      <button 
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Session Log */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Session Log</h3>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{session.device}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{session.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{session.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {session.current ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Current Session
                                </span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                  Active
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Logout from All Devices */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Logout from All Devices</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This will terminate all active sessions across all your devices. You will need to log in again on each device.
                  </p>
                  <button 
                    onClick={logoutAllDevices}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout from All Devices
                  </button>
                </div>
              </div>
            )}
            
            {/* Support / Help Section */}
            {activeSection === 'support' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Support & Help</h2>
                
                {/* FAQs */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <button className="flex justify-between items-center w-full text-left font-medium">
                        <span>How do I add a new coffee lot?</span>
                        <ChevronDown className="h-5 w-5" />
                      </button>
                      <div className="mt-2 text-gray-600">
                        Navigate to the "Add New Lot" section from the sidebar menu. Fill in all required information about your coffee lot and submit the form.
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <button className="flex justify-between items-center w-full text-left font-medium">
                        <span>How do I connect my wallet?</span>
                        <ChevronDown className="h-5 w-5" />
                      </button>
                      <div className="mt-2 text-gray-600">
                        Go to the "Wallet Connection" section in settings. Click on "Reconnect" if your wallet is disconnected. You may need to approve the connection request in your wallet app.
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <button className="flex justify-between items-center w-full text-left font-medium">
                        <span>How can I track my coffee lots?</span>
                        <ChevronDown className="h-5 w-5" />
                      </button>
                      <div className="mt-2 text-gray-600">
                        All your submitted coffee lots can be viewed and tracked in the "My Coffee Lots" section. You can see their current status and full history there.
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a href="#" className="text-blue-600 hover:underline">View all FAQs</a>
                  </div>
                </div>
                
                {/* Contact Support */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Contact Support</h3>
                  <p className="text-gray-600 mb-4">
                    Need help with something not covered in the FAQs? Our support team is here to help.
                  </p>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Contact Support
                  </button>
                </div>
                
                {/* User Guide */}
                <div>
                  <h3 className="text-lg font-medium mb-4">User Guide</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-gray-600 mb-4">
                      Our comprehensive user guide provides step-by-step instructions for using all features of the BunaChain platform.
                    </p>
                    <a 
                      href="#"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <FileText className="h-4 w-4" />
                      Download User Guide (PDF)
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}