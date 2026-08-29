import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { formatCurrency } from '../../utils/formatters';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { BarChart3, TrendingUp, Users, Award, ShieldCheck } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { leads, deals, customers, preferences } = useCRM();

  // 1. Sales Performance Monthly Data
  const salesPerformanceData = [
    { month: 'Apr', Revenue: 68000, WonDeals: 3, LostDeals: 1 },
    { month: 'May', Revenue: 55000, WonDeals: 2, LostDeals: 2 },
    { month: 'Jun', Revenue: 98000, WonDeals: 5, LostDeals: 1 },
    { month: 'Jul', Revenue: 110000, WonDeals: 6, LostDeals: 2 },
    { month: 'Aug', Revenue: deals.filter((d) => d.stage === 'Won').reduce((a, b) => a + b.amount, 0) || 125000, WonDeals: deals.filter((d) => d.stage === 'Won').length || 4, LostDeals: deals.filter((d) => d.stage === 'Lost').length || 1 },
  ];

  // 2. Lead Conversion Funnel Data
  const leadFunnelData = [
    { name: 'New Leads', count: leads.filter((l) => l.status === 'New').length || 8 },
    { name: 'Contacted', count: leads.filter((l) => l.status === 'Contacted').length || 5 },
    { name: 'Qualified', count: leads.filter((l) => l.status === 'Qualified').length || 7 },
    { name: 'Converted', count: leads.filter((l) => l.status === 'Converted').length || 4 },
  ];

  // 3. Customer Growth & Segment Breakdown
  const customerTypeData = [
    { name: 'Enterprise', value: customers.filter((c) => c.customerType === 'Enterprise').length || 2, color: '#0c94eb' },
    { name: 'SMB', value: customers.filter((c) => c.customerType === 'SMB').length || 2, color: '#6366f1' },
    { name: 'Individual', value: customers.filter((c) => c.customerType === 'Individual').length || 1, color: '#10b981' },
  ];

  const totalWonRevenue = deals
    .filter((d) => d.stage === 'Won')
    .reduce((acc, d) => acc + d.amount, 0);

  const conversionRate = Math.round(
    ((leads.filter((l) => l.status === 'Converted').length || 1) / Math.max(1, leads.length)) * 100
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Sales Analytics & Insights
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Visual analytics on revenue growth, lead conversion rates, and customer acquisition.
        </p>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Closed Revenue</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {formatCurrency(totalWonRevenue, preferences.defaultCurrency)}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Lead Conversion Rate</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {conversionRate}%
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Active Customer Base</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {customers.filter((c) => c.status === 'Active').length} Accounts
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Chart 1: Sales Performance (Bar Chart) */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
          Sales & Deal Performance
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Monthly revenue closed along with deal win/loss ratios
        </p>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis yAxisId="left" stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
              <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', color: '#fff' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="Revenue" fill="#0c94eb" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="WonDeals" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="LostDeals" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart Grid: Lead Conversion Funnel & Customer Type Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Funnel */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
            Lead Funnel Conversion
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Progression from raw lead to qualified customer
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={leadFunnelData}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" opacity={0.1} />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} width={100} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Type Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
            Customer Account Breakdown
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Distribution across Enterprise, SMB, and Individual clients
          </p>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {customerTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
