import React from 'react';
import type { SummaryRow } from '@iniity/types';

interface SummaryTableProps {
  data: SummaryRow[];
}

export const SummaryTable: React.FC<SummaryTableProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="max-w-4xl mx-auto bg-gray-900/50 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-800/50">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-700 hover:bg-gray-800/70">
                {headers.map((header, cellIndex) => (
                  <td key={cellIndex} className={`px-6 py-4 ${cellIndex === 0 ? 'font-medium text-white' : ''}`}>
                    {row[header as keyof SummaryRow]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
