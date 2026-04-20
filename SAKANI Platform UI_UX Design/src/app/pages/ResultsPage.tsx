import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import {
  MapPin, SlidersHorizontal, Star, ArrowLeft,
  Map as MapIcon, LayoutGrid, ChevronDown, X
} from 'lucide-react';
import Map, { Marker, Popup, NavigationControl, Layer, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

// ─── Data ─────────────────────────────────────────────────────────────────────
const MOCK_PROPERTIES = [
  { id: 1, title: 'سكن المدينة الجامعية - بنين', location: 'قنا، حي الجامعة',   price: 20700, rating: 4.8, lat: 26.1645, lng: 32.7257, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'شقق النور المفروشة',           location: 'قنا، حي الكورنيش',  price: 16560, rating: 4.5, lat: 26.1553, lng: 32.7180, image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'مجمع واحة العلوم السكني',      location: 'قنا، حي الشرق',     price: 24840, rating: 4.9, lat: 26.1700, lng: 32.7330, image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'سكن المستقبل الذهبي',          location: 'قنا، حي الغرب',     price: 13800, rating: 4.2, lat: 26.1580, lng: 32.7100, image: 'https://images.unsplash.com/photo-1598928506311-c95148c8ab1a?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'فلل اليرموك الفاخرة',          location: 'قنا، حي المساكن',   price: 30360, rating: 5.0, lat: 26.1490, lng: 32.7210, image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'استوديوهات الياسمين',          location: 'قنا، حي البساتين',  price: 19320, rating: 4.7, lat: 26.1620, lng: 32.7050, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop' },
];

const formatPriceShort = (price: number) =>
  price >= 1000 ? `${(price / 1000).toFixed(1)}k` : `${price}`;

type ViewMode = 'list' | 'map' | 'split';

// ─── Property Card ────────────────────────────────────────────────────────────
const PropertyCard = ({
  property,
  isActive,
  compact = false,
  onEnter,
  onLeave,
}: {
  property: typeof MOCK_PROPERTIES[0];
  isActive: boolean;
  compact?: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) => (
  <div
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    className={`bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(25,28,29,0.06)] hover:shadow-[0_12px_40px_rgba(25,28,29,0.12)] hover:-translate-y-1 transition-all duration-300 group flex flex-col cursor-pointer ${
      isActive ? 'ring-2 ring-[#904D00] shadow-[0_8px_32px_rgba(144,77,0,0.2)]' : ''
    }`}
  >
    <Link to={`/property/${property.id}`} className="flex flex-col flex-1">
      <div className={`relative w-full overflow-hidden bg-gray-100 ${compact ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        <img
          src={property.image}
          alt={property.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-[#F2994A] fill-[#F2994A]" />
          <span className="font-readex text-xs font-bold text-[#001D28]">{property.rating}</span>
        </div>
        {isActive && (
          <div className="absolute bottom-3 left-3 bg-[#904D00] text-white text-[10px] font-cairo font-bold px-2 py-0.5 rounded-full">
            محدد
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-cairo font-bold text-base text-[#001D28] mb-1 line-clamp-1">{property.title}</h3>
        <div className="flex items-center gap-1.5 text-gray-500 mb-3 mt-0.5">
          <MapPin className="w-3.5 h-3.5 text-[#904D00] shrink-0" />
          <span className="font-readex text-xs truncate">{property.location}</span>
        </div>
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="font-readex text-[10px] text-gray-400 font-semibold uppercase tracking-wider">الإيجار الشهري</span>
            <div className="flex items-baseline gap-1 font-cairo">
              <span className="text-lg font-bold text-[#001D28]">{property.price.toLocaleString('ar-EG')}</span>
              <span className="text-xs text-gray-500">جنيه</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#F8F9FA] flex items-center justify-center text-[#001D28] group-hover:bg-[#904D00] group-hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export const ResultsPage = () => {
  const [budget, setBudget]               = useState(34500);
  const [viewMode, setViewMode]           = useState<ViewMode>('split');
  const [activeProperty, setActiveProperty] = useState<typeof MOCK_PROPERTIES[0] | null>(null);
  const [isMobile, setIsMobile]           = useState(false);
  const [mapLoaded, setMapLoaded]         = useState(false);
  const [is3D, setIs3D]                   = useState(true);
  const mapRef                            = useRef<any>(null);

  /* ── Detect mobile ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Fly to active property ────────────────────────────────────────────── */
  useEffect(() => {
    if (activeProperty && mapRef.current && mapLoaded) {
      mapRef.current.flyTo({
        center: [activeProperty.lng, activeProperty.lat],
        zoom: 15.5,
        duration: 700,
        pitch: 62,
        bearing: -15,
      });
    }
  }, [activeProperty, mapLoaded]);

  /* ── Resize map whenever viewMode changes ──────────────────────────────── */
  useEffect(() => {
    // Small delay to let the CSS transitions / layout settle first
    const t1 = setTimeout(() => mapRef.current?.resize(), 50);
    const t2 = setTimeout(() => mapRef.current?.resize(), 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [viewMode]);

  const effectiveView: ViewMode = isMobile ? (viewMode === 'map' ? 'map' : 'list') : viewMode;

  const showList = effectiveView === 'list' || effectiveView === 'split';
  const showMap  = effectiveView === 'map'  || effectiveView === 'split';

  return (
    <>
      {/* ── MapLibre & Popup styles ─────────────────────────────────────── */}
      <style>{`
        .maplibregl-popup-content {
          border-radius: 18px !important;
          box-shadow: 0 16px 48px rgba(0,29,40,0.18) !important;
          padding: 0 !important;
          overflow: hidden;
          width: 230px !important;
          border: none !important;
        }
        .maplibregl-popup-tip { display: none !important; }
        .maplibregl-ctrl-attrib { display: none !important; }
        .maplibregl-ctrl-logo   { display: none !important; }
        .maplibregl-ctrl-zoom-in, .maplibregl-ctrl-zoom-out, .maplibregl-ctrl-compass {
          background-color: #001D28 !important;
          color: #fff !important;
        }
      `}</style>

      <div className="flex flex-col w-full" style={{ height: 'calc(100vh - 4rem)' }}>

        {/* ── Top Bar ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 lg:px-10 py-4 bg-white border-b border-gray-100 z-30 shadow-[0_2px_16px_rgba(0,29,40,0.04)] shrink-0">
          <div>
            <h1 className="font-cairo font-bold text-2xl text-[#001D28]">الوحدات المتاحة</h1>
            <p className="font-readex text-gray-400 text-xs mt-0.5">١٢٤ نتيجة تناسب بحثك في قنا</p>
          </div>

          {/* View-Mode Toggle */}
          <div className="flex items-center gap-1.5 bg-[#F0F2F5] rounded-xl p-1">
            {(
              [
                { id: 'list'  as ViewMode, label: 'قائمة', Icon: LayoutGrid, active: '#001D28' },
                ...(!isMobile ? [{ id: 'split' as ViewMode, label: 'تقسيم', Icon: null,        active: '#001D28' }] : []),
                { id: 'map'   as ViewMode, label: 'خريطة', Icon: MapIcon,   active: '#904D00' },
              ] as Array<{ id: ViewMode; label: string; Icon: any; active: string }>
            ).map(({ id, label, Icon, active }) => {
              const isSelected = effectiveView === id;
              return (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-readex font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'text-white shadow-md'
                      : 'text-gray-500 hover:text-[#001D28] hover:bg-white/60'
                  }`}
                  style={isSelected ? { background: active } : {}}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {id === 'split' && !Icon && <span className="text-sm leading-none">⊞</span>}
                  <span className="hidden sm:inline">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────────────────── */}
        <div className="flex flex-1 overflow-hidden relative">

          {/* ── List + Filters panel ─────────────────────────────────── */}
          <div
            className="flex flex-col overflow-y-auto transition-all duration-300 shrink-0"
            style={{
              width: showList ? (effectiveView === 'split' ? '46%' : '100%') : '0%',
              opacity: showList ? 1 : 0,
              pointerEvents: showList ? 'auto' : 'none',
              overflow: showList ? 'auto' : 'hidden',
            }}
          >
            <div className={`flex flex-col gap-5 px-5 py-6 ${effectiveView !== 'split' ? 'lg:flex-row lg:items-start max-w-7xl mx-auto w-full px-6 lg:px-12' : ''}`}>

              {/* Filters */}
              <aside
                className={`bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(25,28,29,0.06)] shrink-0 ${
                  effectiveView === 'split' ? 'w-full' : 'w-full lg:w-72 lg:sticky lg:top-6'
                }`}
              >
                <h2 className="font-cairo font-bold text-base text-[#001D28] flex items-center gap-2 mb-5">
                  <SlidersHorizontal className="w-4 h-4 text-[#904D00]" />
                  فلاتر البحث
                </h2>

                <div className="space-y-5 font-readex text-sm">
                  {/* Region */}
                  <div>
                    <label className="block font-semibold text-[#001D28] mb-1.5">المنطقة أو الجامعة</label>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="ابحث هنا..."
                        className="w-full pr-9 pl-4 py-2.5 rounded-xl bg-[#F0F2F5] focus:outline-none focus:ring-2 focus:ring-[#001D28]/20 text-sm"
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-[#001D28]">الميزانية القصوى</label>
                      <span className="text-xs font-bold text-[#904D00] bg-[#904D00]/10 px-2 py-0.5 rounded-full">
                        {budget.toLocaleString('ar-EG')} جنيه
                      </span>
                    </div>
                    <input type="range" min="6900" max="69000" step="1380" value={budget}
                      onChange={e => setBudget(Number(e.target.value))}
                      className="w-full h-1.5 bg-[#F0F2F5] rounded-full appearance-none cursor-pointer accent-[#904D00]"
                    />
                    <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                      <span>6,900</span><span>69,000 جنيه</span>
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block font-semibold text-[#001D28] mb-2">نوع السكن</label>
                    <div className="flex gap-2">
                      {['بنين (طلاب)', 'بنات (طالبات)'].map((type, i) => (
                        <label key={i}
                          className="flex-1 text-center py-2 rounded-xl border border-gray-200 cursor-pointer text-xs font-semibold text-gray-500 hover:border-[#904D00] hover:text-[#904D00] transition-colors has-[:checked]:border-[#904D00] has-[:checked]:text-[#904D00] has-[:checked]:bg-[#904D00]/5"
                        >
                          <input type="radio" name="type" defaultChecked={i === 0} className="sr-only" />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-2.5 rounded-xl bg-gradient-to-br from-[#001D28] to-[#003344] text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-md shadow-[#001D28]/20">
                    تطبيق الفلاتر
                  </button>
                </div>
              </aside>

              {/* Cards Grid */}
              <div className="flex-1">
                {effectiveView !== 'split' && (
                  <div className="flex items-center justify-between mb-5">
                    <p className="font-cairo font-bold text-lg text-[#001D28]">
                      ١٢٤ وحدة متاحة
                    </p>
                    <select className="bg-white border border-gray-200 py-1.5 px-3 rounded-xl font-readex text-sm text-[#001D28] focus:outline-none cursor-pointer">
                      <option>الأحدث</option>
                      <option>الأعلى تقييماً</option>
                      <option>الأقل سعراً</option>
                    </select>
                  </div>
                )}
                <div className={`grid gap-4 ${effectiveView === 'split' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                  {MOCK_PROPERTIES.map(p => (
                    <PropertyCard
                      key={p.id}
                      property={p}
                      isActive={activeProperty?.id === p.id}
                      compact={effectiveView === 'split'}
                      onEnter={() => setActiveProperty(p)}
                      onLeave={() => setActiveProperty(null)}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── Map panel — always mounted, CSS controls visibility ─────── */}
          <div
            className="relative flex-1 transition-all duration-300"
            style={{
              minWidth: showMap ? (effectiveView === 'map' ? '100%' : '54%') : '0%',
              maxWidth: showMap ? '100%' : '0%',
              opacity: showMap ? 1 : 0,
              pointerEvents: showMap ? 'auto' : 'none',
            }}
          >
            {/* ── Map-specific CSS (keyframes for marker pulse) */}
            <style>{`
              @keyframes markerPulse {
                0%   { box-shadow: 0 0 0 0   rgba(144,77,0,0.7), 0 6px 20px rgba(144,77,0,0.4); }
                70%  { box-shadow: 0 0 0 14px rgba(144,77,0,0),   0 6px 20px rgba(144,77,0,0.4); }
                100% { box-shadow: 0 0 0 0   rgba(144,77,0,0),   0 6px 20px rgba(144,77,0,0.4); }
              }
              @keyframes markerFloat {
                0%, 100% { transform: scale(1.18) translateY(-3px); }
                50%       { transform: scale(1.18) translateY(-6px); }
              }
              @keyframes shadowPulse {
                0%, 100% { transform: translateX(-50%) scale(1);   opacity: 0.4; }
                50%       { transform: translateX(-50%) scale(1.3); opacity: 0.2; }
              }
              .maplibregl-popup-content {
                border-radius: 18px !important;
                box-shadow: 0 20px 60px rgba(0,29,40,0.2), 0 4px 16px rgba(0,29,40,0.1) !important;
                padding: 0 !important; overflow: hidden; width: 230px !important; border: none !important;
              }
              .maplibregl-popup-tip { display: none !important; }
              .maplibregl-ctrl-attrib, .maplibregl-ctrl-logo { display: none !important; }
              .maplibregl-ctrl button {
                background-color: #001D28 !important;
                color: #fff !important;
                border-color: rgba(255,255,255,0.1) !important;
              }
              .maplibregl-ctrl button:hover { background-color: #003344 !important; }
              .maplibregl-ctrl-group { border-radius: 12px !important; overflow: hidden; box-shadow: 0 4px 20px rgba(0,29,40,0.25) !important; }
            `}</style>

            <Map
              ref={mapRef}
              initialViewState={{ latitude: 26.155, longitude: 32.716, zoom: 12.5, pitch: 0, bearing: 0 }}
              mapStyle="https://tiles.openfreemap.org/styles/liberty"
              style={{ width: '100%', height: '100%' }}
              onLoad={(e) => {
                setMapLoaded(true);
                const map = e.target;
                // Cinematic intro: ease into 3D view
                map.easeTo({
                  center: [32.716, 26.158],
                  zoom: 13.8,
                  pitch: 62,
                  bearing: -25,
                  duration: 2200,
                  easing: (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t,
                });
                // Atmospheric fog for depth
                try {
                  (map as any).setFog({
                    range: [1, 12],
                    color: 'rgb(235, 228, 212)',
                    'horizon-blend': 0.05,
                  });
                } catch(_) {}
              }}
            >
              <NavigationControl position="bottom-right" />

              {/* ── 3D Buildings layer from OpenFreeMap (OpenMapTiles schema) */}
              <Layer
                id="sakani-3d-buildings"
                type="fill-extrusion"
                source="openmaptiles"
                source-layer="building"
                minzoom={14}
                filter={['!=', ['get', 'hide_3d'], true]}
                paint={{
                  'fill-extrusion-color': [
                    'interpolate', ['linear'], ['get', 'render_height'],
                    0,  '#e8e2d8',
                    10, '#ddd6ca',
                    30, '#ccc4b6',
                  ],
                  'fill-extrusion-height': [
                    'interpolate', ['linear'], ['zoom'],
                    14, 0,
                    14.5, ['get', 'render_height'],
                  ],
                  'fill-extrusion-base': [
                    'interpolate', ['linear'], ['zoom'],
                    14, 0,
                    14.5, ['get', 'render_min_height'],
                  ],
                  'fill-extrusion-opacity': is3D ? 0.88 : 0,
                  'fill-extrusion-vertical-gradient': true,
                }}
              />

              {/* Price Markers */}
              {MOCK_PROPERTIES.map(p => {
                const isActive = activeProperty?.id === p.id;
                return (
                  <Marker
                    key={p.id}
                    longitude={p.lng}
                    latitude={p.lat}
                    anchor="bottom"
                    style={{ zIndex: isActive ? 50 : 1 }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                      {/* Pill marker */}
                      <div
                        onMouseEnter={() => setActiveProperty(p)}
                        onMouseLeave={() => setActiveProperty(null)}
                        onClick={e => { e.stopPropagation(); setActiveProperty(p); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 4,
                          background: isActive
                            ? 'linear-gradient(135deg, #904D00, #C06A00)'
                            : 'linear-gradient(135deg, #001D28, #002838)',
                          color: '#fff',
                          fontFamily: "'Cairo', sans-serif",
                          fontWeight: 700,
                          fontSize: 11,
                          padding: '5px 11px 5px 9px',
                          borderRadius: 22,
                          whiteSpace: 'nowrap',
                          border: `2px solid ${isActive ? 'rgba(242,153,74,0.8)' : 'rgba(255,255,255,0.3)'}`,
                          cursor: 'pointer',
                          position: 'relative',
                          animation: isActive
                            ? 'markerPulse 1.4s ease-out infinite, markerFloat 2s ease-in-out infinite'
                            : 'none',
                          boxShadow: isActive
                            ? '0 6px 20px rgba(144,77,0,0.5)'
                            : '0 4px 14px rgba(0,29,40,0.35)',
                          transition: 'all 0.25s cubic-bezier(0.175,0.885,0.32,1.275)',
                          transform: isActive ? 'scale(1.18) translateY(-3px)' : 'scale(1)',
                        }}
                      >
                        <span style={{ fontSize: 12 }}>🏠</span>
                        {formatPriceShort(p.price)} جنيه
                        {/* Arrow tip */}
                        <span style={{
                          position: 'absolute', bottom: -7, left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0, height: 0,
                          borderLeft: '5px solid transparent',
                          borderRight: '5px solid transparent',
                          borderTop: `6px solid ${isActive ? '#904D00' : '#001D28'}`,
                        }} />
                      </div>
                      {/* Shadow dot under marker */}
                      <div style={{
                        width: 14, height: 4,
                        background: 'rgba(0,29,40,0.3)',
                        borderRadius: '50%',
                        filter: 'blur(3px)',
                        marginTop: 2,
                        animation: isActive ? 'shadowPulse 2s ease-in-out infinite' : 'none',
                        position: 'relative',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }} />
                    </div>
                  </Marker>
                );
              })}

              {/* Property popup */}
              {activeProperty && (
                <Popup
                  longitude={activeProperty.lng}
                  latitude={activeProperty.lat}
                  anchor="top"
                  offset={[0, 14]}
                  closeButton={false}
                  closeOnClick={false}
                  onClose={() => setActiveProperty(null)}
                  style={{ zIndex: 100 }}
                >
                  <div style={{ direction: 'rtl', fontFamily: "'Cairo', sans-serif" }}>
                    <div style={{ position: 'relative' }}>
                      <img src={activeProperty.image} alt={activeProperty.title}
                        style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }}
                      />
                      {/* Gradient overlay on image */}
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,29,40,0.4) 0%, transparent 60%)' }} />
                      <div style={{
                        position: 'absolute', top: 8, right: 8,
                        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)',
                        borderRadius: 10, padding: '3px 8px',
                        display: 'flex', alignItems: 'center', gap: 3,
                      }}>
                        <Star style={{ width: 11, height: 11, color: '#F2994A', fill: '#F2994A' }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#001D28' }}>{activeProperty.rating}</span>
                      </div>
                      {/* Price badge on image */}
                      <div style={{
                        position: 'absolute', bottom: 10, left: 10,
                        background: 'linear-gradient(135deg,#904D00,#C06A00)',
                        color: '#fff', borderRadius: 12, padding: '3px 9px',
                        fontSize: 11, fontWeight: 800,
                      }}>
                        {activeProperty.price.toLocaleString('ar-EG')} جنيه
                      </div>
                    </div>
                    <div style={{ padding: '11px 14px 13px' }}>
                      <p style={{ fontWeight: 800, fontSize: 13, color: '#001D28', margin: '0 0 4px', lineHeight: 1.3 }}>{activeProperty.title}</p>
                      <p style={{ fontSize: 11, color: '#904D00', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 3, fontWeight: 600 }}>
                        📍 {activeProperty.location}
                      </p>
                      <a href={`/property/${activeProperty.id}`} style={{
                        display: 'block', textAlign: 'center',
                        background: 'linear-gradient(135deg,#001D28,#003344)', color: '#fff',
                        borderRadius: 12, padding: '8px 14px',
                        fontSize: 12, fontWeight: 700, textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(0,29,40,0.3)',
                      }}>
                        عرض التفاصيل ←
                      </a>
                    </div>
                  </div>
                </Popup>
              )}
            </Map>

            {/* ── Floating overlay controls ─────────────────────────────── */}
            {/* 2D / 3D toggle */}
            <div style={{
              position: 'absolute', top: 16, left: 16,
              background: 'rgba(0,29,40,0.88)', backdropFilter: 'blur(14px)',
              borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,29,40,0.3)',
              zIndex: 10, display: showMap ? 'flex' : 'none',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              {[{ label: '2D', val: false }, { label: '3D', val: true }].map(({ label, val }) => (
                <button
                  key={label}
                  onClick={() => {
                    setIs3D(val);
                    if (mapRef.current) {
                      mapRef.current.easeTo({
                        pitch: val ? 62 : 0,
                        bearing: val ? -25 : 0,
                        duration: 800,
                      });
                    }
                  }}
                  style={{
                    padding: '6px 16px',
                    background: is3D === val ? '#904D00' : 'transparent',
                    color: '#fff',
                    fontFamily: "'Cairo', sans-serif",
                    fontWeight: 700, fontSize: 12,
                    border: 'none', cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >{label}</button>
              ))}
            </div>

            {/* Bottom badge */}
            <div style={{
              position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(0,29,40,0.82)', backdropFilter: 'blur(14px)',
              color: '#fff', borderRadius: 30, padding: '7px 20px',
              fontSize: 11, fontFamily: "'Cairo', sans-serif", fontWeight: 600,
              boxShadow: '0 4px 20px rgba(0,29,40,0.3)',
              zIndex: 10, whiteSpace: 'nowrap',
              display: showMap ? 'flex' : 'none', alignItems: 'center', gap: 6,
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <span>📍</span>
              <span>قنا، مصر</span>
              <span style={{ opacity: 0.4 }}>|</span>
              <span>{MOCK_PROPERTIES.length} وحدات</span>
              <span style={{ opacity: 0.4 }}>|</span>
              <span style={{ opacity: 0.8 }}>اسحب كليك يمين لتدوير الخريطة</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
