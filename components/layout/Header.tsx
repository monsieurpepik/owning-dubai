'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Menu, Home, X } from 'lucide-react';
import { useFavoriteStore } from '@/store/favoriteStore';

export function Header() {
  const { favorites } = useFavoriteStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-serif text-2xl font-light text-gray-900 tracking-tight">
            Owning<span className="text-accent">Dubai</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link href="/properties" className="text-sm font-light tracking-wide hover:text-accent transition-colors uppercase">
            Properties
          </Link>
          <Link href="/off-plan" className="text-sm font-light tracking-wide hover:text-accent transition-colors uppercase">
            Off-Plan
          </Link>
          <Link href="/favorites" className="relative">
            <button className="text-sm font-light tracking-wide hover:text-accent transition-colors uppercase flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="ml-1 text-xs text-gray-600">({favorites.length})</span>
              )}
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-gray-900" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-bold text-gray-900">Menu</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Drawer Navigation */}
            <nav className="flex flex-col p-4 space-y-2">
              <Link
                href="/"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Home</span>
              </Link>

              <Link
                href="/properties"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-sm font-medium text-gray-900">Properties</span>
              </Link>

              <Link
                href="/off-plan"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-sm font-medium text-gray-900">Off-Plan</span>
              </Link>

              <Link
                href="/favorites"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  Favorites
                  {favorites.length > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-white text-xs">
                      {favorites.length}
                    </span>
                  )}
                </span>
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
