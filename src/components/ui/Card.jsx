<<<<<<< HEAD
﻿mport React from 'react';
=======
import React from 'react';
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e

export function Card({ children, className = '' }) {
  return <div className={`bg-[#222] rounded-lg shadow-md ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`p-4 border-t border-gray-700 ${className}`}>{children}</div>;
}
