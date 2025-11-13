import React from 'react';
import { IniityLogo } from './icons/IniityLogo';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-950/70 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center space-x-3">
        <IniityLogo className="h-8 w-8 text-indigo-500" />
        <h1 className="text-2xl font-bold text-white tracking-tight">
          <span className="font-light">Iniity</span>
        </h1>
      </div>
    </header>
  );
};
