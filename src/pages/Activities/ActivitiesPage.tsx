import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { SearchFilterBar } from '../../components/common/SearchFilterBar';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { ActivityForm } from '../../components/forms/ActivityForm';
import { EmptyState } from '../../components/common/EmptyState';
import { Activity } from '../../types';
import { formatDate } from '../../utils/formatters';
import { Plus, Phone, Users, CheckSquare, Mail, Calendar, Edit2, Trash2, CheckCircle } from 'lucide-react';

export const ActivitiesPage: React.FC = () => {
  const {
    activities,
    addActivity,
    updateActivity,
    deleteActivity,
    toggleActivityStatus,
    globalSearchQuery,
  } = useCRM();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [deletingActivityId, setDeletingActivityId] = useState<string | null>(null);

  const activeQuery = searchQuery || globalSearchQuery;

  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.title.toLowerCase().includes(activeQuery.toLowerCase()) ||
      act.relatedToName.toLowerCase().includes(activeQuery.toLowerCase()) ||
      act.owner.toLowerCase().includes(activeQuery.toLowerCase());
    const matchesType = !typeFilter || act.type === typeFilter;
    const matchesStatus = !statusFilter || act.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Call':
        return <Phone className="w-4 h-4 text-blue-500" />;
      case 'Meeting':
        return <Users className="w-4 h-4 text-indigo-500" />;
      case 'Task':
        return <CheckSquare className="w-4 h-4 text-amber-500" />;
      case 'Email':
        return <Mail className="w-4 h-4 text-purple-500" />;
      default:
        return <Calendar className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Activities & Follow-Ups
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Schedule and track calls, meetings, tasks, and follow-up reminders.
        </p>
      </div>

      {/* Search & Filter */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search activity schedule..."
        primaryActionLabel="Schedule Activity"
        onPrimaryAction={() => setIsAddModalOpen(true)}
        primaryActionIcon={<Plus className="w-4 h-4 mr-2" />}
        filters={[
          {
            key: 'type',
            placeholder: 'All Types',
            value: typeFilter,
            onChange: setTypeFilter,
            options: [
              { label: 'Call', value: 'Call' },
              { label: 'Meeting', value: 'Meeting' },
              { label: 'Task', value: 'Task' },
              { label: 'Follow-up', value: 'Follow-up' },
              { label: 'Email', value: 'Email' },
            ],
          },
          {
            key: 'status',
            placeholder: 'All Statuses',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'Upcoming', value: 'Upcoming' },
              { label: 'Completed', value: 'Completed' },
              { label: 'Overdue', value: 'Overdue' },
            ],
          },
        ]}
      />

      {/* Content Table or Empty State */}
      {filteredActivities.length === 0 ? (
        <EmptyState
          title="No activities scheduled"
          description="Your activity schedule is clean. Click below to schedule a new call, meeting, or task."
          actionLabel="Schedule Activity"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 dark:bg-gray-700/40 border-b border-gray-100 dark:border-gray-700 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Activity Title</th>
                  <th className="px-6 py-3.5">Type</th>
                  <th className="px-6 py-3.5">Related To</th>
                  <th className="px-6 py-3.5">Due Date</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Owner</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-xs">
                {filteredActivities.map((act) => (
                  <tr
                    key={act.id}
                    className={`hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors ${
                      act.status === 'Completed' ? 'opacity-75' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleActivityStatus(act.id)}
                          title="Toggle Complete"
                          className={`p-1 rounded transition-colors ${
                            act.status === 'Completed'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-gray-300 hover:text-gray-500'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <div>
                          <p
                            className={`font-semibold ${
                              act.status === 'Completed'
                                ? 'line-through text-gray-400 dark:text-gray-500'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {act.title}
                          </p>
                          {act.notes && (
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-xs">
                              {act.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1.5 font-medium text-gray-700 dark:text-gray-300">
                        {getActivityIcon(act.type)}
                        <span>{act.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200 font-medium">
                      {act.relatedToName}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {formatDate(act.dueDate)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={act.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {act.owner}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setEditingActivity(act)}
                          title="Edit Activity"
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingActivityId(act.id)}
                          title="Delete Activity"
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
        title="Schedule New Activity"
      >
        <ActivityForm
          onSubmit={(data) => {
            addActivity(data);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingActivity}
        onClose={() => setEditingActivity(null)}
        title="Edit Scheduled Activity"
      >
        {editingActivity && (
          <ActivityForm
            initialData={editingActivity}
            onSubmit={(data) => {
              updateActivity(editingActivity.id, data);
              setEditingActivity(null);
            }}
            onCancel={() => setEditingActivity(null)}
          />
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!deletingActivityId}
        onClose={() => setDeletingActivityId(null)}
        onConfirm={() => {
          if (deletingActivityId) deleteActivity(deletingActivityId);
        }}
        title="Delete Activity"
        message="Are you sure you want to delete this activity record?"
      />
    </div>
  );
};
