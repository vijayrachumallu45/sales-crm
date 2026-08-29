import { describe, it, expect } from 'vitest';
import { InvoiceCalculationEngine } from '../services/InvoiceCalculationEngine';
import { QuotationItem } from '../types';

describe('InvoiceCalculationEngine', () => {
  it('calculates totals, discounts, and tax accurately', () => {
    const items: QuotationItem[] = [
      {
        id: 'qi-1',
        description: 'CRM License',
        quantity: 2,
        unitPrice: 1000,
        discountPercent: 10, // 2000 - 200 = 1800
        total: 1800,
      },
    ];

    const result = InvoiceCalculationEngine.calculateInvoice(items, 10, 0); // 10% tax rate
    expect(result.rawSubtotal).toBe(2000);
    expect(result.totalDiscount).toBe(200);
    expect(result.taxableAmount).toBe(1800);
    expect(result.taxAmount).toBe(180);
    expect(result.grandTotal).toBe(1980);
  });
});
