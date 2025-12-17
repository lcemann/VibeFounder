import type { Industry } from '@/types';

export const industries: Industry[] = [
  {
    id: 'tech',
    name: 'Technology',
    description: 'Software, hardware, AI, and digital innovation',
    icon: 'Cpu',
    subIndustries: ['SaaS', 'AI/ML', 'Cybersecurity', 'Dev Tools', 'Cloud Infrastructure'],
  },
  {
    id: 'fintech',
    name: 'Finance & Fintech',
    description: 'Banking, payments, crypto, and financial services',
    icon: 'Wallet',
    subIndustries: ['Payments', 'Crypto/Web3', 'Banking', 'Insurance', 'Investment'],
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    description: 'Healthcare, fitness, mental health, and biotech',
    icon: 'Heart',
    subIndustries: ['Digital Health', 'Fitness', 'Mental Health', 'Biotech', 'Med Devices'],
  },
  {
    id: 'education',
    name: 'Education',
    description: 'EdTech, online learning, and skill development',
    icon: 'GraduationCap',
    subIndustries: ['EdTech', 'Corporate Training', 'K-12', 'Higher Ed', 'Skills Platform'],
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & Retail',
    description: 'Online retail, marketplaces, and consumer brands',
    icon: 'ShoppingBag',
    subIndustries: ['Marketplace', 'D2C', 'Retail Tech', 'Logistics', 'Consumer Goods'],
  },
  {
    id: 'sustainability',
    name: 'Sustainability',
    description: 'Clean energy, climate tech, and environmental solutions',
    icon: 'Leaf',
    subIndustries: ['Clean Energy', 'Climate Tech', 'Circular Economy', 'AgTech', 'Carbon'],
  },
  {
    id: 'media',
    name: 'Media & Entertainment',
    description: 'Content, streaming, gaming, and creative industries',
    icon: 'Film',
    subIndustries: ['Streaming', 'Gaming', 'Creator Economy', 'News/Media', 'Music'],
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    description: 'PropTech, construction, and property management',
    icon: 'Building',
    subIndustries: ['PropTech', 'Construction Tech', 'Property Mgmt', 'Co-working', 'Smart Buildings'],
  },
  {
    id: 'food',
    name: 'Food & Beverage',
    description: 'FoodTech, restaurants, and consumer packaged goods',
    icon: 'Utensils',
    subIndustries: ['Food Delivery', 'Alt Protein', 'Restaurant Tech', 'CPG', 'AgTech'],
  },
];
