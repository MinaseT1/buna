import React from "react";
import Image from "next/image";

export default function ProcessorDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="flex flex-col items-center mb-8">
        <Image src="/next.svg" alt="BunaChain Logo" width={48} height={48} />
        <h1 className="text-2xl font-bold mt-2 mb-4">Processor Dashboard</h1>
        <p className="text-gray-600 mb-4">Browse available batches and manage processing</p>
      </div>
      <div className="w-full max-w-2xl bg-blue-50 rounded-lg p-6 shadow">
        <h2 className="font-semibold text-lg mb-4">Available Coffee Batches</h2>
        {/* TODO: List available batches here */}
        <div className="text-gray-400">No available batches yet.</div>
      </div>
      <div className="w-full max-w-2xl mt-8 bg-white rounded-lg p-6 shadow border">
        <h2 className="font-semibold text-lg mb-4">Processing Actions</h2>
        {/* TODO: List and update processing status here */}
        <div className="text-gray-400">No batches in processing.</div>
      </div>
    </div>
  );
}