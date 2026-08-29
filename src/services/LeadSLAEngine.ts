import { Lead } from '../types';

export interface SLAStatus {
  isBreached: boolean;
  hoursRemaining: number;
  escalationLevel: 'Normal' | 'Warning' | 'Critical Breached';
}

export class LeadSLAEngine {
  public static checkSLA(lead: Lead, maxResponseHours = 24): SLAStatus {
    const created = new Date(lead.createdAt).getTime();
    const now = Date.now();
    const hoursElapsed = (now - created) / (1000 * 60 * 60);
    const hoursRemaining = Math.max(0, maxResponseHours - hoursElapsed);

    if (lead.status === 'New' && hoursElapsed > maxResponseHours) {
      return {
        isBreached: true,
        hoursRemaining: 0,
        escalationLevel: 'Critical Breached',
      };
    }

    if (lead.status === 'New' && hoursRemaining <= 4) {
      return {
        isBreached: false,
        hoursRemaining: Math.round(hoursRemaining),
        escalationLevel: 'Warning',
      };
    }

    return {
      isBreached: false,
      hoursRemaining: Math.round(hoursRemaining),
      escalationLevel: 'Normal',
    };
  }
}
