import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { COLORS } from '@/lib/constants';

type BehaviorItem = {
  id: string;
  name: string;
  defaultChecked: boolean;
};

type JournalCategoryProps = {
  title: string;
  behaviors: BehaviorItem[];
};

const JournalCategory: React.FC<JournalCategoryProps> = ({ title, behaviors }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    // Initialize checked state from the default values
    return behaviors.reduce((acc, behavior) => {
      acc[behavior.id] = behavior.defaultChecked;
      return acc;
    }, {} as Record<string, boolean>);
  });
  
  const handleCheckboxChange = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-[#1c1c1c] rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {behaviors.map((behavior) => (
          <div key={behavior.id} className="flex items-center">
            <Checkbox
              id={behavior.id}
              checked={checkedItems[behavior.id]}
              onCheckedChange={() => handleCheckboxChange(behavior.id)}
              className="h-5 w-5 rounded text-[#009ffd]"
            />
            <label htmlFor={behavior.id} className="ml-3 text-sm">
              {behavior.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalCategory;
