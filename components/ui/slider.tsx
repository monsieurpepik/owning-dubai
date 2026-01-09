'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      min = 0,
      max = 100,
      step = 1,
      value: controlledValue,
      defaultValue = [min, max],
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleChange = (index: number, newValue: number) => {
      const newValues = [...value];
      newValues[index] = newValue;

      // Ensure min doesn't exceed max
      if (index === 0 && newValues[0] > newValues[1]) {
        newValues[0] = newValues[1];
      }
      // Ensure max doesn't go below min
      if (index === 1 && newValues[1] < newValues[0]) {
        newValues[1] = newValues[0];
      }

      if (controlledValue === undefined) {
        setInternalValue(newValues);
      }
      onValueChange?.(newValues);
    };

    const percentage = (val: number) => ((val - min) / (max - min)) * 100;

    return (
      <div ref={ref} className={cn('relative w-full py-4', className)} {...props}>
        <div className="relative h-2 w-full">
          {/* Track */}
          <div className="absolute h-2 w-full rounded-full bg-gray-200" />
          {/* Active track */}
          <div
            className="absolute h-2 rounded-full bg-primary"
            style={{
              left: `${percentage(value[0])}%`,
              right: `${100 - percentage(value[1])}%`,
            }}
          />
          {/* Thumb 1 */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) => handleChange(0, Number(e.target.value))}
            className="slider-thumb absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:cursor-pointer"
          />
          {/* Thumb 2 */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={(e) => handleChange(1, Number(e.target.value))}
            className="slider-thumb absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
