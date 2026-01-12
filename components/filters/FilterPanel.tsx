'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { MapPin } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import { cn, formatPrice } from '@/lib/utils';
import { mockProperties } from '@/lib/mockData';

export function FilterPanel({ onSearch }: { onSearch?: () => void }) {
  const { filters, updateFilter } = useFilterStore();
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 10000000]);

  // Calculate result count based on filters
  const getResultCount = () => {
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

    return filtered.length;
  };

  const toggleBedroom = (bed: number) => {
    const current = filters.bedrooms || [];
    const updated = current.includes(bed)
      ? current.filter((b) => b !== bed)
      : [...current, bed];
    updateFilter('bedrooms', updated);
  };

  const toggleBathroom = (bath: number) => {
    const current = filters.bathrooms || [];
    const updated = current.includes(bath)
      ? current.filter((b) => b !== bath)
      : [...current, bath];
    updateFilter('bathrooms', updated);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    updateFilter('priceMin', values[0]);
    updateFilter('priceMax', values[1]);
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg p-8 space-y-8 border border-gray-200">
      {/* Purpose Tabs */}
      <div>
        <Tabs
          defaultValue="off-plan"
          value={filters.purpose?.toLowerCase().replace(' ', '-') || 'off-plan'}
          onValueChange={(val) => {
            if (val === 'rent') updateFilter('purpose', 'Rent');
            else if (val === 'buy') updateFilter('purpose', 'Sale');
            else updateFilter('purpose', 'Off-Plan');
          }}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rent">Rent</TabsTrigger>
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="off-plan">Off-Plan</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Location */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-900">Location</Label>
        <Input placeholder="e.g. Dubai Marina" icon={<MapPin className="w-4 h-4" />} />
      </div>

      {/* Property Type */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-900">Property type</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['Residential', 'Commercial', 'Land', 'Multiple Units'].map((type) => (
            <Button
              key={type}
              variant={filters.propertyType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() =>
                updateFilter('propertyType', filters.propertyType === type ? undefined : type)
              }
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-900">Price range</Label>
        <div className="flex gap-3 mb-4">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange[0] || ''}
            onChange={(e) => handlePriceRangeChange([Number(e.target.value), priceRange[1]])}
            suffix="AED"
          />
          <span className="self-center text-gray-400">—</span>
          <Input
            type="number"
            placeholder="Max"
            value={priceRange[1] || ''}
            onChange={(e) => handlePriceRangeChange([priceRange[0], Number(e.target.value)])}
            suffix="AED"
          />
        </div>
        <Slider
          value={priceRange}
          onValueChange={handlePriceRangeChange}
          max={10000000}
          step={50000}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>AED {formatPrice(priceRange[0])}</span>
          <span>AED {formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-900">Bedrooms</Label>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Studio', value: 0 },
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
            { label: '6+', value: 6 },
          ].map((bed) => (
            <Button
              key={bed.label}
              variant={(filters.bedrooms || []).includes(bed.value) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleBedroom(bed.value)}
            >
              {bed.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-900">Bathrooms</Label>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((bath) => (
            <Button
              key={bath}
              variant={(filters.bathrooms || []).includes(bath) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleBathroom(bath)}
            >
              {bath === 6 ? '6+' : bath}
            </Button>
          ))}
        </div>
      </div>

      {/* Off-Plan Filters */}
      {filters.purpose === 'Off-Plan' && (
        <div className="space-y-6 border-t border-gray-200 pt-6">
          {/* Completion Status */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-900">Completion status</Label>
            <div className="flex flex-wrap gap-2">
              {['All', 'Ready', 'Off-Plan'].map((status) => (
                <Button
                  key={status}
                  variant={filters.completionStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() =>
                    updateFilter('completionStatus', status as 'All' | 'Ready' | 'Off-Plan')
                  }
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Handover Year */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-900">Handover year</Label>
            <div className="flex flex-wrap gap-2">
              {['2026', '2027', '2028', '2029', '2030', '2031+'].map((year) => (
                <Button
                  key={year}
                  variant={filters.handoverYear === year ? 'default' : 'outline'}
                  size="sm"
                  onClick={() =>
                    updateFilter('handoverYear', filters.handoverYear === year ? undefined : year)
                  }
                >
                  {year}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white" size="lg" onClick={onSearch}>
        Show {formatPrice(getResultCount())} {getResultCount() === 1 ? 'property' : 'properties'}
      </Button>
    </div>
  );
}
