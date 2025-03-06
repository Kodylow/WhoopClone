import React from 'react';
import CircularProgress from './CircularProgress';
import { COLORS } from '@/lib/constants';
import { RecoveryData, SleepData, StrainData } from '@/lib/mockData';

type MetricsCardProps = {
  type: 'recovery' | 'strain' | 'sleep';
  data: RecoveryData | StrainData | SleepData;
};

const MetricsCard: React.FC<MetricsCardProps> = ({ type, data }) => {
  // Type guard functions to help TypeScript identify the data type
  const isRecoveryData = (data: any): data is RecoveryData => type === 'recovery';
  const isStrainData = (data: any): data is StrainData => type === 'strain';
  const isSleepData = (data: any): data is SleepData => type === 'sleep';

  // Color mapping based on type
  const colorMap = {
    recovery: COLORS.recovery,
    strain: COLORS.strain,
    sleep: COLORS.sleep
  };

  // Title and subtitle based on type
  const titleMap = {
    recovery: { title: 'Recovery', subtitle: 'How ready your body is' },
    strain: { title: 'Strain', subtitle: 'Cardiovascular load' },
    sleep: { title: 'Sleep', subtitle: 'Quality & duration' }
  };

  // Value suffix based on type
  const valueSuffixMap = {
    recovery: '%',
    strain: '',
    sleep: '%'
  };

  // Render card content based on type
  const renderCardContent = () => {
    if (isRecoveryData(data)) {
      return (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#a0a0a0]">Heart Rate Variability</span>
            <span className="text-sm font-medium">{data.hrv}ms</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#a0a0a0]">Resting Heart Rate</span>
            <span className="text-sm font-medium">{data.restingHr}bpm</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#a0a0a0]">Respiratory Rate</span>
            <span className="text-sm font-medium">{data.respiratoryRate} rpm</span>
          </div>
        </div>
      );
    }

    if (isStrainData(data)) {
      return (
        <div>
          <div className="chart-container h-[150px] relative">
            <div className="chart-line bottom-0 absolute h-[2px] bg-white/10 w-full"></div>
            <div className="chart-line bottom-1/4 absolute h-[2px] bg-white/10 w-full"></div>
            <div className="chart-line bottom-2/4 absolute h-[2px] bg-white/10 w-full"></div>
            <div className="chart-line bottom-3/4 absolute h-[2px] bg-white/10 w-full"></div>
            <svg className="h-full w-full" viewBox="0 0 300 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="strain-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={COLORS.strain} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={COLORS.strain} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d="M0,150 L0,100 C10,95 20,110 30,105 C40,100 50,80 60,85 C70,90 80,70 90,65 C100,60 110,90 120,70 C130,50 140,40 150,60 C160,80 170,30 180,35 C190,40 200,20 210,25 C220,30 230,15 240,20 C250,25 260,40 270,30 C280,20 290,40 300,30 L300,150 Z" 
                fill="url(#strain-gradient)" 
              />
              <path 
                d="M0,100 C10,95 20,110 30,105 C40,100 50,80 60,85 C70,90 80,70 90,65 C100,60 110,90 120,70 C130,50 140,40 150,60 C160,80 170,30 180,35 C190,40 200,20 210,25 C220,30 230,15 240,20 C250,25 260,40 270,30 C280,20 290,40 300,30" 
                fill="none" 
                stroke={COLORS.strain} 
                strokeWidth="2" 
              />
            </svg>
          </div>
          <div className="flex justify-between mt-3 text-xs text-[#a0a0a0]">
            <span>6AM</span>
            <span>12PM</span>
            <span>6PM</span>
          </div>
        </div>
      );
    }

    if (isSleepData(data)) {
      return (
        <div>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-[#a0a0a0]">Time in bed</span>
            <span className="text-sm font-medium">{data.timeInBed}</span>
          </div>
          <div className="relative h-10 w-full bg-[#121212] rounded-lg overflow-hidden mb-5">
            <div 
              className="absolute h-full bg-[#6554c0]/30 w-full" 
              style={{ width: `${data.sleepEfficiency}%` }}
            ></div>
            <div 
              className="absolute h-full bg-[#6554c0]" 
              style={{ width: `${(parseInt(data.timeAsleep) / parseInt(data.timeInBed)) * 100}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
              {data.timeAsleep} sleep
            </div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#6554c0]"></div>
              <span className="text-xs text-[#a0a0a0]">Deep sleep</span>
            </div>
            <span className="text-xs font-medium">{data.deepSleep}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#6554c0]/50"></div>
              <span className="text-xs text-[#a0a0a0]">REM sleep</span>
            </div>
            <span className="text-xs font-medium">{data.remSleep}</span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-[#1c1c1c] rounded-2xl p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold">{titleMap[type].title}</h3>
          <p className="text-[#a0a0a0] text-sm">{titleMap[type].subtitle}</p>
        </div>
        <CircularProgress 
          percentage={data.score.percent} 
          value={data.score.value}
          color={colorMap[type]}
          valueSuffix={valueSuffixMap[type]}
        />
      </div>
      {renderCardContent()}
    </div>
  );
};

export default MetricsCard;
