import React from "react";
import Image from "next/image";

export default function ImporterDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="flex flex-col items-center mb-8">
        <Image src="/next.svg" alt="BunaChain Logo" width={48} height={48} />
        <h1 className="text-2xl font-bold mt-2 mb-4">Importer Dashboard</h1>
        <p className="text-gray-600 mb-4">View batch history and verify traceability</p>
      </div>
      <div className="w-full max-w-2xl bg-blue-50 rounded-lg p-6 shadow">
        <h2 className="font-semibold text-lg mb-4">Traceable Coffee Batches</h2>
        {/* TODO: List traceable batches here */}
        <div className="text-gray-400">No traceable batches found.</div>
      </div>
      <div className="w-full max-w-2xl mt-8 bg-white rounded-lg p-6 shadow border">
        <h2 className="font-semibold text-lg mb-4">Batch Details & QR Scan</h2>
        {/* TODO: Show batch details and QR code scanner here */}
        <div className="text-gray-400">Select a batch to view details.</div>
      </div>
    </div>
  );
}