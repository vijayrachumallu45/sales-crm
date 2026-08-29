import { Customer, Deal } from '../types';

export interface ContractDocument {
  id: string;
  title: string;
  contractType: 'Master Service Agreement' | 'SLA' | 'Software Licensing' | 'NDA';
  effectiveDate: string;
  expirationDate: string;
  clientCompany: string;
  clientContact: string;
  contractValue: number;
  termsBody: string;
}

export class ContractTemplateEngine {
  public static generateMSA(customer: Customer, deal: Deal): ContractDocument {
    const today = new Date().toISOString().split('T')[0];
    const expiry = new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0];

    return {
      id: `msa-${Date.now()}`,
      title: `Master Services Agreement – ${customer.company}`,
      contractType: 'Master Service Agreement',
      effectiveDate: today,
      expirationDate: expiry,
      clientCompany: customer.company,
      clientContact: customer.name,
      contractValue: deal.amount,
      termsBody: `This Master Services Agreement ("MSA") is entered into by and between Sales CRM Solutions Inc. and ${customer.company} ("Client").

1. SCOPE OF SERVICES: Provider agrees to supply SaaS CRM Platform services and technical support as described in Deal "${deal.name}".
2. FINANCIAL TERMS: Total agreement value is $${deal.amount.toLocaleString()} payable within Net 30 days of invoice.
3. CONFIDENTIALITY: Both parties agree to protect proprietary data and business information under strict NDA covenants.
4. GOVERNING LAW: This agreement shall be governed under the laws of California.`,
    };
  }

  public static generateSLA(customer: Customer): ContractDocument {
    const today = new Date().toISOString().split('T')[0];
    const expiry = new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0];

    return {
      id: `sla-${Date.now()}`,
      title: `99.9% Uptime Support SLA – ${customer.company}`,
      contractType: 'SLA',
      effectiveDate: today,
      expirationDate: expiry,
      clientCompany: customer.company,
      clientContact: customer.name,
      contractValue: 15000,
      termsBody: `Service Level Agreement ("SLA") for ${customer.company}.

1. UPTIME GUARANTEE: Provider guarantees 99.9% application uptime excluding scheduled monthly maintenance windows.
2. RESPONSE TIMES: Priority 1 critical incidents shall be responded to within 30 minutes 24/7.
3. SERVICE CREDITS: Outages exceeding SLA thresholds qualify for 5% credit per hour of unscheduled downtime.`,
    };
  }
}
