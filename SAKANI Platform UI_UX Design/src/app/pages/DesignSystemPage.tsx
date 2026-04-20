import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Search, Heart, ChevronDown } from 'lucide-react';

export const DesignSystemPage = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(label);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Color Palette
  const colors = {
    primary: [
      { name: 'Primary Deep Navy', hex: '#003344', usage: 'العناوين الرئيسية، الأزرار الأساسية' },
      { name: 'Primary Navy Hover', hex: '#004455', usage: 'حالة Hover للأزرار' },
      { name: 'Primary Navy Light', hex: '#005566', usage: 'خلفيات ثانوية' },
    ],
    accent: [
      { name: 'Accent Orange', hex: '#F2994A', usage: 'أزرار CTA، العناصر التفاعلية' },
      { name: 'Accent Orange Dark', hex: '#E27921', usage: 'حالة Hover للعناصر البرتقالية' },
      { name: 'Accent Orange Light', hex: '#F2994A1A', usage: 'خلفيات فاتحة للتمييز' },
    ],
    neutral: [
      { name: 'White', hex: '#FFFFFF', usage: 'الخلفيات الرئيسية' },
      { name: 'Background', hex: '#F8FAFC', usage: 'خلفيات الصفحات' },
      { name: 'Gray 100', hex: '#F1F5F9', usage: 'خلفيات ثانوية' },
      { name: 'Gray 200', hex: '#E2E8F0', usage: 'حدود العناصر' },
      { name: 'Gray 400', hex: '#94A3B8', usage: 'النصوص الثانوية' },
      { name: 'Gray 600', hex: '#475569', usage: 'نصوص عادية' },
      { name: 'Gray 900', hex: '#0F172A', usage: 'نصوص داكنة' },
    ],
    status: [
      { name: 'Success Green', hex: '#22C55E', usage: 'رسائل النجاح، حالات مكتملة' },
      { name: 'Error Red', hex: '#EF4444', usage: 'رسائل الخطأ، تحذيرات' },
      { name: 'Warning Yellow', hex: '#F59E0B', usage: 'تنبيهات، حالات انتظار' },
      { name: 'Info Blue', hex: '#3B82F6', usage: 'معلومات، نصائح' },
    ],
  };

  // Typography
  const typographyExamples = [
    { level: 'H1 - Hero', class: 'text-6xl md:text-7xl', font: 'Cairo', size: '60-72px', lineHeight: '1.1', weight: 'Bold' },
    { level: 'H2 - Section', class: 'text-4xl md:text-5xl', font: 'Cairo', size: '40-48px', lineHeight: '1.2', weight: 'Bold' },
    { level: 'H3 - Card Title', class: 'text-2xl md:text-3xl', font: 'Cairo', size: '24-30px', lineHeight: '1.3', weight: 'Bold' },
    { level: 'H4 - Component', class: 'text-xl md:text-2xl', font: 'Cairo', size: '20-24px', lineHeight: '1.4', weight: 'Bold' },
    { level: 'Body - Paragraph', class: 'text-base', font: 'Readex Pro', size: '16px', lineHeight: '1.6', weight: 'Regular' },
    { level: 'Small - Caption', class: 'text-sm', font: 'Readex Pro', size: '14px', lineHeight: '1.5', weight: 'Regular' },
    { level: 'Tiny - Label', class: 'text-xs', font: 'Readex Pro', size: '12px', lineHeight: '1.4', weight: 'Medium' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#f8fafc] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-[#003344] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="font-['Cairo'] font-bold text-3xl text-[#F2994A]">س</span>
            </div>
            <h1 className="font-['Cairo'] font-bold text-5xl text-[#003344]">سكني - Design System</h1>
          </div>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            المرجع البصري الكامل لنظام التصميم "Academic Architect"
            <br />
            دليلك لفهم روح التصميم وتطبيقه بشكل متسق
          </p>
        </motion.div>

        {/* 1. Color Palette */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-['Cairo'] font-bold text-4xl text-[#003344] mb-3">
              🎨 لوحة الألوان
            </h2>
            <p className="text-gray-600 text-lg">
              نظام ألوان احترافي يعكس الثقة والأمان
            </p>
          </motion.div>

          {/* Primary Colors */}
          <div className="mb-12">
            <h3 className="font-['Cairo'] font-bold text-2xl text-[#003344] mb-6">الألوان الأساسية (Primary)</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {colors.primary.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel rounded-2xl overflow-hidden border border-white/60 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div
                    className="h-40 w-full relative group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <p className="font-['Cairo'] font-bold text-2xl mb-2">{color.hex}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-['Cairo'] font-bold text-lg text-[#003344] mb-2">{color.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{color.usage}</p>
                    <button
                      onClick={() => copyToClipboard(color.hex, color.name)}
                      className="flex items-center gap-2 text-sm text-[#F2994A] hover:text-[#E27921] font-bold transition-colors"
                    >
                      {copiedColor === color.name ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>تم النسخ!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>نسخ الكود</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Accent Colors */}
          <div className="mb-12">
            <h3 className="font-['Cairo'] font-bold text-2xl text-[#003344] mb-6">الألوان التفاعلية (Accent)</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {colors.accent.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel rounded-2xl overflow-hidden border border-white/60 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div
                    className="h-40 w-full relative group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <p className="font-['Cairo'] font-bold text-2xl mb-2">{color.hex}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-['Cairo'] font-bold text-lg text-[#003344] mb-2">{color.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{color.usage}</p>
                    <button
                      onClick={() => copyToClipboard(color.hex, color.name)}
                      className="flex items-center gap-2 text-sm text-[#F2994A] hover:text-[#E27921] font-bold transition-colors"
                    >
                      {copiedColor === color.name ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>تم النسخ!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>نسخ الكود</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Neutral Colors */}
          <div className="mb-12">
            <h3 className="font-['Cairo'] font-bold text-2xl text-[#003344] mb-6">الألوان المحايدة (Tonal Layering)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {colors.neutral.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-panel rounded-xl overflow-hidden border border-white/60 shadow-md hover:shadow-lg transition-all group cursor-pointer"
                  onClick={() => copyToClipboard(color.hex, color.name)}
                >
                  <div
                    className="h-24 w-full group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div className="p-3">
                    <h4 className="font-bold text-sm text-[#003344] mb-1">{color.name}</h4>
                    <p className="text-xs text-gray-500 font-mono">{color.hex}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Status Colors */}
          <div>
            <h3 className="font-['Cairo'] font-bold text-2xl text-[#003344] mb-6">ألوان الحالات (Status)</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {colors.status.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel rounded-2xl overflow-hidden border border-white/60 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div
                    className="h-32 w-full relative group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="font-['Cairo'] font-bold text-xl text-white">{color.hex}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-['Cairo'] font-bold text-base text-[#003344] mb-1">{color.name}</h4>
                    <p className="text-xs text-gray-600">{color.usage}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Typography */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-['Cairo'] font-bold text-4xl text-[#003344] mb-3">
              ✍️ دليل الخطوط
            </h2>
            <p className="text-gray-600 text-lg">
              نظام الخطوط: Cairo للعناوين، Readex Pro للنصوص
            </p>
          </motion.div>

          <div className="glass-panel rounded-2xl p-8 md:p-12 border border-white/60 shadow-xl">
            {typographyExamples.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-12 last:mb-0 pb-12 last:pb-0 border-b last:border-b-0 border-gray-200"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3
                      className={`${type.class} ${type.font === 'Cairo' ? "font-['Cairo']" : ''} font-bold text-[#003344] mb-4`}
                    >
                      سكني - SAKANI
                    </h3>
                  </div>
                  <div className="bg-white/60 rounded-xl p-6 space-y-2">
                    <p className="text-sm text-gray-500 mb-3">{type.level}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الخط:</span>
                      <span className="font-bold text-[#003344]">{type.font}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الحجم:</span>
                      <span className="font-bold text-[#003344]">{type.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Line Height:</span>
                      <span className="font-bold text-[#003344]">{type.lineHeight}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الوزن:</span>
                      <span className="font-bold text-[#003344]">{type.weight}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. Components Gallery */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-['Cairo'] font-bold text-4xl text-[#003344] mb-3">
              🧩 مكتبة العناصر
            </h2>
            <p className="text-gray-600 text-lg">
              العناصر الأساسية المستخدمة في جميع أنحاء المنصة
            </p>
          </motion.div>

          {/* Buttons */}
          <div className="mb-16">
            <h3 className="font-['Cairo'] font-bold text-2xl text-[#003344] mb-8">الأزرار (Buttons)</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Primary Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel rounded-2xl p-8 border border-white/60 shadow-lg"
              >
                <h4 className="font-['Cairo'] font-bold text-lg text-[#003344] mb-6">Primary Button</h4>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-3">حالة عادية:</p>
                    <button className="px-8 py-4 rounded-xl bg-gradient-to-br from-[#003344] to-[#004455] text-white font-bold shadow-lg">
                      زر أساسي
                    </button>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Hover State:</p>
                    <button className="px-8 py-4 rounded-xl bg-gradient-to-br from-[#004455] to-[#005566] text-white font-bold shadow-xl">
                      زر أساسي
                    </button>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm">
                  <p><span className="font-bold text-[#003344]">Gradient:</span> from-[#003344] to-[#004455]</p>
                  <p><span className="font-bold text-[#003344]">Padding:</span> 16px 32px</p>
                  <p><span className="font-bold text-[#003344]">Border Radius:</span> 12px</p>
                  <p><span className="font-bold text-[#003344]">Shadow:</span> lg</p>
                </div>
              </motion.div>

              {/* Secondary Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-panel rounded-2xl p-8 border border-white/60 shadow-lg"
              >
                <h4 className="font-['Cairo'] font-bold text-lg text-[#003344] mb-6">Secondary Button (CTA)</h4>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-3">حالة عادية:</p>
                    <button className="px-8 py-4 rounded-xl bg-gradient-to-br from-[#F2994A] to-[#E27921] text-white font-bold shadow-lg">
                      ابدأ الآن
                    </button>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Hover State:</p>
                    <button className="px-8 py-4 rounded-xl bg-gradient-to-br from-[#E27921] to-[#D16B1B] text-white font-bold shadow-xl scale-105">
                      ابدأ الآن
                    </button>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm">
                  <p><span className="font-bold text-[#003344]">Gradient:</span> from-[#F2994A] to-[#E27921]</p>
                  <p><span className="font-bold text-[#003344]">Padding:</span> 16px 32px</p>
                  <p><span className="font-bold text-[#003344]">Border Radius:</span> 12px</p>
                  <p><span className="font-bold text-[#003344]">Hover:</span> Scale 1.05</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Cards */}
          <div className="mb-16">
            <h3 className="font-['Cairo'] font-bold text-2xl text-[#003344] mb-8">البطاقات (Cards)</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel rounded-2xl p-8 border border-white/60 shadow-lg hover:shadow-xl transition-all"
              >
                <h4 className="font-['Cairo'] font-bold text-lg text-[#003344] mb-4">Glass Panel Card</h4>
                <p className="text-gray-600 mb-6">
                  البطاقة الأساسية المستخدمة في جميع أنحاء المنصة مع تأثير Glassmorphism
                </p>
                <div className="space-y-2 text-sm bg-white/60 rounded-xl p-4">
                  <p><span className="font-bold text-[#003344]">Background:</span> rgba(255, 255, 255, 0.7)</p>
                  <p><span className="font-bold text-[#003344]">Backdrop Filter:</span> blur(12px)</p>
                  <p><span className="font-bold text-[#003344]">Border:</span> 1px solid rgba(255, 255, 255, 0.6)</p>
                  <p><span className="font-bold text-[#003344]">Border Radius:</span> 16px</p>
                  <p><span className="font-bold text-[#003344]">Padding:</span> 32px</p>
                  <p><span className="font-bold text-[#003344]">Shadow:</span> 0 4px 30px rgba(0, 51, 68, 0.05)</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-md hover:shadow-lg transition-all"
              >
                <h4 className="font-['Cairo'] font-bold text-lg text-[#003344] mb-4">Standard Card</h4>
                <p className="text-gray-600 mb-6">
                  بطاقة بيضاء عادية للعناصر التي تحتاج لخلفية صلبة
                </p>
                <div className="space-y-2 text-sm bg-gray-50 rounded-xl p-4">
                  <p><span className="font-bold text-[#003344]">Background:</span> #FFFFFF</p>
                  <p><span className="font-bold text-[#003344]">Border:</span> 2px solid #E2E8F0</p>
                  <p><span className="font-bold text-[#003344]">Border Radius:</span> 16px</p>
                  <p><span className="font-bold text-[#003344]">Padding:</span> 32px</p>
                  <p><span className="font-bold text-[#003344]">Shadow:</span> md</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Input Fields */}
          <div className="mb-16">
            <h3 className="font-['Cairo'] font-bold text-2xl text-[#003344] mb-8">حقول الإدخال (Inputs)</h3>
            <div className="glass-panel rounded-2xl p-8 border border-white/60 shadow-lg">
              <div className="space-y-8">
                <div>
                  <p className="text-sm text-gray-600 mb-3 font-bold">حالة عادية (Normal State):</p>
                  <div className="relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="ابحث عن سكنك..."
                      className="w-full pr-12 pl-4 py-4 rounded-xl bg-white border-2 border-gray-200 text-[#003344]"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-3 font-bold">حالة التركيز (Focus State):</p>
                  <div className="relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F2994A]" />
                    <input
                      type="text"
                      placeholder="ابحث عن سكنك..."
                      className="w-full pr-12 pl-4 py-4 rounded-xl bg-white border-2 border-[#F2994A] text-[#003344] outline-none ring-2 ring-[#F2994A]/20"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 space-y-2 text-sm">
                <p><span className="font-bold text-[#003344]">Padding:</span> 16px 48px 16px 16px</p>
                <p><span className="font-bold text-[#003344]">Border Radius:</span> 12px</p>
                <p><span className="font-bold text-[#003344]">Border (Normal):</span> 2px solid #E2E8F0</p>
                <p><span className="font-bold text-[#003344]">Border (Focus):</span> 2px solid #F2994A</p>
                <p><span className="font-bold text-[#003344]">Ring (Focus):</span> 2px #F2994A/20</p>
              </div>
            </div>
          </div>

          {/* Icons */}
          <div>
            <h3 className="font-['Cairo'] font-bold text-2xl text-[#003344] mb-8">الأيقونات (Icons)</h3>
            <div className="glass-panel rounded-2xl p-8 border border-white/60 shadow-lg">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
                {[
                  { icon: Search, label: 'بحث' },
                  { icon: Heart, label: 'مفضلة' },
                  { icon: ChevronDown, label: 'قائمة' },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#003344] to-[#004455] flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 space-y-2 text-sm">
                <p><span className="font-bold text-[#003344]">Library:</span> Lucide React</p>
                <p><span className="font-bold text-[#003344]">Sizes:</span> 16px (sm), 20px (md), 24px (lg)</p>
                <p><span className="font-bold text-[#003344]">Stroke Width:</span> 2px</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Layout Grid */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-['Cairo'] font-bold text-4xl text-[#003344] mb-3">
              📐 القواعد الهندسية
            </h2>
            <p className="text-gray-600 text-lg">
              نظام الشبكة والمسافات (8px Grid System)
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-2xl p-8 border border-white/60 shadow-lg"
            >
              <h3 className="font-['Cairo'] font-bold text-xl text-[#003344] mb-6">نظام الشبكة (Grid System)</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F2994A] mt-2"></div>
                  <div>
                    <p className="font-bold text-[#003344]">الأعمدة (Columns):</p>
                    <p className="text-gray-600 text-sm">12 عمود على الديسكتوب، 4 أعمدة على الموبايل</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F2994A] mt-2"></div>
                  <div>
                    <p className="font-bold text-[#003344]">Gutters (المسافات بين الأعمدة):</p>
                    <p className="text-gray-600 text-sm">24px على الديسكتوب، 16px على الموبايل</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F2994A] mt-2"></div>
                  <div>
                    <p className="font-bold text-[#003344]">Margins (الهوامش الخارجية):</p>
                    <p className="text-gray-600 text-sm">24px على جميع الأطراف</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F2994A] mt-2"></div>
                  <div>
                    <p className="font-bold text-[#003344]">Max Width:</p>
                    <p className="text-gray-600 text-sm">1280px (7xl) للمحتوى الرئيسي</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel rounded-2xl p-8 border border-white/60 shadow-lg"
            >
              <h3 className="font-['Cairo'] font-bold text-xl text-[#003344] mb-6">نظام المسافات (8px Grid)</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F2994A] mt-2"></div>
                  <div>
                    <p className="font-bold text-[#003344]">Base Unit:</p>
                    <p className="text-gray-600 text-sm">8px - جميع المسافات مضاعفات الـ 8</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F2994A] mt-2"></div>
                  <div>
                    <p className="font-bold text-[#003344]">Spacing Scale:</p>
                    <p className="text-gray-600 text-sm">8px, 16px, 24px, 32px, 48px, 64px, 96px</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F2994A] mt-2"></div>
                  <div>
                    <p className="font-bold text-[#003344]">Border Radius:</p>
                    <p className="text-gray-600 text-sm">8px, 12px, 16px, 24px للعناصر المختلفة</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F2994A] mt-2"></div>
                  <div>
                    <p className="font-bold text-[#003344]">Component Padding:</p>
                    <p className="text-gray-600 text-sm">16px للعناصر الصغيرة، 32px للبطاقات</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-12 border border-white/60 shadow-xl text-center"
          >
            <h2 className="font-['Cairo'] font-bold text-3xl text-[#003344] mb-6">
              المبادئ الأساسية للتصميم
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#003344] to-[#004455] flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="font-['Cairo'] font-bold text-lg text-[#003344] mb-2">No-Line Rule</h3>
                <p className="text-sm text-gray-600">فصل الأقسام بتغيير لون الخلفية، ليس بخطوط صريحة</p>
              </div>
              <div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F2994A] to-[#E27921] flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="font-['Cairo'] font-bold text-lg text-[#003344] mb-2">Glassmorphism</h3>
                <p className="text-sm text-gray-600">تأثيرات الزجاج والشفافية للعناصر الرئيسية</p>
              </div>
              <div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📏</span>
                </div>
                <h3 className="font-['Cairo'] font-bold text-lg text-[#003344] mb-2">8px Grid</h3>
                <p className="text-sm text-gray-600">جميع المسافات والأحجام مضاعفات الـ 8 بكسل</p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};
