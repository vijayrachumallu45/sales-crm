import { useCRM } from '../context/CRMContext';

export const useCRMData = () => {
  const crm = useCRM();

  const activeLeadsCount = crm.leads.filter((l) => l.status !== 'Converted' && l.status !== 'Unqualified').length;
  const activeDealsCount = crm.deals.filter((d) => d.stage !== 'Won' && d.stage !== 'Lost').length;
  const wonDealsTotal = crm.deals.filter((d) => d.stage === 'Won').reduce((sum, d) => sum + d.amount, 0);

  return {
    ...crm,
    activeLeadsCount,
    activeDealsCount,
    wonDealsTotal,
  };
};
