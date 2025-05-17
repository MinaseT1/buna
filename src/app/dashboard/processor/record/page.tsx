'use client';
import { useState, useEffect } from 'react';
import Sidebar from "../Sidebar";
import { Package, Eye, Filter, Search, Calendar, ChevronDown, X, FileText, Clock, CheckCircle, Upload, Save, Database, Link } from "lucide-react";

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
  },
];

// Processing stages for dropdown
const processingStages = [
  'Drying',
  'Washing',
  'Fermentation',
  'Milling',
  'Sorting',
  'Grading',
  'Packaging',
  'Ready for Export'
];

export default function RecordProcessingPage() {
  // State for lot selection
  const [selectedLotId, setSelectedLotId] = useState('');
  const [selectedLot, setSelectedLot] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for processing step form
  const [processingStep, setProcessingStep] = useState({
    stage: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    moistureContent: '',
    notes: '',
    file: null,
    recordOnBlockchain: false
  });
  
  // State for processing history
  const [processingHistory, setProcessingHistory] = useState([]);
  
  // Filter lots based on search query
  const filteredLots = sampleProcessingLots.filter(lot => 
    lot.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lot.farmer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle lot selection
  useEffect(() => {
    if (selectedLotId) {
      const lot = sampleProcessingLots.find(lot => lot.id === selectedLotId);
      setSelectedLot(lot);
      
      // In a real app, you would fetch the processing history for this lot
      // For demo, we'll create some sample history
      if (lot) {
        const sampleHistory = [];
        
        // Add sample history based on the lot's processing method
        if (lot.processingMethod === 'Natural') {
          sampleHistory.push({
            stage: 'Drying',
            startDate: lot.receivedDate,
            endDate: new Date(new Date(lot.receivedDate).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            moistureContent: '35%',
            notes: 'Started natural drying process on raised beds',
            recordedBy: 'Processor',
            recordedOn: lot.receivedDate
          });
        } else if (lot.processingMethod === 'Washed') {
          sampleHistory.push({
            stage: 'Washing',
            startDate: lot.receivedDate,
            endDate: new Date(new Date(lot.receivedDate).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            moistureContent: '45%',
            notes: 'Completed washing and fermentation',
            recordedBy: 'Processor',
            recordedOn: lot.receivedDate
          });
        }
        
        setProcessingHistory(sampleHistory);
      }
    } else {
      setSelectedLot(null);
      setProcessingHistory([]);
    }
  }, [selectedLotId]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProcessingStep({
      ...processingStep,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle file upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProcessingStep({
        ...processingStep,
        file: e.target.files[0]
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new processing step record
    const newStep = {
      ...processingStep,
      recordedBy: 'Processor',
      recordedOn: new Date().toISOString().split('T')[0]
    };
    
    // In a real app, you would send this data to your backend/blockchain
    // For demo, we'll just update the local state
    setProcessingHistory([...processingHistory, newStep]);
    
    // Reset form
    setProcessingStep({
      stage: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      moistureContent: '',
      notes: '',
      file: null,
      recordOnBlockchain: false
    });
    
    // Show success message
    alert(`Processing step recorded for ${selectedLot.id}${processingStep.recordOnBlockchain ? ' and logged to blockchain' : ''}`);
  };
  
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="Record Processing" />
      <main className="flex-1 flex flex-col p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-black">Record Processing</h1>
          <p className="text-gray-600">Document processing steps for coffee lots</p>
        </div>
        
        {/* Lot Selection Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-medium text-black">Select Coffee Lot</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lot Search/Selection */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Lot ID</label>
              <div className="relative">
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by Lot ID or Farmer"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              
              {searchQuery && (
                <div className="mt-2 border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                  {filteredLots.length > 0 ? (
                    filteredLots.map((lot) => (
                      <button
                        key={lot.id}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex justify-between items-center"
                        onClick={() => {
                          setSelectedLotId(lot.id);
                          setSearchQuery('');
                        }}
                      >
                        <span className="font-medium">{lot.id}</span>
                        <span className="text-sm text-gray-500">{lot.farmer}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No lots found</div>
                  )}
                </div>
              )}
            </div>
            
            {/* Selected Lot Info */}
            {selectedLot ? (
              <div className="col-span-2 bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Farmer</p>
                    <p className="font-medium">{selectedLot.farmer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Variety</p>
                    <p className="font-medium">{selectedLot.variety}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">{selectedLot.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Received Date</p>
                    <p className="font-medium">{selectedLot.receivedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Status</p>
                    <p className="font-medium">{selectedLot.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Processing Method</p>
                    <p className="font-medium">{selectedLot.processingMethod}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-span-2 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                <p className="text-gray-500">Select a lot to view details</p>
              </div>
            )}
          </div>
        </div>
        
        {selectedLot && (
          <>
            {/* Processing Step Entry Form */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-medium text-black">Record Processing Step</h2>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Processing Stage */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Processing Stage *</label>
                    <div className="relative">
                      <select
                        name="stage"
                        className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={processingStep.stage}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a stage</option>
                        {processingStages.map((stage) => (
                          <option key={stage} value={stage}>{stage}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="startDate"
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={processingStep.startDate}
                        onChange={handleInputChange}
                        required
                      />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="endDate"
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={processingStep.endDate}
                        onChange={handleInputChange}
                        required
                      />
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Moisture Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Moisture Content (%)</label>
                    <input
                      type="number"
                      name="moistureContent"
                      step="0.1"
                      min="0"
                      max="100"
                      className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 12.5"
                      value={processingStep.moistureContent}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                {/* Processing Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Processing Notes</label>
                  <textarea
                    name="notes"
                    rows="3"
                    className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add any notes about the processing step..."
                    value={processingStep.notes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                {/* File Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documentation</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, PNG, JPG or JPEG (MAX. 10MB)</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        name="file"
                        onChange={handleFileChange}
                        accept=".pdf,.png,.jpg,.jpeg"
                      />
                    </label>
                  </div>
                  {processingStep.file && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {processingStep.file.name}
                    </p>
                  )}
                </div>
                
                {/* Blockchain Option */}
                <div className="mb-6 flex items-center">
                  <input
                    type="checkbox"
                    id="recordOnBlockchain"
                    name="recordOnBlockchain"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={processingStep.recordOnBlockchain}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="recordOnBlockchain" className="ml-2 block text-sm text-gray-700 flex items-center gap-1">
                    <Link className="h-4 w-4 text-blue-600" />
                    Also record this step on the blockchain for enhanced traceability
                  </label>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Sign & Record Processing Step
                  </button>
                </div>
              </form>
            </div>
            
            {/* Processing History */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-medium text-black">Processing History</h2>
                </div>
              </div>
              
              {processingHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left text-black text-sm border-b">
                        <th className="px-6 py-3 font-medium">Processing Stage</th>
                        <th className="px-6 py-3 font-medium">Start Date</th>
                        <th className="px-6 py-3 font-medium">End Date</th>
                        <th className="px-6 py-3 font-medium">Moisture</th>
                        <th className="px-6 py-3 font-medium">Notes</th>
                        <th className="px-6 py-3 font-medium">Recorded By</th>
                        <th className="px-6 py-3 font-medium">Recorded On</th>
                        <th className="px-6 py-3 font-medium">Blockchain</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {processingHistory.map((step, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-black">{step.stage}</td>
                          <td className="px-6 py-4 text-black">{step.startDate}</td>
                          <td className="px-6 py-4 text-black">{step.endDate}</td>
                          <td className="px-6 py-4 text-black">{step.moistureContent || '-'}</td>
                          <td className="px-6 py-4 text-black">
                            {step.notes ? (
                              <span className="line-clamp-2" title={step.notes}>{step.notes}</span>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td className="px-6 py-4 text-black">{step.recordedBy}</td>
                          <td className="px-6 py-4 text-black">{step.recordedOn}</td>
                          <td className="px-6 py-4">
                            {step.recordOnBlockchain ? (
                              <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                Yes
                              </span>
                            ) : (
                              <span className="text-gray-500">No</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No processing steps have been recorded for this lot yet.
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}