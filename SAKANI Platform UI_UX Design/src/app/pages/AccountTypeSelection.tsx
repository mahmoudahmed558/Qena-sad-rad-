import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { GraduationCap, Key, ArrowRight } from 'lucide-react';

export const AccountTypeSelection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-white px-6 py-12 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#003344]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F2994A]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10">
        {/* Logo & Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-[#003344] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="font-['Cairo'] font-bold text-3xl text-[#F2994A]">س</span>
            </div>
            <span className="font-['Cairo'] font-bold text-3xl text-[#003344]">سكني - SAKANI</span>
          </Link>
          <h1 className="font-['Cairo'] font-bold text-4xl md:text-5xl text-[#003344] mb-4">
            اختر نوع حسابك
          </h1>
          <p className="text-gray-600 text-lg">
            سنقوم بتخصيص تجربتك بناءً على احتياجاتك
          </p>
        </motion.div>

        {/* Account Type Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Student Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8 }}
          >
            <Link
              to="/signup?type=student"
              className="block glass-panel rounded-3xl p-8 md:p-10 border-2 border-white/60 hover:border-[#F2994A]/30 shadow-xl hover:shadow-2xl transition-all group"
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#003344] to-[#004455] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <GraduationCap className="w-12 h-12 text-white" />
                </div>
                <h2 className="font-['Cairo'] font-bold text-3xl text-[#003344] mb-3 group-hover:text-[#F2994A] transition-colors">
                  أنا طالب
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  ابحث عن سكنك المثالي بالقرب من جامعتك، تصفح مئات الخيارات، وتواصل مع ملاك موثوقين
                </p>
                <div className="inline-flex items-center gap-2 text-[#F2994A] font-bold group-hover:gap-3 transition-all">
                  <span>ابدأ البحث الآن</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Owner Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -8 }}
          >
            <Link
              to="/signup?type=owner"
              className="block glass-panel rounded-3xl p-8 md:p-10 border-2 border-white/60 hover:border-[#F2994A]/30 shadow-xl hover:shadow-2xl transition-all group"
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#F2994A] to-[#E27921] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Key className="w-12 h-12 text-white" />
                </div>
                <h2 className="font-['Cairo'] font-bold text-3xl text-[#003344] mb-3 group-hover:text-[#F2994A] transition-colors">
                  أنا مالك سكن
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  أضف عقاراتك، استقبل طلبات الحجز من آلاف الطلاب، وأدِر حجوزاتك بكل سهولة واحترافية
                </p>
                <div className="inline-flex items-center gap-2 text-[#F2994A] font-bold group-hover:gap-3 transition-all">
                  <span>ابدأ الإضافة الآن</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="text-[#F2994A] font-bold hover:underline">
              سجل دخول
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
