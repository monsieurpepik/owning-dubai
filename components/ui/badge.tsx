import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
        variant === 'secondary'
          ? 'bg-gray-100 text-gray-700 border border-gray-200'
          : 'bg-gray-900 text-white',
        className
      )}
      {...props}
    />
  );
}

export { Badge };
