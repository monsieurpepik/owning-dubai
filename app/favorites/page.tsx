'use client';

import * as React from 'react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { mockProperties } from '@/lib/mockData';
import { useFavoriteStore } from '@/store/favoriteStore';

export default function FavoritesPage() {
  const { favorites } = useFavoriteStore();
  const favoriteProperties = mockProperties.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
            Saved properties
          </h1>
          <p className="text-lg text-gray-600">
            {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'}
          </p>
        </div>

        {favoriteProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-xl text-gray-600 mb-2">No saved properties.</p>
            <p className="text-gray-500">
              Browse properties and click the heart icon to save them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
