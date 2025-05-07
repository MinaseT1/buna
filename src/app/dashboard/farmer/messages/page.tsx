import Sidebar from "../Sidebar";

export default function MessagesPage() {
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar active="Messages" />
      <main className="flex-1 flex flex-col items-center p-8">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <div className="w-full max-w-2xl bg-blue-50 rounded-lg p-6 shadow">
          {/* TODO: List messages here */}
          <div className="text-gray-400">No messages yet.</div>
        </div>
      </main>
    </div>
  );
}