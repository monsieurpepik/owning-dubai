'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
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
import { formatPrice, formatDate } from '@/lib/utils';

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
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-6">
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
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`Property image ${idx + 1}`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={idx === 0}
                  />
                </div>
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
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`Property thumbnail ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 12vw"
                    className="object-cover rounded-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex gap-2 mb-2">
                    {property.verification.verified && (
                      <Badge variant="success">
                        <Check className="h-3 w-3 mr-1" aria-hidden="true" /> Verified
                      </Badge>
                    )}
                    {property.completionStatus === 'Off-Plan' && (
                      <Badge className="bg-blue-500 text-white">Off-Plan</Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.bedrooms}-Bedroom {property.propertyType}
                  </h1>
                  <p className="text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {property.location.building}, {property.location.area}, {property.location.city}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFavorite(property.id)}
                  >
                    <Heart className={favorite ? 'fill-red-500 text-red-500' : ''} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 />
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-3xl font-bold text-primary mb-2">
                  AED {formatPrice(property.price)}
                  {property.purpose === 'Rent' && (
                    <span className="text-lg font-normal text-gray-600">/year</span>
                  )}
                </div>
                <div className="flex gap-6 text-gray-700">
                  <span className="flex items-center gap-2">
                    <Bed className="w-5 h-5" />
                    {property.bedrooms} Bedrooms
                  </span>
                  <span className="flex items-center gap-2">
                    <Bath className="w-5 h-5" />
                    {property.bathrooms} Bathrooms
                  </span>
                  <span className="flex items-center gap-2">
                    <Square className="w-5 h-5" />
                    {formatPrice(property.size)} sqft
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold">{property.propertyType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Purpose</p>
                  <p className="font-semibold">{property.purpose}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Furnishing</p>
                  <p className="font-semibold">{property.furnishing}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completion</p>
                  <p className="font-semibold">{property.completionStatus}</p>
                </div>
                {property.handoverDate && (
                  <div>
                    <p className="text-sm text-gray-600">Handover</p>
                    <p className="font-semibold">{property.handoverDate}</p>
                  </div>
                )}
                {property.paymentPlan && (
                  <div>
                    <p className="text-sm text-gray-600">Payment Plan</p>
                    <p className="font-semibold">{property.paymentPlan}</p>
                  </div>
                )}
                {property.developer && (
                  <div>
                    <p className="text-sm text-gray-600">Developer</p>
                    <p className="font-semibold">{property.developer}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Posted</p>
                  <p className="font-semibold">{formatDate(property.postedAt)}</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mortgage Calculator */}
            <MortgageCalculator propertyPrice={property.price} />

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map View ({property.location.area})</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <div className="bg-white rounded-lg p-6 sticky top-20">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src={property.agent.photo}
                    alt={property.agent.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{property.agent.name}</h3>
                  <p className="text-sm text-gray-600">{property.agent.agency}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary-hover">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Agent
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t text-xs text-gray-600 space-y-1">
                <p>Permit: {property.regulatory.permitNumber}</p>
                <p>RERA: {property.regulatory.rera}</p>
                <p>BRN: {property.regulatory.brn}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
