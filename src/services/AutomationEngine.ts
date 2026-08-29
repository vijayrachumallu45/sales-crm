import { Lead, Deal, Activity, Quotation, Customer, Notification } from '../types';

export interface AutomationRule {
  id: string;
  name: string;
  event: 'lead_created' | 'lead_converted' | 'deal_stage_changed' | 'quotation_accepted';
  condition: string;
  action: string;
  enabled: boolean;
  triggerCount: number;
  lastTriggered?: string;
}

export const initialAutomationRules: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'Auto-schedule Welcome Call on New Lead',
    event: 'lead_created',
    condition: 'status == New',
    action: 'Create Call activity due in 2 days',
    enabled: true,
    triggerCount: 14,
    lastTriggered: '2026-08-28',
  },
  {
    id: 'rule-2',
    name: 'Create Account Kickoff Task when Deal Won',
    event: 'deal_stage_changed',
    condition: 'stage == Won',
    action: 'Create Task activity & send notification',
    enabled: true,
    triggerCount: 8,
    lastTriggered: '2026-08-25',
  },
  {
    id: 'rule-3',
    name: 'Auto-convert Deal to Won when Quotation Accepted',
    event: 'quotation_accepted',
    condition: 'status == Accepted',
    action: 'Update linked deal stage to Won',
    enabled: true,
    triggerCount: 5,
    lastTriggered: '2026-08-15',
  },
];

export class AutomationEngine {
  private rules: AutomationRule[];

  constructor(rules: AutomationRule[] = initialAutomationRules) {
    this.rules = rules;
  }

  public getRules(): AutomationRule[] {
    return this.rules;
  }

  public toggleRule(id: string): AutomationRule[] {
    this.rules = this.rules.map((r) =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    return this.rules;
  }

  public evaluateLeadCreated(lead: Lead): { activities: Partial<Activity>[]; notifications: Partial<Notification>[] } {
    const activities: Partial<Activity>[] = [];
    const notifications: Partial<Notification>[] = [];

    const activeRules = this.rules.filter((r) => r.enabled && r.event === 'lead_created');
    for (const rule of activeRules) {
      rule.triggerCount += 1;
      rule.lastTriggered = new Date().toISOString().split('T')[0];

      activities.push({
        title: `Auto-Assigned Follow-up: ${lead.name}`,
        type: 'Call',
        relatedToName: `${lead.name} (${lead.company})`,
        relatedToType: 'Lead',
        dueDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
        status: 'Upcoming',
        owner: lead.owner,
        notes: `Automated by rule: ${rule.name}`,
      });

      notifications.push({
        title: 'Automation Triggered',
        message: `Welcome call auto-scheduled for new lead ${lead.name}.`,
        date: 'Just now',
        read: false,
        type: 'info',
      });
    }

    return { activities, notifications };
  }

  public evaluateDealStageChange(deal: Deal, newStage: string): { activities: Partial<Activity>[]; notifications: Partial<Notification>[] } {
    const activities: Partial<Activity>[] = [];
    const notifications: Partial<Notification>[] = [];

    if (newStage === 'Won') {
      activities.push({
        title: `Customer Onboarding Kickoff: ${deal.companyName}`,
        type: 'Meeting',
        relatedToName: deal.name,
        relatedToType: 'Deal',
        dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        status: 'Upcoming',
        owner: deal.owner,
        notes: 'Schedule kickoff meeting with customer success team.',
      });

      notifications.push({
        title: 'Deal Won Automation',
        message: `Onboarding task auto-created for deal "${deal.name}".`,
        date: 'Just now',
        read: false,
        type: 'success',
      });
    }

    return { activities, notifications };
  }
}
