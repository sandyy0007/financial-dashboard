import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;
