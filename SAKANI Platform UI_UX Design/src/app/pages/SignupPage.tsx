import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Phone, Lock, Eye, EyeOff, Upload, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/axios';

export const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const accountType = (searchParams.get('type') as 'student' | 'owner') || 'student';

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    universityEmail: '',
    idDocument: null as File | null,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange('idDocument', file);
    }
  };

  const handleNextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // The backend expects: name, email, password
      const response = await api.post('/auth/register', { 
        name: formData.fullName, 
        email: formData.email, 
        password: formData.password 
      });
      
      // Auto login after register if API returns token, else navigate to login.
      // Looking at auth.controller.js, register returns id, name, email and signs a token but does NOT return it. Wait...
      // Let me assume we just redirect to login for now if token is missing. Or redirect to welcome.
      toast.success('تم إنشاء الحساب بنجاح');
      navigate('/welcome');
    } catch (error: any) {
       toast.error(error.response?.data?.message || 'فشل في إنشاء الحساب. تأكد من البيانات أو البريد الإلكتروني.');
    } finally {
      setIsLoading(false);
    }
  };

  const isStep1Valid = formData.fullName && formData.phone && formData.email && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-white px-6 py-12 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#003344]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F2994A]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10">
        {/* Logo & Title */}
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
            إنشاء حساب {accountType === 'student' ? 'طالب' : 'مالك سكن'}
          </h1>
          <p className="text-gray-600">
            أكمل البيانات التالية لإنشاء حسابك
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4">
            {[1, 2].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= num
                      ? 'bg-gradient-to-br from-[#003344] to-[#004455] text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > num ? <CheckCircle className="w-5 h-5" /> : num}
                </div>
                {num < 2 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded-full transition-all ${
                      step > num ? 'bg-[#003344]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 mt-3">
            <span className={`text-sm font-bold ${step === 1 ? 'text-[#003344]' : 'text-gray-400'}`}>
              البيانات الأساسية
            </span>
            <span className={`text-sm font-bold ${step === 2 ? 'text-[#003344]' : 'text-gray-400'}`}>
              التوثيق
            </span>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-2xl p-8 border border-white/60 shadow-xl"
        >
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-bold text-[#003344] mb-2">
                      الاسم الكامل
                    </label>
                    <div className="relative">
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="أدخل اسمك الكامل"
                        className="w-full pr-12 pl-4 py-3.5 rounded-xl bg-white/80 border-2 border-gray-200 focus:border-[#003344] focus:outline-none text-[#003344] transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-bold text-[#003344] mb-2">
                      رقم الهاتف
                    </label>
                    <div className="relative">
                      <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="05xxxxxxxx"
                        className="w-full pr-12 pl-4 py-3.5 rounded-xl bg-white/80 border-2 border-gray-200 focus:border-[#003344] focus:outline-none text-[#003344] transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-[#003344] mb-2">
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="example@email.com"
                        className="w-full pr-12 pl-4 py-3.5 rounded-xl bg-white/80 border-2 border-gray-200 focus:border-[#003344] focus:outline-none text-[#003344] transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* University Email (Optional for Students) */}
                  {accountType === 'student' && (
                    <div>
                      <label className="block text-sm font-bold text-[#003344] mb-2">
                        البريد الإلكتروني الجامعي{' '}
                        <span className="text-gray-400 text-xs">(اختياري - للحصول على شارة موثق)</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={formData.universityEmail}
                          onChange={(e) => handleInputChange('universityEmail', e.target.value)}
                          placeholder="student@university.edu.sa"
                          className="w-full pr-12 pl-4 py-3.5 rounded-xl bg-white/80 border-2 border-gray-200 focus:border-[#003344] focus:outline-none text-[#003344] transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-bold text-[#003344] mb-2">
                      كلمة المرور
                    </label>
                    <div className="relative">
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
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

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-bold text-[#003344] mb-2">
                      تأكيد كلمة المرور
                    </label>
                    <div className="relative">
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="أعد إدخال كلمة المرور"
                        className="w-full pr-12 pl-4 py-3.5 rounded-xl bg-white/80 border-2 border-gray-200 focus:border-[#003344] focus:outline-none text-[#003344] transition-all"
                        required
                      />
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">كلمة المرور غير متطابقة</p>
                    )}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleNextStep}
                    disabled={!isStep1Valid}
                    className="w-full py-4 rounded-xl bg-gradient-to-br from-[#003344] to-[#004455] text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>التالي</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Verification */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="font-['Cairo'] font-bold text-xl text-[#003344] mb-2">
                      التوثيق (اختياري)
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {accountType === 'student'
                        ? 'ارفع صورة الكارنيه الجامعي للحصول على شارة طالب موثق'
                        : 'ارفع صورة البطاقة الشخصية لضمان أمان الطلاب'}
                    </p>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-bold text-[#003344] mb-3">
                      {accountType === 'student' ? 'صورة الكارنيه الجامعي' : 'صورة البطاقة الشخصية'}
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="id-upload"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="id-upload"
                        className="block p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#F2994A] transition-colors cursor-pointer group"
                      >
                        <div className="text-center">
                          <Upload className="w-12 h-12 text-gray-400 group-hover:text-[#F2994A] mx-auto mb-3 transition-colors" />
                          {formData.idDocument ? (
                            <p className="text-[#003344] font-bold">{formData.idDocument.name}</p>
                          ) : (
                            <>
                              <p className="text-[#003344] font-bold mb-1">اضغط لرفع الملف</p>
                              <p className="text-gray-500 text-sm">JPG, PNG أو PDF (الحد الأقصى 5 ميجا)</p>
                            </>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-900">
                      💡 <span className="font-bold">نصيحة:</span> التوثيق يزيد من مصداقيتك ويساعدك في {accountType === 'student' ? 'الحصول على قبول أسرع من الملاك' : 'جذب المزيد من الطلاب'}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handlePreviousStep}
                      className="flex-1 py-4 rounded-xl bg-white border-2 border-gray-200 text-[#003344] font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span>السابق</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-4 rounded-xl gradient-btn text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-[#003344]"
                    >
                      <span>{isLoading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}</span>
                      {!isLoading && <CheckCircle className="w-5 h-5" />}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Login Link */}
          {step === 1 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                لديك حساب بالفعل؟{' '}
                <Link to="/login" className="text-[#F2994A] font-bold hover:underline">
                  سجل دخول
                </Link>
              </p>
            </div>
          )}
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <Link to="/" className="text-gray-500 hover:text-[#003344] text-sm transition-colors">
            العودة للرئيسية
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
