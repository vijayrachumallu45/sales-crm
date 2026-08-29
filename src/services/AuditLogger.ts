export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'CONVERT' | 'LOGIN' | 'RESET';
  entityType: 'Lead' | 'Contact' | 'Customer' | 'Deal' | 'Activity' | 'Quotation' | 'Campaign' | 'Settings';
  entityId: string;
  details: string;
}

export class AuditLogger {
  private static logs: AuditLogEntry[] = [
    {
      id: 'log-1',
      timestamp: '2026-08-28 14:32:00',
      user: 'Alex Morgan',
      action: 'CREATE',
      entityType: 'Lead',
      entityId: 'lead-1',
      details: 'Created lead Sarah Jenkins (NovaTech Solutions)',
    },
    {
      id: 'log-2',
      timestamp: '2026-08-28 15:10:00',
      user: 'Alex Morgan',
      action: 'UPDATE',
      entityType: 'Deal',
      entityId: 'deal-1',
      details: 'Moved deal "Apex Global Rollout" to Proposal stage',
    },
    {
      id: 'log-3',
      timestamp: '2026-08-27 11:20:00',
      user: 'Alex Morgan',
      action: 'CONVERT',
      entityType: 'Lead',
      entityId: 'lead-6',
      details: 'Converted lead Jonathan Miller into Customer account',
    },
  ];

  public static getLogs(): AuditLogEntry[] {
    return this.logs;
  }

  public static log(
    user: string,
    action: AuditLogEntry['action'],
    entityType: AuditLogEntry['entityType'],
    entityId: string,
    details: string
  ): AuditLogEntry {
    const entry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user,
      action,
      entityType,
      entityId,
      details,
    };
    this.logs = [entry, ...this.logs];
    return entry;
  }
}
