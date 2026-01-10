'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { PropertyCard } from '@/components/property/PropertyCard';
import { mockProperties } from '@/lib/mockData';
import { Award, ShieldCheck, BadgeDollarSign } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const featuredProperties = mockProperties.slice(0, 6);

  const handleSearch = () => {
    router.push('/properties');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] bg-black overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-gradient-to-r from-black/60 to-transparent absolute z-10" />
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80')",
            }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 h-full relative z-20">
          <div className="flex flex-col justify-center h-full max-w-4xl">
            <p className="text-accent uppercase tracking-[0.3em] text-sm mb-6 font-light">
              Dubai Luxury Real Estate
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
              Discover Your
              <br />
              Dream Property
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl font-light leading-relaxed">
              Explore an exclusive collection of luxury residences, villas, and off-plan developments in Dubai's most prestigious neighborhoods
            </p>

            {/* Filter Panel */}
            <div className="max-w-3xl">
              <FilterPanel onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4 font-light">
                Featured Collection
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Exclusive Properties
              </h2>
              <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
                Handpicked selection of Dubai's finest residences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="text-center">
                <div className="font-serif text-5xl font-light text-gray-900 mb-3">60+</div>
                <div className="text-gray-600 uppercase tracking-widest text-sm">Properties</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-5xl font-light text-gray-900 mb-3">15+</div>
                <div className="text-gray-600 uppercase tracking-widest text-sm">Locations</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-5xl font-light text-gray-900 mb-3">8+</div>
                <div className="text-gray-600 uppercase tracking-widest text-sm">Developers</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-5xl font-light text-gray-900 mb-3">100%</div>
                <div className="text-gray-600 uppercase tracking-widest text-sm">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4 font-light">
                Our Services
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Why Choose Us
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center px-6">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-accent/30">
                  <Award className="h-8 w-8 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl font-light mb-4 text-gray-900">Premium Selection</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Curated collection of luxury properties in Dubai's most exclusive neighborhoods
                </p>
              </div>
              <div className="text-center px-6">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-accent/30">
                  <ShieldCheck className="h-8 w-8 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl font-light mb-4 text-gray-900">Verified Properties</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Every listing is thoroughly verified and compliant with RERA regulations
                </p>
              </div>
              <div className="text-center px-6">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-accent/30">
                  <BadgeDollarSign className="h-8 w-8 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl font-light mb-4 text-gray-900">Competitive Pricing</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Transparent pricing with flexible payment plans for off-plan developments
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
