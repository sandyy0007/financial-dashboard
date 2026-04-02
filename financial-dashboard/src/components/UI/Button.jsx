import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = 'px-6 py-3 rounded-xl font-semibold focus:outline-none focus:ring-4 focus:ring-offset-2 shadow-lg transition-all duration-300';
const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-200 focus:ring-gray-500 border border-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
