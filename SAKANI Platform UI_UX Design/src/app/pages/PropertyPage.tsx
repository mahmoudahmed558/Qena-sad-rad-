import React from 'react';
import { useParams, Link } from 'react-router';
import { 
  MapPin, Star, Share2, Heart, ShieldCheck, 
  Wifi, Wind, Zap, Coffee, BedDouble, 
  ChevronRight, MessageSquare, CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

export const PropertyPage = () => {
  const { id } = useParams();

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-32 font-readex">
      
      {/* Property Hero Gallery */}
      <div className="w-full h-[50vh] md:h-[65vh] relative flex overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-[#001D28]/60 via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop" 
          alt="Main Property" 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[10s] ease-out"
        />
        
        {/* Navigation Breadcrumbs & Actions on Image */}
        <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start max-w-7xl mx-auto">
          <Link to="/results" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </Link>
          
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating View More Photos */}
        <button className="absolute bottom-6 left-6 z-20 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg flex items-center gap-2 text-sm font-bold text-[#001D28] shadow-[0_8px_32px_rgba(25,28,29,0.12)] hover:bg-white transition-colors">
          <ImageIcon className="w-4 h-4" />
          <span>شاهد جميع الصور (12)</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-[-80px] relative z-30 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Main Content Details */}
        <div className="flex-1 w-full space-y-8">
          
          {/* Header Block Lifted Card */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_24px_48px_rgba(25,28,29,0.08)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2994A]/10 rounded-full text-xs font-bold text-[#904D00]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>سكن موثق (بنين)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-[#F2994A] fill-[#F2994A]" />
                <span className="font-cairo font-bold text-lg text-[#001D28]">4.8</span>
                <span className="text-gray-400 text-sm">(24 تقييم)</span>
              </div>
            </div>
            
            <h1 className="font-cairo font-bold text-3xl md:text-4xl text-[#001D28] mb-3 leading-tight">
              سكن المدينة الجامعية - شقة زهرة النيل
            </h1>
            
            <div className="flex items-center gap-2 text-gray-500 font-readex">
              <MapPin className="w-5 h-5 text-[#904D00]" />
              <span>الرياض، حي الملقا - يبعد 5 دقائق عن جامعة الملك سعود</span>
              <a href="#" className="text-sm font-semibold text-[#001D28] underline underline-offset-4 decoration-[#C1C7CC] hover:decoration-[#001D28] mr-2">عرض الخريطة</a>
            </div>
          </div>

          {/* Description Block */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_32px_rgba(25,28,29,0.04)]">
            <h2 className="font-cairo font-bold text-2xl text-[#001D28] mb-4">عن السكن</h2>
            <p className="font-readex text-gray-600 leading-[1.8] text-base">
              شقة سكنية مصممة خصيصاً للطلاب الأكاديميين، توفر بيئة هادئة ومريحة للدراسة. تتميز بإضاءة طبيعية ممتازة ومساحات واسعة للمذاكرة. المبنى جديد بالكامل ومزود بأحدث أنظمة الأمان وكاميرات المراقبة لتوفير أقصى درجات الحماية.
              <br/><br/>
              الشقة مقسمة بشكل يحترم الخصوصية مع مساحات مشتركة تفاعلية تضم شاشة تلفزيون ذكية وإنترنت ألياف بصرية عالي السرعة.
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_32px_rgba(25,28,29,0.04)]">
            <h2 className="font-cairo font-bold text-2xl text-[#001D28] mb-6">المرافق المتوفرة</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { id: 'wifi', label: 'واي فاي سريع', icon: Wifi },
                { id: 'ac', label: 'تكييف مركزي', icon: Wind },
                { id: 'near_uni', label: 'قريب من الجامعة', icon: MapPin },
                { id: 'bills', label: 'شامل الكهرباء والماء', icon: Zap },
                { id: 'furnished', label: 'مفروش بالكامل', icon: BedDouble },
                { id: 'kitchen', label: 'مطبخ مجهز', icon: Coffee },
              ].map((amenity) => (
                <div key={amenity.id} className="flex items-center gap-3 text-[#001D28]">
                  <div className="w-10 h-10 rounded-full bg-[#F8F9FA] flex items-center justify-center shrink-0">
                    <amenity.icon className="w-5 h-5 text-[#904D00]" />
                  </div>
                  <span className="font-readex text-sm font-semibold">{amenity.label}</span>
                </div>
              ))}
            </div>
            
            <button className="mt-8 px-6 py-3 rounded-lg border-2 border-[#C1C7CC]/30 font-bold text-[#001D28] text-sm hover:bg-[#F8F9FA] hover:border-[#001D28] transition-all">
              عرض جميع المرافق الـ 24
            </button>
          </div>
          
        </div>

        {/* Sticky Booking CTA Sidebar */}
        <div className="w-full lg:w-[400px] shrink-0 sticky top-28 mb-8">
          <div className="bg-white rounded-[24px] p-8 shadow-[0_24px_64px_rgba(25,28,29,0.12)] border border-[#C1C7CC]/20">
            <div className="flex flex-col mb-8">
              <span className="font-readex text-sm text-gray-500 uppercase tracking-wider mb-1">الإيجار الشهري</span>
              <div className="flex items-baseline gap-2 font-cairo text-[#001D28]">
                <span className="text-4xl font-bold">20,700</span>
                <span className="text-lg font-semibold text-gray-500">جنيه / شهرياً</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between py-3 px-4 bg-[#F8F9FA] rounded-xl text-sm font-readex">
                <span className="text-gray-500">تأمين مسترد</span>
                <span className="font-bold text-[#001D28]">6,900 جنيه</span>
              </div>
              <div className="flex items-center justify-between py-3 px-4 bg-[#F8F9FA] rounded-xl text-sm font-readex">
                <span className="text-gray-500">رسوم الخدمة</span>
                <span className="font-bold text-[#001D28]">1,380 جنيه</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-8 pt-4 border-t border-[#F8F9FA] font-cairo">
              <span className="text-lg font-bold text-[#001D28]">الإجمالي لأول شهر</span>
              <span className="text-2xl font-bold text-[#904D00]">28,980 جنيه</span>
            </div>

            <Link 
              to="/chat"
              className="w-full py-4 rounded-xl bg-gradient-to-br from-[#001D28] to-[#003344] text-white font-bold text-lg font-cairo flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_8px_24px_rgba(0,29,40,0.24)] transition-all mb-4"
            >
              طلب حجز الآن
              <CheckCircle2 className="w-5 h-5" />
            </Link>
            
            <button className="w-full py-4 rounded-xl bg-[#FFF8F3] text-[#904D00] font-bold text-base font-cairo flex items-center justify-center gap-2 hover:bg-[#F2994A]/20 transition-all">
              <MessageSquare className="w-5 h-5" />
              تحدث مع المالك
            </button>
            
            <p className="text-center text-xs text-gray-400 font-readex mt-6">لن يتم خصم أي مبالغ حتى يؤكد المالك الحجز</p>
          </div>
          
          {/* Owner Mini Profile */}
          <div className="mt-6 flex items-center gap-4 p-4 rounded-[16px] bg-transparent border border-[#C1C7CC]/30 hover:border-[#001D28]/20 transition-colors cursor-pointer group">
            <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-transparent group-hover:border-[#904D00] transition-colors">
              <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" alt="Owner" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-cairo font-bold text-sm text-[#001D28]">مُدار بواسطة أحمد عبدالله</p>
              <div className="flex items-center gap-1 mt-1 text-xs font-readex text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#904D00]" />
                <span>مالك موثق • انضم منذ 2021</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
