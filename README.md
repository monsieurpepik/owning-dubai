# OwningDubai - Dubai Property Search Platform

A modern, full-featured property search platform inspired by Property Finder and Bayut, built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

### Core Functionality
- ✅ **Property Listings** - Browse 60+ mock properties with detailed information
- ✅ **Advanced Filters** - Filter by location, price, bedrooms, bathrooms, property type, and more
- ✅ **Off-Plan Properties** - Specialized filters for off-plan developments (handover year, payment plans)
- ✅ **Property Details** - Comprehensive property pages with image galleries, amenities, and specifications
- ✅ **Mortgage Calculator** - Interactive mortgage calculator with principal/interest breakdown
- ✅ **Favorites** - Save and manage favorite properties
- ✅ **Responsive Design** - Fully responsive with mobile-first approach

### UI/UX Features
- 🎨 Professional design matching Property Finder/Bayut style
- 📱 Mobile bottom navigation
- 🖼️ Swipeable image carousels on property cards
- 🎯 Interactive price range slider
- ✓ Verified property badges
- 📞 Call/WhatsApp/Email contact buttons
- 🔍 Real-time filter updates

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Carousel:** Swiper
- **Icons:** Lucide React
- **UI Components:** Custom components based on shadcn/ui patterns

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
owning-dubai/
├── app/                          # Next.js app router pages
│   ├── layout.tsx               # Root layout with header/nav
│   ├── page.tsx                 # Homepage
│   ├── properties/              # Properties pages
│   │   ├── page.tsx            # Listings page
│   │   └── [id]/               # Dynamic property detail page
│   └── favorites/              # Favorites page
├── components/
│   ├── ui/                     # Base UI components
│   ├── property/               # Property-specific components
│   ├── filters/               # Filter components
│   └── layout/               # Layout components
├── lib/
│   ├── utils.ts              # Utility functions
│   └── mockData.ts           # Mock property data generator
├── store/
│   ├── filterStore.ts        # Filter state management
│   └── favoriteStore.ts      # Favorites state management
└── types/
    └── property.ts           # TypeScript type definitions
```

## 🎨 Design System

### Colors
- **Primary:** #E31E24 (Red)
- **Primary Hover:** #C41A1F
- **Gray Scale:** 50-900 range for consistent UI

### Key Components

#### PropertyCard
- Image carousel with navigation
- Verified/Off-Plan badges
- Price, bedrooms, bathrooms, square footage
- Location with MapPin icon
- Call/WhatsApp action buttons
- Favorite toggle

#### FilterPanel
- Purpose tabs (Rent/Buy/Off-Plan)
- Location search
- Property type selector
- Price range slider
- Bedroom/bathroom selectors
- Off-plan specific filters
- Live result count

#### MortgageCalculator
- Residency status selector
- Property price input
- Down payment (AED and %)
- Loan term and interest rate
- Monthly payment calculation
- Principal/Interest breakdown with visual chart

## 📊 Mock Data

The application includes 60 pre-generated properties with:
- Varied prices (500K - 4.5M AED)
- Multiple locations (Dubai Marina, Downtown, JBR, Palm Jumeirah, etc.)
- Different property types (Apartments, Villas, Townhouses, Penthouses)
- Off-plan and ready properties
- Payment plans (60/40, 70/30, 80/20)
- Handover dates (2026-2029)

## 🎯 Pages

### Homepage (/)
- Hero section with filter panel
- Featured properties (6 properties)
- Stats section
- Why Choose Us section

### Properties Listing (/properties)
- Grid view of filtered properties
- Sidebar filters (desktop) / Modal filters (mobile)
- Load more pagination
- Result count display

### Property Detail (/properties/[id])
- Full-width image gallery with thumbnails
- Property information and specs
- Description and amenities
- Mortgage calculator
- Location map placeholder
- Agent contact card
- Similar properties section

### Favorites (/favorites)
- Saved properties grid
- Persistent across sessions

## 🚧 Future Enhancements

- [ ] Google Maps integration for location display
- [ ] Real API integration
- [ ] User authentication
- [ ] Property comparison feature
- [ ] Advanced search with autocomplete
- [ ] Virtual tours (360° view)
- [ ] Real-time chat with agents
- [ ] Arabic language support

## 📄 License

MIT License - feel free to use this project for learning or as a starting point for your own property platform.

---

**Built with ❤️ for the Dubai real estate market**
