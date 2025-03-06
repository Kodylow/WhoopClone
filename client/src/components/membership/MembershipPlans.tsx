import React from 'react';
import PlanCard from './PlanCard';
import { MEMBERSHIP_PLANS } from '@/lib/constants';

const MembershipPlans = () => {
  return (
    <section className="py-16 bg-[#1c1c1c]/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">WHOOP Membership</h2>
          <p className="text-[#a0a0a0] max-w-2xl mx-auto">
            Join WHOOP to unlock your full potential with 24/7 health monitoring and personalized insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEMBERSHIP_PLANS.map(plan => (
            <PlanCard 
              key={plan.id}
              title={plan.title}
              price={plan.price}
              frequency={plan.frequency}
              billingNote={plan.billingNote}
              features={plan.features}
              cta={plan.cta}
              popular={plan.popular}
              savingsNote={plan.savingsNote}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-[#a0a0a0] mb-6">Join over 500,000 members optimizing their performance</p>
          <div className="flex flex-wrap justify-center gap-8">
            {/* We would normally use actual partner logos here */}
            <div className="h-10 w-28 bg-gray-700/30 rounded opacity-70 grayscale hover:grayscale-0 transition-all"></div>
            <div className="h-10 w-28 bg-gray-700/30 rounded opacity-70 grayscale hover:grayscale-0 transition-all"></div>
            <div className="h-10 w-28 bg-gray-700/30 rounded opacity-70 grayscale hover:grayscale-0 transition-all"></div>
            <div className="h-10 w-28 bg-gray-700/30 rounded opacity-70 grayscale hover:grayscale-0 transition-all"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;
