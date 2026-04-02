import React from 'react';
import useStore from '../../store/useStore';
import TransactionList from './TransactionList';
import AddForm from './AddForm';

const TransactionsPage = () => {
  const role = useStore((state) => state.role);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Transactions</h1>
      {role === 'admin' && <AddForm />}
      <TransactionList />
    </div>
  );
};

export default TransactionsPage;
