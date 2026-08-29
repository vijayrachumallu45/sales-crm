import { describe, it, expect } from 'vitest';
import { AutomationEngine } from '../services/AutomationEngine';
import { Lead, Deal } from '../types';

describe('AutomationEngine', () => {
  it('triggers activity and notification creation on new lead', () => {
    const engine = new AutomationEngine();
    const lead: Lead = {
      id: 'l1',
      name: 'New Prospect',
      company: 'Future Tech',
      email: 'p@futuretech.com',
      phone: '123',
      source: 'Website',
      status: 'New',
      owner: 'Alex',
      estimatedValue: 40000,
      createdAt: '2026-08-29',
    };

    const result = engine.evaluateLeadCreated(lead);
    expect(result.activities.length).toBeGreaterThan(0);
    expect(result.notifications.length).toBeGreaterThan(0);
  });

  it('triggers onboarding meeting when deal is won', () => {
    const engine = new AutomationEngine();
    const deal: Deal = {
      id: 'd1',
      name: 'Big Renewal',
      customerName: 'Claire',
      companyName: 'Apex',
      amount: 90000,
      stage: 'Won',
      expectedCloseDate: '2026-08-30',
      owner: 'Alex',
      probability: 100,
      createdAt: '2026-08-01',
    };

    const result = engine.evaluateDealStageChange(deal, 'Won');
    expect(result.activities[0].type).toBe('Meeting');
  });
});
