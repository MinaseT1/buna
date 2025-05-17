'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "../Sidebar";
import Image from 'next/image';
import { MapPin, Upload, X, Camera, FileText, Check, Download } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
import { useWallet } from "../../../../lib/wallet-context";

export default function AddLotPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const documentInputRef = useRef(null);
  
  // Get wallet from context
  const { address, isConnected } = useWallet();
  
  // Form state
  const [formData, setFormData] = useState({
    lotName: '',
    variety: '',
    customVariety: '',
    weight: '',
    harvestDate: '',
    processingMethod: 'Natural',
    region: '',
    gpsCoordinates: '',
    altitude: '',
    walletAddress: ''
  });
  
  // Update wallet address when connected
  useEffect(() => {
    if (isConnected && address) {
      setFormData(prev => ({
        ...prev,
        walletAddress: address
      }));
    }
  }, [isConnected, address]);
  
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [lotId, setLotId] = useState('');
  
  // Coffee varieties
  const coffeeVarieties = [
    'Heirloom', 'Typica', 'Bourbon', 'Gesha', 'SL28', 'SL34', 'Ruiru 11', 'Batian', 'Pacamara', 'Other'
  ];
  
  // Ethiopian regions
  const ethiopianRegions = [
    'Sidama', 'Yirgacheffe', 'Guji', 'Harar', 'Limu', 'Jimma', 'Kaffa', 'Bench Maji'
  ];
  
  // Processing methods
  const processingMethods = [
    'Natural', 'Washed', 'Honey', 'Anaerobic', 'Wet-Hulled'
  ];
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert('You can only upload up to 3 images');
      return;
    }
    
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setImages([...images, ...newImages]);
  };
  
  // Handle document upload
  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + documents.length > 2) {
      alert('You can only upload up to 2 documents');
      return;
    }
    
    const newDocuments = files.map(file => ({
      file,
      name: file.name,
      type: file.type
    }));
    
    setDocuments([...documents, ...newDocuments]);
  };
  
  // Remove image
  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  // Remove document
  const removeDocument = (index) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
  };
  
  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            gpsCoordinates: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter coordinates manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.lotName.trim()) newErrors.lotName = 'Lot name is required';
    if (!formData.variety) newErrors.variety = 'Coffee variety is required';
    if (formData.variety === 'Other' && !formData.customVariety.trim()) {
      newErrors.customVariety = 'Custom variety name is required';
    }
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      newErrors.weight = 'Weight must be greater than 0';
    }
    if (!formData.harvestDate) newErrors.harvestDate = 'Harvest date is required';
    if (!formData.processingMethod) newErrors.processingMethod = 'Processing method is required';
    if (!formData.region) newErrors.region = 'Region is required';
    if (!formData.gpsCoordinates) newErrors.gpsCoordinates = 'GPS coordinates are required';
    
    // Check if harvest date is not in the future
    const harvestDate = new Date(formData.harvestDate);
    const today = new Date();
    if (harvestDate > today) {
      newErrors.harvestDate = 'Harvest date cannot be in the future';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call and blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a unique lot ID
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 1000);
      const generatedLotId = `LOT-ETH-${timestamp.toString().slice(-5)}${randomNum}`;
      
      // Create a new lot object with the form data
      const newLot = {
        id: generatedLotId,
        lotName: formData.lotName,
        variety: formData.variety === 'Other' ? formData.customVariety : formData.variety,
        weight: parseFloat(formData.weight),
        status: 'Pending',
        processor: '',
        submittedDate: new Date().toISOString().split('T')[0],
        region: formData.region,
        altitude: formData.altitude,
        harvestDate: formData.harvestDate,
        processingMethod: formData.processingMethod,        gpsCoordinates: formData.gpsCoordinates,
        images: images.length > 0 ? images.map(img => img.preview) : ['/coffee-bean-concept-illustration.png'], // Use actual image previews
        timeline: [
          { date: new Date().toISOString().split('T')[0], event: 'Lot registered by farmer', status: 'Pending' }
        ]
      };
      
      // Store the new lot in localStorage
      const existingLots = JSON.parse(localStorage.getItem('coffeeLots') || '[]');
      localStorage.setItem('coffeeLots', JSON.stringify([newLot, ...existingLots]));
      
      setLotId(generatedLotId);
      setShowSuccess(true);
      
      // Reset form after successful submission
      // We don't reset the form here to allow the user to see what they submitted
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle return to dashboard
  const handleReturnToDashboard = () => {
    router.push('/dashboard/farmer/lots');
  };
  
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="Add New Lot" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-black">Add New Coffee Lot</h1>
          <p className="text-black">Enter detailed information about your harvested coffee batch</p>
        </div>
        
        {!showSuccess ? (
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-lg shadow border p-6">
            {/* Basic Info Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b text-black">📄 Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Lot Name / Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="lotName"
                    value={formData.lotName}
                    onChange={handleChange}
                    placeholder="e.g., April Harvest Lot #1"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 focus:ring-blue-500 ${errors.lotName ? 'border-red-500' : ''}`}
                  />
                  {errors.lotName && <p className="text-red-500 text-xs mt-1">{errors.lotName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coffee Variety <span className="text-red-500">*</span></label>
                  <select
                    name="variety"
                    value={formData.variety}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 focus:ring-blue-500 ${errors.variety ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select variety</option>
                    {coffeeVarieties.map(variety => (
                      <option key={variety} value={variety}>{variety}</option>
                    ))}
                  </select>
                  {errors.variety && <p className="text-red-500 text-xs mt-1">{errors.variety}</p>}
                </div>
                
                {formData.variety === 'Other' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custom Variety Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="customVariety"
                      value={formData.customVariety}
                      onChange={handleChange}
                      placeholder="Enter custom coffee variety name"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 focus:ring-blue-500 ${errors.customVariety ? 'border-red-500' : ''}`}
                    />
                    {errors.customVariety && <p className="text-red-500 text-xs mt-1">{errors.customVariety}</p>}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="e.g., 50.5"
                    step="0.1"
                    min="0.1"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-gray-700 focus:ring-2 focus:ring-blue-500 ${errors.weight ? 'border-red-500' : ''}`}
                  />
                  {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harvest Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    name="harvestDate"
                    value={formData.harvestDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 focus:ring-blue-500 ${errors.harvestDate ? 'border-red-500' : ''}`}
                  />
                  {errors.harvestDate && <p className="text-red-500 text-xs mt-1">{errors.harvestDate}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Processing Method <span className="text-red-500">*</span></label>
                  <select
                    name="processingMethod"
                    value={formData.processingMethod}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 focus:ring-blue-500 ${errors.processingMethod ? 'border-red-500' : ''}`}
                  >
                    {processingMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                  {errors.processingMethod && <p className="text-red-500 text-xs mt-1">{errors.processingMethod}</p>}
                </div>
              </div>
            </div>
            
            {/* Farm Location Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b text-black">🌍 Farm Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    placeholder="e.g., Sidama, Yirgacheffe"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 focus:ring-blue-500 ${errors.region ? 'border-red-500' : ''}`}
                  />
                  {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GPS Coordinates <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <input
                      type="text"
                      name="gpsCoordinates"
                      value={formData.gpsCoordinates}
                      onChange={handleChange}
                      placeholder="e.g., 6.123456, 38.123456"
                      className={`w-full px-3 py-2 border rounded-l-lg focus:outline-none text-gray-700 focus:ring-2 focus:ring-blue-500 ${errors.gpsCoordinates ? 'border-red-500' : ''}`}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="bg-blue-600 text-white px-3 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                    >
                      <MapPin className="h-5 w-5" />
                    </button>
                  </div>
                  {errors.gpsCoordinates && <p className="text-red-500 text-xs mt-1">{errors.gpsCoordinates}</p>}
                  <p className="text-xs text-gray-500 mt-1">Click the pin icon to auto-fill using your current location</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Altitude (m.a.s.l)</label>
                  <input
                    type="number"
                    name="altitude"
                    value={formData.altitude}
                    onChange={handleChange}
                    placeholder="e.g., 1950"
                    className="w-full px-3 py-2 border rounded-lg text-gray-700  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional</p>
                </div>
              </div>
            </div>
            
            {/* Media Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b text-black">📸 Media</h2>
              
              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Coffee Lot Photos</label>
                <div className="flex flex-wrap gap-4 mb-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-32 h-32 border rounded-lg overflow-hidden">
                      <Image 
                        src={image.preview} 
                        alt={`Coffee lot image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 3 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                    >
                      <Camera className="h-8 w-8 mb-1" />
                      <span className="text-xs">Add Photo</span>
                    </button>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/jpeg, image/png"
                  className="hidden"
                  multiple
                />
                <p className="text-xs text-gray-500">Upload up to 3 photos (JPEG/PNG)</p>
              </div>
              
              {/* Document Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harvest/Processing Documents</label>
                <div className="flex flex-col gap-2 mb-2">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm truncate max-w-xs">{doc.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  {documents.length < 2 && (
                    <button
                      type="button"
                      onClick={() => documentInputRef.current.click()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                    >
                      <Upload className="h-8 w-8 mb-1" />
                      <span>Click to upload documents</span>
                      <span className="text-xs mt-1">PDF or image files</span>
                    </button>
                  )}
                </div>
                <input
                  type="file"
                  ref={documentInputRef}
                  onChange={handleDocumentUpload}
                  accept="application/pdf, image/jpeg, image/png"
                  className="hidden"
                  multiple
                />
                <p className="text-xs text-gray-500">Upload up to 2 documents (PDF/JPEG/PNG)</p>
              </div>
            </div>
            
            {/* Blockchain Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b">🔐 Blockchain</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
                    <div className="text-sm font-mono bg-white p-2 rounded border">
                      {formData.walletAddress}
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    Connected
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">This wallet will be used to sign the transaction and create the lot record on-chain</p>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Sign & Submit Lot'}
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow border p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-black">Coffee Lot Successfully Submitted!</h2>
            <p className="text-gray-600 mb-6">Your coffee lot has been registered and is now pending verification.</p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Lot Details</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Lot ID:</span>
                <span className="font-medium text-blue-500">{lotId}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Status:</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Pending</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Submission Date:</span>
                <span className="font-medium text-gray-700">{new Date().toISOString().split('T')[0]}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Lot QR Code</h3>
              <div className="mx-auto w-48 h-48 flex justify-center items-center bg-white p-2 rounded-lg shadow-sm">
                <QRCodeSVG 
                  value={JSON.stringify({
                    id: lotId,
                    lotName: formData.lotName,
                    variety: formData.variety === 'Other' ? formData.customVariety : formData.variety,
                    weight: parseFloat(formData.weight),
                    region: formData.region,
                    altitude: formData.altitude || 'Not specified',
                    harvestDate: formData.harvestDate,
                    processingMethod: formData.processingMethod,
                    submittedDate: new Date().toISOString().split('T')[0],
                    status: 'Pending'
                  })}
                  size={180}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: '/Bunachain.png',
                    x: undefined,
                    y: undefined,
                    height: 30,
                    width: 30,
                    excavate: true,
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-4">Scan this QR code to view the lot's traceability information</p>
              <button 
                onClick={() => {
                  const canvas = document.createElement("canvas");
                  const svg = document.querySelector(".mx-auto.w-48.h-48 svg");
                  if (svg) {
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const img = new Image();
                    img.onload = () => {
                      canvas.width = img.width;
                      canvas.height = img.height;
                      const ctx = canvas.getContext("2d");
                      ctx.drawImage(img, 0, 0);
                      const pngFile = canvas.toDataURL("image/png");
                      const downloadLink = document.createElement("a");
                      downloadLink.download = `${lotId}-QRCode.png`;
                      downloadLink.href = pngFile;
                      downloadLink.click();
                    };
                    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
                  }
                }}
                className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
              >
                <Download className="h-4 w-4" />
                Download QR Code
              </button>
            </div>
            
            <button
              onClick={handleReturnToDashboard}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
}