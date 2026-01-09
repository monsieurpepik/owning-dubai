'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Menu, Home } from 'lucide-react';
import { useFavoriteStore } from '@/store/favoriteStore';

export function Header() {
  const { favorites } = useFavoriteStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-gray-900">
            Owning<span className="text-primary">Dubai</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/properties" className="text-sm font-medium hover:text-primary transition-colors">
            Properties
          </Link>
          <Link href="/off-plan" className="text-sm font-medium hover:text-primary transition-colors">
            Off-Plan
          </Link>
          <Link href="/favorites" className="relative">
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
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
