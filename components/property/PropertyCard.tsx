'use client';

import * as React from 'react';
import Link from 'next/link';
import { Property } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Heart, Bed, Bath, Square, MapPin } from 'lucide-react';
import { useFavoriteStore } from '@/store/favoriteStore';
import { cn, formatPrice } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const favorite = isFavorite(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="group rounded-lg overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200">
        {/* Image Carousel */}
        <div className="relative aspect-[4/3]">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="h-full"
            loop
          >
            {property.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`${property.propertyType} in ${property.location.area}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {property.completionStatus === 'Off-Plan' && (
              <Badge className="bg-gray-900/90 text-white border-0 backdrop-blur-sm text-xs font-medium">
                Off-Plan
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
          >
            <Heart
              className={cn('w-4 h-4', favorite ? 'fill-red-500 text-red-500' : 'text-gray-700')}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Price */}
          <div className="mb-3">
            <div className="text-xl font-semibold text-gray-900 tracking-tight">
              {property.currency} {formatPrice(property.price)}
              {property.purpose === 'Rent' && (
                <span className="text-sm font-normal text-gray-500 ml-1">/year</span>
              )}
            </div>
          </div>

          {/* Property Type */}
          <div className="text-sm font-medium text-gray-900 mb-2">
            {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms}-Bedroom`} {property.propertyType}
          </div>

          {/* Specs */}
          <div className="flex items-center gap-4 text-gray-600 mb-3 text-sm">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms}</span>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Square className="w-4 h-4" />
              <span>{formatPrice(property.size)} sqft</span>
            </span>
          </div>

          {/* Off-Plan Details */}
          {property.handoverDate && (
            <div className="text-sm text-gray-600 mb-3">
              Handover {property.handoverDate}
            </div>
          )}

          {/* Location */}
          <div className="text-sm text-gray-600 flex items-start gap-1.5">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">
              {property.location.area}, {property.location.city}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
