import React from 'react';
import { Deal, DealStage } from '../../types';
import { Badge } from '../../components/common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { DollarSign, Calendar, User, ChevronRight, ChevronLeft, Edit2, Trash2 } from 'lucide-react';

interface KanbanBoardProps {
  deals: Deal[];
  onUpdateStage: (dealId: string, newStage: DealStage) => void;
  onEditDeal: (deal: Deal) => void;
  onDeleteDeal: (dealId: string) => void;
  currencySymbol?: string;
}

const STAGES: DealStage[] = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  deals,
  onUpdateStage,
  onEditDeal,
  onDeleteDeal,
  currencySymbol = '$',
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
      {STAGES.map((stage) => {
        const stageDeals = deals.filter((d) => d.stage === stage);
        const columnTotal = stageDeals.reduce((sum, d) => sum + d.amount, 0);

        return (
          <div
            key={stage}
            className="flex flex-col rounded-xl bg-gray-100/70 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 p-3 min-w-[240px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  {stage}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {stageDeals.length}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                {formatCurrency(columnTotal, currencySymbol)}
              </span>
            </div>

            {/* Column Cards */}
            <div className="flex-1 space-y-3 min-h-[300px]">
              {stageDeals.length === 0 ? (
                <div className="h-full flex items-center justify-center p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <p className="text-[11px] text-gray-400 text-center">No deals in stage</p>
                </div>
              ) : (
                stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="bg-white dark:bg-gray-800 p-3.5 rounded-lg border border-gray-200/80 dark:border-gray-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-1.5">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug">
                          {deal.name}
                        </h4>
                        <button
                          onClick={() => onEditDeal(deal)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-brand-600 transition-opacity"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] font-medium text-gray-600 dark:text-gray-300 mb-2">
                        {deal.companyName}
                      </p>

                      <div className="space-y-1 text-[10px] text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                          <DollarSign className="w-3 h-3 mr-0.5" />
                          {formatCurrency(deal.amount, currencySymbol)}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          {formatDate(deal.expectedCloseDate)}
                        </div>
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1 text-gray-400" />
                          {deal.owner}
                        </div>
                      </div>
                    </div>

                    {/* Stage Transition Control */}
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
                      <select
                        value={deal.stage}
                        onChange={(e) => onUpdateStage(deal.id, e.target.value as DealStage)}
                        className="text-[10px] py-1 px-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-gray-800 dark:text-gray-200 font-medium cursor-pointer"
                      >
                        {STAGES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => onDeleteDeal(deal.id)}
                        className="text-gray-400 hover:text-rose-500 text-[10px]"
                        title="Delete Deal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
