import React from 'react';
import { Home, Search, Building2, MessageSquare, User } from 'lucide-react';
import { useLocation } from 'react-router';

export function Placeholder() {
  const location = useLocation();
  const path = location.pathname;

  let title = 'الصفحة غير متوفرة';
  let Icon = Home;
  
  if (path === '/') { title = 'الرئيسية'; Icon = Home; }
  else if (path === '/search') { title = 'البحث'; Icon = Search; }
  else if (path === '/properties') { title = 'إدارة السكن'; Icon = Building2; }
  else if (path === '/messages') { title = 'المحادثات'; Icon = MessageSquare; }
  else if (path === '/profile') { title = 'الملف الشخصي'; Icon = User; }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-24 h-24 bg-[#003344]/5 rounded-full flex items-center justify-center mb-6 border border-[#003344]/10 shadow-lg">
        <Icon className="w-12 h-12 text-[#003344]" />
      </div>
      <h1 className="text-3xl font-bold font-['Cairo'] text-[#003344] mb-4">{title}</h1>
      <p className="text-[#64748b] max-w-md mx-auto">
        هذه الصفحة قيد التطوير. تم إنشاء هذا النموذج كجزء من واجهة المنصة لعرض تصميم صفحة الإشعارات المتكاملة ضمن لوحة التحكم.
      </p>
    </div>
  );
}