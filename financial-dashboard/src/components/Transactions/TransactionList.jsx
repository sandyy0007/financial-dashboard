import React, { useState, useMemo } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Badge from '../UI/Badge';
import Table from '../UI/Table';
import useStore from '../../store/useStore';
import { useLocation } from 'react-router-dom'; // for role context

const TransactionList = () => {
  const [localFilters, setLocalFilters] = useState({ search: '', typeFilter: 'all', sortBy: 'date_desc' });
  const { transactions, role, setFilters, deleteTransaction } = useStore();
  const location = useLocation();

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (localFilters.search) {
      filtered = filtered.filter(t =>
        t.category.toLowerCase().includes(localFilters.search.toLowerCase()) ||
        t.type.toLowerCase().includes(localFilters.search.toLowerCase())
      );
    }

    if (localFilters.typeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === localFilters.typeFilter);
    }

    filtered.sort((a, b) => {
      if (localFilters.sortBy === 'date_asc') return new Date(a.date) - new Date(b.date);
      if (localFilters.sortBy === 'date_desc') return new Date(b.date) - new Date(a.date);
      if (localFilters.sortBy === 'amount_asc') return a.amount - b.amount;
      if (localFilters.sortBy === 'amount_desc') return b.amount - a.amount;
      return 0;
    });

    setFilters(localFilters);
    return filtered;
  }, [transactions, localFilters, setFilters]);

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'amount', className: 'text-right font-mono', label: 'Amount', render: (val) => `$${Math.abs(val).toLocaleString()}` },
    { key: 'category', label: 'Category' },
    { key: 'type', label: 'Type', render: (val) => <Badge variant={val}>{val.toUpperCase()}</Badge> },
  ];

  if (role === 'admin') {
    columns.push({ key: 'actions', label: 'Actions' });
  }

  const handleSort = (sortBy) => {
    setLocalFilters(prev => ({ ...prev, sortBy }));
  };

  const data = filteredTransactions.map(t => ({
    id: t.id,
    date: new Date(t.date).toLocaleDateString(),
    amount: t.amount,
    category: t.category,
    type: t.type,
    actions: (
      <div className="flex gap-2 justify-end">
        <Button variant="secondary" size="sm" onClick={() => {/* edit */}}>Edit</Button>
        <Button variant="danger" size="sm" onClick={() => deleteTransaction(t.id)}>Delete</Button>
      </div>
    )
  }));

  if (filteredTransactions.length === 0) {
    return (
      <Card>
        <div className="text-center py-16 px-8">
          <div className="w-20 h-20 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">💳</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-200 mb-3">No transactions yet</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Your transaction history will appear here once you add your first entry.
          </p>
          {role === 'admin' && (
            <Button size="lg">+ Add First Transaction</Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-gray-800/30 rounded-xl">
        <input
          type="text"
          placeholder="🔍 Search by category or type..."
          value={localFilters.search}
          onChange={(e) => setLocalFilters(prev => ({ ...prev, search: e.target.value }))}
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <select
          value={localFilters.typeFilter}
          onChange={(e) => setLocalFilters(prev => ({ ...prev, typeFilter: e.target.value }))}
          className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[140px]"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <div className="flex gap-2 flex-wrap">
          <Button variant="secondary" onClick={() => handleSort('date_desc')}>Date New</Button>
          <Button variant="secondary" onClick={() => handleSort('amount_desc')}>Amount High</Button>
        </div>
      </div>
      <Table
        columns={columns}
        data={data}
      />
    </Card>
  );
};

export default TransactionList;

