import React from 'react';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { Quotation } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Printer, Download, Building2, User, Calendar, FileText } from 'lucide-react';

interface QuotationDetailModalProps {
  quotation: Quotation | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuotationDetailModal: React.FC<QuotationDetailModalProps> = ({
  quotation,
  isOpen,
  onClose,
}) => {
  if (!quotation) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quotation Invoice Document" maxWidth="2xl">
      <div id="printable-quotation" className="space-y-6 p-2">
        {/* Top Invoice Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-base">
                S
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Sales CRM Solutions Inc.
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              100 Tech Park Way, Suite 500, San Francisco, CA 94107
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block">
              Quotation Invoice
            </span>
            <h3 className="text-lg font-bold text-brand-600 dark:text-brand-400">
              {quotation.quoteNumber}
            </h3>
            <div className="mt-1">
              <Badge status={quotation.status} />
            </div>
          </div>
        </div>

        {/* Client & Date Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl text-xs">
          <div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase block mb-1">
              Billed To:
            </span>
            <p className="font-bold text-gray-900 dark:text-white text-sm">
              {quotation.companyName}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Attn: {quotation.customerName}
            </p>
          </div>

          <div className="sm:text-right space-y-1">
            <div>
              <span className="text-gray-400">Issued Date: </span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {formatDate(quotation.date)}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Valid Until: </span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {formatDate(quotation.validUntil)}
              </span>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700/60 border-b border-gray-200 dark:border-gray-600 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase">
                <th className="py-2.5 px-3">Item Description</th>
                <th className="py-2.5 px-3 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Unit Price</th>
                <th className="py-2.5 px-3 text-right">Discount</th>
                <th className="py-2.5 px-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-xs">
              {quotation.items.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td className="py-3 px-3 font-medium text-gray-900 dark:text-white">
                    {item.description}
                  </td>
                  <td className="py-3 px-3 text-center text-gray-700 dark:text-gray-300">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-3 text-right text-gray-700 dark:text-gray-300">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td className="py-3 px-3 text-right text-gray-500 dark:text-gray-400">
                    {item.discountPercent}%
                  </td>
                  <td className="py-3 px-3 text-right font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation summary */}
        <div className="flex justify-end pt-4">
          <div className="w-full sm:w-64 space-y-2 text-xs text-right">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal:</span>
              <span>{formatCurrency(quotation.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Discounts:</span>
              <span>-{formatCurrency(quotation.discountTotal)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax (8%):</span>
              <span>{formatCurrency(quotation.taxAmount)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
              <span>Grand Total:</span>
              <span>{formatCurrency(quotation.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {quotation.notes && (
          <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg text-xs text-gray-600 dark:text-gray-300">
            <span className="font-semibold block mb-1">Terms & Conditions:</span>
            {quotation.notes}
          </div>
        )}

        {/* Footer print action */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700 print:hidden">
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4 mr-2" /> Print / Save PDF
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
