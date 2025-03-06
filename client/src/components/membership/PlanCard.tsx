import React from 'react';
import { Check } from 'lucide-react';
import { COLORS } from '@/lib/constants';

type PlanCardProps = {
  title: string;
  price: number;
  frequency: string;
  billingNote: string;
  features: string[];
  cta: string;
  popular?: boolean;
  savingsNote?: string;
};

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  frequency,
  billingNote,
  features,
  cta,
  popular = false,
  savingsNote
}) => {
  return (
    <div 
      className={`bg-[#1c1c1c] rounded-2xl p-6 border ${
        popular 
          ? 'border-[#009ffd] relative transform md:scale-105 shadow-lg' 
          : 'border-transparent hover:border-[#009ffd] transition-colors'
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#009ffd] text-white text-xs font-bold px-4 py-1 rounded-full">
          MOST POPULAR
        </div>
      )}
      
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex justify-center items-baseline">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-[#a0a0a0] ml-1">{frequency}</span>
        </div>
        <p className="text-[#a0a0a0] text-sm mt-2">{billingNote}</p>
        {savingsNote && (
          <p className="text-[#009ffd] text-sm mt-1">{savingsNote}</p>
        )}
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <div className="h-5 w-5 text-[#009ffd] mr-3">
              <Check size={20} />
            </div>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button 
        className={`w-full ${
          popular 
            ? 'bg-[#009ffd] hover:bg-[#009ffd]/90 text-white' 
            : 'bg-transparent border border-[#009ffd] text-[#009ffd] hover:bg-[#009ffd] hover:text-white'
        } font-semibold px-6 py-3 rounded-full transition-colors`}
      >
        {cta}
      </button>
    </div>
  );
};

export default PlanCard;
