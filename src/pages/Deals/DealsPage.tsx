import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { SearchFilterBar } from '../../components/common/SearchFilterBar';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { DealForm } from '../../components/forms/DealForm';
import { KanbanBoard } from './KanbanBoard';
import { EmptyState } from '../../components/common/EmptyState';
import { Deal, DealStage } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Plus, LayoutGrid, List, Edit2, Trash2 } from 'lucide-react';

export const DealsPage: React.FC = () => {
  const {
    deals,
    addDeal,
    updateDeal,
    deleteDeal,
    updateDealStage,
    preferences,
    globalSearchQuery,
  } = useCRM();

  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [deletingDealId, setDeletingDealId] = useState<string | null>(null);

  const activeQuery = searchQuery || globalSearchQuery;

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
      deal.companyName.toLowerCase().includes(activeQuery.toLowerCase()) ||
      deal.customerName.toLowerCase().includes(activeQuery.toLowerCase()) ||
      deal.owner.toLowerCase().includes(activeQuery.toLowerCase());
    const matchesStage = !stageFilter || deal.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Sales Pipeline Deals
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Manage sales opportunities through stages from lead to closed won business.
          </p>
        </div>

        {/* Kanban vs List view switcher toggle */}
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'kanban'
                ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 mr-1.5" />
            <span>Kanban Board</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5 mr-1.5" />
            <span>Table View</span>
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search deals by title, customer..."
        primaryActionLabel="Add Deal"
        onPrimaryAction={() => setIsAddModalOpen(true)}
        primaryActionIcon={<Plus className="w-4 h-4 mr-2" />}
        filters={[
          {
            key: 'stage',
            placeholder: 'All Stages',
            value: stageFilter,
            onChange: setStageFilter,
            options: [
              { label: 'New', value: 'New' },
              { label: 'Qualified', value: 'Qualified' },
              { label: 'Proposal', value: 'Proposal' },
              { label: 'Negotiation', value: 'Negotiation' },
              { label: 'Won', value: 'Won' },
              { label: 'Lost', value: 'Lost' },
            ],
          },
        ]}
      />

      {/* Main View Content */}
      {filteredDeals.length === 0 ? (
        <EmptyState
          title="No deals found"
          description="No sales deals match your active filter. Add a deal to populate your pipeline board."
          actionLabel="Add Deal"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : viewMode === 'kanban' ? (
        <KanbanBoard
          deals={filteredDeals}
          onUpdateStage={updateDealStage}
          onEditDeal={(deal) => setEditingDeal(deal)}
          onDeleteDeal={(id) => setDeletingDealId(id)}
          currencySymbol={preferences.defaultCurrency}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 dark:bg-gray-700/40 border-b border-gray-100 dark:border-gray-700 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Deal Name</th>
                  <th className="px-6 py-3.5">Company & Contact</th>
                  <th className="px-6 py-3.5">Amount</th>
                  <th className="px-6 py-3.5">Stage</th>
                  <th className="px-6 py-3.5">Probability</th>
                  <th className="px-6 py-3.5">Close Date</th>
                  <th className="px-6 py-3.5">Owner</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-xs">
                {filteredDeals.map((deal) => (
                  <tr
                    key={deal.id}
                    className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {deal.name}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {deal.companyName}
                      </p>
                      <p className="text-[11px] text-gray-400">{deal.customerName}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(deal.amount, preferences.defaultCurrency)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={deal.stage} />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300">
                      {deal.probability}%
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {formatDate(deal.expectedCloseDate)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {deal.owner}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setEditingDeal(deal)}
                          title="Edit Deal"
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingDealId(deal.id)}
                          title="Delete Deal"
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Sales Deal"
      >
        <DealForm
          onSubmit={(data) => {
            addDeal(data);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingDeal}
        onClose={() => setEditingDeal(null)}
        title="Edit Deal Information"
      >
        {editingDeal && (
          <DealForm
            initialData={editingDeal}
            onSubmit={(data) => {
              updateDeal(editingDeal.id, data);
              setEditingDeal(null);
            }}
            onCancel={() => setEditingDeal(null)}
          />
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!deletingDealId}
        onClose={() => setDeletingDealId(null)}
        onConfirm={() => {
          if (deletingDealId) deleteDeal(deletingDealId);
        }}
        title="Delete Deal"
        message="Are you sure you want to remove this deal from your pipeline board?"
      />
    </div>
  );
};
