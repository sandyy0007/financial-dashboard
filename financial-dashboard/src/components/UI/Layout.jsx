import React from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import useStore from '../../store/useStore';

export default function Layout() {
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);
  const location = useLocation();

  // ✅ Scalable route titles
  const titles = {
    '/': 'Dashboard',
    '/transactions': 'Transactions',
    '/insights': 'Insights'
  };

  const navItems = [
    { path: '/', label: '📊 Dashboard' },
    { path: '/transactions', label: '💳 Transactions' },
    { path: '/insights', label: '📈 Insights' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">

      {/* 🔥 Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">

        <h1 className="text-2xl font-bold mb-8 text-white">
          FinanceHub
        </h1>

        <nav className="space-y-3 text-base">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-6 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white ring-1 ring-transparent hover:ring-blue-500/30'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

      </aside>

      {/* 🔥 Main Content */}
      <main className="flex-1 p-10">

        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex justify-between items-center p-8 bg-gray-900 rounded-3xl border border-gray-800 shadow-xl">

            <h2 className="text-3xl font-bold">
              {titles[location.pathname] || 'Dashboard'}
            </h2>

            {/* ✅ Working Role Selector */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl px-6 py-3 text-base focus:outline-none focus:ring-4 focus:ring-blue-500 hover:bg-gray-700 transition-all duration-200"
            >
              <option value="viewer">👁️ Viewer</option>
              <option value="admin">⚙️ Admin</option>
            </select>

          </div>
        </div>

        {/* Page Content */}
        <div className="max-w-7xl mx-auto space-y-12 text-base">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

