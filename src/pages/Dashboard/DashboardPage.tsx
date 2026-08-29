import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Badge } from '../../components/common/Badge';
import {
  Users,
  TrendingUp,
  Award,
  DollarSign,
  Calendar,
  ArrowUpRight,
  CheckCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { leads, deals, activities, preferences, toggleActivityStatus } = useCRM();

  // Calculations
  const totalLeadsCount = leads.length;
  const activeDeals = deals.filter((d) => d.stage !== 'Won' && d.stage !== 'Lost');
  const wonDeals = deals.filter((d) => d.stage === 'Won');
  const totalSalesValue = deals
    .filter((d) => d.stage === 'Won')
    .reduce((acc, d) => acc + d.amount, 0);

  // Pipeline breakdown
  const stages = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won'];
  const pipelineSummary = stages.map((stg) => {
    const stageDeals = deals.filter((d) => d.stage === stg);
    return {
      stage: stg,
      count: stageDeals.length,
      value: stageDeals.reduce((acc, d) => acc + d.amount, 0),
    };
  });

  // Recent activities & follow-ups
  const upcomingActivities = activities
    .filter((a) => a.status === 'Upcoming' || a.status === 'Overdue')
    .slice(0, 5);

  // Monthly Sales Chart Mock Data
  const monthlySalesData = [
    { month: 'Mar', sales: 42000, leads: 18 },
    { month: 'Apr', sales: 68000, leads: 24 },
    { month: 'May', sales: 55000, leads: 22 },
    { month: 'Jun', sales: 98000, leads: 31 },
    { month: 'Jul', sales: 110000, leads: 38 },
    { month: 'Aug', sales: totalSalesValue > 0 ? totalSalesValue : 135000, leads: leads.length + 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Executive Dashboard
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Welcome back! Here is your sales pipeline and activity summary.
        </p>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Total Leads
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {totalLeadsCount}
            </h3>
            <span className="inline-flex items-center text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +12% this month
            </span>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Active Deals
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {activeDeals.length}
            </h3>
            <span className="inline-flex items-center text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +8% pipeline growth
            </span>
          </div>
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Won Deals
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {wonDeals.length}
            </h3>
            <span className="inline-flex items-center text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> 85% win rate
            </span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Sales Value
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {formatCurrency(totalSalesValue, preferences.defaultCurrency)}
            </h3>
            <span className="inline-flex items-center text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +15% revenue target
            </span>
          </div>
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Charts & Pipeline Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Sales Performance Trend
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Monthly revenue closed over time
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySalesData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0c94eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0c94eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" tickLine={false} stroke="#9ca3af" fontSize={12} />
                <YAxis
                  tickLine={false}
                  stroke="#9ca3af"
                  fontSize={12}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  formatter={(val: number) => [formatCurrency(val), 'Revenue']}
                  contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', color: '#fff' }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#0c94eb"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#salesGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Summary (1 Col) */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
            Pipeline Summary
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Current deal distribution across stages
          </p>

          <div className="space-y-3">
            {pipelineSummary.map((item) => (
              <div key={item.stage} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-700 dark:text-gray-300">{item.stage}</span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {item.count} deals ({formatCurrency(item.value, preferences.defaultCurrency)})
                  </span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, Math.max(10, (item.count / Math.max(1, deals.length)) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Activities & Follow-Ups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
            Recent Activities
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Latest call, meeting, and task logs
          </p>

          <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
            {activities.slice(0, 4).map((act) => (
              <div key={act.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      {act.title}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {act.relatedToName} • {formatDate(act.dueDate)}
                    </p>
                  </div>
                </div>
                <Badge status={act.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Follow-Ups */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xs">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
            Upcoming Follow-Ups
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Scheduled follow-ups requiring team action
          </p>

          <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
            {upcomingActivities.length === 0 ? (
              <p className="text-xs text-gray-400 py-4">No upcoming follow-ups scheduled.</p>
            ) : (
              upcomingActivities.map((act) => (
                <div key={act.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      {act.title}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {act.relatedToName} • Assigned to {act.owner}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleActivityStatus(act.id)}
                    className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors flex items-center text-xs font-medium"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span>Done</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
