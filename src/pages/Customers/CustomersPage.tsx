import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { SearchFilterBar } from '../../components/common/SearchFilterBar';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { CustomerForm } from '../../components/forms/CustomerForm';
import { CustomerDetailModal } from './CustomerDetailModal';
import { EmptyState } from '../../components/common/EmptyState';
import { Customer } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react';

export const CustomersPage: React.FC = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer, globalSearchQuery } = useCRM();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [deletingCustomerId, setDeletingCustomerId] = useState<string | null>(null);

  const activeQuery = searchQuery || globalSearchQuery;

  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.company.toLowerCase().includes(activeQuery.toLowerCase()) ||
      cust.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
      cust.email.toLowerCase().includes(activeQuery.toLowerCase());
    const matchesStatus = !statusFilter || cust.status === statusFilter;
    const matchesType = !typeFilter || cust.customerType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Customer Accounts
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Manage active customer relationships, contracts, and lifetime deal values.
        </p>
      </div>

      {/* Search & Filter */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search customers by company, contact..."
        primaryActionLabel="Add Customer"
        onPrimaryAction={() => setIsAddModalOpen(true)}
        primaryActionIcon={<Plus className="w-4 h-4 mr-2" />}
        filters={[
          {
            key: 'status',
            placeholder: 'All Statuses',
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: 'Active', value: 'Active' },
              { label: 'Inactive', value: 'Inactive' },
              { label: 'Potential', value: 'Potential' },
            ],
          },
          {
            key: 'type',
            placeholder: 'All Types',
            value: typeFilter,
            onChange: setTypeFilter,
            options: [
              { label: 'Enterprise', value: 'Enterprise' },
              { label: 'SMB', value: 'SMB' },
              { label: 'Individual', value: 'Individual' },
            ],
          },
        ]}
      />

      {/* Table */}
      {filteredCustomers.length === 0 ? (
        <EmptyState
          title="No customer accounts found"
          description="No customer accounts match your current filters. Add your first customer profile to track business contracts."
          actionLabel="Add Customer"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 dark:bg-gray-700/40 border-b border-gray-100 dark:border-gray-700 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Company Name</th>
                  <th className="px-6 py-3.5">Primary Contact</th>
                  <th className="px-6 py-3.5">Customer Type</th>
                  <th className="px-6 py-3.5">Total Deals</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Created Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-xs">
                {filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {cust.company}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800 dark:text-gray-200">{cust.name}</p>
                      <p className="text-[11px] text-gray-400">{cust.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 text-[11px] font-medium rounded bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        {cust.customerType}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(cust.totalDealsValue)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={cust.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {formatDate(cust.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setViewingCustomer(cust)}
                          title="View Details & Deals"
                          className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingCustomer(cust)}
                          title="Edit Customer"
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingCustomerId(cust.id)}
                          title="Delete Customer"
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
        title="Add Customer Account"
      >
        <CustomerForm
          onSubmit={(data) => {
            addCustomer(data);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingCustomer}
        onClose={() => setEditingCustomer(null)}
        title="Edit Customer Account"
      >
        {editingCustomer && (
          <CustomerForm
            initialData={editingCustomer}
            onSubmit={(data) => {
              updateCustomer(editingCustomer.id, data);
              setEditingCustomer(null);
            }}
            onCancel={() => setEditingCustomer(null)}
          />
        )}
      </Modal>

      <CustomerDetailModal
        customer={viewingCustomer}
        isOpen={!!viewingCustomer}
        onClose={() => setViewingCustomer(null)}
      />

      <ConfirmModal
        isOpen={!!deletingCustomerId}
        onClose={() => setDeletingCustomerId(null)}
        onConfirm={() => {
          if (deletingCustomerId) deleteCustomer(deletingCustomerId);
        }}
        title="Delete Customer"
        message="Are you sure you want to delete this customer account? Linked deals will remain in history."
      />
    </div>
  );
};
