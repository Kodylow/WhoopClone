import React from 'react';
import { COLORS } from '@/lib/constants';
import { journalInsights } from '@/lib/mockData';

const JournalInsights = () => {
  return (
    <div className="mt-10 bg-[#1c1c1c] rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Journal Insights</h3>
      
      <div className="bg-[#121212]/50 rounded-xl p-4 mb-6">
        <p className="text-sm text-[#a0a0a0] mb-2">Based on your journal entries, we've noticed some patterns:</p>
        <ul className="space-y-2">
          {journalInsights.patterns.map((pattern, index) => (
            <li key={index} className="flex items-start">
              <span className={`${pattern.direction === 'up' ? 'text-[#36b37e]' : 'text-[#ff5630]'} mr-2`}>
                {pattern.direction === 'up' ? '↑' : '↓'}
              </span>
              <p className="text-sm">{pattern.text}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-[#121212]/50 rounded-xl p-4">
          <h4 className="text-sm font-medium mb-2">Recommended Behaviors</h4>
          <ul className="space-y-2">
            {journalInsights.recommendations.map((rec, index) => (
              <li key={index} className="flex items-center text-sm">
                <span 
                  className="w-2 h-2 rounded-full mr-2" 
                  style={{ backgroundColor: rec.color }}
                ></span>
                {rec.text}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex-1 bg-[#121212]/50 rounded-xl p-4">
          <h4 className="text-sm font-medium mb-2">Most Effective Habits</h4>
          <div className="space-y-3">
            {journalInsights.effectiveHabits.map((habit, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{habit.name}</span>
                  <span style={{ color: habit.color }}>+{habit.impact}%</span>
                </div>
                <div className="h-2 bg-[#121212] rounded-full overflow-hidden">
                  <div 
                    className="h-full" 
                    style={{ 
                      backgroundColor: habit.color,
                      width: `${habit.width}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalInsights;
