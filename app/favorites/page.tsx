'use client';

import * as React from 'react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { mockProperties } from '@/lib/mockData';
import { useFavoriteStore } from '@/store/favoriteStore';

export default function FavoritesPage() {
  const { favorites } = useFavoriteStore();
  const favoriteProperties = mockProperties.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Favorite Properties</h1>
          <p className="text-gray-600">{favoriteProperties.length} properties saved</p>
        </div>

        {favoriteProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No favorite properties yet.</p>
            <p className="text-gray-500 mt-2">
              Browse properties and click the heart icon to save your favorites.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
