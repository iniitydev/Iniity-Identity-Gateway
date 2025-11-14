import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 8.25h13.5m-13.5 7.5h13.5m-1.5-15l-1.5 3-1.5-3m4.5 0l-1.5 3-1.5-3m4.5 12l-1.5 3-1.5-3M5.25 6.75h13.5"
    />
  </svg>
);