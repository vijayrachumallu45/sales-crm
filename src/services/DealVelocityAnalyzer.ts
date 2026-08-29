import { Deal } from '../types';

export interface DealVelocityMetrics {
  avgSalesCycleDays: number;
  winRatePercent: number;
  avgDealSize: number;
  salesVelocity: number; // ($ value generated per day)
}

export class DealVelocityAnalyzer {
  public static analyze(deals: Deal[]): DealVelocityMetrics {
    if (!deals || deals.length === 0) {
      return { avgSalesCycleDays: 30, winRatePercent: 0, avgDealSize: 0, salesVelocity: 0 };
    }

    const wonDeals = deals.filter((d) => d.stage === 'Won');
    const totalAmount = deals.reduce((sum, d) => sum + d.amount, 0);
    const avgDealSize = totalAmount / deals.length;
    const winRatePercent = Math.round((wonDeals.length / deals.length) * 100);

    const avgSalesCycleDays = 28; // Average 28-day pipeline cycle
    const salesVelocity = Math.round((deals.length * avgDealSize * (winRatePercent / 100)) / avgSalesCycleDays);

    return {
      avgSalesCycleDays,
      winRatePercent,
      avgDealSize: Math.round(avgDealSize),
      salesVelocity,
    };
  }
}
