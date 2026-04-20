import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/axios';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<'student' | 'owner'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Update Context
      login(response.data.user, response.data.token);
      
      toast.success('تم تسجيل الدخول بنجاح');
      
      if (accountType === 'student') {
        navigate('/');
      } else {
        navigate('/owner');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'فشل تسجيل الدخول. يرجى التأكد من البيانات.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-white px-6 py-12 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#003344]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F2994A]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-[#003344] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="font-['Cairo'] font-bold text-3xl text-[#F2994A]">س</span>
            </div>
            <span className="font-['Cairo'] font-bold text-3xl text-[#003344]">سكني</span>
          </Link>
          <h1 className="font-['Cairo'] font-bold text-3xl md:text-4xl text-[#003344] mb-2">
            مرحباً بعودتك
          </h1>
          <p className="text-gray-600">
            سجل دخول للوصول إلى حسابك
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-2xl p-8 border border-white/60 shadow-xl"
        >
          {/* Account Type Toggle */}
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl mb-6">
            <button
              onClick={() => setAccountType('student')}
              className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
                accountType === 'student'
                  ? 'bg-white text-[#003344] shadow-sm'
                  : 'text-gray-500 hover:text-[#003344]'
              }`}
            >
              طالب
            </button>
            <button
              onClick={() => setAccountType('owner')}
              className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
                accountType === 'owner'
                  ? 'bg-white text-[#003344] shadow-sm'
                  : 'text-gray-500 hover:text-[#003344]'
              }`}
            >
              مالك سكن
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-[#003344] mb-2">
                البريد الإلكتروني أو رقم الهاتف
              </label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني أو رقم هاتفك"
                  className="w-full pr-12 pl-4 py-3.5 rounded-xl bg-white/80 border-2 border-gray-200 focus:border-[#003344] focus:outline-none text-[#003344] transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-[#003344] mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="w-full pr-12 pl-12 py-3.5 rounded-xl bg-white/80 border-2 border-gray-200 focus:border-[#003344] focus:outline-none text-[#003344] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#003344] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-left">
              <Link
                to="/forgot-password"
                className="text-sm text-[#F2994A] hover:underline font-bold"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-br from-[#003344] to-[#004455] text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}</span>
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">أو</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600">
            ليس لديك حساب؟{' '}
            <Link to="/account-type" className="text-[#F2994A] font-bold hover:underline">
              إنشاء حساب جديد
            </Link>
          </p>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <Link to="/" className="text-gray-500 hover:text-[#003344] text-sm flex items-center justify-center gap-2 transition-colors">
            <span>العودة للرئيسية</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
