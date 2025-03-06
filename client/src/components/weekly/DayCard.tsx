import React from 'react';
import CircularProgress from '../dashboard/CircularProgress';
import { COLORS } from '@/lib/constants';
import { DayData } from '@/lib/mockData';

type DayCardProps = {
  day: DayData;
};

const DayCard: React.FC<DayCardProps> = ({ day }) => {
  // Determine the color based on recovery percentage
  const getColor = () => {
    const percent = day.recovery.percent;
    if (percent >= 70) return COLORS.recovery;
    if (percent <= 40) return COLORS.strain;
    return COLORS.sleep;
  };

  return (
    <div className={`bg-[#1c1c1c] rounded-xl p-4 text-center relative ${day.isToday ? 'border border-[#009ffd]/30' : ''}`}>
      {day.isToday && (
        <div className="absolute top-2 right-2">
          <div className="bg-[#009ffd]/20 text-[#009ffd] text-xs px-2 py-1 rounded-full">Today</div>
        </div>
      )}
      
      <div className="text-sm mb-2">{day.weekday}</div>
      
      <div className="flex justify-center mb-3">
        <CircularProgress 
          percentage={day.recovery.percent} 
          value={day.recovery.value}
          size="small"
          color={getColor()}
          valueSuffix="%"
        />
      </div>
      
      <div className="flex justify-between text-xs">
        <div>
          <div className="w-2 h-2 rounded-full bg-[#ff5630] mx-auto mb-1"></div>
          <span className="text-[#a0a0a0]">{day.strain.value.toFixed(1)}</span>
        </div>
        <div>
          <div className="w-2 h-2 rounded-full bg-[#6554c0] mx-auto mb-1"></div>
          <span className="text-[#a0a0a0]">{day.sleep.hours.toFixed(1)}h</span>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
