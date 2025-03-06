import { format, subDays } from 'date-fns';

export type HealthMetric = {
  value: number;
  percent: number;
};

export type SleepData = {
  score: HealthMetric;
  timeInBed: string;
  timeAsleep: string;
  sleepEfficiency: number;
  deepSleep: string;
  remSleep: string;
};

export type RecoveryData = {
  score: HealthMetric;
  hrv: number;
  restingHr: number;
  respiratoryRate: number;
};

export type StrainData = {
  score: HealthMetric;
  chartData: number[];
  timeLabels: string[];
};

export type DayData = {
  date: Date;
  weekday: string;
  recovery: HealthMetric;
  strain: HealthMetric;
  sleep: { hours: number; efficiency: number };
  isToday: boolean;
};

export type ChartData = {
  dates: string[];
  recoveryData: number[];
  strainData: number[];
  sleepData: number[];
};

// Generate mock health data
export const todayData: {
  recovery: RecoveryData;
  strain: StrainData;
  sleep: SleepData;
} = {
  recovery: {
    score: { value: 71, percent: 71 },
    hrv: 68,
    restingHr: 54,
    respiratoryRate: 16.2
  },
  strain: {
    score: { value: 12.7, percent: 53 },
    chartData: [0, 2, 3, 4, 6, 8, 10, 12, 12.7],
    timeLabels: ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"]
  },
  sleep: {
    score: { value: 85, percent: 85 },
    timeInBed: "8h 23m",
    timeAsleep: "7h 12m",
    sleepEfficiency: 88,
    deepSleep: "1h 43m",
    remSleep: "2h 10m"
  }
};

// Generate last week's data
export const weeklyData: DayData[] = [
  {
    date: subDays(new Date(), 6),
    weekday: "Mon",
    recovery: { value: 75, percent: 75 },
    strain: { value: 14.3, percent: 68 },
    sleep: { hours: 7.8, efficiency: 86 },
    isToday: false
  },
  {
    date: subDays(new Date(), 5),
    weekday: "Tue",
    recovery: { value: 68, percent: 68 },
    strain: { value: 11.7, percent: 56 },
    sleep: { hours: 6.5, efficiency: 82 },
    isToday: false
  },
  {
    date: subDays(new Date(), 4),
    weekday: "Wed",
    recovery: { value: 45, percent: 45 },
    strain: { value: 18.2, percent: 87 },
    sleep: { hours: 5.2, efficiency: 75 },
    isToday: false
  },
  {
    date: subDays(new Date(), 3),
    weekday: "Thu",
    recovery: { value: 38, percent: 38 },
    strain: { value: 15.9, percent: 76 },
    sleep: { hours: 4.8, efficiency: 70 },
    isToday: false
  },
  {
    date: subDays(new Date(), 2),
    weekday: "Fri",
    recovery: { value: 60, percent: 60 },
    strain: { value: 8.4, percent: 40 },
    sleep: { hours: 7.1, efficiency: 84 },
    isToday: false
  },
  {
    date: subDays(new Date(), 1),
    weekday: "Sat",
    recovery: { value: 78, percent: 78 },
    strain: { value: 4.2, percent: 20 },
    sleep: { hours: 8.7, efficiency: 91 },
    isToday: false
  },
  {
    date: new Date(),
    weekday: "Sun",
    recovery: { value: 71, percent: 71 },
    strain: { value: 12.7, percent: 60 },
    sleep: { hours: 7.2, efficiency: 85 },
    isToday: true
  }
];

// Generate performance trend data for chart
export const performanceTrend: ChartData = {
  dates: Array(14).fill(0).map((_, i) => {
    return format(subDays(new Date(), 13 - i), 'MMM dd');
  }),
  recoveryData: [
    60, 65, 68, 72, 75, 71, 68, 
    45, 38, 52, 60, 78, 82, 71
  ],
  strainData: [
    8.2, 9.5, 12.3, 10.8, 7.6, 14.2, 15.1,
    18.2, 15.9, 12.1, 8.4, 4.2, 9.8, 12.7
  ],
  sleepData: [
    75, 78, 82, 80, 78, 72, 65,
    55, 62, 70, 83, 88, 85, 76
  ]
};

export const journalInsights = {
  patterns: [
    {
      direction: "up",
      text: "Your recovery scores average 12% higher when you sleep with a mask and maintain a consistent bedtime."
    },
    {
      direction: "down",
      text: "Your strain scores tend to decrease on days following high protein meals and proper hydration."
    },
    {
      direction: "up",
      text: "Your sleep quality improves by 18% when you spend 30+ minutes outdoors during the day."
    }
  ],
  recommendations: [
    { color: "#36b37e", text: "Try meditation to improve HRV" },
    { color: "#6554c0", text: "Add light stretching before bed" },
    { color: "#009ffd", text: "Maintain consistent meal timing" }
  ],
  effectiveHabits: [
    { name: "Consistent bedtime", impact: 23, color: "#36b37e", width: 86 },
    { name: "Hydration > 64oz", impact: 18, color: "#009ffd", width: 74 },
    { name: "Outdoor time", impact: 15, color: "#6554c0", width: 68 }
  ]
};
