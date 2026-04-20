import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Search, ShieldCheck, MessageSquare, SlidersHorizontal, MapPin, ArrowRight, CheckCircle, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';

const FEATURED_PROPERTIES = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
    title: 'سكن المدينة الجامعية - شقة زهرة النيل',
    location: 'حي الجامعة، قنا',
    price: 800,
    rating: 4.8,
    reviews: 124,
    type: 'شقة مفروشة',
    amenities: ['واي فاي', 'موقف سيارات', 'مطبخ مجهز'],
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1502672260066-6bc36a7b02bc?q=80&w=800&auto=format&fit=crop',
    title: 'استوديو فاخر - حي الكورنيش',
    location: 'الكورنيش، قنا',
    price: 600,
    rating: 4.9,
    reviews: 89,
    type: 'استوديو',
    amenities: ['واي فاي', 'أثاث', 'مطبخ مجهز'],
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop',
    title: 'شقق النور المفروشة',
    location: 'حي الشرق، قنا',
    price: 700,
    rating: 4.7,
    reviews: 156,
    type: 'شقة مشتركة',
    amenities: ['واي فاي', 'موقف سيارات'],
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop',
    title: 'مجمع واحة العلوم السكني',
    location: 'حي الجامعة، قنا',
    price: 900,
    rating: 5.0,
    reviews: 67,
    type: 'غرفة خاصة',
    amenities: ['واي فاي', 'موقف سيارات', 'مطبخ مجهز', 'أثاث'],
  },
];

const TESTIMONIALS = [
  {
    name: 'أحمد محمد',
    college: 'كلية الهندسة',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    text: 'منصة سكني وفرت علي وقت ومجهود كبير في البحث. لقيت سكن قريب من الكلية وبسعر معقول.',
    rating: 5,
  },
  {
    name: 'سارة عبدالله',
    college: 'كلية الطب',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    text: 'التواصل المباشر مع المالك خلاني أطمن قبل ما أحجز. تجربة ممتازة جداً!',
    rating: 5,
  },
  {
    name: 'خالد حسن',
    college: 'كلية التجارة',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
    text: 'أفضل منصة للبحث عن سكن جامعي في قنا. سهلة الاستخدام وفيها خيارات كتير.',
    rating: 5,
  },
];

export const LandingPageNew = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-[#f8fafc] to-white py-20 md:py-32 px-6 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#003344]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F2994A]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Editorial Asymmetry */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#F2994A]/20 shadow-sm">
                <span className="w-2 h-2 bg-[#F2994A] rounded-full animate-pulse"></span>
                <span className="text-sm font-bold text-[#003344]">منصة السكن الجامعي الأولى في قنا</span>
              </div>

              <h1 className="font-['Cairo'] font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-[#003344]">
                سكنك الجامعي في قنا
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#F2994A] to-[#E27921]">
                  أمان، راحة، وقرب
                </span>
                <br />
                من كليتك
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                ابحث عن سكنك المثالي بالقرب من جامعة جنوب الوادي بسهولة. نوفر لك خيارات متنوعة من ملاك موثوقين مع تجربة حجز سلسة وشفافة.
              </p>

              {/* Smart Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-panel rounded-2xl p-4 border border-white/60 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ابحث عن المنطقة أو الحي..."
                      className="w-full pr-12 pl-4 py-4 rounded-xl bg-white border-2 border-transparent focus:border-[#F2994A] focus:outline-none text-[#003344] font-medium"
                    />
                  </div>
                  <Link
                    to="/results"
                    className="gradient-btn px-8 py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Search className="w-5 h-5" />
                    <span>ابحث الآن</span>
                  </Link>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#003344] to-[#004455] ring-2 ring-white"></div>
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-[#003344]">500+</p>
                    <p className="text-xs text-gray-500">طالب راضٍ</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#F2994A] fill-[#F2994A]" />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-[#003344]">4.9/5</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop"
                  alt="Student Housing"
                  className="w-full h-[500px] md:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-8 right-8 glass-panel rounded-2xl p-5 border border-white/60 shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                      <ShieldCheck className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="font-['Cairo'] font-bold text-xl text-white">100%</p>
                      <p className="text-sm text-white/80">ملاك موثقين</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Propositions - No Line Rule */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-['Cairo'] font-bold text-4xl md:text-5xl text-[#003344] mb-4">
              ليه تختار سكني؟
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              صممنا المنصة لتلبية احتياجاتك كطالب جامعي
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: 'ملاك موثقين',
                description: 'نضمن لك التعامل مع أصحاب سكن حقيقيين تم التحقق من هويتهم لضمان أمانك وسلامتك.',
                color: 'from-green-400 to-green-600',
              },
              {
                icon: SlidersHorizontal,
                title: 'بحث ذكي',
                description: 'فلترة دقيقة تناسب ميزانيتك كطالب وتعرض لك أفضل الخيارات القريبة من جامعتك.',
                color: 'from-[#003344] to-[#004455]',
              },
              {
                icon: MessageSquare,
                title: 'شات مباشر',
                description: 'تواصل فوراً مع المالك واتفق على كل التفاصيل قبل الحجز بدون وسطاء.',
                color: 'from-[#F2994A] to-[#E27921]',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-panel rounded-2xl p-8 border border-white/60 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-['Cairo'] font-bold text-2xl text-[#003344] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings - Subtle Background Change */}
      <section className="bg-gradient-to-b from-white to-[#f8fafc] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="font-['Cairo'] font-bold text-4xl md:text-5xl text-[#003344] mb-4">
                أحدث الوحدات المضافة
              </h2>
              <p className="text-gray-600 text-lg">
                استكشف أفضل الخيارات السكنية المتاحة حالياً
              </p>
            </div>
            <Link
              to="/results"
              className="hidden md:flex items-center gap-2 text-[#F2994A] hover:text-[#E27921] font-bold transition-colors group"
            >
              <span>عرض كل الوحدات</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {FEATURED_PROPERTIES.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PropertyCard
                  {...property}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              </motion.div>
            ))}
          </div>

          <Link
            to="/results"
            className="md:hidden flex items-center justify-center gap-2 text-[#F2994A] hover:text-[#E27921] font-bold transition-colors"
          >
            <span>عرض كل الوحدات</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-['Cairo'] font-bold text-4xl md:text-5xl text-[#003344] mb-4">
              كيف يعمل سكني؟
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              ثلاث خطوات بسيطة للحصول على سكنك المثالي
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-1/2 right-0 h-1 bg-gradient-to-r from-[#F2994A]/20 via-[#F2994A]/40 to-[#F2994A]/20 -translate-x-1/2 w-2/3"></div>

            {[
              {
                number: '1',
                title: 'ابحث عن سكنك',
                description: 'استخدم الفلاتر الذكية للبحث عن السكن المناسب لميزانيتك وموقعك',
                icon: Search,
              },
              {
                number: '2',
                title: 'تواصل مع المالك',
                description: 'تحدث مباشرة مع المالك واستفسر عن كل التفاصيل التي تهمك',
                icon: MessageSquare,
              },
              {
                number: '3',
                title: 'احجز وانتقل للسكن',
                description: 'أكمل الحجز وانتقل إلى سكنك الجديد بكل راحة وأمان',
                icon: CheckCircle,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#003344] to-[#004455] flex items-center justify-center shadow-2xl relative z-10">
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-[#F2994A] to-[#E27921] flex items-center justify-center shadow-lg">
                    <span className="font-['Cairo'] font-bold text-xl text-white">{step.number}</span>
                  </div>
                </div>
                <h3 className="font-['Cairo'] font-bold text-2xl text-[#003344] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner CTA - Dark Section */}
      <section className="bg-gradient-to-br from-[#003344] to-[#002233] py-24 px-6 text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Cairo'] font-bold text-4xl md:text-5xl text-white mb-6">
              عندك سكن للطلاب؟
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              ضيفه معانا ووصّل لآلاف الطلاب في قنا. انضم لشبكة الملاك الموثوقين واستقبل طلبات الحجز بكل سهولة واحترافية.
            </p>
            <Link
              to="/account-type"
              className="inline-flex items-center gap-3 gradient-btn px-10 py-5 rounded-2xl font-bold text-white text-lg shadow-2xl hover:scale-105 transition-transform"
            >
              <span>أضف عقارك الآن</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-[#f8fafc] to-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-['Cairo'] font-bold text-4xl md:text-5xl text-[#003344] mb-4">
              آراء الطلاب
            </h2>
            <p className="text-gray-600 text-lg">
              شاهد تجارب الطلاب الذين وجدوا سكنهم المثالي معنا
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-panel rounded-2xl p-8 border border-white/60 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#F2994A] fill-[#F2994A]" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                  />
                  <div>
                    <p className="font-['Cairo'] font-bold text-[#003344]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.college}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003344] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-1">
              <Link to="/landing" className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <span className="font-['Cairo'] font-bold text-2xl text-[#003344]">س</span>
                </div>
                <span className="font-['Cairo'] font-bold text-2xl">سكني</span>
              </Link>
              <p className="text-gray-400 leading-relaxed">
                منصة السكن الجامعي الأولى في قنا
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-['Cairo'] font-bold text-lg mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">الرئيسية</Link></li>
                <li><Link to="/results" className="text-gray-400 hover:text-white transition-colors">استكشف السكن</Link></li>
                <li><Link to="/account-type" className="text-gray-400 hover:text-white transition-colors">إضافة عقار</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-['Cairo'] font-bold text-lg mb-4">الدعم</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">من نحن</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">الشروط والأحكام</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">سياسة الخصوصية</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">الدعم الفني</a></li>
                <li><Link to="/design-system" className="text-gray-400 hover:text-[#F2994A] transition-colors">🎨 نظام التصميم</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-['Cairo'] font-bold text-lg mb-4">تواصل معنا</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">البريد الإلكتروني:</li>
                <li><a href="mailto:info@sakani-qena.com" className="text-white hover:text-[#F2994A] transition-colors">info@sakani-qena.com</a></li>
                <li className="text-gray-400 mt-4">الهاتف:</li>
                <li className="text-white">096 123 4567</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 text-center text-gray-400">
            <p>© 2024 سكني - SAKANI. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
