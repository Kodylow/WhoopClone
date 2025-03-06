import React from 'react';
import MetricsCard from './MetricsCard';
import { todayData } from '@/lib/mockData';

const Dashboard = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Complete Health Dashboard</h2>
          <p className="text-[#a0a0a0] max-w-2xl mx-auto">
            Track all aspects of your performance, recovery, and health with our comprehensive metrics and insights.
          </p>
        </div>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricsCard type="recovery" data={todayData.recovery} />
          <MetricsCard type="strain" data={todayData.strain} />
          <MetricsCard type="sleep" data={todayData.sleep} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
