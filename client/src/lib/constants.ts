export const COLORS = {
  background: "#121212",
  surface: "#1c1c1c",
  primary: "#009ffd",
  textPrimary: "#ffffff",
  textSecondary: "#a0a0a0",
  recovery: "#36b37e",
  strain: "#ff5630",
  sleep: "#6554c0"
};

export const MAX_STRAIN = 21;
export const MAX_RECOVERY = 100;
export const MAX_SLEEP_SCORE = 100;

export const BEHAVIORS = {
  sleep: [
    { id: "sleep1", name: "Sleep mask", defaultChecked: true },
    { id: "sleep2", name: "Cool room", defaultChecked: false },
    { id: "sleep3", name: "Reading before bed", defaultChecked: false },
    { id: "sleep4", name: "Consistent bedtime", defaultChecked: true }
  ],
  nutrition: [
    { id: "nutrition1", name: "High protein meal", defaultChecked: true },
    { id: "nutrition2", name: "Hydration > 64oz", defaultChecked: true },
    { id: "nutrition3", name: "Fasting period (16+ hrs)", defaultChecked: false },
    { id: "nutrition4", name: "Supplements", defaultChecked: false }
  ],
  lifestyle: [
    { id: "lifestyle1", name: "Meditation", defaultChecked: false },
    { id: "lifestyle2", name: "Stretching/Mobility", defaultChecked: true },
    { id: "lifestyle3", name: "Sauna/Cold plunge", defaultChecked: false },
    { id: "lifestyle4", name: "Outdoor time (30+ min)", defaultChecked: true }
  ],
  workout: [
    { id: "workout1", name: "Cardio", defaultChecked: true },
    { id: "workout2", name: "Strength training", defaultChecked: false },
    { id: "workout3", name: "Sports/Recreation", defaultChecked: false },
    { id: "workout4", name: "Rest day", defaultChecked: false }
  ]
};

export const MEMBERSHIP_PLANS = [
  {
    id: 1,
    title: "Monthly",
    price: 30,
    frequency: "/month",
    billingNote: "Billed monthly",
    features: [
      "WHOOP 4.0 included",
      "Health monitoring",
      "Sleep analytics",
      "Personalized insights",
      "Community access"
    ],
    cta: "Join Now",
    popular: false
  },
  {
    id: 2,
    title: "Annual",
    price: 25,
    frequency: "/month",
    billingNote: "Billed annually ($300)",
    savingsNote: "Save $60 per year",
    features: [
      "WHOOP 4.0 included",
      "Health monitoring",
      "Sleep analytics",
      "Personalized insights",
      "Community access",
      "Premium analytics",
      "Free band replacements"
    ],
    cta: "Join Now",
    popular: true
  },
  {
    id: 3,
    title: "Team Plan",
    price: 18,
    frequency: "/member/month",
    billingNote: "Minimum 10 members",
    features: [
      "WHOOP 4.0 for each member",
      "Team dashboard",
      "Group analytics",
      "Team competitions",
      "Dedicated support",
      "Custom branding options"
    ],
    cta: "Contact Sales",
    popular: false
  }
];
