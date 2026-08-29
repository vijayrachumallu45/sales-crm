export interface ProductCatalogItem {
  id: string;
  sku: string;
  name: string;
  category: 'Software License' | 'Professional Service' | 'Support & Maintenance' | 'Custom Development';
  unitPrice: number;
  billingFrequency: 'Monthly' | 'Annual' | 'One-Time';
  description: string;
  active: boolean;
}

export const productCatalog: ProductCatalogItem[] = [
  {
    id: 'prod-1',
    sku: 'CRM-ENT-ANN',
    name: 'Sales CRM Enterprise Seat (Annual)',
    category: 'Software License',
    unitPrice: 1200,
    billingFrequency: 'Annual',
    description: 'Full enterprise license access with advanced permissions and custom pipeline workflows.',
    active: true,
  },
  {
    id: 'prod-2',
    sku: 'CRM-PRO-ANN',
    name: 'Sales CRM Professional Seat (Annual)',
    category: 'Software License',
    unitPrice: 720,
    billingFrequency: 'Annual',
    description: 'Standard professional user license for mid-sized sales teams.',
    active: true,
  },
  {
    id: 'prod-3',
    sku: 'CRM-SMB-MTH',
    name: 'Sales CRM Growth Tier (Monthly)',
    category: 'Software License',
    unitPrice: 49,
    billingFrequency: 'Monthly',
    description: 'Flexible monthly growth plan for small teams.',
    active: true,
  },
  {
    id: 'prod-4',
    sku: 'SVC-ONB-EXP',
    name: 'Express Onboarding & Data Migration',
    category: 'Professional Service',
    unitPrice: 3500,
    billingFrequency: 'One-Time',
    description: 'Dedicated implementation engineer to migrate legacy contacts, deals, and notes within 5 business days.',
    active: true,
  },
  {
    id: 'prod-5',
    sku: 'SVC-ONB-ENT',
    name: 'Enterprise Custom Integration & Training Package',
    category: 'Professional Service',
    unitPrice: 12500,
    billingFrequency: 'One-Time',
    description: 'Comprehensive 4-week onboarding, custom API setup, and department user training workshops.',
    active: true,
  },
  {
    id: 'prod-6',
    sku: 'SUP-SLA-247',
    name: '24/7 Priority SLA Support & Account Manager',
    category: 'Support & Maintenance',
    unitPrice: 15000,
    billingFrequency: 'Annual',
    description: 'Dedicated customer success manager with 15-minute response time SLA.',
    active: true,
  },
];
