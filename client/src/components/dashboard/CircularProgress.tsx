import React from 'react';
import { COLORS } from '@/lib/constants';

type CircularProgressProps = {
  percentage: number;
  value: number | string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  trackColor?: string;
  valuePrefix?: string;
  valueSuffix?: string;
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  value,
  size = 'medium',
  color,
  trackColor = 'rgba(255,255,255,0.1)',
  valuePrefix = '',
  valueSuffix = ''
}) => {
  // Determine color based on the value if not provided
  const getColor = () => {
    if (color) return color;
    
    // Default color logic (recovery is green, strain is red, sleep is purple)
    if (typeof value === 'number') {
      if (percentage >= 70) return COLORS.recovery;
      if (percentage <= 40) return COLORS.strain;
      return COLORS.primary;
    }
    
    return COLORS.primary;
  };
  
  // Size mapping
  const sizeMap = {
    small: { svgSize: 'w-16 h-16', fontSize: 'text-sm' },
    medium: { svgSize: 'w-20 h-20', fontSize: 'text-lg' },
    large: { svgSize: 'w-24 h-24', fontSize: 'text-xl' }
  };
  
  const { svgSize, fontSize } = sizeMap[size];
  const circleColor = getColor();
  const strokeDashoffset = 100 - percentage;
  
  return (
    <div className="relative" style={{ transform: 'rotate(-90deg)' }}>
      <svg className={svgSize} viewBox="0 0 36 36">
        <circle 
          cx="18" 
          cy="18" 
          r="16" 
          fill="none" 
          strokeWidth="2" 
          stroke={trackColor} 
        />
        <circle 
          cx="18" 
          cy="18" 
          r="16" 
          fill="none" 
          strokeWidth="2" 
          stroke={circleColor} 
          strokeDasharray="100" 
          strokeDashoffset={strokeDashoffset} 
          strokeLinecap="round" 
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div 
        className={`absolute inset-0 flex items-center justify-center ${fontSize} font-bold`}
        style={{ transform: 'rotate(90deg)' }}
      >
        <span style={{ color: circleColor }}>
          {valuePrefix}{value}{valueSuffix}
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
