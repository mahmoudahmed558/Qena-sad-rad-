import React, { useState } from 'react';
import { CalendarCheck, Search, Filter, MoreHorizontal, CheckCircle2, XCircle, Clock, Eye } from 'lucide-react';
import { BookingDetailsPanel } from '../components/BookingDetailsPanel';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

interface Booking {
  id: string;
  studentName: string;
  studentAvatar?: string;
  studentCollege: string;
  studentYear: string;
  studentVerified: boolean;
  propertyName: string;
  date: string;
  startDate: string;
  status: string;
  amount: string;
  duration: string;
  message: string;
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'BK-2024-001',
    studentName: 'عبدالرحمن العتيبي',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    studentCollege: 'كلية الهندسة',
    studentYear: 'السنة الثالثة',
    studentVerified: true,
    propertyName: 'سكن المدينة الجامعية - شقة زهرة النيل',
    date: '12 مايو 2024',
    startDate: '1 سبتمبر 2024',
    status: 'مؤكد',
    amount: '20,700 جنيه',
    duration: 'فصل دراسي (4 أشهر)',
    message: 'السلام عليكم، أنا طالب في كلية الهندسة وأبحث عن سكن قريب من الجامعة. السكن يبدو مثالياً لاحتياجاتي الدراسية.'
  },
  {
    id: 'BK-2024-002',
    studentName: 'خالد محمد',
    studentAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
    studentCollege: 'كلية الطب',
    studentYear: 'السنة الأولى',
    studentVerified: true,
    propertyName: 'شقق النور المفروشة - استوديو 2',
    date: '10 مايو 2024',
    startDate: '15 أغسطس 2024',
    status: 'قيد الانتظار',
    amount: '16,560 جنيه',
    duration: 'سنة دراسية (10 أشهر)',
    message: 'مرحباً، أنا طالب طب مغترب وأحتاج إلى سكن هادئ ومناسب للدراسة. هل يتوفر إنترنت عالي السرعة؟'
  },
  {
    id: 'BK-2024-003',
    studentName: 'سعد الدوسري',
    studentAvatar: '',
    studentCollege: 'كلية الحاسب',
    studentYear: 'السنة الثانية',
    studentVerified: false,
    propertyName: 'استوديوهات الياسمين',
    date: '08 مايو 2024',
    startDate: '20 أغسطس 2024',
    status: 'مؤكد',
    amount: '19,320 جنيه',
    duration: 'فصل دراسي (4 أشهر)',
    message: 'السلام عليكم، أنا طالب في كلية الحاسب وأبحث عن سكن قريب من الجامعة ويتوفر فيه إنترنت سريع.'
  },
  {
    id: 'BK-2024-004',
    studentName: 'فهد العلي',
    studentAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop',
    studentCollege: 'كلية إدارة الأعمال',
    studentYear: 'السنة الرابعة',
    studentVerified: true,
    propertyName: 'مجمع واحة العلوم السكني',
    date: '05 مايو 2024',
    startDate: '1 يونيو 2024',
    status: 'مرفوض',
    amount: '24,840 جنيه',
    duration: 'شهر واحد',
    message: 'مرحباً، أحتاج السكن لفترة قصيرة فقط لإنهاء مشروع التخرج.'
  },
  {
    id: 'BK-2024-005',
    studentName: 'عبدالله السعيد',
    studentAvatar: '',
    studentCollege: 'كلية العلوم',
    studentYear: 'السنة الأولى',
    studentVerified: false,
    propertyName: 'سكن المدينة الجامعية - شقة زهرة النيل',
    date: '01 مايو 2024',
    startDate: '1 سبتمبر 2024',
    status: 'مكتمل',
    amount: '20,700 جنيه',
    duration: 'فصل دراسي (4 أشهر)',
    message: 'السلام عليكم، أنا طالب جديد وأبحث عن سكن مناسب للفصل الدراسي القادم.'
  },
];

export const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState('الكل');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const navigate = useNavigate();

  const tabs = ['الكل', 'قيد الانتظار', 'مؤكد', 'مكتمل', 'مرفوض'];

  const filteredBookings = activeTab === 'الكل'
    ? bookings
    : bookings.filter(b => b.status === activeTab);

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsPanelOpen(true);
  };

  const handleAccept = (id: string) => {
    setBookings(prev => prev.map(b =>
      b.id === id ? { ...b, status: 'مؤكد' } : b
    ));
    toast.success('تم قبول الطلب بنجاح!', {
      description: 'تم فتح محادثة مع الطالب تلقائياً'
    });
  };

  const handleReject = (id: string, reason?: string) => {
    setBookings(prev => prev.map(b =>
      b.id === id ? { ...b, status: 'مرفوض' } : b
    ));
    toast.error('تم رفض الطلب', {
      description: reason || 'تم إرسال إشعار للطالب'
    });
  };

  const handleMessage = (id: string) => {
    navigate('/owner/messages');
    toast.info('تم فتح صفحة المحادثات');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'مؤكد':
      case 'مكتمل':
        return <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-700"><CheckCircle2 className="w-3.5 h-3.5" />{status}</span>;
      case 'قيد الانتظار':
        return <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700"><Clock className="w-3.5 h-3.5" />{status}</span>;
      case 'مرفوض':
        return <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-red-50 text-red-700"><XCircle className="w-3.5 h-3.5" />{status}</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full space-y-8 font-readex pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[24px] shadow-[0_8px_32px_rgba(25,28,29,0.04)] border border-[#C1C7CC]/20">
        <div>
          <h1 className="font-cairo font-bold text-2xl text-[#001D28] mb-1 flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-[#904D00]" />
            إدارة الحجوزات
          </h1>
          <p className="text-gray-500 text-sm">قم بمراجعة وإدارة طلبات الحجز المقدمة من الطلاب لعقاراتك.</p>
        </div>
      </div>

      {/* Controls & Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        
        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-[#001D28] text-white shadow-md' 
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-[#C1C7CC]/30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-72">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="ابحث برقم الحجز أو اسم الطالب..." 
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-white border border-[#C1C7CC]/30 focus:outline-none focus:border-[#904D00] focus:ring-1 focus:ring-[#904D00] text-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-[#C1C7CC]/30 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_32px_rgba(25,28,29,0.04)] border border-[#C1C7CC]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right whitespace-nowrap">
            <thead className="bg-[#F8F9FA] text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-5 font-semibold">رقم الحجز</th>
                <th className="px-6 py-5 font-semibold">الطالب</th>
                <th className="px-6 py-5 font-semibold">الوحدة السكنية</th>
                <th className="px-6 py-5 font-semibold">تاريخ الطلب</th>
                <th className="px-6 py-5 font-semibold">المدة</th>
                <th className="px-6 py-5 font-semibold">الإجمالي</th>
                <th className="px-6 py-5 font-semibold">الحالة</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C1C7CC]/20">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-[#F8F9FA]/50 transition-colors">
                  <td className="px-6 py-5 font-mono text-sm font-semibold text-[#904D00]">{booking.id}</td>
                  <td className="px-6 py-5 font-bold text-[#001D28]">{booking.studentName}</td>
                  <td className="px-6 py-5 text-gray-600 text-sm max-w-[200px] truncate">{booking.propertyName}</td>
                  <td className="px-6 py-5 text-gray-500 text-sm">{booking.date}</td>
                  <td className="px-6 py-5 text-gray-500 text-sm">{booking.duration}</td>
                  <td className="px-6 py-5 font-cairo font-bold text-[#001D28]">{booking.amount}</td>
                  <td className="px-6 py-5">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-5">
                    <button
                      onClick={() => handleViewDetails(booking)}
                      className="px-4 py-2 text-sm font-bold text-[#003344] hover:text-white bg-white hover:bg-gradient-to-br hover:from-[#003344] hover:to-[#004455] border border-[#003344]/20 hover:border-transparent rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      عرض التفاصيل
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    <CalendarCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="font-semibold text-[#001D28]">لا توجد حجوزات</p>
                    <p className="text-sm">لم يتم العثور على أي حجوزات تطابق حالة "{activeTab}".</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Panel */}
      <BookingDetailsPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        booking={selectedBooking}
        onAccept={handleAccept}
        onReject={handleReject}
        onMessage={handleMessage}
      />

    </div>
  );
};
