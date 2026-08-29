import React from 'react';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { Customer } from '../../types';
import { useCRM } from '../../context/CRMContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Building2, Mail, Phone, MapPin, DollarSign, Calendar, TrendingUp, CheckSquare } from 'lucide-react';

interface CustomerDetailModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  customer,
  isOpen,
  onClose,
}) => {
  const { deals, activities } = useCRM();

  if (!customer) return null;

  // Linked deals & activities
  const relatedDeals = deals.filter(
    (d) =>
      d.companyName.toLowerCase().includes(customer.company.toLowerCase()) ||
      d.customerName.toLowerCase().includes(customer.name.toLowerCase())
  );

  const relatedActivities = activities.filter((a) =>
    a.relatedToName.toLowerCase().includes(customer.company.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customer Account Detail" maxWidth="xl">
      <div className="space-y-6">
        {/* Header summary */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {customer.company}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Primary Contact: <span className="font-semibold text-gray-700 dark:text-gray-200">{customer.name}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
              {customer.customerType}
            </span>
            <Badge status={customer.status} />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl text-xs">
          <div>
            <span className="text-gray-400 block text-[10px]">Email</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">{customer.email}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[10px]">Phone</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">{customer.phone || 'N/A'}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[10px]">Total Deals Value</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(customer.totalDealsValue)}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-3">
            <span className="text-gray-400 block text-[10px]">Address</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {customer.address || 'No location address recorded'}
            </span>
          </div>
        </div>

        {/* Notes */}
        {customer.notes && (
          <div>
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
              Account Notes
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg leading-relaxed">
              {customer.notes}
            </p>
          </div>
        )}

        {/* Related Deals Section */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1 text-brand-500" /> Linked Sales Deals ({relatedDeals.length})
          </h4>
          {relatedDeals.length === 0 ? (
            <p className="text-xs text-gray-400 italic p-3 bg-gray-50 dark:bg-gray-700/20 rounded-lg">
              No active or historical sales deals linked to this customer yet.
            </p>
          ) : (
            <div className="space-y-2">
              {relatedDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 rounded-lg text-xs"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{deal.name}</p>
                    <p className="text-[11px] text-gray-400">Close date: {formatDate(deal.expectedCloseDate)}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900 dark:text-white block">{formatCurrency(deal.amount)}</span>
                    <Badge status={deal.stage} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Activities Section */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2 flex items-center">
            <CheckSquare className="w-3.5 h-3.5 mr-1 text-indigo-500" /> Recent Activities ({relatedActivities.length})
          </h4>
          {relatedActivities.length === 0 ? (
            <p className="text-xs text-gray-400 italic p-3 bg-gray-50 dark:bg-gray-700/20 rounded-lg">
              No logged activity history for this account.
            </p>
          ) : (
            <div className="space-y-2">
              {relatedActivities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-700/30 rounded-lg text-xs"
                >
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{act.title}</p>
                    <p className="text-[10px] text-gray-400">{act.type} • {formatDate(act.dueDate)}</p>
                  </div>
                  <Badge status={act.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
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
