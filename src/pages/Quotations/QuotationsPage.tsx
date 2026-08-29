import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { SearchFilterBar } from '../../components/common/SearchFilterBar';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { QuotationForm } from '../../components/forms/QuotationForm';
import { QuotationDetailModal } from './QuotationDetailModal';
import { EmptyState } from '../../components/common/EmptyState';
import { Quotation, QuotationStatus } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react';

export const QuotationsPage: React.FC = () => {
  const {
    quotations,
    addQuotation,
    updateQuotation,
    deleteQuotation,
    updateQuotationStatus,
    globalSearchQuery,
  } = useCRM();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null);
  const [viewingQuotation, setViewingQuotation] = useState<Quotation | null>(null);
  const [deletingQuotationId, setDeletingQuotationId] = useState<string | null>(null);

  const activeQuery = searchQuery || globalSearchQuery;

  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch =
      q.quoteNumber.toLowerCase().includes(activeQuery.toLowerCase()) ||
      q.companyName.toLowerCase().includes(activeQuery.toLowerCase()) ||
      q.customerName.toLowerCase().includes(activeQuery.toLowerCase());
    const matchesStatus = !statusFilter || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Quotations & Proposals
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Create, send, and print formal product/service price proposals for prospects.
        </p>
      </div>

      {/* Search & Filter */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search by quote #, company..."
        primaryActionLabel="Create Quotation"
        onPrimaryAction={() => setIsAddModalOpen(true)}
        primaryActionIcon={<Plus className="w-4 h-4 mr-2" />}
        filters={[
          {
            key: 'status',
            placeholder: 'All Statuses',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'Draft', value: 'Draft' },
              { label: 'Sent', value: 'Sent' },
              { label: 'Accepted', value: 'Accepted' },
              { label: 'Rejected', value: 'Rejected' },
            ],
          },
        ]}
      />

      {/* Table */}
      {filteredQuotations.length === 0 ? (
        <EmptyState
          title="No quotations created"
          description="Create custom price quotations with line item breakdowns to send to prospective clients."
          actionLabel="Create Quotation"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 dark:bg-gray-700/40 border-b border-gray-100 dark:border-gray-700 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Quote #</th>
                  <th className="px-6 py-3.5">Company & Contact</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Valid Until</th>
                  <th className="px-6 py-3.5">Amount</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-xs">
                {filteredQuotations.map((q) => (
                  <tr
                    key={q.id}
                    className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-brand-600 dark:text-brand-400">
                      {q.quoteNumber}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {q.companyName}
                      </p>
                      <p className="text-[11px] text-gray-400">{q.customerName}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {formatDate(q.date)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {formatDate(q.validUntil)}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                      {formatCurrency(q.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={q.status}
                        onChange={(e) => updateQuotationStatus(q.id, e.target.value as QuotationStatus)}
                        className="text-xs py-1 px-2 border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium cursor-pointer"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Sent">Sent</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setViewingQuotation(q)}
                          title="View Invoice & Print"
                          className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingQuotation(q)}
                          title="Edit Quote"
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingQuotationId(q.id)}
                          title="Delete Quote"
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
        title="Create New Quotation"
        maxWidth="2xl"
      >
        <QuotationForm
          onSubmit={(data) => {
            addQuotation(data);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingQuotation}
        onClose={() => setEditingQuotation(null)}
        title="Edit Quotation"
        maxWidth="2xl"
      >
        {editingQuotation && (
          <QuotationForm
            initialData={editingQuotation}
            onSubmit={(data) => {
              updateQuotation(editingQuotation.id, data);
              setEditingQuotation(null);
            }}
            onCancel={() => setEditingQuotation(null)}
          />
        )}
      </Modal>

      <QuotationDetailModal
        quotation={viewingQuotation}
        isOpen={!!viewingQuotation}
        onClose={() => setViewingQuotation(null)}
      />

      <ConfirmModal
        isOpen={!!deletingQuotationId}
        onClose={() => setDeletingQuotationId(null)}
        onConfirm={() => {
          if (deletingQuotationId) deleteQuotation(deletingQuotationId);
        }}
        title="Delete Quotation"
        message="Are you sure you want to delete this quotation document?"
      />
    </div>
  );
};
