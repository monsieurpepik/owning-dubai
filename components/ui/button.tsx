import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-white hover:bg-primary-hover shadow-sm': variant === 'default',
            'border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700':
              variant === 'outline',
            'hover:bg-gray-100 text-gray-700': variant === 'ghost',
            'text-gray-900 hover:underline': variant === 'link',
          },
          {
            'h-9 px-3 text-sm': size === 'sm',
            'h-11 px-5 text-base': size === 'md',
            'h-13 px-7 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
