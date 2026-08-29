import { Customer, Deal, Activity } from '../types';

export interface HealthScoreMetrics {
  healthScore: number; // 0-100
  status: 'Healthy' | 'At Risk' | 'Critical';
  factors: string[];
}

export class CustomerHealthScoreEngine {
  public static calculateHealth(
    customer: Customer,
    linkedDeals: Deal[],
    linkedActivities: Activity[]
  ): HealthScoreMetrics {
    let score = 70; // Baseline
    const factors: string[] = [];

    // 1. Account status check
    if (customer.status === 'Active') {
      score += 15;
      factors.push('Account actively engaged (+15)');
    } else if (customer.status === 'Inactive') {
      score -= 30;
      factors.push('Account listed as inactive (-30)');
    }

    // 2. Deal volume & won status
    const wonDeals = linkedDeals.filter((d) => d.stage === 'Won');
    if (wonDeals.length > 0) {
      score += 15;
      factors.push(`${wonDeals.length} won closed deal(s) (+15)`);
    }

    // 3. Activity recency
    const recentActivities = linkedActivities.filter((a) => a.status === 'Completed');
    if (recentActivities.length > 0) {
      score += 10;
      factors.push('Completed recent account interactions (+10)');
    } else {
      score -= 10;
      factors.push('No recent completed touchpoints (-10)');
    }

    const finalScore = Math.min(100, Math.max(0, score));
    const status = finalScore >= 80 ? 'Healthy' : finalScore >= 50 ? 'At Risk' : 'Critical';

    return {
      healthScore: finalScore,
      status,
      factors,
    };
  }
}
