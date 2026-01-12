'use client';

import * as React from 'react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { Button } from '@/components/ui/button';
import { mockProperties } from '@/lib/mockData';
import { useFilterStore } from '@/store/filterStore';
import { SlidersHorizontal } from 'lucide-react';

export default function PropertiesPage() {
  const { filters } = useFilterStore();
  const [showFilters, setShowFilters] = React.useState(false);
  const [displayCount, setDisplayCount] = React.useState(12);

  // Apply filters
  const getFilteredProperties = () => {
    let filtered = mockProperties;

    // Filter by purpose
    if (filters.purpose && filters.purpose !== 'Off-Plan') {
      filtered = filtered.filter((p) => p.purpose === filters.purpose);
    } else if (filters.purpose === 'Off-Plan') {
      filtered = filtered.filter((p) => p.completionStatus === 'Off-Plan');
    }

    // Filter by bedrooms
    if (filters.bedrooms && filters.bedrooms.length > 0) {
      filtered = filtered.filter((p) => filters.bedrooms!.includes(p.bedrooms));
    }

    // Filter by bathrooms
    if (filters.bathrooms && filters.bathrooms.length > 0) {
      filtered = filtered.filter((p) => filters.bathrooms!.includes(p.bathrooms));
    }

    // Filter by price range
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      filtered = filtered.filter((p) => {
        const min = filters.priceMin || 0;
        const max = filters.priceMax || Infinity;
        return p.price >= min && p.price <= max;
      });
    }

    // Filter by completion status
    if (filters.completionStatus && filters.completionStatus !== 'All') {
      filtered = filtered.filter((p) => p.completionStatus === filters.completionStatus);
    }

    // Filter by property type
    if (filters.propertyType) {
      filtered = filtered.filter((p) => {
        if (filters.propertyType === 'Residential') {
          return ['Apartment', 'Villa', 'Townhouse', 'Penthouse'].includes(p.propertyType);
        }
        return false;
      });
    }

    return filtered;
  };

  const filteredProperties = getFilteredProperties();
  const displayedProperties = filteredProperties.slice(0, displayCount);
  const hasMore = displayCount < filteredProperties.length;

  const loadMore = () => {
    setDisplayCount((prev) => prev + 12);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
              Off-plan properties
            </h1>
            <p className="text-lg text-gray-600">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <FilterPanel />
            </div>
          </div>

          {/* Mobile Filters Modal */}
          {showFilters && (
            <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setShowFilters(false)}>
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <Button variant="ghost" onClick={() => setShowFilters(false)}>
                    Close
                  </Button>
                </div>
                <FilterPanel onSearch={() => setShowFilters(false)} />
              </div>
            </div>
          )}

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {displayedProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {displayedProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <Button onClick={loadMore} size="lg" variant="outline">
                      Show more properties
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24">
                <p className="text-xl text-gray-600 mb-2">No properties match your search.</p>
                <p className="text-gray-500">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
