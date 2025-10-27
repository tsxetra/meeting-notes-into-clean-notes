import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-parchment/80 backdrop-blur-sm border-b border-charcoal/10 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-serif font-medium text-charcoal">
          The Digital Scribe
        </h1>
        <p className="mt-2 text-md text-charcoal/70 max-w-2xl mx-auto">
          From scattered thoughts to structured minutes. Let clarity emerge from the chaos.
        </p>
      </div>
    </header>
  );
};