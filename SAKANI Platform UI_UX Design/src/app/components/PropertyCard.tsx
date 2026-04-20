import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Heart, MapPin, Star, Wifi, Car, Utensils, Bed } from 'lucide-react';

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  type: string;
  amenities?: string[];
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  image,
  title,
  location,
  price,
  rating,
  reviews,
  type,
  amenities = [],
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const amenityIcons: Record<string, any> = {
    'واي فاي': Wifi,
    'موقف سيارات': Car,
    'مطبخ مجهز': Utensils,
    'أثاث': Bed,
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass-panel rounded-2xl overflow-hidden border border-white/60 shadow-lg hover:shadow-2xl transition-all group"
    >
      {/* Image */}
      <Link to={`/property/${id}`} className="relative block overflow-hidden">
        <div className="relative h-56 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-[#003344] shadow-md">
          {type}
        </div>

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite?.(id);
          }}
          className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
            isFavorite
              ? 'bg-[#F2994A] text-white'
              : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-[#F2994A]'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </motion.button>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 px-2 py-1 bg-[#F2994A]/10 rounded-lg">
            <Star className="w-4 h-4 text-[#F2994A] fill-[#F2994A]" />
            <span className="text-sm font-bold text-[#003344]">{rating}</span>
          </div>
          <span className="text-xs text-gray-500">({reviews} تقييم)</span>
        </div>

        {/* Title */}
        <Link to={`/property/${id}`}>
          <h3 className="font-['Cairo'] font-bold text-lg text-[#003344] mb-2 line-clamp-1 hover:text-[#F2994A] transition-colors">
            {title}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 text-[#F2994A]" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {amenities.slice(0, 3).map((amenity, index) => {
              const Icon = amenityIcons[amenity];
              return (
                <div
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-white/60 rounded-lg text-xs text-gray-600"
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{amenity}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline justify-between pt-4 border-t border-white/60">
          <div>
            <span className="font-['Cairo'] font-bold text-2xl text-[#003344]">
              {price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 mr-1">جنيه</span>
          </div>
          <span className="text-xs text-gray-500">/ شهرياً</span>
        </div>
      </div>
    </motion.div>
  );
};
