import React, { useMemo, useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import Card from '../UI/Card';
import {
  getTotalBalance,
  getTotalIncome,
  getTotalExpense,
  getBalanceOverTime,
  getExpenseByCategory
} from '../../utils/helpers';
import useStore from '../../store/useStore';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const useAnimatedNumber = (target) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame;
    const startTime = performance.now();
    const duration = 1200;
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setValue(target * easeOut);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return Math.round(value);
};

const Overview = () => {
  const transactions = useStore((state) => state.transactions);

  const totalBalance = useMemo(() => getTotalBalance(transactions), [transactions]);
  const totalIncome = useMemo(() => getTotalIncome(transactions), [transactions]);
  const totalExpense = useMemo(() => getTotalExpense(transactions), [transactions]);
  const balanceData = useMemo(() => getBalanceOverTime(transactions), [transactions]);
  const categoryData = useMemo(() => {
    const catExpenses = getExpenseByCategory(transactions);
    return Object.entries(catExpenses).map(([name, value], idx) => ({
      name,
      value,
      fill: COLORS[idx % COLORS.length]
    }));
  }, [transactions]);

  const animatedBalance = useAnimatedNumber(totalBalance);
  const animatedIncome = useAnimatedNumber(totalIncome);
  const animatedExpense = useAnimatedNumber(totalExpense);

  const isEmpty = transactions.length === 0;

  const EmptyState = ({ icon, title, subtitle }) => (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mb-6 border border-blue-500/30">
        <span className="text-4xl opacity-80">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-200 mb-3">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-0">{subtitle}</p>
    </div>
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="ring-1 ring-blue-500/20 hover:ring-blue-500/40 transition-all">
          <p className="text-gray-400 text-sm uppercase tracking-wide">Total Balance</p>
          <p className="text-4xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            ${animatedBalance.toLocaleString()}
          </p>
        </Card>

        <Card>
          <p className="text-gray-400 text-sm uppercase tracking-wide">Total Income</p>
          <p className="text-3xl font-bold text-emerald-400">
            ${animatedIncome.toLocaleString()}
          </p>
        </Card>

        <Card>
          <p className="text-gray-400 text-sm uppercase tracking-wide">Total Expenses</p>
          <p className="text-3xl font-bold text-red-400">
            ${animatedExpense.toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-bold mb-6">Balance Over Time</h3>
          {isEmpty ? (
            <EmptyState icon="📈" title="No Balance History" subtitle="Add transactions to see your balance trend over time." />
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={balanceData}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" stroke="#374151" vertical={false} />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#3B82F6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-6">Expense Breakdown</h3>
          {isEmpty ? (
            <EmptyState icon="📊" title="No Spending Data" subtitle="Track expenses to see your spending categories." />
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  cornerRadius={8}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Overview;

