import React from 'react';
import JournalCategory from './JournalCategory';
import JournalInsights from './JournalInsights';
import { BEHAVIORS } from '@/lib/constants';

const ActivityJournal = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Activity Journal</h2>
            <p className="text-[#a0a0a0]">Track daily behaviors that impact your performance</p>
          </div>
          <button className="mt-4 md:mt-0 bg-[#009ffd] hover:bg-[#009ffd]/90 text-white font-semibold px-6 py-2 rounded-full text-center transition-colors">
            Add Entry
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Journal Categories */}
          <JournalCategory title="Sleep" behaviors={BEHAVIORS.sleep} />
          <JournalCategory title="Nutrition" behaviors={BEHAVIORS.nutrition} />
          <JournalCategory title="Lifestyle" behaviors={BEHAVIORS.lifestyle} />
          <JournalCategory title="Workout" behaviors={BEHAVIORS.workout} />
        </div>
        
        {/* Journal Insights */}
        <JournalInsights />
      </div>
    </section>
  );
};

export default ActivityJournal;
