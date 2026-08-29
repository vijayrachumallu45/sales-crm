import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { SearchFilterBar } from '../../components/common/SearchFilterBar';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { ContactForm } from '../../components/forms/ContactForm';
import { EmptyState } from '../../components/common/EmptyState';
import { Contact } from '../../types';
import { formatDate } from '../../utils/formatters';
import { Plus, Edit2, Trash2, Mail, Phone, Building2 } from 'lucide-react';

export const ContactsPage: React.FC = () => {
  const { contacts, addContact, updateContact, deleteContact, globalSearchQuery } = useCRM();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContactId, setDeletingContactId] = useState<string | null>(null);

  const activeQuery = searchQuery || globalSearchQuery;

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(activeQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(activeQuery.toLowerCase()) ||
      contact.designation.toLowerCase().includes(activeQuery.toLowerCase());
    const matchesStatus = !statusFilter || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Contact Directory
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Manage key business contacts, executives, and decision makers.
        </p>
      </div>

      {/* Search & Filter */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search contacts by name, company..."
        primaryActionLabel="Add Contact"
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
            ],
          },
        ]}
      />

      {/* Content Table or Empty State */}
      {filteredContacts.length === 0 ? (
        <EmptyState
          title="No contacts found"
          description="No contact profiles match your search criteria. Add your first contact to populate this module."
          actionLabel="Add Contact"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 dark:bg-gray-700/40 border-b border-gray-100 dark:border-gray-700 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Contact Name</th>
                  <th className="px-6 py-3.5">Company & Title</th>
                  <th className="px-6 py-3.5">Contact Details</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Added Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-xs">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {contact.name}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {contact.company}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-[11px]">
                        {contact.designation}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700 dark:text-gray-300 flex items-center">
                        <Mail className="w-3.5 h-3.5 mr-1 text-gray-400" />
                        {contact.email}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-[11px] flex items-center mt-0.5">
                        <Phone className="w-3.5 h-3.5 mr-1 text-gray-400" />
                        {contact.phone || 'N/A'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={contact.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setEditingContact(contact)}
                          title="Edit Contact"
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingContactId(contact.id)}
                          title="Delete Contact"
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
        title="Add New Contact"
      >
        <ContactForm
          onSubmit={(data) => {
            addContact(data);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingContact}
        onClose={() => setEditingContact(null)}
        title="Edit Contact Information"
      >
        {editingContact && (
          <ContactForm
            initialData={editingContact}
            onSubmit={(data) => {
              updateContact(editingContact.id, data);
              setEditingContact(null);
            }}
            onCancel={() => setEditingContact(null)}
          />
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!deletingContactId}
        onClose={() => setDeletingContactId(null)}
        onConfirm={() => {
          if (deletingContactId) deleteContact(deletingContactId);
        }}
        title="Delete Contact"
        message="Are you sure you want to delete this contact profile?"
      />
    </div>
  );
};
