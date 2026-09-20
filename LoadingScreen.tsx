import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div
      id="loading-screen"
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center select-none"
      role="status"
      aria-label="Loading package details"
    >
      {/* Spinning Semicircle Line */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
        <svg
          className="w-full h-full text-sky-500 animate-spin"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Exact 180-degree semicircle stroke */}
          <path
            d="M 30 6 A 24 24 0 0 1 30 54"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className="sr-only">Loading shipment details...</span>
    </div>
  );
};
