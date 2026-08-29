import { describe, it, expect } from 'vitest';
import { LeadScoringService } from '../services/LeadScoringService';
import { Lead } from '../types';

describe('LeadScoringService', () => {
  it('calculates score and tier correctly for enterprise referral leads', () => {
    const lead: Lead = {
      id: 'lead-test-1',
      name: 'Sarah Enterprise',
      company: 'BigCorp',
      email: 'sarah@bigcorp.com',
      phone: '123',
      source: 'Referral',
      status: 'Qualified',
      owner: 'Alex',
      estimatedValue: 120000,
      createdAt: '2026-08-01',
    };

    const result = LeadScoringService.calculateScore(lead, 2);
    expect(result.score).toBeGreaterThanOrEqual(75);
    expect(result.tier).toBe('Hot');
    expect(result.factors.length).toBeGreaterThan(0);
  });

  it('assigns Cold tier to small budget cold leads', () => {
    const lead: Lead = {
      id: 'lead-test-2',
      name: 'Small Lead',
      company: 'Tiny LLC',
      email: 'small@tiny.com',
      phone: '123',
      source: 'Cold Outreach',
      status: 'New',
      owner: 'Alex',
      estimatedValue: 5000,
      createdAt: '2026-08-01',
    };

    const result = LeadScoringService.calculateScore(lead, 0);
    expect(result.tier).toBe('Cold');
  });
});
