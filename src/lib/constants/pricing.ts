export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₹8,000',
    description: 'Perfect for individuals and small startups needing a professional landing page.',
    features: [
      'Single Page Design',
      'Fully Responsive',
      'Contact Form Integration',
      'Basic SEO Setup',
      '1 Week Delivery'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '₹12,000',
    description: 'A comprehensive website for growing businesses and portfolios.',
    features: [
      'Up to 5 Pages',
      'Dynamic Content Management',
      'Advanced SEO',
      'WhatsApp Integration',
      '2 Weeks Delivery'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹20,000',
    description: 'High-end e-commerce or custom web applications with complex features.',
    features: [
      'Unlimited Pages',
      'E-commerce Functionality',
      'Custom Animations',
      'Advanced API Integrations',
      'Priority Support'
    ]
  },
  {
    id: 'custom',
    name: 'Custom Project',
    price: 'Custom Quote',
    description: 'Large scale enterprise solutions and complex web platforms.',
    features: [
      'Bespoke Architecture',
      'Dedicated Project Manager',
      'Long-term Maintenance',
      'Security Audits',
      'Flexible Timeline'
    ]
  }
];

export const ADDITIONAL_COSTS = [
  'Domain Registration',
  'Hosting / Shopify Subscription',
  'Paid Themes or Apps',
  'Payment Gateway Fees',
  'Premium API Usage'
];
