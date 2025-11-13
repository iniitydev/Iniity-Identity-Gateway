import React from 'react';

export const IniityLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 2C13.1046 2 14 2.89543 14 4V14H10V4C10 2.89543 10.8954 2 12 2Z"
      fill="currentColor"
      opacity="0.6"
    />
    <path
      d="M12 22C13.1046 22 14 21.1046 14 20V17H10V20C10 21.1046 10.8954 22 12 22Z"
      fill="currentColor"
    />
    <path
      d="M19 9C20.1046 9 21 8.10457 21 7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7C3 8.10457 3.89543 9 5 9H19Z"
      fill="currentColor"
      opacity="0.8"
    />
  </svg>
);
