'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Heart, Bed, Bath, Square, MapPin, Phone, MessageCircle, Check } from 'lucide-react';
import { useFavoriteStore } from '@/store/favoriteStore';
import { cn, formatPrice, formatDate } from '@/lib/utils';

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

  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = 'tel:+971501234567';
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open('https://wa.me/971501234567', '_blank');
  };

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="group bg-white overflow-hidden transition-all duration-500 hover:shadow-xl">
        {/* Image Carousel */}
        <div className="relative aspect-[5/4] overflow-hidden bg-gray-100">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="h-full"
            loop
          >
            {property.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`${property.propertyType} in ${property.location.area}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority={idx === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-2.5 bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-200 z-10"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={cn('w-5 h-5 transition-all duration-200', favorite ? 'fill-gray-900 text-gray-900' : 'text-gray-600')}
            />
          </button>

          {/* Badges */}
          {property.verification.verified && (
            <div className="absolute bottom-4 left-4 z-10">
              <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green-600" aria-hidden="true" />
                <span className="text-xs font-medium text-gray-900">VERIFIED</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Location & Type */}
          <div className="flex items-center gap-2 text-xs text-gray-600 uppercase tracking-wider mb-3">
            <span>{property.location.area}</span>
            <span>·</span>
            <span>{property.completionStatus}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl text-gray-900 mb-3 font-light">
            {property.bedrooms}-Bedroom {property.propertyType}
          </h3>

          {/* Specs */}
          <div className="flex items-center gap-5 text-sm text-gray-600 mb-4 font-light">
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              {property.bathrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Square className="w-4 h-4" />
              {formatPrice(property.size)} sqft
            </span>
          </div>

          {/* Price */}
          <div className="pt-4 border-t border-gray-200">
            <div className="font-serif text-2xl text-gray-900 font-light">
              {property.currency} {formatPrice(property.price)}
              {property.purpose === 'Rent' && (
                <span className="text-base text-gray-600 font-sans">/year</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
