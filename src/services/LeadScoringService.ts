import { Lead } from '../types';

export interface LeadScoreResult {
  score: number; // 0 - 100
  tier: 'Hot' | 'Warm' | 'Cold';
  factors: { category: string; points: number; explanation: string }[];
}

export class LeadScoringService {
  public static calculateScore(lead: Lead, activityCount = 0): LeadScoreResult {
    let score = 0;
    const factors: { category: string; points: number; explanation: string }[] = [];

    // 1. Estimated Deal Value Scoring
    if (lead.estimatedValue >= 100000) {
      score += 35;
      factors.push({ category: 'Deal Size', points: 35, explanation: 'Enterprise budget ($100k+)' });
    } else if (lead.estimatedValue >= 50000) {
      score += 25;
      factors.push({ category: 'Deal Size', points: 25, explanation: 'Mid-Market budget ($50k-$100k)' });
    } else if (lead.estimatedValue >= 20000) {
      score += 15;
      factors.push({ category: 'Deal Size', points: 15, explanation: 'Standard budget ($20k-$50k)' });
    } else {
      score += 5;
      factors.push({ category: 'Deal Size', points: 5, explanation: 'Starter budget (<$20k)' });
    }

    // 2. Source Credibility
    switch (lead.source) {
      case 'Referral':
      case 'Partner':
        score += 25;
        factors.push({ category: 'Lead Source', points: 25, explanation: 'High-converting channel (Referral/Partner)' });
        break;
      case 'LinkedIn':
      case 'Event':
        score += 20;
        factors.push({ category: 'Lead Source', points: 20, explanation: 'Direct engagement channel' });
        break;
      case 'Website':
        score += 15;
        factors.push({ category: 'Lead Source', points: 15, explanation: 'Inbound web request' });
        break;
      case 'Cold Outreach':
        score += 5;
        factors.push({ category: 'Lead Source', points: 5, explanation: 'Outbound prospect' });
        break;
    }

    // 3. Status Progression
    switch (lead.status) {
      case 'Qualified':
        score += 25;
        factors.push({ category: 'Stage Progress', points: 25, explanation: 'BANT Qualified' });
        break;
      case 'Contacted':
        score += 15;
        factors.push({ category: 'Stage Progress', points: 15, explanation: 'Active dialogue' });
        break;
      case 'New':
        score += 10;
        factors.push({ category: 'Stage Progress', points: 10, explanation: 'Fresh lead' });
        break;
      case 'Converted':
        score += 30;
        factors.push({ category: 'Stage Progress', points: 30, explanation: 'Converted account' });
        break;
      case 'Unqualified':
        score += 0;
        factors.push({ category: 'Stage Progress', points: 0, explanation: 'Unqualified lead' });
        break;
    }

    // 4. Activity Engagement Bonus
    if (activityCount > 0) {
      const bonus = Math.min(15, activityCount * 5);
      score += bonus;
      factors.push({ category: 'Engagement', points: bonus, explanation: `${activityCount} logged interaction(s)` });
    }

    // Cap score to 100
    const finalScore = Math.min(100, Math.max(0, score));
    const tier: 'Hot' | 'Warm' | 'Cold' = finalScore >= 75 ? 'Hot' : finalScore >= 45 ? 'Warm' : 'Cold';

    return {
      score: finalScore,
      tier,
      factors,
    };
  }
}
