import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { SearchFilterBar } from '../../components/common/SearchFilterBar';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { CampaignForm } from '../../components/forms/CampaignForm';
import { EmptyState } from '../../components/common/EmptyState';
import { Campaign } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Plus, Megaphone, Users, DollarSign, Edit2, Trash2 } from 'lucide-react';

export const CampaignsPage: React.FC = () => {
  const {
    campaigns,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    globalSearchQuery,
  } = useCRM();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [deletingCampaignId, setDeletingCampaignId] = useState<string | null>(null);

  const activeQuery = searchQuery || globalSearchQuery;

  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesSearch =
      camp.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
      camp.targetGroup.toLowerCase().includes(activeQuery.toLowerCase());
    const matchesStatus = !statusFilter || camp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Marketing Campaigns
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Track marketing outreach programs, target audiences, and generated sales leads.
        </p>
      </div>

      {/* Search & Filter */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search campaigns..."
        primaryActionLabel="Add Campaign"
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
              { label: 'Active', value: 'Active' },
              { label: 'Completed', value: 'Completed' },
            ],
          },
        ]}
      />

      {/* Table */}
      {filteredCampaigns.length === 0 ? (
        <EmptyState
          title="No marketing campaigns found"
          description="No campaign records match your active search filter. Add a new campaign to monitor outreach."
          actionLabel="Add Campaign"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 dark:bg-gray-700/40 border-b border-gray-100 dark:border-gray-700 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Campaign Name</th>
                  <th className="px-6 py-3.5">Target Audience</th>
                  <th className="px-6 py-3.5">Duration</th>
                  <th className="px-6 py-3.5">Budget & Spent</th>
                  <th className="px-6 py-3.5">Leads Generated</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-xs">
                {filteredCampaigns.map((camp) => (
                  <tr
                    key={camp.id}
                    className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {camp.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {camp.targetGroup}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {formatDate(camp.startDate)} – {formatDate(camp.endDate)}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(camp.spent)}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Budget: {formatCurrency(camp.budget)}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-bold text-brand-600 dark:text-brand-400">
                      {camp.leadsGenerated} leads
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={camp.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setEditingCampaign(camp)}
                          title="Edit Campaign"
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingCampaignId(camp.id)}
                          title="Delete Campaign"
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
        title="Add New Campaign"
      >
        <CampaignForm
          onSubmit={(data) => {
            addCampaign(data);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingCampaign}
        onClose={() => setEditingCampaign(null)}
        title="Edit Campaign Details"
      >
        {editingCampaign && (
          <CampaignForm
            initialData={editingCampaign}
            onSubmit={(data) => {
              updateCampaign(editingCampaign.id, data);
              setEditingCampaign(null);
            }}
            onCancel={() => setEditingCampaign(null)}
          />
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!deletingCampaignId}
        onClose={() => setDeletingCampaignId(null)}
        onConfirm={() => {
          if (deletingCampaignId) deleteCampaign(deletingCampaignId);
        }}
        title="Delete Campaign"
        message="Are you sure you want to delete this campaign tracking record?"
      />
    </div>
  );
};
