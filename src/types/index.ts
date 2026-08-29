export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Unqualified' | 'Converted';
export type LeadSource = 'Website' | 'Referral' | 'LinkedIn' | 'Cold Outreach' | 'Event' | 'Partner';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  owner: string;
  estimatedValue: number;
  notes?: string;
  createdAt: string;
}

export type ContactStatus = 'Active' | 'Inactive';

export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  designation: string;
  status: ContactStatus;
  createdAt: string;
}

export type CustomerType = 'Enterprise' | 'SMB' | 'Individual';
export type CustomerStatus = 'Active' | 'Inactive' | 'Potential';

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  customerType: CustomerType;
  status: CustomerStatus;
  totalDealsValue: number;
  address?: string;
  notes?: string;
  createdAt: string;
}

export type DealStage = 'New' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';

export interface Deal {
  id: string;
  name: string;
  customerName: string;
  companyName: string;
  amount: number;
  stage: DealStage;
  expectedCloseDate: string;
  owner: string;
  probability: number; // Percentage 0-100
  notes?: string;
  createdAt: string;
}

export type ActivityType = 'Call' | 'Meeting' | 'Task' | 'Follow-up' | 'Email';
export type ActivityStatus = 'Upcoming' | 'Completed' | 'Overdue';

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  relatedToName: string;
  relatedToType: 'Lead' | 'Customer' | 'Deal';
  dueDate: string;
  status: ActivityStatus;
  owner: string;
  notes?: string;
}

export type QuotationStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected';

export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  total: number;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  customerName: string;
  companyName: string;
  date: string;
  validUntil: string;
  status: QuotationStatus;
  items: QuotationItem[];
  subtotal: number;
  discountTotal: number;
  taxAmount: number;
  totalAmount: number;
  notes?: string;
}

export type CampaignStatus = 'Draft' | 'Active' | 'Completed';

export interface Campaign {
  id: string;
  name: string;
  targetGroup: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  leadsGenerated: number;
  budget: number;
  spent: number;
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'deal';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}
