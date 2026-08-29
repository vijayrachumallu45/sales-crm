import React from 'react';
import { Modal } from '../common/Modal';
import { ExportService } from '../../services/ExportService';
import { useCRM } from '../../context/CRMContext';
import { Download, FileSpreadsheet, FileCode } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { leads, contacts, customers, deals, quotations, activities, campaigns } = useCRM();

  const handleExportCSV = (type: string) => {
    switch (type) {
      case 'Leads':
        ExportService.exportToCSV('leads-export', leads);
        break;
      case 'Contacts':
        ExportService.exportToCSV('contacts-export', contacts);
        break;
      case 'Customers':
        ExportService.exportToCSV('customers-export', customers);
        break;
      case 'Deals':
        ExportService.exportToCSV('deals-export', deals);
        break;
      case 'Quotations':
        ExportService.exportToCSV('quotations-export', quotations);
        break;
      case 'Activities':
        ExportService.exportToCSV('activities-export', activities);
        break;
      case 'Campaigns':
        ExportService.exportToCSV('campaigns-export', campaigns);
        break;
    }
  };

  const handleExportAllJSON = () => {
    const fullBackup = {
      leads,
      contacts,
      customers,
      deals,
      quotations,
      activities,
      campaigns,
      exportedAt: new Date().toISOString(),
    };
    ExportService.exportToJSON('sales-crm-full-backup', fullBackup);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Data Export & Backup" maxWidth="md">
      <div className="space-y-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Select CRM data modules to download in CSV or JSON format.
        </p>

        <div className="grid grid-cols-2 gap-2">
          {['Leads', 'Contacts', 'Customers', 'Deals', 'Quotations', 'Activities', 'Campaigns'].map((module) => (
            <button
              key={module}
              onClick={() => handleExportCSV(module)}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-lg text-xs font-semibold text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>{module} (CSV)</span>
              </div>
              <Download className="w-3.5 h-3.5 text-gray-400" />
            </button>
          ))}
        </div>

        <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={handleExportAllJSON}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <FileCode className="w-4 h-4" />
            <span>Export Complete CRM Database Backup (JSON)</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
