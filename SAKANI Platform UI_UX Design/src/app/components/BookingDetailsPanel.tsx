import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, MessageSquare, CheckCircle, XCircle, Calendar, Home, DollarSign, User, GraduationCap, Mail, Phone } from 'lucide-react';

interface BookingDetails {
  id: string;
  studentName: string;
  studentAvatar?: string;
  studentCollege: string;
  studentYear: string;
  studentVerified: boolean;
  propertyName: string;
  startDate: string;
  duration: string;
  amount: string;
  message: string;
  status: string;
}

interface BookingDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingDetails | null;
  onAccept?: (id: string) => void;
  onReject?: (id: string, reason?: string) => void;
  onMessage?: (id: string) => void;
}

export const BookingDetailsPanel: React.FC<BookingDetailsPanelProps> = ({
  isOpen,
  onClose,
  booking,
  onAccept,
  onReject,
  onMessage,
}) => {
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  if (!booking) return null;

  const handleAccept = () => {
    onAccept?.(booking.id);
    onClose();
  };

  const handleReject = () => {
    onReject?.(booking.id, rejectReason);
    setShowRejectDialog(false);
    setRejectReason('');
    onClose();
  };

  const handleMessage = () => {
    onMessage?.(booking.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-full sm:w-[480px] bg-gradient-to-br from-[#f8fafc] to-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 glass-panel border-b border-white/60 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="font-['Cairo'] font-bold text-2xl text-[#003344]">تفاصيل الطلب</h2>
                <p className="text-sm text-gray-500 mt-1">مراجعة واتخاذ القرار</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-white/50 rounded-xl transition-colors text-gray-500 hover:text-[#003344]"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">

              {/* Student Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-panel rounded-2xl p-6 border border-white/60 shadow-lg relative overflow-hidden"
              >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2994A]/10 rounded-full mix-blend-multiply filter blur-2xl -z-10 translate-x-1/2 -translate-y-1/2" />

                <div className="flex items-start gap-4">
                  <div className="relative">
                    {booking.studentAvatar ? (
                      <img
                        src={booking.studentAvatar}
                        alt={booking.studentName}
                        className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#003344] to-[#005566] flex items-center justify-center ring-4 ring-white shadow-lg">
                        <span className="font-['Cairo'] font-bold text-2xl text-white">
                          {booking.studentName.charAt(0)}
                        </span>
                      </div>
                    )}
                    {booking.studentVerified && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 ring-4 ring-white shadow-md"
                      >
                        <ShieldCheck className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-['Cairo'] font-bold text-xl text-[#003344]">
                        {booking.studentName}
                      </h3>
                      {booking.studentVerified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                          موثق
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <GraduationCap className="w-4 h-4 text-[#F2994A]" />
                        <span className="font-bold">{booking.studentCollege}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4 text-[#F2994A]" />
                        <span>{booking.studentYear}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Buttons */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/60">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/60 hover:bg-white rounded-xl text-sm text-gray-600 hover:text-[#003344] transition-all shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>بريد إلكتروني</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/60 hover:bg-white rounded-xl text-sm text-gray-600 hover:text-[#003344] transition-all shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>اتصال</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Booking Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel rounded-2xl p-6 border border-white/60 shadow-lg space-y-4"
              >
                <h3 className="font-['Cairo'] font-bold text-lg text-[#003344] mb-4">
                  تفاصيل الحجز
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                    <div className="p-2 bg-[#003344]/5 rounded-lg shrink-0">
                      <Home className="w-5 h-5 text-[#003344]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">الوحدة السكنية</p>
                      <p className="font-bold text-[#003344] text-sm leading-tight">{booking.propertyName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                    <div className="p-2 bg-[#F2994A]/10 rounded-lg shrink-0">
                      <Calendar className="w-5 h-5 text-[#F2994A]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">تاريخ البداية والمدة</p>
                      <p className="font-bold text-[#003344] text-sm">{booking.startDate}</p>
                      <p className="text-xs text-gray-600 mt-1">{booking.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-[#F2994A]/10 to-[#F2994A]/5 rounded-xl border border-[#F2994A]/20">
                    <div className="p-2 bg-white rounded-lg shrink-0 shadow-sm">
                      <DollarSign className="w-5 h-5 text-[#F2994A]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">المبلغ الإجمالي</p>
                      <p className="font-['Cairo'] font-bold text-[#003344] text-xl">{booking.amount}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Student's Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-panel rounded-2xl p-6 border border-white/60 shadow-lg"
              >
                <h3 className="font-['Cairo'] font-bold text-lg text-[#003344] mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#F2994A]" />
                  رسالة من الطالب
                </h3>
                <div className="bg-white/60 rounded-xl p-4 border border-white/80">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {booking.message}
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="sticky bottom-0 glass-panel rounded-2xl p-6 border border-white/60 shadow-2xl space-y-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAccept}
                  className="w-full gradient-btn py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  قبول الطلب وبدء المحادثة
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMessage}
                  className="w-full py-4 rounded-xl font-bold bg-white hover:bg-gray-50 text-[#003344] border-2 border-[#003344]/20 shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  التواصل مع الطالب أولاً
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowRejectDialog(true)}
                  className="w-full py-4 rounded-xl font-bold bg-white hover:bg-red-50 text-red-600 border-2 border-red-200 hover:border-red-300 shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <XCircle className="w-5 h-5" />
                  رفض الطلب
                </motion.button>
              </motion.div>

            </div>
          </motion.div>

          {/* Reject Dialog */}
          <AnimatePresence>
            {showRejectDialog && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
                  onClick={() => setShowRejectDialog(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="glass-panel rounded-2xl p-6 max-w-md w-full border border-white/60 shadow-2xl"
                  >
                    <h3 className="font-['Cairo'] font-bold text-xl text-[#003344] mb-2">
                      رفض طلب الحجز
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      هل تود إضافة سبب الرفض؟ (اختياري)
                    </p>

                    <textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="مثال: الوحدة لم تعد متاحة في هذه الفترة..."
                      className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-[#F2994A] focus:outline-none text-sm resize-none"
                      rows={4}
                    />

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={handleReject}
                        className="flex-1 py-3 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-md transition-colors"
                      >
                        تأكيد الرفض
                      </button>
                      <button
                        onClick={() => {
                          setShowRejectDialog(false);
                          setRejectReason('');
                        }}
                        className="flex-1 py-3 rounded-xl font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      >
                        إلغاء
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};
