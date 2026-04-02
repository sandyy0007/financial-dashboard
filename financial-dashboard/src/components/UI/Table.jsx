import React from 'react';

const Table = ({ columns, data, className = '' }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className={`min-w-full text-sm ${className}`}>

        {/* Header */}
        <thead className="sticky top-0 z-10 bg-gray-900 text-gray-400 uppercase text-xs border-b border-gray-800">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-6 py-3 text-left font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-12 text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row.id || idx}
                className="border-b border-gray-800 hover:bg-gray-800/70 transition-colors cursor-pointer"
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-6 py-4 ${col.className || 'text-left'}`}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
};

export default Table;
