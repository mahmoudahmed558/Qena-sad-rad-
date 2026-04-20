import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

export const WelcomePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const accountType = (searchParams.get('type') as 'student' | 'owner') || 'student';
  const userName = searchParams.get('name') || 'أحمد';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-white px-6 py-12 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#003344]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F2994A]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none animate-pulse" />

      <div className="max-w-2xl w-full relative z-10">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-[#F2994A] flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="font-['Cairo'] font-bold text-4xl md:text-5xl text-[#003344] mb-4">
            مرحباً بك في عائلة سكني
            <br />
            يا {userName}! 🎉
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto">
            {accountType === 'student'
              ? 'نحن نجهز لك أفضل الخيارات السكنية القريبة من جامعتك. ابدأ رحلة البحث الآن واحصل على سكنك المثالي!'
              : 'أنت الآن جزء من شبكة الملاك الموثوقين. ابدأ بإضافة عقاراتك واستقبل طلبات الحجز من آلاف الطلاب!'}
          </p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          {accountType === 'student' ? (
            <>
              <div className="glass-panel rounded-2xl p-6 border border-white/60 text-center">
                <div className="text-3xl mb-2">🏠</div>
                <h3 className="font-['Cairo'] font-bold text-[#003344] mb-1">500+</h3>
                <p className="text-sm text-gray-600">وحدة سكنية متاحة</p>
              </div>
              <div className="glass-panel rounded-2xl p-6 border border-white/60 text-center">
                <div className="text-3xl mb-2">✅</div>
                <h3 className="font-['Cairo'] font-bold text-[#003344] mb-1">100%</h3>
                <p className="text-sm text-gray-600">ملاك موثوقين</p>
              </div>
              <div className="glass-panel rounded-2xl p-6 border border-white/60 text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-['Cairo'] font-bold text-[#003344] mb-1">24/7</h3>
                <p className="text-sm text-gray-600">دعم فني سريع</p>
              </div>
            </>
          ) : (
            <>
              <div className="glass-panel rounded-2xl p-6 border border-white/60 text-center">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-['Cairo'] font-bold text-[#003344] mb-1">10,000+</h3>
                <p className="text-sm text-gray-600">طالب نشط</p>
              </div>
              <div className="glass-panel rounded-2xl p-6 border border-white/60 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-['Cairo'] font-bold text-[#003344] mb-1">صفر</h3>
                <p className="text-sm text-gray-600">عمولة على الحجوزات</p>
              </div>
              <div className="glass-panel rounded-2xl p-6 border border-white/60 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-['Cairo'] font-bold text-[#003344] mb-1">سهل</h3>
                <p className="text-sm text-gray-600">إدارة احترافية</p>
              </div>
            </>
          )}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to={accountType === 'student' ? '/' : '/owner'}
            className="block"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 rounded-2xl gradient-btn text-white font-bold text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3"
            >
              <span>
                {accountType === 'student' ? 'ابدأ البحث عن سكنك' : 'انتقل إلى لوحة التحكم'}
              </span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            💡 نصيحة: أكمل ملفك الشخصي الآن لتحصل على تجربة أفضل
          </p>
        </motion.div>
      </div>
    </div>
  );
};
