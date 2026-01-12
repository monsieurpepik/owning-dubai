'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MortgageCalculator } from '@/components/property/MortgageCalculator';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import {
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Mail,
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Home as HomeIcon,
  Check,
} from 'lucide-react';
import { mockProperties } from '@/lib/mockData';
import { useFavoriteStore } from '@/store/favoriteStore';
import { formatPrice, formatDate, cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

export default function PropertyDetailPage() {
  const params = useParams();
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperType | null>(null);

  const property = mockProperties.find((p) => p.id === params.id);

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Property not found</h1>
      </div>
    );
  }

  const favorite = isFavorite(property.id);
  const similarProperties = mockProperties
    .filter((p) => p.id !== property.id && p.location.area === property.location.area)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            navigation
            pagination={{ clickable: true }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            className="h-[400px] md:h-[600px] rounded-lg mb-4"
            loop
          >
            {property.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Property ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails */}
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            breakpoints={{
              640: { slidesPerView: 6 },
              1024: { slidesPerView: 8 },
            }}
            className="h-20 rounded-lg cursor-pointer"
          >
            {property.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  {property.completionStatus === 'Off-Plan' && (
                    <div className="mb-3">
                      <Badge className="bg-gray-900 text-white border-0 text-xs font-medium">
                        Off-Plan
                      </Badge>
                    </div>
                  )}
                  <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
                    {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms}-Bedroom`} {property.propertyType}
                  </h1>
                  <p className="text-lg text-gray-600 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {property.location.area}, {property.location.city}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFavorite(property.id)}
                  >
                    <Heart className={cn('w-4 h-4', favorite && 'fill-red-500 text-red-500')} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
                  AED {formatPrice(property.price)}
                  {property.purpose === 'Rent' && (
                    <span className="text-xl font-normal text-gray-600 ml-2">/year</span>
                  )}
                </div>
                <div className="flex gap-8 text-gray-700">
                  {property.bedrooms > 0 && (
                    <span className="flex items-center gap-2 text-base">
                      <Bed className="w-5 h-5" />
                      {property.bedrooms}
                    </span>
                  )}
                  <span className="flex items-center gap-2 text-base">
                    <Bath className="w-5 h-5" />
                    {property.bathrooms}
                  </span>
                  <span className="flex items-center gap-2 text-base">
                    <Square className="w-5 h-5" />
                    {formatPrice(property.size)} sqft
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">About this property</h2>
              <p className="text-base text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Details */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Property details</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Type</p>
                  <p className="text-base font-medium text-gray-900">{property.propertyType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Furnishing</p>
                  <p className="text-base font-medium text-gray-900">{property.furnishing}</p>
                </div>
                {property.handoverDate && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Handover</p>
                    <p className="text-base font-medium text-gray-900">{property.handoverDate}</p>
                  </div>
                )}
                {property.paymentPlan && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment plan</p>
                    <p className="text-base font-medium text-gray-900">{property.paymentPlan}</p>
                  </div>
                )}
                {property.developer && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Developer</p>
                    <p className="text-base font-medium text-gray-900">{property.developer}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Listed</p>
                  <p className="text-base font-medium text-gray-900">{formatDate(property.postedAt)}</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-gray-900 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mortgage Calculator */}
            <MortgageCalculator propertyPrice={property.price} />

            {/* Map Placeholder */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Location</h2>
              <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <p className="text-gray-500">{property.location.area}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Agent Card */}
            <div className="border border-gray-200 rounded-lg p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.agent.name}</h3>
                <p className="text-sm text-gray-600">{property.agent.agency}</p>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-1.5">
                <p>Permit {property.regulatory.permitNumber}</p>
                <p>RERA {property.regulatory.rera}</p>
                <p>BRN {property.regulatory.brn}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <section className="mt-24 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">Similar properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
