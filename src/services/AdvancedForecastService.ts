import { Deal } from '../types';

export interface QuarterlyForecast {
  quarter: string; // e.g. "Q3 2026"
  targetGoal: number;
  projectedRevenue: number;
  gapToGoal: number;
  confidenceScore: number;
}

export class AdvancedForecastService {
  public static calculateQuarterlyForecast(deals: Deal[], targetGoal = 500000): QuarterlyForecast {
    const activeDeals = deals.filter((d) => d.stage !== 'Lost');
    const projectedRevenue = activeDeals.reduce((sum, d) => {
      const weight = d.stage === 'Won' ? 1.0 : d.stage === 'Negotiation' ? 0.85 : d.stage === 'Proposal' ? 0.7 : 0.3;
      return sum + d.amount * weight;
    }, 0);

    const roundedProjected = Math.round(projectedRevenue);
    const gapToGoal = Math.max(0, targetGoal - roundedProjected);
    const confidenceScore = Math.min(100, Math.round((roundedProjected / targetGoal) * 100));

    return {
      quarter: 'Q3 2026',
      targetGoal,
      projectedRevenue: roundedProjected,
      gapToGoal,
      confidenceScore,
    };
  }
}
