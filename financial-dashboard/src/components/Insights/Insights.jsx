import React, { useMemo } from 'react';
import Card from '../UI/Card';
import {
  getHighestSpendingCategory,
  getMonthlyComparison
} from '../../utils/helpers';
import useStore from '../../store/useStore';

const Insights = () => {
  const transactions = useStore((state) => state.transactions);

  const highestCategory = useMemo(
    () => getHighestSpendingCategory(transactions),
    [transactions]
  );

  const monthly = useMemo(
    () => getMonthlyComparison(transactions),
    [transactions]
  );

  const categoryName = highestCategory?.[0] || "No spending";
  const categoryValue = highestCategory?.[1] || 0;

  const isIncrease = monthly.difference > 0;

  const isEmpty = transactions.length === 0;

  const EmptyState = ({ title, subtitle }) => (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/30">
        <span className="text-4xl opacity-80">🔍</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-200 mb-3">{title}</h3>
      <p className="text-gray-500 max-w-sm mx-auto">{subtitle}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Insights</h1>

      {isEmpty ? (
        <Card className="max-w-2xl mx-auto">
          <EmptyState title="No Insights Yet" subtitle="Add some transactions to unlock powerful financial insights and trends." />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="ring-1 ring-red-500/20 hover:ring-red-500/40 transition-all duration-300">
            <p className="text-sm text-gray-400 mb-4 uppercase tracking-wide font-medium">
              Highest Spending Category
            </p>
            <h2 className="text-2xl font-bold text-white mb-4">{categoryName}</h2>
            <p className="text-4xl font-black text-red-400">
              ${categoryValue.toLocaleString()}
            </p>
          </Card>

          <Card className={`ring-1 ${isIncrease ? 'ring-red-500/20 hover:ring-red-500/40' : 'ring-emerald-500/20 hover:ring-emerald-500/40'} transition-all duration-300`}>
            <p className="text-sm text-gray-400 mb-4 uppercase tracking-wide font-medium">
              Monthly Spending Change
            </p>
            <div className="space-y-2 text-gray-300 mb-6">
              <p><span className="font-mono">Current month:</span> ${monthly.current.toLocaleString()}</p>
              <p><span className="font-mono">Previous month:</span> ${monthly.last.toLocaleString()}</p>
            </div>
            <p
              className={`text-4xl font-black ${isIncrease ? 'text-red-400' : 'text-emerald-400'}`}
            >
              {isIncrease ? '+' : ''}${Math.abs(monthly.difference).toLocaleString()}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Insights;

