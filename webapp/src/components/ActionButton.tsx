import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  text: string;
  icon?: React.ReactNode;
  primary?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, text, icon, primary = false }) => {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 transition-transform transform hover:scale-105";
  const primaryClasses = "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
  const secondaryClasses = "text-indigo-300 bg-gray-800 hover:bg-gray-700 focus:ring-indigo-500";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses}`}
    >
      {icon && <span className="mr-2 -ml-1 h-5 w-5">{icon}</span>}
      {text}
    </button>
  );
};
