export interface ContractTemplate {
  id: string;
  name: string;
  category: 'MSA' | 'SLA' | 'NDA' | 'OrderForm';
  defaultTitle: string;
  contentTemplate: string;
}

export const contractTemplates: ContractTemplate[] = [
  {
    id: 'tmpl-msa',
    name: 'Standard Master Services Agreement (MSA)',
    category: 'MSA',
    defaultTitle: 'Master Services Agreement',
    contentTemplate: `MASTER SERVICES AGREEMENT

This Master Services Agreement ("Agreement") is executed by and between Sales CRM Solutions Inc. ("Provider") and {{COMPANY_NAME}} ("Customer").

1. SERVICES & LICENSES
Provider shall supply software licenses, implementation support, and cloud workspace hosting as specified in Order Form #{{QUOTE_NUMBER}}.

2. FEES & PAYMENT TERMS
Customer shall pay Provider total contract fees of {{CONTRACT_VALUE}} within Net 30 days from invoice issuance date.

3. DATA PRIVACY & SECURITY
Provider agrees to maintain strict SOC2 Type II security standards and end-to-end data encryption. Customer retains complete ownership of all uploaded CRM contact data.

4. TERM & TERMINATION
This Agreement shall commence on {{EFFECTIVE_DATE}} and remain in full effect for an initial period of twelve (12) months.`,
  },
  {
    id: 'tmpl-sla',
    name: 'Enterprise 99.9% Uptime Support SLA',
    category: 'SLA',
    defaultTitle: 'Support Service Level Agreement',
    contentTemplate: `SERVICE LEVEL AGREEMENT (SLA)

1. UPTIME COMMITMENT: Provider commits to maintaining 99.9% monthly application availability.
2. INCIDENT ESCALATION:
   - Severity 1 (Critical): < 30 min response time
   - Severity 2 (Major): < 2 hours response time
   - Severity 3 (Minor): < 8 hours response time
3. CREDITS: Unscheduled downtime exceeding 0.1% per month entitles Customer to a 5% service credit per hour.`,
  },
];
