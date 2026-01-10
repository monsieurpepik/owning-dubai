import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative h-64">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Price Skeleton */}
        <Skeleton className="h-8 w-32" />

        {/* Title Skeleton */}
        <Skeleton className="h-6 w-full" />

        {/* Location Skeleton */}
        <Skeleton className="h-4 w-3/4" />

        {/* Specs Skeleton */}
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Buttons Skeleton */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </CardContent>
    </Card>
  );
}
