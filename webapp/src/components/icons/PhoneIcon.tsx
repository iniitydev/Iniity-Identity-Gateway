import React from 'react';

export const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 1.5H5.25A2.25 2.25 0 003 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0015 20.25V3.75A2.25 2.25 0 0012.75 1.5m-2.25 0A2.25 2.25 0 005.25 3.75M10.5 1.5a2.25 2.25 0 012.25 2.25m-2.25 0a2.25 2.25 0 00-2.25 2.25M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
