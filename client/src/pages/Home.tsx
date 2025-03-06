import React from 'react';
import Hero from '@/components/hero/Hero';
import Dashboard from '@/components/dashboard/Dashboard';
import WeeklyInsights from '@/components/weekly/WeeklyInsights';
import ActivityJournal from '@/components/journal/ActivityJournal';
import MembershipPlans from '@/components/membership/MembershipPlans';

const Home = () => {
  return (
    <div>
      <Hero />
      <Dashboard />
      <WeeklyInsights />
      <ActivityJournal />
      <MembershipPlans />
    </div>
  );
};

export default Home;
