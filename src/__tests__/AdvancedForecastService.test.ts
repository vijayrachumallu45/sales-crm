import { describe, it, expect } from 'vitest';
import { AdvancedForecastService } from '../services/AdvancedForecastService';
import { Deal } from '../types';

describe('AdvancedForecastService', () => {
  it('calculates quarterly forecast and gap to target goal', () => {
    const deals: Deal[] = [
      {
        id: 'd1',
        name: 'Deal A',
        customerName: 'Alice',
        companyName: 'Acme',
        amount: 200000,
        stage: 'Proposal',
        expectedCloseDate: '2026-09-01',
        owner: 'Alex',
        probability: 70,
        createdAt: '2026-08-01',
      },
    ];

    const forecast = AdvancedForecastService.calculateQuarterlyForecast(deals, 300000);
    expect(forecast.projectedRevenue).toBe(140000);
    expect(forecast.gapToGoal).toBe(160000);
  });
});
