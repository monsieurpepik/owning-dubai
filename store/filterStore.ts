import { create } from 'zustand';
import { Filters } from '@/types/property';

interface FilterState {
  filters: Filters;
  updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  setFilters: (filters: Filters) => void;
}

const defaultFilters: Filters = {
  purpose: 'Off-Plan',
  completionStatus: 'All',
  bedrooms: [],
  bathrooms: [],
  location: [],
  propertyType: undefined,
  priceMin: undefined,
  priceMax: undefined,
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: defaultFilters,
  updateFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
  setFilters: (filters) => set({ filters }),
}));
