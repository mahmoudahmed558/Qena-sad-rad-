import { Outlet, Link } from 'react-router';
import { MessageSquare, Bell, Menu, User } from 'lucide-react';
import React from 'react';

export const StudentLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] font-readex" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-[24px] sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/landing" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#003344] rounded-lg flex items-center justify-center">
              <span className="font-['Cairo'] font-bold text-2xl text-[#F2994A]">س</span>
            </div>
            <span className="font-['Cairo'] font-bold text-2xl tracking-wide text-[#003344]">سكني</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <Link to="/" className="text-[#001D28] hover:text-[#F2994A] transition-colors">الرئيسية</Link>
            <Link to="/results" className="text-gray-500 hover:text-[#001D28] transition-colors">استكشف السكن</Link>
            <Link to="/owner" className="text-gray-500 hover:text-[#001D28] transition-colors">بوابة المالك</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/chat" className="hidden sm:flex relative p-2.5 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#F2994A] rounded-full animate-pulse"></span>
            </Link>
            <button className="hidden sm:flex relative p-2.5 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#F2994A] rounded-full"></span>
            </button>
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 bg-gradient-to-br from-[#003344] to-[#004455] hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
            >
              <User className="w-4 h-4" />
              <span>تسجيل الدخول</span>
            </Link>
            <button className="md:hidden p-2 text-gray-500">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Floating Chatbot */}
      <button className="fixed bottom-6 left-6 w-14 h-14 bg-white/80 backdrop-blur-[24px] text-[#904D00] rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(25,28,29,0.06)] border border-white/50 hover:bg-white hover:scale-105 transition-all z-30">
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F2994A] rounded-full border-2 border-white"></span>
      </button>
    </div>
  );
};
