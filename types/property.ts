export interface Property {
  id: string;
  price: number;
  currency: 'AED';
  bedrooms: number;
  bathrooms: number;
  size: number;
  sizeUnit: 'sqft';
  propertyType: 'Apartment' | 'Villa' | 'Townhouse' | 'Penthouse';
  purpose: 'Sale' | 'Rent';
  furnishing: 'Furnished' | 'Unfurnished';
  completionStatus: 'Ready' | 'Off-Plan';
  paymentPlan?: string;
  handoverDate?: string;
  developer?: string;
  projectName?: string;

  location: {
    building: string;
    community: string;
    area: string;
    city: string;
    coordinates: { lat: number; lng: number };
  };

  images: string[];
  description: string;
  features: string[];
  amenities: string[];

  verification: {
    verified: boolean;
    ownership: string;
    balconySize?: number;
    parkingAvailable: boolean;
    usage: string;
  };

  building?: {
    name: string;
    floors: number;
    retailCentres?: number;
  };

  project?: {
    name: string;
    developer: string;
    status: string;
    lastInspected: string;
    handover: string;
  };

  agent: {
    name: string;
    photo: string;
    agency: string;
  };

  regulatory: {
    permitNumber: string;
    zoneName: string;
    registeredAgency: string;
    rera: string;
    referenceId: string;
    brn: string;
  };

  updatedAt: string;
  postedAt: string;
}

export interface Filters {
  location?: string[];
  excludeLocation?: string[];
  propertyType?: string;
  residentialCategory?: string;
  completionStatus?: 'All' | 'Ready' | 'Off-Plan';
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number[];
  bathrooms?: number[];
  sizeMin?: number;
  sizeMax?: number;
  saleType?: string;
  projectCompletion?: string;
  preHandoverPayment?: string;
  handoverYear?: string;
  projectStatus?: string;
  developer?: string;
  furnishing?: string;
  amenities?: string[];
  keywords?: string;
  listedBy?: string;
  agency?: string;
  hasVideo?: boolean;
  has360Tour?: boolean;
  purpose?: 'Sale' | 'Rent' | 'Off-Plan';
}
