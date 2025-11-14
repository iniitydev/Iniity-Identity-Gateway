import React from 'react';
import type { Role } from '@iniity/types';

export const RoleCard: React.FC<Role> = ({ title, system, function: func, strength, details, color, icon: Icon }) => {
  return (
    <div className={`bg-gray-900/50 rounded-lg shadow-lg overflow-hidden border-t-4 ${color} flex flex-col`}>
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-3">
          <Icon className="h-8 w-8 text-indigo-400" />
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">{title}</h3>
            <h4 className="text-2xl font-bold text-white">{system}</h4>
          </div>
        </div>

        <p className="mt-4 text-gray-400">{func}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h5 className="font-semibold text-white mb-2">Key Strength:</h5>
          <p className="text-gray-400 text-sm">{strength}</p>
        </div>

        <div className="mt-4">
          <ul className="space-y-2">
            {details.map((detail, index) => (
              <li key={index} className="flex items-start text-sm">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-gray-400">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};