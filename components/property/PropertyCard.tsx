'use client';

import * as React from 'react';
import Link from 'next/link';
import { Property } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Heart, Bed, Bath, Square, MapPin, Phone, MessageCircle } from 'lucide-react';
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
      <div className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white">
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
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            {property.verification.verified && (
              <Badge variant="success" className="bg-white text-green-600">
                ✓ Verified
              </Badge>
            )}
            {property.completionStatus === 'Off-Plan' && (
              <Badge className="bg-blue-500 text-white">Off-Plan</Badge>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform z-10"
          >
            <Heart
              className={cn('w-5 h-5', favorite ? 'fill-red-500 text-red-500' : 'text-gray-600')}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <h3 className="text-2xl font-bold mb-2 text-gray-900">
            {property.currency} {formatPrice(property.price)}
            {property.purpose === 'Rent' && (
              <span className="text-sm font-normal text-gray-600">/year</span>
            )}
          </h3>

          {/* Specs */}
          <div className="flex items-center gap-4 text-gray-700 mb-3">
            <span className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span className="text-sm">{property.bedrooms}</span>
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span className="text-sm">{property.bathrooms}</span>
            </span>
            <span className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span className="text-sm">{formatPrice(property.size)} sqft</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{property.description}</p>

          {/* Off-Plan Details */}
          {property.handoverDate && (
            <p className="text-sm font-medium text-gray-900 mb-1">
              Handover {property.handoverDate}
            </p>
          )}

          {property.paymentPlan && (
            <p className="text-sm text-gray-600 mb-3">Payment Plan {property.paymentPlan}</p>
          )}

          {/* Location */}
          <p className="text-sm text-gray-600 flex items-start gap-1 mb-3">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">
              {property.location.building}, {property.location.area}, {property.location.city}
            </span>
          </p>

          {/* Posted Date */}
          <p className="text-xs text-gray-500 mb-3">{formatDate(property.postedAt)}</p>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleCallClick}
            >
              <Phone className="w-4 h-4 mr-1" /> Call
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
