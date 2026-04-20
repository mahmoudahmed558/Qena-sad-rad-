import React, { useState } from 'react';
import { Bell, Calendar, MessageSquare, AlertCircle, Home, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type NotificationType = 'booking' | 'message' | 'system' | 'update';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionRequired?: boolean;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'booking',
    title: 'طلب حجز جديد',
    message: 'قام الطالب أحمد محمد بإرسال طلب حجز لغرفة مفردة في سكن "الأمل".',
    time: 'منذ 10 دقائق',
    read: false,
    actionRequired: true,
  },
  {
    id: '2',
    type: 'message',
    title: 'رسالة جديدة من سارة',
    message: 'هل يتوفر إنترنت فائق السرعة في السكن؟',
    time: 'منذ ساعة',
    read: false,
  },
  {
    id: '3',
    type: 'system',
    title: 'تحديث النظام',
    message: 'تم تحديث سياسة الخصوصية وشروط الاستخدام الخاصة بالمنصة. يرجى المراجعة.',
    time: 'منذ 3 ساعات',
    read: true,
  },
  {
    id: '4',
    type: 'update',
    title: 'تم تأكيد الدفع',
    message: 'تم استلام الدفعة الأولى من الطالب خالد لغرفة السكن "الرواد".',
    time: 'أمس، 02:30 م',
    read: true,
  },
  {
    id: '5',
    type: 'booking',
    title: 'تذكير: انتهاء عقد',
    message: 'عقد الطالب يوسف ينتهي بعد 30 يوم، يمكنك إرسال طلب تجديد من خلال لوحة التحكم.',
    time: 'أمس، 09:15 ص',
    read: true,
  }
];

const TypeIcon = ({ type }: { type: NotificationType }) => {
  switch (type) {
    case 'booking':
      return <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600"><Calendar className="w-5 h-5" /></div>;
    case 'message':
      return <div className="p-2.5 rounded-xl bg-green-50 text-green-600"><MessageSquare className="w-5 h-5" /></div>;
    case 'system':
      return <div className="p-2.5 rounded-xl bg-orange-50 text-[#F2994A]"><AlertCircle className="w-5 h-5" /></div>;
    case 'update':
      return <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600"><Home className="w-5 h-5" /></div>;
  }
};

export function Notifications() {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const filteredNotifications = notifications.filter(n => activeTab === 'all' || !n.read);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-['Cairo'] text-[#003344] flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#003344]/5">
              <Bell className="w-8 h-8 text-[#003344]" />
            </div>
            الإشعارات
          </h1>
          <p className="text-[#64748b] mt-2">
            تابع أحدث التنبيهات، الطلبات، والرسائل الخاصة بعقاراتك
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center justify-center gap-2 text-sm text-[#F2994A] bg-[#F2994A]/10 hover:bg-[#F2994A]/20 py-2 px-4 rounded-xl transition-colors font-medium self-start sm:self-auto"
          >
            <CheckCircle2 className="w-4 h-4" />
            تحديد الكل كمقروء
          </button>
        )}
      </div>

      {/* Glassmorphic Container */}
      <div className="glass-panel rounded-2xl p-2 sm:p-4 border border-white/60 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 -translate-x-1/2 translate-y-1/2" />

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 p-1 bg-[#003344]/5 rounded-xl w-max border border-white/40">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'all'
                ? 'bg-white text-[#003344] shadow-sm'
                : 'text-[#64748b] hover:text-[#003344]'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'unread'
                ? 'bg-white text-[#003344] shadow-sm'
                : 'text-[#64748b] hover:text-[#003344]'
            }`}
          >
            غير مقروءة
            {unreadCount > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === 'unread' ? 'bg-[#F2994A] text-white' : 'bg-[#003344]/10 text-[#003344]'}`}>
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  whileHover={{ scale: 1.005 }}
                  onClick={() => markAsRead(notification.id)}
                  className={`relative p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                    notification.read 
                      ? 'bg-white/60 border-white hover:bg-white/90 shadow-sm hover:shadow-md' 
                      : 'bg-white border-[#F2994A]/20 shadow-md ring-1 ring-[#F2994A]/10'
                  }`}
                >
                  {/* Unread indicator dot */}
                  {!notification.read && (
                    <div className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-[#F2994A] transform -translate-y-1/2" />
                  )}

                  <div className="flex gap-4 items-start">
                    <TypeIcon type={notification.type} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-1">
                        <h3 className={`font-['Cairo'] font-bold text-lg truncate ${notification.read ? 'text-[#003344]' : 'text-[#003344]'}`}>
                          {notification.title}
                        </h3>
                        <span className="flex items-center gap-1.5 text-xs text-[#64748b] whitespace-nowrap">
                          <Clock className="w-3.5 h-3.5" />
                          {notification.time}
                        </span>
                      </div>
                      
                      <p className={`text-sm leading-relaxed ${notification.read ? 'text-[#64748b]' : 'text-[#334155] font-medium'}`}>
                        {notification.message}
                      </p>

                      {notification.actionRequired && (
                        <div className="mt-4 flex items-center gap-3">
                          <button className="gradient-btn px-4 py-2 rounded-lg text-sm font-medium shadow-md">
                            مراجعة الطلب
                          </button>
                          <button className="px-4 py-2 rounded-lg text-sm font-medium text-[#64748b] hover:bg-[#003344]/5 transition-colors">
                            تجاهل
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100 shadow-inner">
                  <Bell className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="font-['Cairo'] font-bold text-xl text-[#003344] mb-2">لا توجد إشعارات جديدة</h3>
                <p className="text-[#64748b]">أنت على اطلاع دائم بكل التحديثات الخاصة بحسابك وعقاراتك.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}