import React, { useState } from 'react';
import DayCard from './DayCard';
import PerformanceChart from './PerformanceChart';
import { weeklyData, performanceTrend } from '@/lib/mockData';

type Period = 'week' | 'month' | 'year';

const WeeklyInsights = () => {
  const [activePeriod, setActivePeriod] = useState<Period>('week');
  
  // Handle period change
  const handlePeriodChange = (period: Period) => {
    setActivePeriod(period);
  };
  
  // Style for period button (active vs inactive)
  const getPeriodButtonClass = (period: Period) => {
    return period === activePeriod
      ? 'px-4 py-2 text-sm font-medium bg-[#009ffd] text-white rounded-full'
      : 'px-4 py-2 text-sm font-medium text-[#a0a0a0] hover:text-white transition-colors';
  };

  return (
    <section className="py-16 bg-[#1c1c1c]/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Weekly Performance</h2>
            <p className="text-[#a0a0a0]">Track your progress over time</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex bg-[#121212] rounded-full p-1">
              <button 
                className={getPeriodButtonClass('week')}
                onClick={() => handlePeriodChange('week')}
              >
                Week
              </button>
              <button 
                className={getPeriodButtonClass('month')}
                onClick={() => handlePeriodChange('month')}
              >
                Month
              </button>
              <button 
                className={getPeriodButtonClass('year')}
                onClick={() => handlePeriodChange('year')}
              >
                Year
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-12">
          {weeklyData.map((day, index) => (
            <DayCard key={index} day={day} />
          ))}
        </div>
        
        <PerformanceChart data={performanceTrend} />
      </div>
    </section>
  );
};

export default WeeklyInsights;
