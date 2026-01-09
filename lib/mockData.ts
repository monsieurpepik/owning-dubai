import { Property } from '@/types/property';

const LOCATIONS = [
  { building: 'Ananda Residences Tower A', community: 'Ananda Residences', area: 'Motor City' },
  { building: 'Ananda Residences Tower B', community: 'Ananda Residences', area: 'Motor City' },
  { building: 'Marina Heights', community: 'Dubai Marina', area: 'Dubai Marina' },
  { building: 'The Address Residences', community: 'Dubai Marina', area: 'Dubai Marina' },
  { building: 'Downtown Views', community: 'Downtown Dubai', area: 'Downtown' },
  { building: 'Burj Vista', community: 'Downtown Dubai', area: 'Downtown' },
  { building: 'Palm Residences', community: 'Palm Jumeirah', area: 'Palm Jumeirah' },
  { building: 'Golden Mile', community: 'Palm Jumeirah', area: 'Palm Jumeirah' },
  { building: 'Business Bay Tower', community: 'Business Bay', area: 'Business Bay' },
  { building: 'Executive Towers', community: 'Business Bay', area: 'Business Bay' },
  { building: 'JBR Beach Residence', community: 'Jumeirah Beach Residence', area: 'JBR' },
  { building: 'The Walk', community: 'Jumeirah Beach Residence', area: 'JBR' },
  { building: 'Emirates Hills Villas', community: 'Emirates Hills', area: 'Emirates Hills' },
  { building: 'Arabian Ranches', community: 'Arabian Ranches', area: 'Arabian Ranches' },
  { building: 'Damac Hills', community: 'DAMAC Hills', area: 'DAMAC Hills' },
];

const DEVELOPERS = [
  'Tiger Properties',
  'Emaar',
  'DAMAC',
  'Nakheel',
  'Meraas',
  'Sobha Realty',
  'Dubai Properties',
  'Azizi Developments',
];

const AMENITIES = [
  'Concierge Service',
  'Central A/C & Heating',
  'Gym',
  'Swimming Pool',
  'Covered Parking',
  '24/7 Security',
  'Children\'s Play Area',
  'BBQ Area',
  'Steam Room',
  'Sauna',
  'Jacuzzi',
  'Balcony',
  'Built-in Wardrobes',
  'Walk-in Closet',
  'Kitchen Appliances',
  'Maid\'s Room',
  'Study Room',
  'Private Garden',
  'Shared Pool',
  'Private Pool',
  'Pet-Friendly',
  'Smart Home System',
];

const FEATURES = [
  'Water Front View',
  'High Floor',
  'Prime Location',
  'Marina View',
  'Burj Khalifa View',
  'Golf Course View',
  'Sea View',
  'Park View',
  'City View',
  'Garden View',
  'Corner Unit',
  'Upgraded Interior',
  'Vacant on Transfer',
  'Rented',
  'Investment Opportunity',
];

const AGENT_NAMES = [
  'Walid Ali',
  'Ahmed Hassan',
  'Sarah Johnson',
  'Mohammed Al Zarooni',
  'Lisa Chen',
  'Omar Abdullah',
  'Natasha Petrova',
  'Rajesh Kumar',
  'Emma Williams',
  'Khalid Mohammed',
];

const AGENCIES = [
  'KOMMANDA REAL ESTATE BROKERAGE L.L.C',
  'Metropolitan Premium Properties',
  'Espace Real Estate',
  'Betterhomes',
  'Hamptons International',
  'Driven Properties',
  'Allsopp & Allsopp',
  'Engel & Völkers',
];

export function generateMockProperties(count: number = 50): Property[] {
  const properties: Property[] = [];

  for (let i = 0; i < count; i++) {
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const bedrooms = Math.floor(Math.random() * 5) + 1;
    const bathrooms = Math.floor(Math.random() * Math.min(bedrooms, 3)) + 1;
    const isOffPlan = Math.random() > 0.4;
    const propertyType = ['Apartment', 'Villa', 'Townhouse', 'Penthouse'][
      Math.floor(Math.random() * 4)
    ] as Property['propertyType'];
    const size = Math.floor(Math.random() * 2000) + 500;
    const basePrice = size * (800 + Math.random() * 1200);

    const handoverYears = ['Q2 2026', 'Q4 2026', 'Q1 2027', 'Q3 2027', 'Q2 2028', 'Q4 2028', 'Q1 2029'];
    const paymentPlans = ['60/40', '70/30', '80/20', '50/50'];

    properties.push({
      id: `prop-${i + 1}`,
      price: Math.round(basePrice),
      currency: 'AED',
      bedrooms,
      bathrooms,
      size,
      sizeUnit: 'sqft',
      propertyType,
      purpose: Math.random() > 0.3 ? 'Sale' : 'Rent',
      furnishing: Math.random() > 0.5 ? 'Furnished' : 'Unfurnished',
      completionStatus: isOffPlan ? 'Off-Plan' : 'Ready',
      paymentPlan: isOffPlan ? paymentPlans[Math.floor(Math.random() * paymentPlans.length)] : undefined,
      handoverDate: isOffPlan
        ? handoverYears[Math.floor(Math.random() * handoverYears.length)]
        : undefined,
      developer: DEVELOPERS[Math.floor(Math.random() * DEVELOPERS.length)],
      projectName: location.community,

      location: {
        ...location,
        city: 'Dubai',
        coordinates: {
          lat: 25.0657 + (Math.random() - 0.5) * 0.1,
          lng: 55.1713 + (Math.random() - 0.5) * 0.1,
        },
      },

      images: Array(5)
        .fill(0)
        .map((_, idx) => `https://picsum.photos/800/600?random=${i * 10 + idx}`),

      description: `${
        isOffPlan ? 'Off-plan ' : ''
      }${bedrooms}-bedroom ${propertyType.toLowerCase()} in ${location.community}. ${
        FEATURES[Math.floor(Math.random() * FEATURES.length)]
      }. ${
        propertyType === 'Villa' || propertyType === 'Townhouse'
          ? 'Spacious layout with private garden.'
          : 'Modern finishes and stunning views.'
      }`,

      features: Array.from(
        { length: 3 + Math.floor(Math.random() * 3) },
        () => FEATURES[Math.floor(Math.random() * FEATURES.length)]
      ).filter((v, i, a) => a.indexOf(v) === i),

      amenities: Array.from(
        { length: 4 + Math.floor(Math.random() * 6) },
        () => AMENITIES[Math.floor(Math.random() * AMENITIES.length)]
      ).filter((v, i, a) => a.indexOf(v) === i),

      verification: {
        verified: Math.random() > 0.3,
        ownership: 'Freehold',
        balconySize: Math.random() > 0.5 ? Math.floor(Math.random() * 100) + 50 : undefined,
        parkingAvailable: Math.random() > 0.2,
        usage: 'Residential',
      },

      building: {
        name: location.building,
        floors: Math.floor(Math.random() * 30) + 5,
        retailCentres: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : undefined,
      },

      project: isOffPlan
        ? {
            name: location.community,
            developer: DEVELOPERS[Math.floor(Math.random() * DEVELOPERS.length)],
            status: 'Under Construction',
            lastInspected: new Date(
              Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
            handover: handoverYears[Math.floor(Math.random() * handoverYears.length)],
          }
        : undefined,

      agent: {
        name: AGENT_NAMES[Math.floor(Math.random() * AGENT_NAMES.length)],
        photo: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
        agency: AGENCIES[Math.floor(Math.random() * AGENCIES.length)],
      },

      regulatory: {
        permitNumber: `7181545${8000 + i}`,
        zoneName: 'Al Hebiah First',
        registeredAgency: AGENCIES[Math.floor(Math.random() * AGENCIES.length)],
        rera: `${40000 + Math.floor(Math.random() * 1000)}`,
        referenceId: `RADWA${100000 + i}`,
        brn: `${80000 + Math.floor(Math.random() * 10000)}`,
      },

      updatedAt: new Date().toISOString(),
      postedAt: new Date(
        Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
      ).toISOString(),
    });
  }

  return properties;
}

export const mockProperties = generateMockProperties(60);
