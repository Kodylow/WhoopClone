import React, { useState, useRef, useEffect } from 'react';
import { COLORS } from '@/lib/constants';
import { ChartData } from '@/lib/mockData';

type PerformanceChartProps = {
  data: ChartData;
};

type TooltipState = {
  visible: boolean;
  date: string;
  value: number;
  color: string;
  x: number;
  y: number;
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  const [activeDataset, setActiveDataset] = useState<'recovery' | 'strain' | 'sleep'>('recovery');
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    date: '',
    value: 0,
    color: COLORS.recovery,
    x: 0,
    y: 0
  });
  
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Dataset configurations
  const datasets = {
    recovery: {
      data: data.recoveryData,
      color: COLORS.recovery,
      gradientId: 'recovery-gradient',
      label: 'Recovery'
    },
    strain: {
      data: data.strainData,
      color: COLORS.strain,
      gradientId: 'strain-gradient',
      label: 'Strain'
    },
    sleep: {
      data: data.sleepData,
      color: COLORS.sleep,
      gradientId: 'sleep-gradient',
      label: 'Sleep'
    }
  };

  // Convert data points to SVG path
  const generatePath = (dataPoints: number[], height: number = 250, max: number = 100) => {
    // Convert values to y-coordinates (inverted because SVG y-axis is top to bottom)
    const yValues = dataPoints.map(val => (1 - val / max) * height);
    
    // Generate path
    const pointsPerSegment = 700 / (dataPoints.length - 1);
    let path = `M0,${yValues[0]}`;
    
    dataPoints.forEach((_, index) => {
      if (index === 0) return;
      
      const x = index * pointsPerSegment;
      path += ` C${x - pointsPerSegment * 0.7},${yValues[index-1]} ${x - pointsPerSegment * 0.3},${yValues[index]} ${x},${yValues[index]}`;
    });
    
    return path;
  };

  // Generate filled area path (for gradient)
  const generateAreaPath = (dataPoints: number[], height: number = 250, max: number = 100) => {
    const linePath = generatePath(dataPoints, height, max);
    return `${linePath} L700,${height} L0,${height} Z`;
  };

  // Handle interactive point hover
  const handlePointHover = (index: number, event: React.MouseEvent<SVGCircleElement>) => {
    const rect = chartRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const dataset = datasets[activeDataset];
    const value = dataset.data[index];
    
    setTooltip({
      visible: true,
      date: data.dates[index],
      value: value,
      color: dataset.color,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top - 60 // position above the cursor
    });
  };

  // Handle mouse leave for points
  const handlePointLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  // Active dataset styles
  const getButtonStyles = (dataset: 'recovery' | 'strain' | 'sleep') => {
    return activeDataset === dataset 
      ? 'text-sm font-medium text-white' 
      : 'text-sm font-medium text-[#a0a0a0]';
  };

  // Data from active dataset
  const activeData = datasets[activeDataset].data;
  const max = activeDataset === 'strain' ? 21 : 100; // Max value for strain is 21, others are percentages

  return (
    <div className="bg-[#1c1c1c] rounded-2xl p-6" ref={chartRef}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Performance Trends</h3>
        <div className="flex space-x-4">
          <button 
            className={`flex items-center ${getButtonStyles('recovery')}`}
            onClick={() => setActiveDataset('recovery')}
          >
            <span className="w-3 h-3 bg-[#36b37e] rounded-full mr-2"></span>
            Recovery
          </button>
          <button 
            className={`flex items-center ${getButtonStyles('strain')}`}
            onClick={() => setActiveDataset('strain')}
          >
            <span className="w-3 h-3 bg-[#ff5630] rounded-full mr-2"></span>
            Strain
          </button>
          <button 
            className={`flex items-center ${getButtonStyles('sleep')}`}
            onClick={() => setActiveDataset('sleep')}
          >
            <span className="w-3 h-3 bg-[#6554c0] rounded-full mr-2"></span>
            Sleep
          </button>
        </div>
      </div>
      
      <div className="h-64 relative">
        <div className="chart-line bottom-0 absolute h-[2px] bg-white/10 w-full"></div>
        <div className="chart-line bottom-1/4 absolute h-[2px] bg-white/10 w-full"></div>
        <div className="chart-line bottom-2/4 absolute h-[2px] bg-white/10 w-full"></div>
        <div className="chart-line bottom-3/4 absolute h-[2px] bg-white/10 w-full"></div>
        
        <svg className="h-full w-full" viewBox="0 0 700 250" preserveAspectRatio="none">
          <defs>
            <linearGradient id={datasets.recovery.gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={datasets.recovery.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={datasets.recovery.color} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={datasets.strain.gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={datasets.strain.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={datasets.strain.color} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={datasets.sleep.gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={datasets.sleep.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={datasets.sleep.color} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Fill area with gradient */}
          <path 
            d={generateAreaPath(activeData, 250, max)} 
            fill={`url(#${datasets[activeDataset].gradientId})`} 
          />
          
          {/* Line for the data */}
          <path 
            d={generatePath(activeData, 250, max)} 
            fill="none" 
            stroke={datasets[activeDataset].color} 
            strokeWidth="2" 
          />
          
          {/* Interactive points */}
          {activeData.map((value, index) => {
            const x = index * (700 / (activeData.length - 1));
            const y = (1 - value / max) * 250;
            
            return (
              <circle 
                key={index}
                cx={x} 
                cy={y} 
                r="4" 
                fill={datasets[activeDataset].color}
                className="transition-all duration-200 hover:r-6"
                onMouseEnter={(e) => handlePointHover(index, e)}
                onMouseLeave={handlePointLeave}
              />
            );
          })}
        </svg>
        
        {/* Tooltip */}
        {tooltip.visible && (
          <div 
            className="absolute bg-[#121212] border border-gray-700 rounded-md p-2 shadow-lg z-10"
            style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px`, transform: 'translateX(-50%)' }}
          >
            <div className="text-sm font-medium">{tooltip.date}</div>
            <div className="flex items-center text-xs" style={{ color: tooltip.color }}>
              <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: tooltip.color }}></span>
              {activeDataset === 'strain' 
                ? `Strain: ${tooltip.value.toFixed(1)}` 
                : `${datasets[activeDataset].label}: ${tooltip.value}%`}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-3 text-xs text-[#a0a0a0]">
        {data.dates.filter((_, i) => i % 2 === 0).map((date, index) => (
          <span key={index}>{date}</span>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;
