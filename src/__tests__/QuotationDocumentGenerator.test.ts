import { describe, it, expect } from 'vitest';
import { QuotationDocumentGenerator } from '../services/QuotationDocumentGenerator';
import { Quotation } from '../types';

describe('QuotationDocumentGenerator', () => {
  it('generates HTML invoice document elements', () => {
    const quote: Quotation = {
      id: 'q1',
      quoteNumber: 'QT-2026-001',
      customerName: 'Jonathan',
      companyName: 'Apex Global',
      date: '2026-08-01',
      validUntil: '2026-09-01',
      status: 'Sent',
      items: [
        { id: 'i1', description: 'License', quantity: 1, unitPrice: 1000, discountPercent: 0, total: 1000 },
      ],
      subtotal: 1000,
      discountTotal: 0,
      taxAmount: 80,
      totalAmount: 1080,
    };

    const doc = QuotationDocumentGenerator.generateHTML(quote);
    expect(doc.title).toContain('QT-2026-001');
    expect(doc.headerInfo).toContain('Apex Global');
  });
});
