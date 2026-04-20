import React from 'react';
import { Link, useLocation } from 'react-router';
import { 
  Home, 
  Building2, 
  CalendarCheck, 
  MessageSquare, 
  User, 
  LogOut,
  Bell
} from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: Home, path: '/owner' },
    { id: 'add-property', label: 'إضافة سكن', icon: Building2, path: '/owner/add-property' },
    { id: 'bookings', label: 'الحجوزات', icon: CalendarCheck, path: '/owner/bookings' },
    { id: 'messages', label: 'الرسائل', icon: MessageSquare, path: '/owner/messages' },
    { id: 'notifications', label: 'الإشعارات', icon: Bell, path: '/owner/notifications' },
    { id: 'profile', label: 'الملف الشخصي', icon: User, path: '/owner/profile' },
  ];

  return (
    <aside className="w-64 bg-[#001D28] min-h-screen text-white flex flex-col font-readex shrink-0 shadow-[4px_0_24px_rgba(25,28,29,0.08)] hidden md:flex sticky top-0 h-screen overflow-y-auto">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <Link to="/landing" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-[#F2994A]">
            <span className="font-['Cairo'] font-bold text-2xl text-[#F2994A]">س</span>
          </div>
          <span className="font-['Cairo'] font-bold text-xl tracking-wide">سكني</span>
        </Link>
        <Link to="/owner/notifications" className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F2994A] rounded-full ring-2 ring-[#001D28]"></span>
        </Link>
      </div>

      <div className="p-4">
        <p className="text-xs font-semibold text-gray-400 mb-4 px-3 uppercase tracking-wider">القائمة الرئيسية</p>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/owner' && location.pathname === '/owner');
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all duration-200 w-full text-right ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#904D00] to-[#F2994A] text-white shadow-md font-bold' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white font-medium'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span className="flex-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-white/5 border border-white/10">
          <div className="w-10 h-10 rounded-full bg-gray-500 overflow-hidden shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" 
              alt="Owner Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-bold text-white truncate">أحمد عبدالله</span>
            <span className="text-xs text-gray-400 truncate">مالك موثق</span>
          </div>
        </div>
        
        <button className="flex items-center gap-3 px-4 py-3 w-full text-right rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors font-medium">
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};
