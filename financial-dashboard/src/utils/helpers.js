import { mockTransactions } from '../data/mockData.js';

export const getTotalBalance = (transactions) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  return totalIncome - totalExpense;
};

export const getTotalIncome = (transactions) => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const getTotalExpense = (transactions) => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const getBalanceOverTime = (transactions) => {
  // Sort by date, cumulative balance
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let balance = 0;
  return sorted.map(t => {
    if (t.type === 'income') balance += t.amount;
    else balance -= t.amount;
    return { date: t.date, balance };
  });
};

export const getExpenseByCategory = (transactions) => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
};

export const getHighestSpendingCategory = (transactions) => {
  const categoryExpenses = getExpenseByCategory(transactions);
  return Object.entries(categoryExpenses).reduce((a, b) => a[1] > b[1] ? a : b, ['', 0]);
};

export const getMonthlyComparison = (transactions) => {
  const currentMonth = new Date().getMonth();
  const currentExpenses = transactions
    .filter(t => new Date(t.date).getMonth() === currentMonth && t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const lastMonthExpenses = transactions
    .filter(t => new Date(t.date).getMonth() === currentMonth - 1 && t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const difference = currentExpenses - lastMonthExpenses;
  return { current: currentExpenses, last: lastMonthExpenses, difference };
};
