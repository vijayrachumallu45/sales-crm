import { describe, it, expect } from 'vitest';
import { LeadQualificationEngine } from '../services/LeadQualificationEngine';
import { Lead } from '../types';

describe('LeadQualificationEngine', () => {
  it('evaluates fully qualified BANT leads correctly', () => {
    const lead: Lead = {
      id: 'l-test',
      name: 'Sarah',
      company: 'Enterprise Inc',
      email: 's@ent.com',
      phone: '123',
      source: 'Website',
      status: 'New',
      owner: 'Alex',
      estimatedValue: 100000,
      createdAt: '2026-08-01',
    };

    const status = LeadQualificationEngine.evaluateBANT(lead, {
      budgetConfirmed: true,
      authorityIdentified: true,
      needDefined: true,
      timelineMonths: 3,
    });

    expect(status.isQualified).toBe(true);
    expect(status.score).toBe(100);
    expect(status.missingCriteria.length).toBe(0);
  });
});
