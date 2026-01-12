'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { PropertyCard } from '@/components/property/PropertyCard';
import { MortgageCalculator } from '@/components/property/MortgageCalculator';
import { mockProperties } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { useFavoriteStore } from '@/store/favoriteStore';
import { ArrowRight, FileText, CheckCircle2, Calculator } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { favorites } = useFavoriteStore();
  const featuredProperties = mockProperties.filter(p => p.completionStatus === 'Off-Plan').slice(0, 6);

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

      {/* Featured Developments */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
              Current off-plan developments
            </h2>
            <p className="text-lg text-gray-600">
              Verified projects from established developers with confirmed handover dates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => router.push('/properties')}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-base"
            >
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Off-Plan Specialization */}
      <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
              Only off-plan developments
            </h2>
            <p className="text-lg text-gray-600">
              Properties before completion, with verified payment plans and regulatory information.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Timeline Visualization */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                    1
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    Pre-Construction
                  </h3>
                  <p className="text-sm text-gray-600">
                    Project announced with payment plans
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                    2
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    Under Construction
                  </h3>
                  <p className="text-sm text-gray-600">
                    Installment payments during build
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                    3
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    Near Completion
                  </h3>
                  <p className="text-sm text-gray-600">
                    Final payments before handover
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                    4
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    Handover
                  </h3>
                  <p className="text-sm text-gray-600">
                    Property transfer and possession
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Payment Plans</p>
                    <p className="text-gray-600">60/40, 70/30, 80/20 structures</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Handover Range</p>
                    <p className="text-gray-600">2026 to 2029</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Developer Verification</p>
                    <p className="text-gray-600">RERA registered projects</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 font-medium"
              >
                How Off-Plan Works
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
              Complete project information
            </h2>
            <p className="text-lg text-gray-600">
              Every listing includes developer history, payment terms, and regulatory details.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <FileText className="w-8 h-8 text-gray-900 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Developer Details
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Company background, project portfolio, and delivery record
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Developer name</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Completed projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Project history</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <FileText className="w-8 h-8 text-gray-900 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Payment Structure
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Full payment schedule with milestone-based installments
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Down payment amount</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Installment schedule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Final payment terms</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <FileText className="w-8 h-8 text-gray-900 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Regulatory Info
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Official registration and permit documentation
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>RERA permit number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Registration details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Project approval date</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <FileText className="w-8 h-8 text-gray-900 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Project Specs
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive specifications and completion timeline
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Handover date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Amenities list</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Unit specifications</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href={`/properties/${mockProperties[0].id}`}
                className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 font-medium"
              >
                See Sample Listing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage Calculator */}
      <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
              Calculate your mortgage
            </h2>
            <p className="text-lg text-gray-600">
              Interactive calculator with principal and interest breakdown for Dubai properties.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <Calculator className="w-8 h-8 text-gray-900 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Mortgage Calculator
                  </h3>
                  <p className="text-sm text-gray-600">
                    Estimate monthly payments based on property price, down payment, loan term, and interest rate. Available on every property listing page.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex justify-between">
                  <span>Property Price</span>
                  <span className="font-semibold text-gray-900">Adjustable input</span>
                </div>
                <div className="flex justify-between">
                  <span>Down Payment</span>
                  <span className="font-semibold text-gray-900">AED or percentage</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Term</span>
                  <span className="font-semibold text-gray-900">1-30 years</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest Rate</span>
                  <span className="font-semibold text-gray-900">Variable rate input</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Output</span>
                    <span className="font-semibold text-gray-900">Monthly payment + breakdown</span>
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <Button
                  onClick={() => router.push(`/properties/${mockProperties[0].id}`)}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-5"
                >
                  Open Calculator
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
              Start searching
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Browse verified off-plan developments across Dubai.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => router.push('/properties')}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-base w-full sm:w-auto"
              >
                View Properties
              </Button>

              {favorites.length > 0 && (
                <Button
                  onClick={() => router.push('/favorites')}
                  variant="outline"
                  className="border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-6 text-base w-full sm:w-auto"
                >
                  View Saved ({favorites.length})
                </Button>
              )}
            </div>

            <div className="mt-8 text-sm text-gray-600">
              {mockProperties.filter(p => p.completionStatus === 'Off-Plan').length} verified off-plan properties available
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
