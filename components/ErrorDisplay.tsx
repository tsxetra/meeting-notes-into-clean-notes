import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="bg-burgundy/10 border border-burgundy/50 text-burgundy px-4 py-3 rounded-sm relative max-w-md w-full" role="alert">
      <strong className="font-bold">An Error Occurred: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};