import { useState } from 'react';
import { Deal, DealStage } from '../types';

export const useKanban = (initialDeals: Deal[]) => {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);

  const moveStage = (dealId: string, targetStage: DealStage) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          const prob =
            targetStage === 'Won'
              ? 100
              : targetStage === 'Lost'
              ? 0
              : targetStage === 'Negotiation'
              ? 90
              : targetStage === 'Proposal'
              ? 75
              : targetStage === 'Qualified'
              ? 50
              : 25;
          return { ...d, stage: targetStage, probability: prob };
        }
        return d;
      })
    );
  };

  const getDealsByStage = (stage: DealStage) => {
    return deals.filter((d) => d.stage === stage);
  };

  const getStageTotal = (stage: DealStage) => {
    return deals.filter((d) => d.stage === stage).reduce((acc, d) => acc + d.amount, 0);
  };

  return {
    deals,
    moveStage,
    getDealsByStage,
    getStageTotal,
  };
};
