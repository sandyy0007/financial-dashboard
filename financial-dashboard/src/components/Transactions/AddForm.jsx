import React, { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import useStore from '../../store/useStore';

const AddForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category: '',
    type: 'expense'
  });
  const addTransaction = useStore((state) => state.addTransaction);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.amount && formData.category && formData.date) {
      addTransaction({
        date: formData.date,
        amount: parseFloat(formData.amount),
        category: formData.category,
        type: formData.type
      });
      setFormData({ date: '', amount: '', category: '', type: 'expense' });
    }
  };

  return (
    <Card className="mb-10">
      <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800 space-y-6">
        <h3 className="text-2xl font-bold text-white">Add New Transaction</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-right"
              required
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
            <input
              type="text"
              placeholder="e.g. Salary, Groceries..."
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="income">Income (+)</option>
              <option value="expense">Expense (-)</option>
            </select>
          </div>
          <Button type="submit" size="lg" className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
            + Add Transaction
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default AddForm;

