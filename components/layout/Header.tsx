'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Menu } from 'lucide-react';
import { useFavoriteStore } from '@/store/favoriteStore';

export function Header() {
  const { favorites } = useFavoriteStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-semibold text-gray-900 tracking-tight">
            Owning
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/properties" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Properties
          </Link>
          <Link href="/favorites" className="relative">
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
