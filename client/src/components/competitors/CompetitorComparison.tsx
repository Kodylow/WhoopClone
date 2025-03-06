import React from 'react';
import { Check, X } from 'lucide-react';

const CompetitorComparison = () => {
  const competitors = [
    {
      name: 'WHOOP',
      logo: '/whoop-logo.svg',
      price: '30/mo with membership',
      recoveryMetrics: true,
      strainMetrics: true,
      sleepAnalysis: true,
      batteryLife: '5 days',
      noScreen: true,
      coaching: true,
      communityInsights: true,
      hrv: true,
      comprehensive: true,
      highlight: true,
    },
    {
      name: 'Fitbit',
      logo: '/fitbit-logo.svg',
      price: '$150-300 upfront',
      recoveryMetrics: false,
      strainMetrics: false,
      sleepAnalysis: true,
      batteryLife: '7 days',
      noScreen: false,
      coaching: false,
      communityInsights: false,
      hrv: false,
      comprehensive: false,
      highlight: false,
    },
    {
      name: 'Apple Watch',
      logo: '/apple-logo.svg',
      price: '$400-800 upfront',
      recoveryMetrics: false,
      strainMetrics: false,
      sleepAnalysis: true,
      batteryLife: '18 hours',
      noScreen: false,
      coaching: false,
      communityInsights: false,
      hrv: true,
      comprehensive: false,
      highlight: false,
    },
    {
      name: 'Oura Ring',
      logo: '/oura-logo.svg',
      price: '$300 + $6/mo subscription',
      recoveryMetrics: true,
      strainMetrics: false,
      sleepAnalysis: true,
      batteryLife: '7 days',
      noScreen: true,
      coaching: false,
      communityInsights: false,
      hrv: true,
      comprehensive: false,
      highlight: false,
    },
    {
      name: 'Garmin',
      logo: '/garmin-logo.svg',
      price: '$200-1000 upfront',
      recoveryMetrics: true,
      strainMetrics: true,
      sleepAnalysis: true,
      batteryLife: '7-14 days',
      noScreen: false,
      coaching: false,
      communityInsights: false,
      hrv: true,
      comprehensive: false,
      highlight: false,
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-[#121212] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">WHOOP vs. The Competition</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            See how WHOOP outperforms other wearables by providing the most comprehensive and accurate fitness and recovery data
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1c1c1c] rounded-xl">
            <thead>
              <tr>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-300 uppercase tracking-wider border-b border-gray-800">
                  Features
                </th>
                {competitors.map((competitor) => (
                  <th 
                    key={competitor.name} 
                    className={`py-4 px-6 text-center text-sm font-medium uppercase tracking-wider border-b border-gray-800 ${
                      competitor.highlight ? 'text-[#009ffd] bg-[#1a2c3d]' : 'text-gray-300'
                    }`}
                  >
                    {competitor.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-gray-200">
                  Pricing
                </td>
                {competitors.map((competitor) => (
                  <td 
                    key={`${competitor.name}-price`} 
                    className={`py-4 px-6 text-sm text-center ${
                      competitor.highlight ? 'text-[#009ffd] bg-[#1a2c3d]' : 'text-gray-300'
                    }`}
                  >
                    {competitor.price}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-gray-200">
                  Recovery Metrics
                </td>
                {competitors.map((competitor) => (
                  <td 
                    key={`${competitor.name}-recovery`} 
                    className={`py-4 px-6 text-center ${
                      competitor.highlight ? 'bg-[#1a2c3d]' : ''
                    }`}
                  >
                    {competitor.recoveryMetrics ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-gray-200">
                  Strain Metrics
                </td>
                {competitors.map((competitor) => (
                  <td 
                    key={`${competitor.name}-strain`} 
                    className={`py-4 px-6 text-center ${
                      competitor.highlight ? 'bg-[#1a2c3d]' : ''
                    }`}
                  >
                    {competitor.strainMetrics ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-gray-200">
                  Sleep Analysis
                </td>
                {competitors.map((competitor) => (
                  <td 
                    key={`${competitor.name}-sleep`} 
                    className={`py-4 px-6 text-center ${
                      competitor.highlight ? 'bg-[#1a2c3d]' : ''
                    }`}
                  >
                    {competitor.sleepAnalysis ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-gray-200">
                  Battery Life
                </td>
                {competitors.map((competitor) => (
                  <td 
                    key={`${competitor.name}-battery`} 
                    className={`py-4 px-6 text-sm text-center ${
                      competitor.highlight ? 'text-[#009ffd] bg-[#1a2c3d]' : 'text-gray-300'
                    }`}
                  >
                    {competitor.batteryLife}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-gray-200">
                  No Distracting Screen
                </td>
                {competitors.map((competitor) => (
                  <td 
                    key={`${competitor.name}-screen`} 
                    className={`py-4 px-6 text-center ${
                      competitor.highlight ? 'bg-[#1a2c3d]' : ''
                    }`}
                  >
                    {competitor.noScreen ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-gray-200">
                  Personalized Coaching
                </td>
                {competitors.map((competitor) => (
                  <td 
                    key={`${competitor.name}-coaching`} 
                    className={`py-4 px-6 text-center ${
                      competitor.highlight ? 'bg-[#1a2c3d]' : ''
                    }`}
                  >
                    {competitor.coaching ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-gray-200">
                  Community Insights
                </td>
                {competitors.map((competitor) => (
                  <td 
                    key={`${competitor.name}-community`} 
                    className={`py-4 px-6 text-center ${
                      competitor.highlight ? 'bg-[#1a2c3d]' : ''
                    }`}
                  >
                    {competitor.communityInsights ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-gray-200">
                  HRV Tracking
                </td>
                {competitors.map((competitor) => (
                  <td 
                    key={`${competitor.name}-hrv`} 
                    className={`py-4 px-6 text-center ${
                      competitor.highlight ? 'bg-[#1a2c3d]' : ''
                    }`}
                  >
                    {competitor.hrv ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-gray-200">
                  Comprehensive Analysis
                </td>
                {competitors.map((competitor) => (
                  <td 
                    key={`${competitor.name}-comprehensive`} 
                    className={`py-4 px-6 text-center ${
                      competitor.highlight ? 'bg-[#1a2c3d]' : ''
                    }`}
                  >
                    {competitor.comprehensive ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-16 px-4">
          <h3 className="text-2xl font-bold text-white mb-6">Why WHOOP Is Superior</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1c1c1c] p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-[#009ffd] mb-3">Unparalleled Recovery Analysis</h4>
              <p className="text-gray-300">
                WHOOP's proprietary recovery algorithm uses HRV, resting heart rate, and sleep performance to deliver the most accurate recovery score, something competitors simply don't match.
              </p>
            </div>
            
            <div className="bg-[#1c1c1c] p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-[#009ffd] mb-3">Strain Quantification</h4>
              <p className="text-gray-300">
                Unlike basic step counters, WHOOP measures cardiovascular strain on a scale of 0-21, giving you a true picture of workout intensity and daily exertion.
              </p>
            </div>
            
            <div className="bg-[#1c1c1c] p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-[#009ffd] mb-3">Distraction-Free Design</h4>
              <p className="text-gray-300">
                No screens, no notifications, no distractions. WHOOP focuses solely on data collection, letting you focus on performance rather than another digital device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorComparison;