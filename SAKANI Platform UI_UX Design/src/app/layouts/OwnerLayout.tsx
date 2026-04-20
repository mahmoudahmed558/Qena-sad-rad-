import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Outlet, Link } from 'react-router';
import { Bell, Menu, Search } from 'lucide-react';

export const OwnerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-readex overflow-hidden" dir="rtl">
      {/* Sidebar - Desktop */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Mobile & Desktop */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -mr-2 text-gray-500 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block w-72">
              <input 
                type="text" 
                placeholder="ابحث في لوحة التحكم..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A] text-sm bg-[#F8F9FA]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/owner/notifications" className="relative p-2 text-gray-400 hover:text-[#001D28] hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F2994A] rounded-full ring-2 ring-white"></span>
            </Link>
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-[#001D28] overflow-hidden hidden sm:block">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" 
                alt="Owner Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div 
            className="w-64 h-full transform transition-transform"
            onClick={e => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
};
