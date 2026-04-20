import React from 'react';
import { User, Mail, Phone, MapPin, ShieldCheck, CreditCard, Building, ImagePlus, Save } from 'lucide-react';

export const ProfilePage = () => {
  return (
    <div className="max-w-7xl mx-auto w-full space-y-8 font-readex pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[24px] shadow-[0_8px_32px_rgba(25,28,29,0.04)] border border-[#C1C7CC]/20">
        <div>
          <h1 className="font-cairo font-bold text-2xl text-[#001D28] mb-1 flex items-center gap-2">
            <User className="w-6 h-6 text-[#904D00]" />
            الملف الشخصي
          </h1>
          <p className="text-gray-500 text-sm">إدارة معلومات حسابك الشخصية وبيانات التواصل.</p>
        </div>
        
        <button className="px-6 py-3 bg-gradient-to-br from-[#001D28] to-[#003344] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-[0_8px_24px_rgba(0,29,40,0.16)]">
          <Save className="w-5 h-5" />
          <span>حفظ التعديلات</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Avatar & Status) */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[24px] shadow-[0_8px_32px_rgba(25,28,29,0.04)] border border-[#C1C7CC]/20 flex flex-col items-center text-center">
            
            <div className="relative group cursor-pointer mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#F8F9FA] shadow-md group-hover:opacity-80 transition-opacity">
                <img 
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <ImagePlus className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="font-cairo font-bold text-xl text-[#001D28] mb-2">أحمد عبدالله</h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2994A]/10 rounded-full text-xs font-bold text-[#904D00] mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>مالك موثق</span>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">عضو منذ مايو 2021</p>
            
            <div className="w-full h-px bg-[#C1C7CC]/20 mb-6"></div>
            
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">تقييم المالك</span>
                <span className="font-bold text-[#001D28]">4.9 <span className="text-[#F2994A]">★</span></span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">إجمالي العقارات</span>
                <span className="font-bold text-[#001D28]">12 عقار</span>
              </div>
            </div>

          </div>

          {/* Verification Status */}
          <div className="bg-white p-6 rounded-[24px] shadow-[0_8px_32px_rgba(25,28,29,0.04)] border border-[#C1C7CC]/20">
            <h3 className="font-cairo font-bold text-lg text-[#001D28] mb-4">حالة التحقق</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-[#001D28]">رقم الجوال</span>
                </div>
                <span className="text-xs font-bold text-green-600">موثق</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-[#001D28]">البريد الإلكتروني</span>
                </div>
                <span className="text-xs font-bold text-green-600">موثق</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-[#001D28]">الهوية الوطنية</span>
                </div>
                <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-md cursor-pointer hover:bg-yellow-200 transition-colors">استكمال</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Form Details) */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-8 rounded-[24px] shadow-[0_8px_32px_rgba(25,28,29,0.04)] border border-[#C1C7CC]/20">
            <h3 className="font-cairo font-bold text-xl text-[#001D28] mb-6">المعلومات الشخصية</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">الاسم الأول</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" defaultValue="أحمد" className="w-full bg-[#F8F9FA] border border-[#C1C7CC]/30 rounded-xl py-3 pl-4 pr-11 text-sm focus:border-[#904D00] focus:ring-1 focus:ring-[#904D00] outline-none text-[#001D28] font-semibold" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">اسم العائلة</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" defaultValue="عبدالله" className="w-full bg-[#F8F9FA] border border-[#C1C7CC]/30 rounded-xl py-3 pl-4 pr-11 text-sm focus:border-[#904D00] focus:ring-1 focus:ring-[#904D00] outline-none text-[#001D28] font-semibold" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">رقم الجوال</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="tel" defaultValue="+966 50 123 4567" dir="ltr" className="w-full bg-[#F8F9FA] border border-[#C1C7CC]/30 rounded-xl py-3 pl-11 pr-4 text-sm focus:border-[#904D00] focus:ring-1 focus:ring-[#904D00] outline-none text-[#001D28] font-semibold text-left" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" defaultValue="ahmed.abdullah@example.com" dir="ltr" className="w-full bg-[#F8F9FA] border border-[#C1C7CC]/30 rounded-xl py-3 pl-11 pr-4 text-sm focus:border-[#904D00] focus:ring-1 focus:ring-[#904D00] outline-none text-[#001D28] font-semibold text-left" />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 block">المدينة</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="w-full bg-[#F8F9FA] border border-[#C1C7CC]/30 rounded-xl py-3 pl-4 pr-11 text-sm focus:border-[#904D00] focus:ring-1 focus:ring-[#904D00] outline-none text-[#001D28] font-semibold appearance-none cursor-pointer">
                    <option>الرياض</option>
                    <option>جدة</option>
                    <option>الدمام</option>
                    <option>مكة المكرمة</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences / Settings */}
          <div className="bg-white p-8 rounded-[24px] shadow-[0_8px_32px_rgba(25,28,29,0.04)] border border-[#C1C7CC]/20">
            <h3 className="font-cairo font-bold text-xl text-[#001D28] mb-6">إعدادات الإشعارات</h3>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 rounded-xl border border-[#C1C7CC]/30 hover:bg-[#F8F9FA] cursor-pointer transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-[#001D28] mb-1">إشعارات الحجوزات الجديدة</h4>
                  <p className="text-xs text-gray-500">تلقي إشعار فور طلب طالب لحجز أحد عقاراتك</p>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#001D28]">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition -translate-x-1" />
                </div>
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-[#C1C7CC]/30 hover:bg-[#F8F9FA] cursor-pointer transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-[#001D28] mb-1">رسائل الطلاب</h4>
                  <p className="text-xs text-gray-500">إشعارات فورية عند وصول رسالة جديدة</p>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#001D28]">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition -translate-x-1" />
                </div>
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl border border-[#C1C7CC]/30 hover:bg-[#F8F9FA] cursor-pointer transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-[#001D28] mb-1">النشرة البريدية والعروض</h4>
                  <p className="text-xs text-gray-500">أخبار المنصة والنصائح الأسبوعية للملاك</p>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                </div>
              </label>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
