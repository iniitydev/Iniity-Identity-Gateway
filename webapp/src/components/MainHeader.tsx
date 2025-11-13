import React from 'react';
import { IniityLogo } from './icons/IniityLogo';
import type { AppView } from '../App';
import { BlueprintIcon } from './icons/BlueprintIcon';
import { TerminalIcon } from './icons/TerminalIcon';
import { DeviceIcon } from './icons/DeviceIcon';
import { PolicyIcon } from './icons/PolicyIcon';
import { SettingsIcon } from './icons/SettingsIcon';

interface MainHeaderProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const NavButton: React.FC<{
  label: AppView;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col sm:flex-row items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
    aria-current={isActive ? 'page' : undefined}
  >
    {icon}
    {label}
  </button>
);

export const MainHeader: React.FC<MainHeaderProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="bg-gray-950/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <IniityLogo className="h-8 w-8 text-indigo-500" />
            <h1 className="text-2xl font-bold text-white tracking-tight hidden sm:block">
              <span className="font-light">Iniity</span>
            </h1>
          </div>

          {/* Center: Navigation */}
          <nav className="flex items-center space-x-2 sm:space-x-4 bg-gray-800/50 p-1 rounded-lg">
            <NavButton label="Blueprint" icon={<BlueprintIcon />} isActive={activeView === 'Blueprint'} onClick={() => setActiveView('Blueprint')} />
            <NavButton label="Operations" icon={<TerminalIcon />} isActive={activeView === 'Operations'} onClick={() => setActiveView('Operations')} />
            <NavButton label="Fleet" icon={<DeviceIcon />} isActive={activeView === 'Fleet'} onClick={() => setActiveView('Fleet')} />
            <NavButton label="Policies" icon={<PolicyIcon />} isActive={activeView === 'Policies'} onClick={() => setActiveView('Policies')} />
          </nav>

          {/* Right: Actions */}
          {/* Fix: Remove settings button as API key is handled by environment variable. */}
          <div className="flex items-center w-28 justify-end">
            {/* Placeholder for potential future actions */}
          </div>
        </div>
      </div>
    </header>
  );
};