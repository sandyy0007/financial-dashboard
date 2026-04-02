import React from 'react';

const Badge = ({ children, variant = 'default' }) => {
const variants = {
    income: 'bg-green-900/50 text-green-300 border border-green-800/50',
    expense: 'bg-red-900/50 text-red-300 border border-red-800/50',
    default: 'bg-gray-900/50 text-gray-300 border border-gray-800/50'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;
