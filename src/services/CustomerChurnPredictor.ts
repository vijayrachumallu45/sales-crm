import { Customer, Activity } from '../types';

export interface ChurnPredictionResult {
  churnProbabilityPercent: number;
  riskCategory: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  warningFlags: string[];
}

export class CustomerChurnPredictor {
  public static predict(customer: Customer, activities: Activity[]): ChurnPredictionResult {
    let riskPoints = 0;
    const warningFlags: string[] = [];

    if (customer.status === 'Inactive') {
      riskPoints += 60;
      warningFlags.push('Account Status Inactive');
    }

    const customerActivities = activities.filter((a) =>
      a.relatedToName.toLowerCase().includes(customer.company.toLowerCase())
    );

    if (customerActivities.length === 0) {
      riskPoints += 30;
      warningFlags.push('Zero Activity Interactions Logged');
    }

    const overdueCount = customerActivities.filter((a) => a.status === 'Overdue').length;
    if (overdueCount > 0) {
      riskPoints += 20;
      warningFlags.push(`${overdueCount} Overdue Follow-up Task(s)`);
    }

    const churnProbabilityPercent = Math.min(100, Math.max(5, riskPoints));
    const riskCategory =
      churnProbabilityPercent >= 60 ? 'High Risk' : churnProbabilityPercent >= 30 ? 'Moderate Risk' : 'Low Risk';

    return {
      churnProbabilityPercent,
      riskCategory,
      warningFlags,
    };
  }
}
