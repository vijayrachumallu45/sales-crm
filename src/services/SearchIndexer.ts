import { Lead, Contact, Customer, Deal, Activity, Quotation } from '../types';

export interface SearchResultItem {
  id: string;
  type: 'Lead' | 'Contact' | 'Customer' | 'Deal' | 'Activity' | 'Quotation';
  title: string;
  subtitle: string;
  badgeStatus?: string;
}

export class SearchIndexer {
  public static searchAll(
    query: string,
    data: {
      leads: Lead[];
      contacts: Contact[];
      customers: Customer[];
      deals: Deal[];
      activities: Activity[];
      quotations: Quotation[];
    }
  ): SearchResultItem[] {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();
    const results: SearchResultItem[] = [];

    // Search Leads
    for (const item of data.leads) {
      if (
        item.name.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q)
      ) {
        results.push({
          id: item.id,
          type: 'Lead',
          title: item.name,
          subtitle: `${item.company} • ${item.email}`,
          badgeStatus: item.status,
        });
      }
    }

    // Search Contacts
    for (const item of data.contacts) {
      if (
        item.name.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q)
      ) {
        results.push({
          id: item.id,
          type: 'Contact',
          title: item.name,
          subtitle: `${item.designation} at ${item.company}`,
          badgeStatus: item.status,
        });
      }
    }

    // Search Customers
    for (const item of data.customers) {
      if (
        item.company.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q)
      ) {
        results.push({
          id: item.id,
          type: 'Customer',
          title: item.company,
          subtitle: `Contact: ${item.name} (${item.customerType})`,
          badgeStatus: item.status,
        });
      }
    }

    // Search Deals
    for (const item of data.deals) {
      if (
        item.name.toLowerCase().includes(q) ||
        item.companyName.toLowerCase().includes(q) ||
        item.customerName.toLowerCase().includes(q)
      ) {
        results.push({
          id: item.id,
          type: 'Deal',
          title: item.name,
          subtitle: `${item.companyName} • $${item.amount.toLocaleString()}`,
          badgeStatus: item.stage,
        });
      }
    }

    // Search Activities
    for (const item of data.activities) {
      if (
        item.title.toLowerCase().includes(q) ||
        item.relatedToName.toLowerCase().includes(q)
      ) {
        results.push({
          id: item.id,
          type: 'Activity',
          title: item.title,
          subtitle: `${item.type} for ${item.relatedToName}`,
          badgeStatus: item.status,
        });
      }
    }

    // Search Quotations
    for (const item of data.quotations) {
      if (
        item.quoteNumber.toLowerCase().includes(q) ||
        item.companyName.toLowerCase().includes(q)
      ) {
        results.push({
          id: item.id,
          type: 'Quotation',
          title: item.quoteNumber,
          subtitle: `${item.companyName} • $${item.totalAmount.toLocaleString()}`,
          badgeStatus: item.status,
        });
      }
    }

    return results.slice(0, 15);
  }
}
