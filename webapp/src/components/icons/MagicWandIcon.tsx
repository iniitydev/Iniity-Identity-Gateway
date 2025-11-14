import React from 'react';

export const MagicWandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 11c0-3.517 1.459-6.756 3.804-9.096C14.126 1.18 12.874 1 11.5 1 6.255 1 2 5.255 2 10.5c0 2.13.688 4.102 1.883 5.74.33.457.694.887 1.084 1.293M12 11c-1.848 0-3.534.646-4.883 1.755m4.883-1.755a9.043 9.043 0 013.804 9.096C17.874 22.82 19.126 23 20.5 23c5.245 0 9.5-4.255 9.5-9.5 0-2.13-.688-4.102-1.883-5.74-.33-.457-.694-.887-1.084-1.293M12 11V3m0 8h8"
    />
  </svg>
);
