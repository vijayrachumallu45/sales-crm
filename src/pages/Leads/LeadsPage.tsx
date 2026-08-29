import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { SearchFilterBar } from '../../components/common/SearchFilterBar';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { LeadForm } from '../../components/forms/LeadForm';
import { LeadDetailModal } from './LeadDetailModal';
import { EmptyState } from '../../components/common/EmptyState';
import { Lead } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { MoreVertical, Eye, Edit2, Trash2, UserCheck, Plus } from 'lucide-react';

export const LeadsPage: React.FC = () => {
  const {
    leads,
    addLead,
    updateLead,
    deleteLead,
    convertLeadToCustomer,
    globalSearchQuery,
  } = useCRM();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Effective search query combining local and global header search
  const activeQuery = searchQuery || globalSearchQuery;

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(activeQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(activeQuery.toLowerCase()) ||
      lead.owner.toLowerCase().includes(activeQuery.toLowerCase());
    const matchesStatus = !statusFilter || lead.status === statusFilter;
    const matchesSource = !sourceFilter || lead.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Structure */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Sales Leads
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Track, nurture, and convert sales prospects into active business customers.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search leads by name, company..."
        primaryActionLabel="Add Lead"
        onPrimaryAction={() => setIsAddModalOpen(true)}
        primaryActionIcon={<Plus className="w-4 h-4 mr-2" />}
        filters={[
          {
            key: 'status',
            placeholder: 'All Statuses',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'New', value: 'New' },
              { label: 'Contacted', value: 'Contacted' },
              { label: 'Qualified', value: 'Qualified' },
              { label: 'Unqualified', value: 'Unqualified' },
              { label: 'Converted', value: 'Converted' },
            ],
          },
          {
            key: 'source',
            placeholder: 'All Sources',
            value: sourceFilter,
            onChange: setSourceFilter,
            options: [
              { label: 'Website', value: 'Website' },
              { label: 'Referral', value: 'Referral' },
              { label: 'LinkedIn', value: 'LinkedIn' },
              { label: 'Cold Outreach', value: 'Cold Outreach' },
              { label: 'Event', value: 'Event' },
              { label: 'Partner', value: 'Partner' },
            ],
          },
        ]}
      />

      {/* Main Content Table or Empty State */}
      {filteredLeads.length === 0 ? (
        <EmptyState
          title="No leads found"
          description="Try clearing your search query or filters, or create a new lead to populate your pipeline."
          actionLabel="Add Lead"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 dark:bg-gray-700/40 border-b border-gray-100 dark:border-gray-700 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Lead Name</th>
                  <th className="px-6 py-3.5">Company</th>
                  <th className="px-6 py-3.5">Source</th>
                  <th className="px-6 py-3.5">Est. Value</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Owner</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-xs">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {lead.name}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-[11px]">
                          {lead.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                      {lead.company}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {lead.source}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(lead.estimatedValue)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={lead.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {lead.owner}
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => setViewingLead(lead)}
                          title="View Details"
                          className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setEditingLead(lead)}
                          title="Edit Lead"
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {lead.status !== 'Converted' && (
                          <button
                            onClick={() => convertLeadToCustomer(lead.id)}
                            title="Convert to Customer"
                            className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => setDeletingLeadId(lead.id)}
                          title="Delete Lead"
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

      {/* Add Lead Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Sales Lead"
      >
        <LeadForm
          onSubmit={(data) => {
            addLead(data);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Lead Modal */}
      <Modal
        isOpen={!!editingLead}
        onClose={() => setEditingLead(null)}
        title="Edit Lead Information"
      >
        {editingLead && (
          <LeadForm
            initialData={editingLead}
            onSubmit={(data) => {
              updateLead(editingLead.id, data);
              setEditingLead(null);
            }}
            onCancel={() => setEditingLead(null)}
          />
        )}
      </Modal>

      {/* View Lead Details Modal */}
      <LeadDetailModal
        lead={viewingLead}
        isOpen={!!viewingLead}
        onClose={() => setViewingLead(null)}
        onConvert={convertLeadToCustomer}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingLeadId}
        onClose={() => setDeletingLeadId(null)}
        onConfirm={() => {
          if (deletingLeadId) deleteLead(deletingLeadId);
        }}
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
      />
    </div>
  );
};
