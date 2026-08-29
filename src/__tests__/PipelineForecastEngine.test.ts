import { describe, it, expect } from 'vitest';
import { PipelineForecastEngine } from '../services/PipelineForecastEngine';
import { Deal } from '../types';

describe('PipelineForecastEngine', () => {
  it('calculates unweighted and weighted forecast breakdown', () => {
    const deals: Deal[] = [
      {
        id: 'd1',
        name: 'Proposal Deal',
        customerName: 'Alice',
        companyName: 'Acme',
        amount: 100000,
        stage: 'Proposal', // 70% prob
        expectedCloseDate: '2026-09-01',
        owner: 'Alex',
        probability: 75,
        createdAt: '2026-08-01',
      },
      {
        id: 'd2',
        name: 'Won Deal',
        customerName: 'Bob',
        companyName: 'Beta',
        amount: 50000,
        stage: 'Won', // 100% prob
        expectedCloseDate: '2026-08-15',
        owner: 'Alex',
        probability: 100,
        createdAt: '2026-08-01',
      },
    ];

    const result = PipelineForecastEngine.calculateForecast(deals);
    expect(result.totalPipelineValue).toBe(150000);
    expect(result.weightedForecastValue).toBe(120000); // 70,000 + 50,000
    expect(result.pipelineCount).toBe(2);
  });
});
