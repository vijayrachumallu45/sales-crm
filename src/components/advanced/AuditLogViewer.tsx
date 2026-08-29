import React from 'react';
import { AuditLogger, AuditLogEntry } from '../../services/AuditLogger';
import { Shield, Clock, User, Activity } from 'lucide-react';

export const AuditLogViewer: React.FC = () => {
  const logs = AuditLogger.getLogs();

  const getActionColor = (action: AuditLogEntry['action']) => {
    switch (action) {
      case 'CREATE':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300';
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
      case 'DELETE':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300';
      case 'CONVERT':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs p-5 space-y-4">
      <div className="flex items-center space-x-2 pb-3 border-b border-gray-100 dark:border-gray-700">
        <Shield className="w-5 h-5 text-brand-600 dark:text-brand-400" />
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          System Audit Logs
        </h3>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700/60 max-h-72 overflow-y-auto">
        {logs.map((log) => (
          <div key={log.id} className="py-3 flex items-start justify-between text-xs">
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getActionColor(log.action)}`}>
                  {log.action}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {log.entityType}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 dark:text-gray-400">{log.details}</span>
              </div>
              <p className="text-[10px] text-gray-400 flex items-center pt-0.5">
                <User className="w-3 h-3 mr-1" /> {log.user} • <Clock className="w-3 h-3 mx-1" /> {log.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
