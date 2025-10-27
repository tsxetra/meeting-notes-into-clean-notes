import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center px-6 py-3 border border-transparent 
        text-base font-bold rounded-sm shadow-sm text-white font-sans tracking-wide
        bg-burgundy hover:bg-burgundy-light 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-parchment focus:ring-burgundy 
        disabled:bg-charcoal/30 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};