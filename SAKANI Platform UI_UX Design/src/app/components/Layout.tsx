import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { Home, Search, Building2, MessageSquare, Bell, User, LogOut, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const links = [
    { to: '/', icon: Home, label: 'الرئيسية' },
    { to: '/search', icon: Search, label: 'البحث' },
    { to: '/properties', icon: Building2, label: 'إدارة السكن' },
    { to: '/messages', icon: MessageSquare, label: 'المحادثات' },
    { to: '/notifications', icon: Bell, label: 'الإشعارات', badge: 3 },
    { to: '/profile', icon: User, label: 'الملف الشخصي' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#003344]/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 right-0 z-50 h-screen w-64 glass-panel border-l border-white/20 shadow-[rgba(0,51,68,0.05)_10px_0_30px] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F2994A] to-[#E27921] flex items-center justify-center text-white font-bold text-xl font-['Cairo'] shadow-lg">
              S
            </div>
            <span className="font-['Cairo'] font-bold text-2xl text-[#003344]">سكني</span>
          </div>
          <button className="lg:hidden text-[#003344] hover:bg-black/5 p-2 rounded-lg" onClick={() => setIsOpen(false)}>
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-[#003344] text-white shadow-md' 
                  : 'text-[#64748b] hover:bg-[#003344]/5 hover:text-[#003344]'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <link.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#F2994A]' : 'group-hover:text-[#F2994A]'}`} />
                    <span className="font-medium">{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="bg-[#F2994A] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {link.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-black/5">
          <button className="flex items-center gap-3 px-4 py-3 text-[#d4183d] hover:bg-[#d4183d]/10 rounded-xl w-full transition-colors font-medium">
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-white/20 h-16 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4 lg:hidden">
        <button onClick={onMenuClick} className="p-2 -mr-2 text-[#003344] hover:bg-black/5 rounded-lg transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-['Cairo'] font-bold text-xl text-[#003344]">سكني</span>
      </div>
      
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-left mr-3">
          <p className="text-sm font-bold text-[#003344]">أحمد محمد</p>
          <p className="text-xs text-[#64748b]">مالك عقار</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}

export function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#003344] font-['Readex_Pro']">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="lg:pr-64 flex flex-col min-h-screen transition-all duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
