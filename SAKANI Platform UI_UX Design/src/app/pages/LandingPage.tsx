import React, { useState } from 'react';
import { Link } from 'react-router';
import { Search, MapPin, Sparkles, ChevronDown, SlidersHorizontal, ArrowRight, GraduationCap, Building2, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PropertyCard } from '../components/PropertyCard';

const RECOMMENDED_PROPERTIES = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
    title: 'سكن المدينة الجامعية - شقة زهرة النيل',
    location: 'حي الجامعة، قنا',
    price: 20700,
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
    price: 16560,
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
    price: 19320,
    rating: 4.7,
    reviews: 156,
    type: 'شقة مشتركة',
    amenities: ['واي فاي', 'موقف سيارات'],
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop',
    title: 'مجمع واحة العلوم السكني',
    location: 'حي الغرب، قنا',
    price: 24840,
    rating: 5.0,
    reviews: 67,
    type: 'غرفة خاصة',
    amenities: ['واي فاي', 'موقف سيارات', 'مطبخ مجهز', 'أثاث'],
  },
];

const RECENTLY_VIEWED = [
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop',
    title: 'شقة الأمل - قريبة من الجامعة',
    location: 'حي البساتين، قنا',
    price: 13800,
    rating: 4.6,
    reviews: 92,
    type: 'شقة مفروشة',
    amenities: ['واي فاي', 'أثاث'],
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=800&auto=format&fit=crop',
    title: 'استوديوهات الياسمين',
    location: 'حي المساكن، قنا',
    price: 16560,
    rating: 4.5,
    reviews: 78,
    type: 'استوديو',
    amenities: ['واي فاي', 'مطبخ مجهز'],
  },
];

const AREAS = [
  { name: 'حي الجامعة', count: 120, icon: GraduationCap },
  { name: 'حي الكورنيش', count: 85, icon: Building2 },
  { name: 'حي الشرق', count: 95, icon: Home },
];

export const LandingPage = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('جميع المناطق');
  const [priceRange, setPriceRange] = useState('جميع الأسعار');
  const [propertyType, setPropertyType] = useState('نوع السكن');
  const [showFilters, setShowFilters] = useState(false);

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const hasSearched = searchQuery || selectedArea !== 'جميع المناطق' || priceRange !== 'جميع الأسعار' || propertyType !== 'نوع السكن';

  return (
    <div className="flex-1 w-full pb-12">
      {/* Background Decorations */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-[#003344]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-[#F2994A]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#F2994A]" />
            <span className="text-sm text-gray-500">مرحباً بك في سكني</span>
          </div>
          <h1 className="font-['Cairo'] font-bold text-4xl md:text-5xl text-[#003344] mb-3">
            ابدأ رحلة البحث عن سكنك
          </h1>
          <p className="text-gray-600 text-lg">
            اكتشف أفضل الخيارات السكنية القريبة من جامعتك
          </p>
        </motion.div>

        {/* Smart Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-2xl p-4 md:p-6 border border-white/60 shadow-xl mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن اسم الجامعة أو المنطقة..."
                className="w-full pr-12 pl-4 py-3.5 rounded-xl bg-white/80 border-2 border-transparent focus:border-[#F2994A] focus:outline-none text-[#003344] font-medium placeholder:text-gray-400 transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="px-4 py-3.5 rounded-xl bg-white/80 border-2 border-transparent focus:border-[#F2994A] focus:outline-none text-[#003344] font-medium cursor-pointer appearance-none pl-10 pr-4 min-w-[140px]"
              >
                <option>جميع المناطق</option>
                <option>حي الجامعة</option>
                <option>حي الكورنيش</option>
                <option>حي الشرق</option>
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3.5 rounded-xl bg-white/80 border-2 border-transparent focus:border-[#F2994A] focus:outline-none text-[#003344] font-medium cursor-pointer appearance-none pl-10 pr-4 min-w-[140px] hidden sm:block"
              >
                <option>جميع الأسعار</option>
                <option>أقل من 1000</option>
                <option>1000 - 1500</option>
                <option>1500 - 2000</option>
                <option>أكثر من 2000</option>
              </select>

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="px-4 py-3.5 rounded-xl bg-white/80 border-2 border-transparent focus:border-[#F2994A] focus:outline-none text-[#003344] font-medium cursor-pointer appearance-none pl-10 pr-4 min-w-[140px] hidden md:block"
              >
                <option>نوع السكن</option>
                <option>شقة مفروشة</option>
                <option>استوديو</option>
                <option>غرفة خاصة</option>
                <option>شقة مشتركة</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden p-3.5 rounded-xl bg-white/80 hover:bg-white text-[#003344] transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>

              <Link
                to="/results"
                className="gradient-btn px-6 py-3.5 rounded-xl font-bold text-white shadow-lg flex items-center gap-2 whitespace-nowrap"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">بحث</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Recommended Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-['Cairo'] font-bold text-2xl md:text-3xl text-[#003344] mb-2">
                مقترح لك بناءً على اهتمامك
              </h2>
              <p className="text-gray-600">أفضل الخيارات المتاحة حالياً</p>
            </div>
            <Link
              to="/results"
              className="flex items-center gap-2 text-[#F2994A] hover:text-[#E27921] font-bold transition-colors group"
            >
              <span>عرض الكل</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECOMMENDED_PROPERTIES.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <PropertyCard
                  {...property}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Continue Your Journey */}
        {RECENTLY_VIEWED.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-['Cairo'] font-bold text-2xl md:text-3xl text-[#003344] mb-2">
                  أكمل رحلتك
                </h2>
                <p className="text-gray-600">آخر الوحدات التي شاهدتها</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RECENTLY_VIEWED.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <PropertyCard
                    {...property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Explore by Area */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="mb-6">
            <h2 className="font-['Cairo'] font-bold text-2xl md:text-3xl text-[#003344] mb-2">
              استكشف حسب المنطقة
            </h2>
            <p className="text-gray-600">اختر المنطقة الأقرب لجامعتك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AREAS.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  to={`/results?area=${encodeURIComponent(area.name)}`}
                  className="glass-panel rounded-2xl p-6 border border-white/60 shadow-lg hover:shadow-xl transition-all group block"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#003344] to-[#004455] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <area.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-['Cairo'] font-bold text-xl text-[#003344] mb-1 group-hover:text-[#F2994A] transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-gray-600">
                        {area.count} وحدة متاحة
                      </p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-[#F2994A] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};
