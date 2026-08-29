import React from 'react';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { Lead } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Mail, Phone, Building, User, DollarSign, Calendar, Globe, Tag } from 'lucide-react';

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onConvert: (id: string) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  isOpen,
  onClose,
  onConvert,
}) => {
  if (!lead) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Lead Overview" maxWidth="md">
      <div className="space-y-5">
        {/* Lead Title Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {lead.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
              <Building className="w-3.5 h-3.5 mr-1" /> {lead.company}
            </p>
          </div>
          <Badge status={lead.status} />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-xs space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-gray-400 block text-[10px]">Email</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{lead.email}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-gray-400 block text-[10px]">Phone</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{lead.phone || 'N/A'}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-gray-400 block text-[10px]">Source</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{lead.source}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-gray-400 block text-[10px]">Est. Value</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(lead.estimatedValue)}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-gray-400 block text-[10px]">Owner</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{lead.owner}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-gray-400 block text-[10px]">Created Date</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{formatDate(lead.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {lead.notes && (
          <div>
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
              Notes
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg leading-relaxed">
              {lead.notes}
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          {lead.status !== 'Converted' ? (
            <button
              onClick={() => {
                onConvert(lead.id);
                onClose();
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              Convert to Customer
            </button>
          ) : (
            <span className="text-xs text-emerald-600 font-semibold">✓ Converted Account</span>
          )}
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
