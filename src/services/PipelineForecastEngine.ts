import { Deal } from '../types';

export interface ForecastMetrics {
  totalPipelineValue: number;
  weightedForecastValue: number;
  commitValue: number; // Negotiation + Won
  bestCaseValue: number; // Proposal + Negotiation + Won
  pipelineCount: number;
  stageBreakdown: {
    stage: string;
    unweightedAmount: number;
    weightedAmount: number;
    dealCount: number;
    winProbability: number;
  }[];
}

export class PipelineForecastEngine {
  public static calculateForecast(deals: Deal[]): ForecastMetrics {
    const activeDeals = deals.filter((d) => d.stage !== 'Lost');
    const totalPipelineValue = activeDeals.reduce((sum, d) => sum + d.amount, 0);

    const stageWeights: Record<string, number> = {
      New: 0.2,
      Qualified: 0.4,
      Proposal: 0.7,
      Negotiation: 0.9,
      Won: 1.0,
    };

    let weightedForecastValue = 0;
    let commitValue = 0;
    let bestCaseValue = 0;

    const stages = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won'];
    const stageBreakdown = stages.map((stg) => {
      const stageDeals = activeDeals.filter((d) => d.stage === stg);
      const unweightedAmount = stageDeals.reduce((sum, d) => sum + d.amount, 0);
      const prob = stageWeights[stg] || 0.2;
      const weightedAmount = unweightedAmount * prob;

      weightedForecastValue += weightedAmount;

      if (stg === 'Negotiation' || stg === 'Won') {
        commitValue += unweightedAmount;
      }
      if (stg === 'Proposal' || stg === 'Negotiation' || stg === 'Won') {
        bestCaseValue += unweightedAmount;
      }

      return {
        stage: stg,
        unweightedAmount,
        weightedAmount,
        dealCount: stageDeals.length,
        winProbability: Math.round(prob * 100),
      };
    });

    return {
      totalPipelineValue,
      weightedForecastValue: Math.round(weightedForecastValue),
      commitValue,
      bestCaseValue,
      pipelineCount: activeDeals.length,
      stageBreakdown,
    };
  }
}
