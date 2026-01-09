'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavoriteStore } from '@/store/favoriteStore';

export function MobileNav() {
  const pathname = usePathname();
  const { favorites } = useFavoriteStore();

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/properties', label: 'Search', icon: Search },
    { href: '/favorites', label: 'Favorites', icon: Heart, badge: favorites.length },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
      <div className="grid grid-cols-4 h-16">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
                isActive ? 'text-primary' : 'text-gray-600'
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </div>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
