import { create } from 'zustand';
import { mockTransactions } from '../data/mockData.js';
import { persist } from 'zustand/middleware'; // Optional persistence

const useStore = create(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      role: 'viewer',
      filters: {
        search: '',
        typeFilter: 'all',
        sortBy: 'date_desc'
      },
      setRole: (role) => set({ role }),
      setFilters: (filters) => set({ filters }),
      addTransaction: (transaction) => 
        set((state) => ({ transactions: [...state.transactions, { id: Date.now(), ...transaction }] })),
      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map(t => t.id === id ? { ...t, ...updates } : t)
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter(t => t.id !== id)
        }))
    }),
    {
      name: 'financial-dashboard-storage'
    }
  )
);

export default useStore;
