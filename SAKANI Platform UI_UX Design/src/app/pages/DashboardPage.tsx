import React from 'react';
import { Link } from 'react-router';
import { Users, Eye, CalendarCheck, TrendingUp, Building2, Plus, MoreHorizontal } from 'lucide-react';

export const DashboardPage = () => {
  const stats = [
    { title: 'إجمالي الحجوزات', value: '148', change: '+12%', icon: CalendarCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'المشاهدات (آخر 30 يوم)', value: '3,240', change: '+24%', icon: Eye, color: 'text-[#904D00]', bg: 'bg-[#F2994A]/10' },
    { title: 'الوحدات النشطة', value: '12', change: '+2', icon: Building2, color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'معدل الإشغال', value: '92%', change: '+5%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const recentBookings = [
    { id: 'BK-001', student: 'عبدالرحمن العتيبي', property: 'سكن المدينة الجامعية', date: '12 مايو 2024', status: 'مؤكد', amount: '20,700 جنيه' },
    { id: 'BK-002', student: 'خالد محمد', property: 'شقق النور المفروشة', date: '10 مايو 2024', status: 'قيد الانتظار', amount: '16,560 جنيه' },
    { id: 'BK-003', student: 'سعد الدوسري', property: 'استوديوهات الياسمين', date: '08 مايو 2024', status: 'مكتمل', amount: '19,320 جنيه' },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full space-y-8 font-readex pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[24px] shadow-[0_8px_32px_rgba(25,28,29,0.04)] border border-[#C1C7CC]/20">
        <div>
          <h1 className="font-cairo font-bold text-2xl text-[#001D28] mb-1">مرحباً بعودتك، أحمد 👋</h1>
          <p className="text-gray-500 text-sm">إليك نظرة عامة على أداء عقاراتك هذا الشهر.</p>
        </div>
        <Link 
          to="/owner/add-property"
          className="px-6 py-3 bg-gradient-to-br from-[#001D28] to-[#003344] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-[0_8px_24px_rgba(0,29,40,0.16)]"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة وحدة سكنية</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-[24px] shadow-[0_8px_32px_rgba(25,28,29,0.04)] border border-[#C1C7CC]/20 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
              <h3 className="font-cairo font-bold text-3xl text-[#001D28]">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Bookings (Takes 2/3 space) */}
        <div className="lg:col-span-2 bg-white rounded-[24px] shadow-[0_8px_32px_rgba(25,28,29,0.04)] border border-[#C1C7CC]/20 overflow-hidden">
          <div className="p-6 border-b border-[#C1C7CC]/20 flex items-center justify-between">
            <h2 className="font-cairo font-bold text-xl text-[#001D28]">أحدث طلبات الحجز</h2>
            <button className="text-sm font-semibold text-[#904D00] hover:underline">عرض الكل</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-right whitespace-nowrap">
              <thead className="bg-[#F8F9FA] text-gray-500 text-sm">
                <tr>
                  <th className="px-6 py-4 font-semibold">الطالب</th>
                  <th className="px-6 py-4 font-semibold">الوحدة السكنية</th>
                  <th className="px-6 py-4 font-semibold">التاريخ</th>
                  <th className="px-6 py-4 font-semibold">المبلغ</th>
                  <th className="px-6 py-4 font-semibold">الحالة</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C1C7CC]/20">
                {recentBookings.map((booking, index) => (
                  <tr key={index} className="hover:bg-[#F8F9FA]/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#001D28]">{booking.student}</td>
                    <td className="px-6 py-4 text-gray-600">{booking.property}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{booking.date}</td>
                    <td className="px-6 py-4 font-cairo font-bold text-[#001D28]">{booking.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                        booking.status === 'مؤكد' ? 'bg-green-50 text-green-700' :
                        booking.status === 'قيد الانتظار' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-gray-400 hover:text-[#001D28] rounded-lg hover:bg-gray-50 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Properties / Quick Actions */}
        <div className="bg-white rounded-[24px] shadow-[0_8px_32px_rgba(25,28,29,0.04)] border border-[#C1C7CC]/20 p-6 flex flex-col">
          <h2 className="font-cairo font-bold text-xl text-[#001D28] mb-6">إجراءات سريعة</h2>
          
          <div className="space-y-4 flex-1">
            <Link to="/owner/messages" className="flex items-center gap-4 p-4 rounded-xl border border-[#C1C7CC]/30 hover:border-[#904D00] group transition-all">
              <div className="w-12 h-12 rounded-full bg-[#FFF8F3] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[#904D00]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#001D28] text-sm group-hover:text-[#904D00] transition-colors">الرد على الاستفسارات</h3>
                <p className="text-xs text-gray-500 mt-1">لديك 3 رسائل غير مقروءة</p>
              </div>
            </Link>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#C1C7CC]/30 hover:border-[#001D28] group transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#F8F9FA] flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6 text-[#001D28]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#001D28] text-sm group-hover:text-[#001D28] transition-colors">مراجعة التقييمات</h3>
                <p className="text-xs text-gray-500 mt-1">حصلت على تقييم 5 نجوم جديد</p>
              </div>
            </div>
            
            <Link to="/owner/add-property" className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-[#C1C7CC] hover:border-[#904D00] group transition-all bg-[#F8F9FA]/50 hover:bg-[#FFF8F3]/50">
              <div className="w-12 h-12 rounded-full bg-white border border-[#C1C7CC]/50 flex items-center justify-center shrink-0 shadow-sm">
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#904D00]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-600 text-sm group-hover:text-[#904D00] transition-colors">نشر وحدة جديدة</h3>
                <p className="text-xs text-gray-400 mt-1">أضف تفاصيل السكن لجذب الطلاب</p>
              </div>
            </Link>
          </div>
          
        </div>

      </div>
    </div>
  );
};
