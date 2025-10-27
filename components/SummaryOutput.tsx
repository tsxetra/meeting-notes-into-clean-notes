import React, { useState } from 'react';
import type { CondensedNotes } from '../types';
import { Loader } from './Loader';
import { ErrorDisplay } from './ErrorDisplay';

interface SummaryOutputProps {
  result: CondensedNotes | null;
  isLoading: boolean;
  error: string | null;
}

const DocumentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
);

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

const CopyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v3.043m-7.332 0c-.055.194-.084.4-.084.612v3.043m0 0v1.152A2.25 2.25 0 0 0 6.75 21h6a2.25 2.25 0 0 0 2.25-2.25V6.354m-10.5 0h10.5" />
    </svg>
);

export const SummaryOutput: React.FC<SummaryOutputProps> = ({ result, isLoading, error }) => {
  const [copied, setCopied] = useState<'summary' | 'actionItems' | null>(null);

  const handleCopy = (content: string, type: 'summary' | 'actionItems') => {
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard.');
      });
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center h-full"><Loader /></div>;
    }
    if (error) {
      return <div className="flex justify-center items-center h-full"><ErrorDisplay message={error} /></div>;
    }
    if (result) {
      const actionItemsText = result.actionItems.map(item => `• ${item}`).join('\n');
      
      return (
        <div className="space-y-8 animate-fade-in">
          <div>
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-charcoal/10">
                <h3 className="text-xl font-serif text-charcoal">
                  Summary
                </h3>
                <button
                    onClick={() => handleCopy(result.summary, 'summary')}
                    className="text-charcoal/50 hover:text-burgundy disabled:text-charcoal/30 disabled:cursor-default transition-colors text-sm flex items-center p-1 rounded-md -mr-1 group"
                    aria-label="Copy summary to clipboard"
                    disabled={copied === 'summary'}
                >
                    {copied === 'summary' ? (
                        <>
                            <CheckIcon className="w-4 h-4 mr-1 text-burgundy" />
                            <span className="text-burgundy">Copied</span>
                        </>
                    ) : (
                        <>
                            <CopyIcon className="w-4 h-4 mr-1 transition-colors group-hover:text-burgundy" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <p className="text-ink leading-relaxed whitespace-pre-wrap">
              {result.summary}
            </p>
          </div>
          <div>
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-charcoal/10">
              <h3 className="text-xl font-serif text-charcoal">
                Action Items
              </h3>
              {result.actionItems.length > 0 && (
                     <button
                        onClick={() => handleCopy(actionItemsText, 'actionItems')}
                        className="text-charcoal/50 hover:text-burgundy disabled:text-charcoal/30 disabled:cursor-default transition-colors text-sm flex items-center p-1 rounded-md -mr-1 group"
                        aria-label="Copy action items to clipboard"
                        disabled={copied === 'actionItems'}
                    >
                        {copied === 'actionItems' ? (
                           <>
                                <CheckIcon className="w-4 h-4 mr-1 text-burgundy" />
                                <span className="text-burgundy">Copied</span>
                           </>
                        ) : (
                           <>
                                <CopyIcon className="w-4 h-4 mr-1 transition-colors group-hover:text-burgundy" />
                                <span>Copy</span>
                           </>
                        )}
                    </button>
                )}
            </div>
            {result.actionItems.length > 0 ? (
              <ul className="space-y-3">
                {result.actionItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-burgundy mr-3 mt-1">&#8226;</span>
                    <span className="text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-charcoal/60 italic">
                No specific action items were identified.
              </p>
            )}
          </div>
        </div>
      );
    }
    return (
        <div className="flex flex-col justify-center items-center h-full text-center text-charcoal/50">
            <div className="w-16 h-16 p-3 bg-parchment rounded-full mb-4 border border-charcoal/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-full h-full text-charcoal/40">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 6.75 6H9" />
                </svg>
            </div>
            <h3 className="text-lg font-serif text-charcoal/80">Your summary will appear here</h3>
            <p className="max-w-xs mt-1 text-sm">Provide your notes on the left and let the Scribe work its magic.</p>
        </div>
    );
  };

  return (
    <div className="bg-paper/50 p-6 rounded-sm border border-charcoal/10 shadow-sm min-h-[400px] lg:min-h-full">
      <h2 className="text-2xl font-serif text-charcoal mb-4">Polished Summary</h2>
      <div className="mt-6 h-[calc(100%-2.5rem)]">
        {renderContent()}
      </div>
    </div>
  );
};