import React, { useState, useRef } from 'react';
import { 
  Building2, 
  MapPin, 
  Banknote, 
  Wifi, 
  Wind, 
  UploadCloud, 
  Coffee, 
  Zap, 
  ShieldCheck, 
  BedDouble, 
  Users, 
  Image as ImageIcon,
  X,
  CheckCircle2
} from 'lucide-react';

const AMENITIES = [
  { id: 'wifi', label: 'واي فاي سريع', icon: Wifi },
  { id: 'ac', label: 'تكييف', icon: Wind },
  { id: 'washing', label: 'غسالة', icon: Zap },
  { id: 'near_uni', label: 'قريب من الجامعة', icon: MapPin },
  { id: 'bills', label: 'شامل الكهرباء', icon: Zap },
  { id: 'security', label: 'حراسة 24/7', icon: ShieldCheck },
  { id: 'furnished', label: 'مفروش بالكامل', icon: BedDouble },
  { id: 'kitchen', label: 'مطبخ مجهز', icon: Coffee },
];

export const AddPropertyWizard = () => {
  const [formData, setFormData] = useState({
    title: '',
    gender: 'boys',
    region: '',
    price: '',
    description: ''
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(prev => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setImages(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Submit logic here
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ title: '', gender: 'boys', region: '', price: '', description: '' });
      setSelectedAmenities([]);
      setImages([]);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#003344] font-cairo mb-2">إضافة وحدة سكنية جديدة</h1>
          <p className="text-gray-500 font-readex text-sm">أضف تفاصيل السكن الخاص بك لتصل إلى آلاف الطلاب</p>
        </div>
      </div>

      {isSubmitted && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center gap-3 font-readex">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <span>تم إرسال طلب إضافة الوحدة بنجاح! سيتم مراجعتها قريباً.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 font-readex">
        {/* Basic Info Section */}
        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-[#003344] font-cairo mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#F2994A]" />
            البيانات الأساسية
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">اسم السكن</label>
              <input 
                type="text" 
                placeholder="مثال: سكن المدينة الجامعية - شقة زهرة الني��"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A] transition-colors bg-gray-50 focus:bg-white"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">نوع السكن</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, gender: 'boys'})}
                  className={`py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                    formData.gender === 'boys' 
                      ? 'border-[#F2994A] bg-[#FFF8F3] text-[#F2994A]' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  بنين
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, gender: 'girls'})}
                  className={`py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                    formData.gender === 'girls' 
                      ? 'border-[#F2994A] bg-[#FFF8F3] text-[#F2994A]' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  بنات
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">السعر الشهري (جنيه)</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Banknote className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="number" 
                  placeholder="مثال: 1500"
                  className="w-full pr-10 pl-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A] transition-colors bg-gray-50 focus:bg-white"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">المنطقة</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select 
                  className="w-full pr-10 pl-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A] transition-colors bg-gray-50 focus:bg-white appearance-none"
                  value={formData.region}
                  onChange={e => setFormData({...formData, region: e.target.value})}
                  required
                >
                  <option value="" disabled>اختر المنطقة...</option>
                  <option value="riyadh">الرياض</option>
                  <option value="jeddah">جدة</option>
                  <option value="dammam">الدمام</option>
                  <option value="makkah">مكة المكرمة</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-[#003344] font-cairo mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#F2994A]" />
            المرافق والخدمات
          </h2>
          <p className="text-gray-500 text-sm mb-6">اختر المرافق المتوفرة في سكنك لتزيد من فرصة الحجز</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {AMENITIES.map((amenity) => {
              const isSelected = selectedAmenities.includes(amenity.id);
              const Icon = amenity.icon;
              return (
                <button
                  key={amenity.id}
                  type="button"
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center gap-3 transition-all ${
                    isSelected 
                      ? 'border-[#F2994A] bg-[#FFF8F3] text-[#003344]' 
                      : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-8 h-8 ${isSelected ? 'text-[#F2994A]' : 'text-gray-400'}`} />
                  <span className="text-sm font-semibold">{amenity.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Media Upload Section */}
        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-[#003344] font-cairo mb-2 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#F2994A]" />
            معرض الصور
          </h2>
          <p className="text-gray-500 text-sm mb-6">قم برفع صور واضحة للوحدة (الغرف، المطبخ، الحمام، الواجهة)</p>
          
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
            />
            <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-8 h-8 text-[#F2994A]" />
            </div>
            <p className="font-semibold text-gray-700 mb-1">اسحب وأفلت الصور هنا</p>
            <p className="text-sm text-gray-500">أو اضغط لتصفح الملفات (الحد الأقصى 10 صور)</p>
          </div>

          {images.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">الصور المرفوعة ({images.length})</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {images.map((file, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Preview ${index}`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                        className="bg-white p-2 rounded-full text-red-500 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Location Section */}
        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-[#003344] font-cairo mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#F2994A]" />
            الموقع الوصفي
          </h2>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">وصف العنوان والمعالم القريبة</label>
            <textarea 
              rows={4}
              placeholder="مثال: بالقرب من البوابة الشمالية لجامعة الملك سعود، بجوار سوبر ماركت..."
              className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A] transition-colors bg-gray-50 focus:bg-white resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
            ></textarea>
          </div>
        </section>

        <div className="flex justify-end pt-4 pb-12">
          <button 
            type="submit"
            className="bg-gradient-to-r from-[#904D00] to-[#F2994A] hover:opacity-95 text-white px-10 py-4 rounded-[12px] font-bold font-cairo text-lg shadow-[0_8px_24px_rgba(144,77,0,0.2)] transition-all active:scale-95 flex items-center gap-2"
          >
            نشر الوحدة الآن
            <CheckCircle2 className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};
