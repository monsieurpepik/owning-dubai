'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { PropertyCard } from '@/components/property/PropertyCard';
import { mockProperties } from '@/lib/mockData';

export default function HomePage() {
  const router = useRouter();
  const featuredProperties = mockProperties.slice(0, 6);

  const handleSearch = () => {
    router.push('/properties');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-6 tracking-tight leading-tight">
              Off-plan properties in Dubai
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Search verified off-plan developments with transparent pricing and payment plans.
            </p>
          </div>

          {/* Filter Panel */}
          <div className="max-w-3xl mx-auto">
            <FilterPanel onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
              Featured properties
            </h2>
            <p className="text-lg text-gray-600">Recent off-plan developments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
