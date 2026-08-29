import { Lead } from '../types';

export interface BANTCriteria {
  budgetConfirmed: boolean;
  authorityIdentified: boolean;
  needDefined: boolean;
  timelineMonths: number;
}

export interface QualificationStatus {
  isQualified: boolean;
  score: number;
  missingCriteria: string[];
  recommendedAction: string;
}

export class LeadQualificationEngine {
  public static evaluateBANT(lead: Lead, criteria: BANTCriteria): QualificationStatus {
    const missingCriteria: string[] = [];
    let score = 0;

    if (criteria.budgetConfirmed) {
      score += 25;
    } else {
      missingCriteria.push('Budget Not Confirmed');
    }

    if (criteria.authorityIdentified) {
      score += 25;
    } else {
      missingCriteria.push('Decision Maker Authority Unconfirmed');
    }

    if (criteria.needDefined) {
      score += 25;
    } else {
      missingCriteria.push('Business Need Undefined');
    }

    if (criteria.timelineMonths > 0 && criteria.timelineMonths <= 6) {
      score += 25;
    } else {
      missingCriteria.push('Timeline Exceeds 6 Months');
    }

    const isQualified = score >= 75;
    const recommendedAction = isQualified
      ? 'Schedule discovery demo and convert lead to active customer opportunity.'
      : 'Nurture lead with product collateral until budget and authority are confirmed.';

    return {
      isQualified,
      score,
      missingCriteria,
      recommendedAction,
    };
  }
}
